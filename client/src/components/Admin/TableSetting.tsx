import * as React from "react";
import {useState, useEffect, Fragment} from "react"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import { userStyles } from "../../styles/userStyles";
import axios from '../../axios';

//import interfaces
import {Tables, ServerResponse, ServerPostResponse} from "../../interfaces/table"

    

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        minWidth: 275,
        minHeight:100
    },
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      margin: theme.spacing(2),
    },
    title: {
        fontSize: 14,
    },
  }),
);

export default function TableSetting(){
    const styleClasses: any = userStyles();
    const [tables, setTables] = useState<Tables | any>([]);
    const [loading, setLoading] = useState(true);
    const newTable : Tables = {
        'table_number': 0,
        'table_size': 2,
        'table_status': false
    }

    // const handleNewTableChange = (event) => {
    //     setSize(event.target.value);
    // }


    const addTable = (table_size: number) => {
        axios.post<Tables>(`Tables`,{'table_size': table_size}).then(
            (res:ServerPostResponse) => {
                let temp = tables;
                temp.push(res.data);
                setTables(temp);
            }
        )
    }

    const updateTable = (table_size: number, index: number) => {
        axios.put<Tables>(`Tables`,{'table_size': table_size}).then(
            (res:ServerPostResponse) => {
                let temp = tables;
                temp[index] = res.data;
                setTables(temp);
            }
        )
    }


    useEffect(() => {
        if (tables.length === 0){
            axios.get(`Tables`).then(
                (res: ServerResponse) => {
                    const data = res.data;
                    setTables(data);
                    setLoading(false);
                }
            )
        }
        });

    return(
        <div className={styleClasses.root}>
            {loading?<div>LOADING</div>:
            <Grid container spacing={1}>
                {
                tables.map((table:Tables, index:number)=>(
                    <TableDetail table={table} index={index} updateTable={updateTable}/>
                ))}
                <TableDetail table={newTable} index="-1" addTable={addTable}/>
            </Grid>}
        </div>
    )
}

export function TableDetail(props){
    const index = props.index;
    const table = props.table;
    const [table_size, setTableSize] = useState(props.table.table_size)
    const classes : any = useStyles()

    const handleTableSizeChange = (event) => {
        setTableSize(Number(event.target.value));
    }


    return (
        <Grid item xs={3}>
            <Card className={classes.root} variant="outlined">
                <CardContent className={classes.paper}>
                    <Grid container direction="column" spacing={3}>
                        { index === "-1" ?
                        <TextField label="Table Number" disabled={true} style={{ margin: 8 }} margin="normal" defaultValue="new table"/> :
                        <TextField label="Table Number" disabled={true} style={{ margin: 8 }} margin="normal" value={table.table_number}/> }
                        <TextField label="Table Size" style={{ margin: 8 }} margin="normal" value={table_size} onChange={handleTableSizeChange}/>
                    </Grid>    
                </CardContent>
                <CardActions>
                    { index === "-1" ?
                        <Button onClick={()=>props.addTable(table_size)}>Add</Button> :
                        <Fragment>
                            <Button onClick={()=>props.updateTable(table_size, Number(index))}>Update</Button>
                            <Button>Delete</Button>
                        </Fragment>
                    }
                </CardActions>
            </Card>
        </Grid>
    )

}
