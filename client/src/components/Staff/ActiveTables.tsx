import React, {useEffect} from 'react';
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
import AnnouncementIcon from '@material-ui/icons/Announcement';
import TableDialogue from './TableDialogue'
import axios from '../../axios';

//import interfaces
import {Tables, ServerResponse} from "../../interfaces/table"


export default function ActiveTables(props){
	const setAssistanceTables = props.setAssistanceTables

	function createIcons(data){
		const icons = data.map((table) => {
				if (table.assistance === true){
					return <Avatar style={{backgroundColor: "indianred"}}><AnnouncementIcon/></Avatar>

				}
				switch(table.table_status){
					case 'Seated':
						return <Avatar style={{backgroundColor: "darkcyan"}}><MenuBookIcon/></Avatar>
					case 'Preparing Order':
						return <Avatar style={{backgroundColor: "moccasin"}}><Restaurant/></Avatar>
					case 'Ready to Deliver':
						return <Avatar style={{backgroundColor: "tomato"}}><LocalDiningIcon/></Avatar>
					case 'Delivered':
						return <Avatar style={{backgroundColor: "DARKCYAN"}}><DoneIcon/></Avatar>
					case 'Ordered':
						return <Avatar style={{backgroundColor: "Thistle"}}><MenuBookIcon /></Avatar>
					default:
						return <Avatar style={{backgroundColor: "Thistle"}}><MenuBookIcon /></Avatar>
				}
		})
		return icons
	}


	const [active_tables, setActiveTables] = React.useState<Tables | any>([]);
	const [table_icons, setTableIcons] = React.useState([<MenuBookIcon />])

	useEffect(() => {
		const interval = setInterval(()=>{
			axios.get(`Tables/active`).then(
	            (res: ServerResponse) => {
	                const data = res.data;
	                setTableIcons(createIcons(data))

	                setActiveTables(data);

	                let new_assistance : Tables[] = []
	                for (let i = 0; i < active_tables.length; i++){
	                	if (active_tables[i].assistance === true){
	                		new_assistance.push(active_tables[i])
	                	}
	                }
	                setAssistanceTables(new_assistance)
	            }
	        )
		}, 1000)
		return () => clearInterval(interval)
	})
	

	function mapReactTableList(){
		return active_tables.map((table, index) =>(
			<ListItem key = {table.table_number}>
	          <ListItemAvatar>
	            	{table_icons[index]}
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