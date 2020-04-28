import React, { useEffect } from 'react';
import MoreVert from '@material-ui/icons/MoreVert';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
//import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
//import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import { commonStyles } from "../../styles/generalStyles";
import axios from '../../axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

//import interfaces
import { TicketMenuItemResponse, TicketMenuItem } from "../../interfaces/ticket"
//import {Tables} from "../../interfaces/table"


function TableDetails(props) {
	const classes: any = commonStyles();

	const { onClose, tableid } = props
	const [expanded, setExpanded] = React.useState('');

	let [ticket_list, setTicketList] = React.useState<TicketMenuItem | any>([]);
	const [is_paying, setIsPaying] = React.useState(false) //boolean for if the customer has selected to pay

	useEffect(() => {
		const interval = setInterval(() => {
			axios.get(`Tables/` + tableid.toString()).then(
				(res) => {
					const data = res.data
					if (data.table_status === 'Paying') {
						setIsPaying(true)
					}
				})
		}, 1000)
		return () => clearInterval(interval)
	})

	const expansionChange = (panel) => (event, isExpanded) => {
		if (isExpanded === true) {
			axios.get('Tables/' + tableid.toString())
				.then(
					(res) => {
						const table_details = res.data
						axios.get('Ticket/Session/' + table_details.current_session.toString())
							.then(
								(tk: TicketMenuItemResponse) => {
									setTicketList(tk.data)
								}
							)
					})
		}
		setExpanded(isExpanded ? panel : false);
	};


	function finishOrder() {
		axios.get('Tables/' + tableid.toString()) //get the current table
			.then(
				(res) => {
					const table_details = res.data
					axios.get('Ticket/Session/Price/' + table_details.current_session.toString()) //get the total cost of the session
						.then(
							(price) => {
								axios.patch(`Summary/` + table_details.current_session.toString(), { 'price': price.data[0] }).then( //update the summary price
									(res) => {
										onClose(false)
										axios.patch('Tables/status/' + tableid.toString(), { 'table_status': 'Empty' }).then((res) => { //remove the current session from the table
											onClose(false)
										})
									}
								)
							}
						)
				})
	}


	return (
		<div className={classes.expBar}>
			<ExpansionPanel expanded={expanded === 'panel1'} onChange={expansionChange('panel1')}>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>Order History</Typography>
				</ExpansionPanelSummary>

				<ExpansionPanelDetails className={classes.expansionList}>
					<TableContainer component={Paper} className={classes.tableContainer}>
						<Table className={classes.table} aria-label="Order Table">
							<TableHead className={classes.tableHead}>
								<TableRow>
									<TableCell className={classes.tableHeadCell}>Order Number</TableCell>
									<TableCell className={classes.tableHeadCell}>Item Name</TableCell>
									<TableCell className={classes.tableHeadCell}>Remark</TableCell>
									<TableCell className={classes.tableHeadCell}>Price</TableCell>
									<TableCell className={classes.tableHeadCell}>Status</TableCell>
								</TableRow>
							</TableHead>
							{ticket_list.map((ticket, t_idx) => (
								<TableBody className={t_idx % 2 ? classes.tableBody0 : classes.tableBody1}>
									{ticket.map((order, o_idx) => (
										<TableRow>
											<TableCell>{t_idx + 1}</TableCell>
											<TableCell>{order.item_name}</TableCell>
											<TableCell>{order.remark}</TableCell>
											<TableCell>{'$' + order.price.toString()}</TableCell>
											<TableCell>{order.item_status}</TableCell>
										</TableRow>
									))}
								</TableBody>
							))}
						</Table>
					</TableContainer>
				</ExpansionPanelDetails>
			</ExpansionPanel>

			<div className={classes.divFinish}>
				<Button disabled={!is_paying} variant="contained" onClick={finishOrder}>Finish Order</Button>
			</div>
		</div>
	)
}

function TableBox(props) {
	const { onClose, open, table } = props;
	const tableid = table.table

	function handleClose() {
		onClose(false)
	}

	//getTableOrder

	return (
		<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth={true} maxWidth={'md'}>
			<DialogTitle id="simple-dialog-title">Table {tableid.toString()}</DialogTitle>
			<List>
				<ListItem>
					<TableDetails onClose={handleClose} tableid={tableid} />
				</ListItem>
			</List>
		</Dialog>
	)
}


export default function TableDialogue(props) {
	const tableid = props
	const [open, setOpen] = React.useState(false);

	function handleClickOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false)
	}

	return (
		<div>
			<IconButton edge="end" aria-label="More" onClick={handleClickOpen}>
				<MoreVert />
			</IconButton>
			<TableBox onClose={handleClose} open={open} table={tableid} />
		</div>
	)
}
