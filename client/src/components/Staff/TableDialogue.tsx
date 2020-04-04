import React from 'react';
import MoreVert from '@material-ui/icons/MoreVert';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { commonStyles } from "../../styles/generalStyles";
import axios from '../../axios';

//import interfaces
import {TicketItemResponse, TicketItem} from "../../interfaces/ticket"
//import {Tables} from "../../interfaces/table"


function TableDetails(props){
	const classes: any = commonStyles();

	const tableid = props.tableid
	const [expanded, setExpanded] = React.useState('');

	let [ticket_list, setTicketList] = React.useState<TicketItem | any>([]);

	const expansionChange = (panel) => (event, isExpanded) => {
		if (isExpanded === true){
			axios.get('Tables/'+tableid.toString())
	    	.then(
	            (res) => {
	            	const table_details = res.data
	            	axios.get('Ticket/Session/'+table_details.current_session.toString())
	            	.then(
	            		(tk: TicketItemResponse) => {
	            			setTicketList(tk.data)
	            		}
	            	)
	        })	
		}
		
	    setExpanded(isExpanded ? panel : false);
	};

	return(
		<div className={classes.expBar}>
  		<ExpansionPanel expanded={expanded === 'panel1'} onChange={expansionChange('panel1')}>
      		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        	<Typography>Order History</Typography>
        	</ExpansionPanelSummary>

        	<ExpansionPanelDetails>
        	<List className={classes.expBar}>

        		{ticket_list.map((ticket, t_idx) => (
        			<div className={classes.expBar}>
        			<Divider variant="fullWidth" component="div" />

					<Typography component="h3" color="primary">{'Order ' + (t_idx+1).toString()}</Typography>

      				{ticket.map((order, o_idx) => (
     					<ListItem key={order.order_item_id}>
						<ListItemText primary={'Menu Item: ' + order.menu_id.toString() + ', Remark: ' + order.remark + ', Status: ' + order.item_status}/>
						</ListItem>	
     				))}
     				</div>
	      		))}

			</List>

        	</ExpansionPanelDetails>
		</ExpansionPanel>
		<ExpansionPanel expanded={expanded === 'panel2'} onChange={expansionChange('panel2')}>
      		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        	<Typography>Table Settings</Typography>
        	</ExpansionPanelSummary>

        	<ExpansionPanelDetails>
     			<Button variant="contained">Pay Now</Button>
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
		<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth={true}>
            <DialogTitle id="simple-dialog-title">Table {tableid.toString()}</DialogTitle>
        	<List>
        		<ListItem>
        			<TableDetails tableid={tableid}/>
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