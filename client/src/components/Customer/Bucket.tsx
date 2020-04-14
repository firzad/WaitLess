import React, { Fragment } from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper} from '@material-ui/core';
//import { userStyles } from "src/styles/userStyles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
//import {Ticket, TicketPostResponse} from "../../interfaces/Ticket"
//import {TicketItem, TicketItemPostResponse} from "../../interfaces/Ticket"
//import axios from '../../axios';
//import {Order, OrderResponse, OrderPostResponse} from "../../interfaces/order"
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
      },
    margin: {
        margin: theme.spacing(1),
      },
    listGrid: {
        height: '70vh',
        overflow: 'auto'
    },
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
})
);

export default function Bucket(props){
    const classes = useStyles();
    const itemList=props.orderValue
    console.log("------0")
    console.log(itemList)
    //const itemList = props.itemList
    const theme = useTheme();
    
   /* const [order, setOrder] = useState<Order | any>([]);
    const newOrder : Order = {
        'item_name': "",
        'menu_id':0,
        'ingredients_added': "",
        'ingredients_removed': "",
        'remark': "",
        'order_item_id': 0
    }

    const addOrder = (table_size: number) => {
        axios.post<Order>(`Tables`,{'table_size': table_size}).then(
            (res:OrderPostResponse) => {
                setOrder((order) => [...order, res.data]);
            }
        )
    }
    const addOrder = (table_size: number) => {
        axios.post<Order>(`Tables`,{'table_size': table_size}).then(
            (res:OrderPostResponse) => {
                setOrder((order) => [...order, res.data]);
            }
        )
    }
    const addOrder = (table_size: number) => {
        axios.post<Order>(`Tables`,{'table_size': table_size}).then(
            (res:OrderPostResponse) => {
                setOrder((order) => [...order, res.data]);
            }
        )
    }*/
    // axios.post<Ticket>(`Ticket`,{'session_id': session_id, 'table_number': table_number}).then(
    //     (res: TicketServerPostResponse) => {
    //         ///..... add to previous order list, etc.
    //         ticket_id = res.data.ticket_id
    
    
    //         ////POST TICKET ITEMS
    //         //Posts Each individual meal order in the ticket
    //         //Couldn't figure out how to post in bulk, does it individually
    //         //bucket_list = useState(...)
    
    //         for (const ticket_item in bucket_list){
    //             axios.post<TicketItem>(`TicketItem`,{'ticket_id': ticket_id,'menu_id': menu_id,
    //                                  'ingredients_added': ingredients_added, 'ingredients_removed': ingredients_removed, 
    //                                  'remark': remark, 'item_status': item_status}).then(
    //             (res: TicketPostResponse) => {
    //             })
    //         }
    //     })



    return(
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={props.open}
        classes={{
            paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
            <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            <Typography variant="h4" align="right" className={classes.typography}>
                Bucket
            </Typography>
            <Divider />
        </div>
            <Divider/>
            <Paper className={classes.paper}>
                <Grid container spacing={4} direction="column" justify="center">
                    <Grid item container justify="flex-start"  className={classes.listGrid}>
                        <Grid item>
                            <List>
                                {itemList?<Fragment>
                                {itemList.map((obj) => (
                                <ListItem button key={obj.item_name}>
                                    <ListItemText primary={obj.item_name} />
                                    {/* <ListItemText primary={obj.itemPrice} /> */}
                                </ListItem>
                                ))}
                                </Fragment>:<Fragment><Typography variant="h1">"{console.log(itemList)}"</Typography></Fragment>} 
                            </List>
                            
                        </Grid>
                    </Grid>
                    <Grid item container direction="column" alignItems="center" justify="flex-end" spacing ={1}>
                        <Grid item>
                            <Button size="medium" variant="outlined" color="secondary" className={classes.margin}>
                                PLACE ORDER
                            </Button>
                            </Grid>
                        <Divider/>
                    {/* </Grid> */}
                        <Grid item>
                            <Button size="medium" variant="outlined" color="secondary"className={classes.margin}>
                                PAY BILL
                            </Button>
                            <Divider/>
                        </Grid>
                    </Grid>
            </Grid> 
            {/* <Button size="medium" color="primary" className={classes.button2} >
                PLACE ORDER
            </Button>
            <Button size="medium" color="primary" className={classes.button1}>
                PAY BILL
            </Button> */}
            </Paper>
        </Drawer>
    );
}