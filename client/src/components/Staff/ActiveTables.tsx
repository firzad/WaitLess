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
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DoneIcon from '@material-ui/icons/Done';




function mapReactTableList(tables){

	const tablelist = tables.tableList;

	const table_icons = {}
	for (const table in tablelist){
		if (tablelist[table] === 'Ordering'){
			table_icons[table] = <MenuBookIcon />
		}
		else if (tablelist[table] === 'Preparing order'){
			table_icons[table] = <Restaurant />
		}
		else if (tablelist[table] === 'Order Ready'){
			table_icons[table] = <LocalDiningIcon />
		}
		else if (tablelist[table] === 'Order Delivered'){
			table_icons[table] = <DoneIcon />
		}
	}

	console.log(tablelist)
	return Object.keys(tablelist).map((tableid) =>(
		<ListItem key = {tableid}>
          <ListItemAvatar>
            <Avatar>
            	{table_icons[tableid]}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={"Table " + tableid.toString() + ": " + tablelist[tableid]}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="More">
              <MoreVert />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
	))
}

export default function ActiveTables(){
	

	//CALL TO BACKEND
	//const tables = backend.getActiveTables() //calls backend, gets active tables
	
	///TEMPORARY TEMPLATE FOR TABLES RETREIVED FROM BACKEND
	const tables = {
		'freeTables' : 3,
		'activeTables' : 7,
		'tableList':{
			'4' : 'Ordering',
			'5' : 'Preparing Order',
			'7' : 'Order Ready',
			'2' : 'Order Ready',
			'3' : 'Preparing Order',
			'8' : 'Ordering',
			'1' : 'Order Delivered'
			}
	}

	const tableReact = mapReactTableList(tables)
	

	return(
		<React.Fragment>
			<List>
	        {
	        	tableReact
	        }
	        </List>
	    </React.Fragment>
	)
}