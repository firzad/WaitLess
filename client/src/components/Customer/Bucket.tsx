import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper} from '@material-ui/core';
//import { userStyles } from "src/styles/userStyles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import {Ticket, TicketPostResponse} from "../../interfaces/ticket"
import {TicketItem, TicketItemPostResponse} from "../../interfaces/ticket"
import axios from '../../axios';
//import {useState/*, useEffect, Fragment*/} from "react"
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckIcon from '@material-ui/icons/Check';
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
        //opacity: '0.5'
      },
      drawerPaper: {
        width: drawerWidth,
        opacity: '0.5'
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
          height: '100%',
          opacity: '0.5'
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
    const {current_session,table_number}=props
    console.log("------0")
    console.log(itemList)
    //const itemList = props.itemList
    const theme = useTheme();
    const ingredients_removed=""
    const item_status="Order Placed"
    
   //const [ticketItem, setTicketItem] = useState<TicketItem | any>([]);


    // const newTicketItem : TicketItem = {
    //     'order_item_id': 0,
    //     'ticket_id': 0,
    //     'menu_id':0,
    //     'ingredients_added': "",
    //     'ingredients_removed': "",
    //     'remark': "",
    //     'item_status':"",
    //     'quantity':0
        
    // // }
/*
order_item_id: number,
    ticket_id: number,
    menu_id: number,
    ingredients_added: string,
    ingredients_removed: string,
    remark: string,
    item_status: string,
    quantity: number
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




// Get for status?

    const onOrderClick = () =>{
        axios.post<Ticket>(`Ticket`,{'session_id': current_session, 'table_number': table_number}).then(
            (res: TicketPostResponse) => {
                const ticket_id = res.data.ticket_id
                console.log("***")
                console.log(ticket_id)
                Promise.all(itemList.filter(ticket_item=>!ticket_item.ordered).map((ticket_item)=>(// (const ticket_item of itemList.entries()){
                    axios.post<TicketItem>(`TicketItem`,{'ticket_id': ticket_id,'menu_id': ticket_item.menu_id,
                                        'ingredients_added': ticket_item.ingredient, 'ingredients_removed': ingredients_removed, 
                                        'remark': ticket_item.remarks,'quantity': ticket_item.quantity, 'item_status': item_status}).then(
                    (res: TicketItemPostResponse) => {
                        //setTicketItem((ticketItem)=>[...ticketItem,res.data]);
                        //ticket_item.ordered=true;
                        props.setOrderedBucketValue(ticket_item)
                    }).catch(error=> console.log(error))
                ))
                    
                    //ticket_item.ordered=true;
                    //console.log(ticket_item[1].ordered)
                
            ).then(()=>{console.log(itemList); 
                //props.setOrderValue(itemList)})
                props.bucketClear()})
            
            //promise.all async multiple calls/ async await
            //props.bucketClear()
            // console.log("Item List--------")
            //console.log(itemList)
            // props.setOrderValue(itemList)
        }
    )
}


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
                                {props.orderedValue.map((obj) => (
                                <ListItem button key={obj.item_name}>
                                    <ListItemText primary={obj.item_name} />
                                <ListItemIcon><CheckIcon/></ListItemIcon>
                                    {/* <ListItemText primary={obj.itemPrice} /> */}
                                </ListItem>
                                ))}
                                {itemList.map((obj) => (
                                <ListItem button key={obj.item_name}>
                                    <ListItemText primary={obj.item_name} />
                                    {/* <ListItemText primary={obj.itemPrice} /> */}
                                </ListItem>
                                ))}
                                
                            </List>
                            
                        </Grid>
                    </Grid>
                    <Grid item container direction="column" alignItems="center" justify="flex-end" spacing ={1}>
                        <Grid item>
                            <Button size="medium" variant="outlined" color="secondary" className={classes.margin} onClick={onOrderClick}>
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