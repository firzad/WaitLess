import React from 'react';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Restaurant from '@material-ui/icons/Restaurant';
import ListItem from '@material-ui/core/ListItem';
import MoreVert from '@material-ui/icons/MoreVert';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';


export default function AvailableTables(){
	

	/////////////////////////
	//const tables = backend.getActiveTables() //calls backend, gets active tables
	///////////////////

	const tables = ['6','9','10']

	const [free_tables, setFreeTables] = React.useState(tables);

	function updateFreeTables(){
		///CALL BACKEND
		///new_tables = backend.getfreetables()
		const free_tables = ['6','9','11']
		setFreeTables(free_tables)
	}

		
	function mapReactTableList(){

		return free_tables.map((table) =>(
			<ListItem key = {table}>
	          <ListItemAvatar>
	            <Avatar>
	              <Restaurant	 />
	            </Avatar>
	          </ListItemAvatar>
	          <ListItemText
	            primary={"Table " + table.toString()}
	          />
	          <ListItemSecondaryAction>
	            <IconButton edge="end" aria-label="More">
	              <MoreVert />
	            </IconButton>
	          </ListItemSecondaryAction>
	        </ListItem>
		))
	}

	const reactTableList = mapReactTableList()
	setInterval(updateFreeTables,5000);

	return(
		<React.Fragment>
			<List>
	        {
	        	reactTableList
	        }
	        </List>
	    </React.Fragment>
	)
}