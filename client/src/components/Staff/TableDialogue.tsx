import React from 'react';
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
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

//import interfaces
import {TicketMenuItemResponse, TicketMenuItem} from "../../interfaces/ticket"
//import {Tables} from "../../interfaces/table"


function TableDetails(props){
	const classes: any = commonStyles();

	const {onClose, tableid} = props
	const [expanded, setExpanded] = React.useState('');

	let [ticket_list, setTicketList] = React.useState<TicketMenuItem | any>([]);

	const expansionChange = (panel) => (event, isExpanded) => {
		if (isExpanded === true){
			axios.get('Tables/'+tableid.toString())
	    	.then(
	            (res) => {
	            	const table_details = res.data
	            	axios.get('Ticket/Session/'+table_details.current_session.toString())
	            	.then(
	            		(tk: TicketMenuItemResponse) => {
	            			setTicketList(tk.data)
	            		}
	            	)
	        })	
		}
	    setExpanded(isExpanded ? panel : false);
	};


	function finishOrder(){
		axios.get('Tables/'+tableid.toString())
	    	.then(
	            (res) => {
            	const table_details = res.data
            	axios.get('Ticket/Session/Price/'+table_details.current_session.toString())
            	.then(
            		(price) => {
    				axios.patch(`Summary/`+table_details.current_session.toString(),{'price':price.data[0]}).then(
    					(res)=>{
    						onClose(false)
    						axios.patch('Tables/clear/'+tableid.toString()).then((res)=>{
    							onClose(false)
    						})
    					}
    				)
            		}
       			)
	    })	
	}


	return(
		<div className={classes.expBar}>
  		<ExpansionPanel expanded={expanded === 'panel1'} onChange={expansionChange('panel1')}>
      		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        	<Typography>Order History</Typography>
        	</ExpansionPanelSummary>

        	<ExpansionPanelDetails>
        	<List className={classes.expansionList} >

        		{ticket_list.map((ticket, t_idx) => (
        			<TableContainer component={Paper}>
				      <Table className={classes.table} aria-label="Order Table">
				        <TableHead>
				          <TableRow>
				            <TableCell className={classes.tableHead}>Order Table</TableCell>
				          </TableRow>
				        </TableHead>
				        <TableBody>
      						{ticket.map((order, o_idx) => (
      							<TableRow><TableCell>{order.item_name}</TableCell></TableRow>
     						))}
      				</TableBody>
      				</Table>
      				</TableContainer>
	      		))}

			</List>

        	</ExpansionPanelDetails>
		</ExpansionPanel>
		<ExpansionPanel expanded={expanded === 'panel2'} onChange={expansionChange('panel2')}>
      		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        	<Typography>Table Settings</Typography>
        	</ExpansionPanelSummary>

        	<ExpansionPanelDetails>
     			<Button variant="contained" onClick={finishOrder}>Finish Order</Button>
        	</ExpansionPanelDetails>
		</ExpansionPanel>
		</div>
	)
}

function TableBox(props){
	const { onClose, open, table} = props;
	const tableid = table.table

	function handleClose(){
		onClose(false)
	}

	//getTableOrder

	return(
		<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth={true} maxWidth={'md'}>
            <DialogTitle id="simple-dialog-title">Table {tableid.toString()}</DialogTitle>
        	<List>
        		<ListItem>
        			<TableDetails onClose={handleClose} tableid={tableid}/>
        		</ListItem>
        	</List>
    	</Dialog>
	)
}


export default function TableDialogue(props){	
	const tableid = props
	const [open, setOpen] = React.useState(false);

	function handleClickOpen(){
    	setOpen(true);
  	}

	function handleClose(){
		setOpen(false)
	}

	return(
		<div>
		<IconButton edge="end" aria-label="More" onClick = {handleClickOpen}>
			<MoreVert/>
		</IconButton>
		<TableBox onClose={handleClose} open={open} table={tableid}/>
		</div>
	)
}


/*
{ticket_list.map((ticket, t_idx) => (
        			<div className={classes.expBar}>

					<Typography component="h3" color="primary">
					{'Order ' + (t_idx+1).toString() + ' \xa0\xa0\xa0' + ticket[t_idx].ticket_timestamp.toString().slice(0,-5)}</Typography>

					<Box border={1} borderRadius="borderRadius" borderColor="primary.main">

      				{ticket.map((order, o_idx) => (
     					<ListItem key={o_idx+t_idx*ticket_list.length}>
						<ListItemText primary={order.item_name + ', Remark: ' + order.remark + ', Status: ' + order.item_status + ', Price: $' + order.price.toString()}/>
						</ListItem>	
     				))}
     				</Box>
     				</div>
	      		))}
*/