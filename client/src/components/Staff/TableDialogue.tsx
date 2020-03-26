import React from 'react';
import MoreVert from '@material-ui/icons/MoreVert';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

function TableDetails(props){
	const { onClose, open, table} = props;
	const tableid = table.table

	function handleClose(){
		onClose(false)
	}

	return(
		<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Table {tableid.toString()}</DialogTitle>
        	<List>
        		<ListItem>
        			x
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
		<TableDetails onClose={handleClose} open={open} table={tableid}/>
		</div>
	)
}