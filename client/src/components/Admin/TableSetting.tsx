import * as React from "react";
import {useState, useEffect} from "react"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core';
import { userStyles } from "../../styles/userStyles";
import axios from '../../axios';

export interface Tables{
    table_number: number,
    table_size: number,
    table_status: boolean
}

export interface ServerResponse{
    data: [Tables]
}

export interface ServerPostResponse{
    data: Tables
}

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
    const classes: any = useStyles();
    const styleClasses: any = userStyles();
    const [tables, setTables] = useState<Tables | any>([]);
    const [loading, setLoading] = useState(true);
    const [newTableSize, setSize] = useState(2);

    const handleNewTableChange = (event) => {
        setSize(event.target.value);
    }


    const addTable = () => {
        axios.post<Tables>(`Tables`,{'table_size': newTableSize}).then(
            (res:ServerPostResponse) => {
                let temp = tables;
                temp.push(res.data);
                setTables(temp);
                setSize(2);
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
                    <Grid item xs={3} key={index}>
                        <Card className={classes.root} variant="outlined">
                            <CardContent className={classes.paper}>
                                <Grid container direction="column" spacing={3}>
                                    <TextField label="Table Number" disabled={true} style={{ margin: 8 }} margin="normal" value={table.table_number}/>
                                    <TextField label="Table Size" style={{ margin: 8 }} margin="normal" value={table.table_size} />
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button>Update</Button>
                                <Button>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={3}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent className={classes.paper}>
                            <Grid container direction="column" spacing={3}>
                                <TextField label="Table Number" disabled={true} style={{ margin: 8 }} margin="normal" defaultValue="new table"/>
                                <TextField label="Table Size" style={{ margin: 8 }} margin="normal" value={newTableSize} onChange={handleNewTableChange}/>
                            </Grid>    
                        </CardContent>
                        <CardActions>
                                <Button onClick={addTable}>Add</Button> 
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>}
        </div>
    )
}
