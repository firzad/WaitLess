import * as React from "react";

import MenuIcon from '@material-ui/icons/Menu';

import { userStyles } from "src/styles/userStyles";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";

export function Customer() {
    const styleClasses: any = userStyles();
    return (
        <div className={styleClasses.root}>
            <AppBar position="static" className={styleClasses.appBar}>
                <Toolbar>
                <IconButton edge="start" className={styleClasses.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={styleClasses.title}>
                    Menu
                </Typography>
                {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
       </div>
    );
}
