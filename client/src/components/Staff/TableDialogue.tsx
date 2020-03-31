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
import Button from '@material-ui/core/Button';
import { commonStyles } from "../../styles/generalStyles";


function TableDetails(props){
	const classes: any = commonStyles();

	const tableid = props.tableid
	const [expanded, setExpanded] = React.useState('');

	const expansionChange = (panel) => (event, isExpanded) => {
	    setExpanded(isExpanded ? panel : false);
	};

	const table_dat = {
			'freeTables' : 3,
			'activeTables' : 7,
			'tableList':{
				'4' : 'Ordering',
				'5' : 'Order Ready',
				'7' : 'Order Ready',
				'2' : 'Order Delivered',
				'3' : 'Order Ready',
				'8' : 'Ordering',
				'1' : 'Order Delivered'
				},
			'icons':{}
	}

	if (table_dat.tableList[tableid] === 'Order Ready' || table_dat.tableList[tableid] === 'Order Delivered'){
		const curr_order = [
			['Burger','$10'],
			['Salad','$7'],
			['Soup','$10'],
			['Coke','$3']
		] 
		return(
			<div className={classes.expBar}>
      		<ExpansionPanel expanded={expanded == 'panel1'} onChange={expansionChange('panel1')}>
	      		<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
	        	<Typography>Order History</Typography>
	        	</ExpansionPanelSummary>

	        	<ExpansionPanelDetails>
	      			<List>
	     			{curr_order.map((order_item) => (
						<ListItem>
							<ListItemText primary={order_item[0] + ": " + order_item[1]}/>
						</ListItem>
					))}
	        		</List>
	        	</ExpansionPanelDetails>
			</ExpansionPanel>
			<ExpansionPanel expanded={expanded == 'panel2'} onChange={expansionChange('panel2')}>
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
	else{
		return(
			<List>
				<ListItem>
					<ListItemText primary={'Currently Ordering'}/>
				</ListItem>
        	</List>
        )
	}
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