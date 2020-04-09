import React, { Fragment } from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper} from '@material-ui/core';
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
      paper: {
          padding: theme.spacing(1),
          alignItems: 'center',
          alignText: 'center',
          height: '100%'
      }
})
);

export default function Bucket(props){
    const classes = useStyles();
    const itemDetails=props.orderValue
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
            <Paper className={classes.paper}>
             <Grid container spacing={4} direction="column" justify="center">
             <Grid item container justify="center">
                <Grid item> 
                    <Typography variant="h5" align="center">
                        Item Name
                    </Typography>
                </Grid>
                <Grid item>
                    <List>
                        {itemDetails?<Fragment>
                        {itemDetails.map((obj) => (
                        <ListItem button key={obj.item_name}>
                            <ListItemText primary={obj.item_name} />
                            {/* <ListItemText primary={obj.itemPrice} /> */}
                        </ListItem>
                         ))}
                         </Fragment>:<div>"text"</div>} 
                    </List>
                    <Divider/>
                </Grid>
                <Grid item >
                    <Button size="medium" color="primary">
                        PLACE ORDER
                    </Button>
                    <Divider/>
                </Grid>
                <Grid item>
                    <Button size="medium" color="primary">
                        PAY BILL
                    </Button>
                    <Divider/>
                </Grid>
                </Grid>
            </Grid> 
            </Paper>
        </Drawer>
    );
}