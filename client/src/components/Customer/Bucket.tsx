import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Typography, Grid} from '@material-ui/core';
//import { userStyles } from "src/styles/userStyles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
//import ListSubheader from '@material-ui/core/ListSubheader';
import {
    Drawer,
    Divider,
    IconButton
  } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex'
    },
    listSection: {
        backgroundColor: 'inherit',
      },
      ul: {
        backgroundColor: 'inherit',
        padding: 0,
      },
      list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
      },
})
);

export default function Bucket(props){
    const itemList: any =[
        {
            itemName:'Burger 1',
            itemPrice:'$20'
        },
        {
            itemName:'Burger 2',
            itemPrice:'$15'
        },
        {
            itemName:'Burger 3',
            itemPrice:'$14'
        },
        {
            itemName:'Burger 4',
            itemPrice:'$13'
        },
        {
            itemName:'Burger 5',
            itemPrice:'$10'
        },
    ]
    const classes = useStyles();
    //const itemList = props.itemList
    const theme = useTheme();
    return(
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={props.open}
        classes={{
            paper: classes.drawerPaper,
        }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={props.handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
                <Typography variant="h5" align="right">
                    Bucket
                </Typography>
            </div>
            <Divider/>
            <Grid container spacing={4} align-content="flex-start" align-items="flex-start" justify-content="flex-start">
                <Grid item>
                    <Typography variant="h5" align="right">
                        Item Name
                    </Typography>
                </Grid>
                <Grid item>
                    <List>
                        {itemList.map((obj) => (
                        <ListItem button key={obj.itemName}>
                            <ListItemText primary={obj.itemName} />
                            <ListItemText primary={obj.itemPrice} />
                        </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item>
                    <Button variant="contained" size="medium" color="primary">
                        PLACE ORDER
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" size="medium" color="primary">
                        PAY BILL
                    </Button>
                </Grid>
            </Grid>
        </Drawer>
    );
}