import React from 'react';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ListItem from '@material-ui/core/ListItem';
import Done from '@material-ui/icons/Done';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

function AssistanceDialogue(props) {
	const { onClose, open } = props;

	const handleClose = () => {
		onClose(false);
	};

	//CALL TO THE BACKEND HERE
	//const [assistanceList, setAssistanceList] = React.useState(backend.getTableAssistanceList());  	
	const [assistanceList, setAssistanceList] = React.useState(['4','5','7']);


	function removeAssistanceTable(table){
		/////////////
		//CALL TO BACKEND
		//backend.updateAssistance(table)
		//const new_tables = backend.getTableAssistance()
		//setAssistanceList(new_tables)
		///////////

		const tables = assistanceList.slice()
		const index = tables.indexOf(table);
		tables.splice(index,1)

		setAssistanceList(tables)
	}

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Requesting Assistance</DialogTitle>
            <List>
                {assistanceList.map(table => (
                    <ListItem key={table}>
                        <ListItemAvatar>
                            <Avatar>
                            <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={'Table ' + table.toString()} />
                        <ListItemSecondaryAction>
                        <IconButton edge="end"  onClick={() => removeAssistanceTable(table)} aria-label="More"  >
                            <Done />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>	
                ))}
            </List>
      </Dialog>
    );
}

export default function AssistanceDialogueIcon(){

 	const [open, setOpen] = React.useState(false);
 	function handleClickOpen(){
    	setOpen(true);
  	};

  	function handleClose(){
    	setOpen(false);
	}

	//num_assistance = backend.getNumAssistance()

	return (
		<div><IconButton color="inherit" onClick={handleClickOpen}>
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <AssistanceDialogue open={open} onClose={handleClose} />
        </div>
      )
}