import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core';
//import { userStyles } from "src/styles/userStyles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { Ticket, TicketPostResponse } from "../../interfaces/ticket"
import { TicketItem, TicketItemPostResponse } from "../../interfaces/ticket"
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DoneIcon from '@material-ui/icons/Done';
import axios from '../../axios';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
//import {useState/*, useEffect, Fragment*/} from "react"
import ListItemIcon from '@material-ui/core/ListItemIcon';
//import {Order, OrderResponse, OrderPostResponse} from "../../interfaces/order"
import {
	Drawer,
	Divider,
	IconButton
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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
			width: '23vw',
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
			opacity: '0.9'
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

export default function Bucket(props) {
	const classes = useStyles();
	const itemList = props.orderValue
	const { current_session, table_number, handleExitCustomer } = props

	const theme = useTheme();
	const ingredients_removed = ""
	const item_status = "Order Placed"

	const [prevorder_click, setPrevOrderClick] = React.useState(false);
	function handlePrevOrderClick() {
		setPrevOrderClick(!prevorder_click)
	}

	const onOrderClick = () => {
		axios.post<Ticket>(`Ticket`, { 'session_id': current_session, 'table_number': table_number }).then(
			(res: TicketPostResponse) => {
				const ticket_id = res.data.ticket_id
				Promise.all(itemList.filter(ticket_item => !ticket_item.ordered).map((ticket_item) => (// (const ticket_item of itemList.entries()){
					axios.post<TicketItem>(`TicketItem`, {
						'ticket_id': ticket_id, 'menu_id': ticket_item.menu_id,
						'ingredients_added': ticket_item.ingredient.join(','), 'ingredients_removed': ingredients_removed,
						'remark': ticket_item.remarks, 'quantity': ticket_item.quantity, 'item_status': item_status
					}).then(
						(res: TicketItemPostResponse) => {
							//setTicketItem((ticketItem)=>[...ticketItem,res.data]);
							//ticket_item.ordered=true;
							props.setOrderedBucketValue([ticket_item])
						}).catch(error => console.log(error))
				))

					//ticket_item.ordered=true;
					//console.log(ticket_item[1].ordered)

				).then(() => {
					//props.setOrderValue(itemList)})
					props.bucketClear()
				})

				//promise.all async multiple calls/ async await
				//props.bucketClear()
				// console.log("Item List--------")
				//console.log(itemList)
				// props.setOrderValue(itemList)
			}
		)
	}

	const removeItemFromCart = itemindex => e => {
		let clonearr = itemList.slice()
		clonearr.splice(itemindex, 1)
		props.JGFIXSETBUCKET(clonearr)
	}

	return (
		<Drawer
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
				<Typography variant="h6" align="right" className={classes.typography}>
					Hide
            </Typography>
				<Divider />
			</div>
			<Divider />
			<Paper className={classes.paper}>
				<List component="nav" aria-label="menu item list">
					<ListItem disabled={itemList.length === 0} button >
						<ListItemIcon style={{ minWidth: '42px' }}>
							<ShoppingBasketIcon />
						</ListItemIcon>
						<ListItemText primary={<Typography variant="h5" align="left" style={{ fontWeight: 700 }}>
							{itemList.length === 0 ? 'Basket Empty' : 'Current Items'}
						</Typography>} />
					</ListItem>
					<Divider />
				</List>
				<List style={{ visibility: itemList.length === 0 ? 'hidden' : 'visible' }} component="nav">
					{itemList.map((obj, index) => (
						<ListItem key={index} style={{ paddingLeft: '2.4vw' }}>
							<ListItemIcon style={{ minWidth: '30px', minHeight: '20px' }}>
								<IconButton value={obj} onClick={removeItemFromCart(index)}>
									<DeleteOutlineIcon />
								</IconButton>
							</ListItemIcon>
							<ListItemText primary={obj.item_name + (obj.quantity > 1 ? '  x' + obj.quantity : '')} />
							<ListItemText primary={'$' + obj.price * obj.quantity} />
						</ListItem>
					))}
				</List>
				<Divider style={{ visibility: props.orderedValue.length === 0 ? 'visible' : 'hidden' }} />
				<ListItem
					disabled={props.orderedValue.length === 0} button
					onClick={handlePrevOrderClick}>
					<ListItemIcon style={{ minWidth: '42px' }}>
						<AttachMoneyIcon />
					</ListItemIcon>
					<ListItemText primary={<Typography variant="h5" align="left" style={{ fontWeight: 700 }}>
						Previous Orders
                </Typography>} />
					{prevorder_click ? <ExpandLess /> : <ExpandMore />}

				</ListItem>

				<Divider />
				<Collapse in={prevorder_click} unmountOnExit>
					<List component="nav">
						{props.orderedValue.map((ticket, index) => (
							<React.Fragment>
							{ticket.map((obj,o_index)=>(
							<ListItem key={index} style={{ paddingLeft: '2.4vw' }}>
								<ListItemIcon style={{ minWidth: '30px', minHeight: '20px' }}>
									<DoneIcon />
								</ListItemIcon>
								<ListItemText primary={obj.item_name + (obj.quantity > 1 ? '  x' + obj.quantity : '')} />
								<ListItemText primary={'$' + obj.price * obj.quantity} />
							</ListItem>
						))}
						</React.Fragment>
						))}
					</List>
				</Collapse>
				<List>
					<ListItem alignItems='center'>
						<Grid item container direction="row" align-item="center" justify="center" spacing={1}>
							<Button size="medium" variant="outlined" color="secondary"
								className={classes.margin} onClick={onOrderClick}
								disabled={itemList.length === 0}>
								PLACE ORDER
                </Button>
						</Grid>
					</ListItem>
					<ListItem alignItems='center'>
						<Grid item container direction="row" align-item="center" justify="center" spacing={1}>
							<Button size="medium" variant="outlined" color="secondary" className={classes.margin}
								onClick={handleExitCustomer}>
								PAY BILL
                </Button>
						</Grid>
					</ListItem>
				</List>
			</Paper>
		</Drawer>
	);
}