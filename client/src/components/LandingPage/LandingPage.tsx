import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import { userStyles } from "../../styles/userStyles";
import { Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText'
import axios from '../../axios'
import {Tables} from '../../interfaces/table' 

export function LandingPage() {
    const styleClasses: any = userStyles();

    const [table_number, setTableNumber] = React.useState(0);
    const [table_list, setTableList] = React.useState<Tables | any>([])

    useEffect(() => {
        const interval = setInterval(()=>{
            if (table_number != null){
                axios.get(`Tables`).then(
                (res) => {
                    const data = res.data;
                    data.sort((a,b) => {return a.table_number-b.table_number})
                    setTableList(data)
                })
            }
        },1000)
        return () => clearInterval(interval)

    })

    const handleChange = (event) => {
        setTableNumber(event.target.value);
    };


    return (
        <div className={styleClasses.root}>
            <AppBar position="static" className={styleClasses.appBar} style={{backgroundColor:'STEELBLUE'}}>
                <Toolbar>
                    <Typography variant="h6" className={styleClasses.title}>
                        WAITLESS
                </Typography>
                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
            <Grid container style={{justifyContent:'center'}} className={styleClasses.gridContainer}>
                <Grid  justify="center" item>
                    <Grid container justify="center" spacing={3}>
                        <Grid key={'Admin'} item>
                            <Link to="/admin">
                                <Button variant="contained" className={styleClasses.paper}>Admin</Button>
                            </Link>
                        </Grid>
                        <Grid key={'Customer'} item>
                            <Box>
                            <Link to={"/customer/"+table_number.toString()}>
                                <Button disabled={table_number ? false : true}variant="contained" className={styleClasses.paper}>Customer</Button>
                            </Link>
                            </Box>
                                <Select
                                  value={table_number}
                                  onChange={handleChange}
                                  style={{minWidth:'100px',paddingTop:'10px'}}>
                                    {table_list.map((table, index) => (
                                        <MenuItem key={index} value={table.table_number}>{table.table_number.toString()}</MenuItem>   
                                    ))}
                                </Select>
                                <FormHelperText>Table Number</FormHelperText>

                        </Grid>
                        <Grid key={'Staff'} item>
                            <Link to="/staff">
                                <Button variant="contained" className={styleClasses.paper}>Staff</Button>
                            </Link>
                        </Grid>
                        <Grid key={'Kitchen'} item>
                            <Link to="/kitchen">
                                <Button variant="contained" className={styleClasses.paper}>Kitchen</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}





