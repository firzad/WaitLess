import * as React from "react";

import MenuIcon from '@material-ui/icons/Menu';

import { Link } from "react-router-dom";
import { userStyles } from "../../styles/userStyles";
import { Grid, Button, AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";

export function LandingPage() {

    const styleClasses: any = userStyles();

    return (
        <div className={styleClasses.root}>
            <AppBar position="static" className={styleClasses.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={styleClasses.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={styleClasses.title}>
                        WAITLESS
                </Typography>
                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
            <Grid container className={styleClasses.gridContainer}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={3}>
                        <Grid key={'Admin'} item>
                            <Link to="/admin">
                                <Button variant="contained" className={styleClasses.paper}>Admin</Button>
                            </Link>
                        </Grid>
                        <Grid key={'Customer'} item>
                            <Link to="/customer">
                                <Button variant="contained" className={styleClasses.paper}>Customer</Button>
                            </Link>
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
