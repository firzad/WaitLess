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






export default function ActiveTables(){
	///new_tables = backend.getactivetables()
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
			},
			'icons':{}
	}

	function createIcons(tables){
		tables.icons = {}
		for (const table in tables.tableList){
			switch(tables.tableList[table]){
				case 'Ordering':
					tables.icons[table] = <MenuBookIcon />
					break
				case 'Preparing Order':
					tables.icons[table] = <Restaurant />
					break
				case 'Order Ready':
					tables.icons[table] = <LocalDiningIcon />
					break
				case 'Order Delivered':
					tables.icons[table] = <DoneIcon />
					break
			}
		}
	}

	createIcons(tables)

	const [active_tables, setActiveTables] = React.useState(tables);

	function updateActiveTables(){
		///CALL BACKEND
		///new_tables = backend.getactivetables()
		const new_tables = {
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
		createIcons(new_tables)
		console.log(new_tables)

		setActiveTables(new_tables)
	}
	

	function mapReactTableList(){
		/*const table_icons = {}
		for (const table in active_tables.tableList){
			if (active_tables[table] === 'Ordering'){
				table_icons[table] = <MenuBookIcon />
			}
			else if (active_tables[table] === 'Preparing order'){
				table_icons[table] = <Restaurant />
			}
			else if (active_tables[table] === 'Order Ready'){
				table_icons[table] = <LocalDiningIcon />
			}
			else if (active_tables[table] === 'Order Delivered'){
				table_icons[table] = <DoneIcon />
			}
		}
		*/
		return Object.keys(active_tables.tableList).map((tableid) =>(
			<ListItem key = {tableid}>
	          <ListItemAvatar>
	            <Avatar>
	            	{active_tables.icons[tableid]}
	            </Avatar>
	          </ListItemAvatar>
	          <ListItemText
	            primary={"Table " + tableid.toString() + ": " + active_tables.tableList[tableid]}
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
	setInterval(updateActiveTables,5000);
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