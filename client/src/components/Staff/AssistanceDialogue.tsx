import React from 'react';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ListItem from '@material-ui/core/ListItem';
import Done from '@material-ui/icons/Done';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import NotificationsIcon from '@material-ui/icons/Announcement';
import PersonIcon from '@material-ui/icons/Person';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import axios from '../../axios';


function AssistanceDialogue(props) {
	const { onClose, open, assistance_tables } = props;

	function handleClose(){
		onClose(false);
	};


	function removeAssistanceTable(table_number){
		axios.patch('Tables/Assistance/' + table_number.toString(), {'assistance':false})
        handleClose()
	}

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Requesting Assistance</DialogTitle>
            <List>
                {assistance_tables.map(table => (
                    <ListItem key={table.table_number}>
                        <ListItemAvatar>
                            <Avatar>
                            <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={'Table ' + table.table_number.toString()} />
                        <ListItemSecondaryAction>
                        <IconButton edge="end"  onClick={() => removeAssistanceTable(table.table_number)} aria-label="More"  >
                            <Done />
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>	
                ))}
            </List>
      </Dialog>
    );
}

export default function AssistanceDialogueIcon(props){
	const {assistance_tables} = props
 	const [open, setOpen] = React.useState(false);


 	function handleClickOpen(){
    	setOpen(true);
  	};

  	function handleClose(){
    	setOpen(false);
	}

	//num_assistance = backend.getNumAssistance()

    //const [num_assistance, setNumAssistance] = React.useState(3)

	return (
		<div>
        <IconButton color="inherit" onClick={handleClickOpen}>
            <Badge badgeContent={assistance_tables.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <AssistanceDialogue open={open} onClose={handleClose} assistance_tables={assistance_tables} />
        </div>
    )
}