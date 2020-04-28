import * as React from "react";
import { useState, useEffect } from "react"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Card, CardActions, CardContent, Button, TextField, CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DoneIcon from '@material-ui/icons/Done';
import Restaurant from '@material-ui/icons/Restaurant';
import AddIcon from '@material-ui/icons/Add';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { userStyles } from "../../styles/userStyles";
import axios from '../../axios';

//import interfaces
import { Tables, ServerResponse, ServerPostResponse } from "../../interfaces/table"



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
            minHeight: 100
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

const table_status_map = {
    'Seated': {
        'backgroundColor': "darkcyan",
        'icon': <MenuBookIcon />
    },
    'Preparing Order': {
        'backgroundColor': "moccasin",
        'icon': <Restaurant />
    },
    'Ready to Deliver': {
        'backgroundColor': "FIREBRICK",
        'icon': <LocalDiningIcon />
    },
    'Delivered': {
        'backgroundColor': "DARKCYAN",
        'icon': <DoneIcon />
    },
    'Ordered': {
        'backgroundColor': "darkcyan",
        'icon': <MenuBookIcon />
    },
    'Empty': {
        'backgroundColor': "#1565c0",
        'icon': <Restaurant />
    },
    'New': {
        'backgroundColor': "grey",
        'icon': <AddIcon />
    },
    'Paying': {
        'backgroundColor': "PALETURQUOISE",
        'icon': <AttachMoneyIcon />
    }
}

export default function TableSetting() {
    const styleClasses: any = userStyles();
    const [tables, setTables] = useState<Tables | any>(null);
    const [loading, setLoading] = useState(true);
    const newTable: Tables = {
        'table_number': 0,
        'table_size': 2,
        'table_status': "New",
        'current_session': 0,
        'assistance': false
    }



    const addTable = (table_size: number) => {
        axios.post<Tables>(`Tables`, { 'table_size': table_size }).then(
            (res: ServerPostResponse) => {
                setTables((tables) => [...tables, res.data]);
            }
        )
    }

    const updateTable = (table_number: number, table_size: number, index: number) => {
        axios.patch<Tables>(`Tables/` + table_number.toString(), { 'table_size': table_size }).then(
            (res: ServerPostResponse) => {
                let temp = tables;
                temp[index] = res.data;
                setTables(temp);
            }
        )
    }

    const deleteTable = (table_number: number, table_size: number, index: number) => {
        axios.delete(`Tables/` + table_number.toString(), { 'table_size': table_size }).then(
            (res: any) => {
                setTables(tables => {
                    const list = tables.filter((item, j) => index !== j);
                    return list
                });
            }
        )
    }


    useEffect(() => {
        if (tables === null) {
            axios.get(`Tables`).then(
                (res: ServerResponse) => {
                    const data = res.data;
                    setTables(data);
                    setLoading(false);
                }
            )
        }
    });

    return (
        <div className={styleClasses.root}>
            {loading ? <div>LOADING</div> :
                <Grid container spacing={1}>
                    {
                        tables.map((table: Tables, index: number) => (
                            <TableDetail table={table} index={index} updateTable={updateTable} deleteTable={deleteTable} />
                        ))}
                    <TableDetail table={newTable} index="-1" addTable={addTable} />
                </Grid>}
        </div>
    )
}

export function TableDetail(props) {
    const index = props.index;
    const table = props.table;
    const [table_size, setTableSize] = useState(props.table.table_size)
    const classes: any = useStyles()
    const title: String = "Table " + String(table.table_number);
    const icon = table_status_map[props.table.table_status].icon;
    const statuscolor = table_status_map[table.table_status].backgroundColor;

    const handleTableSizeChange = (event) => {
        setTableSize(Number(event.target.value));
    }

    const createAvatar = () => {
        return (<Avatar style={{ backgroundColor: statuscolor }}>{icon}</Avatar>);
    }


    return (
        <Grid item xs={3}>
            <Card className={classes.root} variant="outlined" raised={true} elevation={4}>
                <CardHeader
                    avatar={createAvatar()}
                    title={title}
                />
                <CardContent className={classes.paper}>
                    <Grid container direction="column" spacing={3}>
                        {index === "-1" ?
                            <TextField label="Table Number" disabled={true} style={{ margin: 8 }} margin="normal" defaultValue="new table" /> :
                            <TextField label="Table Number" disabled={true} style={{ margin: 8 }} margin="normal" value={table.table_number} />}
                        <TextField label="Table Size" style={{ margin: 8 }} margin="normal" value={table_size} onChange={handleTableSizeChange} />
                    </Grid>
                </CardContent>
                <CardActions>
                    {index === "-1" ?
                        <Grid container justify="space-evenly">
                            <Button variant="contained" style={{ backgroundColor: statuscolor, color: "white" }} onClick={() => props.addTable(table_size)}>Add</Button>
                            <Grid item xs={7}></Grid>
                        </Grid> :
                        <Grid container justify="space-evenly">
                            <Button variant="contained" style={{ backgroundColor: statuscolor, color: "white" }} onClick={() => props.updateTable(table.table_number, table_size, Number(index))}>Update</Button>
                            <Button variant="contained" style={{ backgroundColor: statuscolor, color: "white" }} onClick={() => props.deleteTable(table.table_number, table_size, Number(index))}>Delete</Button>
                            <Grid item xs={3}></Grid>
                        </Grid>
                    }
                </CardActions>
            </Card>
        </Grid>
    )

}
