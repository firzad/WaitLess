import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import Restaurant from '@material-ui/icons/Restaurant';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DoneIcon from '@material-ui/icons/Done';
import TableDialogue from './TableDialogue'
import axios from '../../axios';

//import interfaces
import {Tables, ServerResponse} from "../../interfaces/table"


export default function ActiveTables(){

	function createIcons(){
		const icons = active_tables.map((table) => {
				switch(table.table_status){
					case 'Seated':
						return <MenuBookIcon />
					case 'Preparing Order':
						return <Restaurant />
					case 'Ready to Deliver':
						return <LocalDiningIcon />
					case 'Delivered':
						return <DoneIcon />
					default:
						return <MenuBookIcon />
				}
		})
		return icons
	}


	const [active_tables, setActiveTables] = React.useState<Tables | any>([]);
	const [table_icons, setTableIcons] = React.useState([<MenuBookIcon />])

	useEffect(() => {
		axios.get(`Tables/active`).then(
            (res: ServerResponse) => {
                const data = res.data;
                setActiveTables(data);
                setTableIcons(createIcons())
            }
        )
	})
	

	function mapReactTableList(){
		return active_tables.map((table, index) =>(
			<ListItem key = {table.table_number}>
	          <ListItemAvatar>
	            <Avatar>
	            	{table_icons[index]}
	            </Avatar>
	          </ListItemAvatar>
	          <ListItemText
	            primary={"Table " + table.table_number.toString() + ": " + table.table_status}
	          />
	          <ListItemSecondaryAction>
	            
	          <TableDialogue table={table.table_number}/>
	          
	          </ListItemSecondaryAction>
	        </ListItem>
		))
	}

	const reactTableList = mapReactTableList()
	//setInterval(updateActiveTables,500000);
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