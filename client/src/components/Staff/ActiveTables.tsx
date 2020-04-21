import React, {useEffect} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DoneIcon from '@material-ui/icons/Done';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TableDialogue from './TableDialogue'
import axios from '../../axios';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

//import interfaces
import {Tables, ServerResponse} from "../../interfaces/table"


export default function ActiveTables(props){
	const setAssistanceTables = props.setAssistanceTables

	function createIcons(data){
		const icons = data.map((table) => {
				if (table.assistance === true){
					return <Avatar style={{backgroundColor: "FIREBRICK"}}><AnnouncementIcon/></Avatar>
				}
				switch(table.table_status){
					case 'Seated':
						return <Avatar style={{backgroundColor: "Thistle"}}><MenuBookIcon/></Avatar>
					case 'Paying':
						return <Avatar style={{backgroundColor: "PALETURQUOISE"}}><AttachMoneyIcon/></Avatar>
					case 'Ready To Deliver':
						return <Avatar style={{backgroundColor: "FIREBRICK"}}><LocalDiningIcon/></Avatar>
					case 'Delivered':
						return <Avatar style={{backgroundColor: "DARKCYAN"}}><DoneIcon/></Avatar>
					case 'Ordered':
						return <Avatar style={{backgroundColor: "darkcyan"}}><MenuBookIcon /></Avatar>
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
	
	const handleDeliverFood = table_number => e =>{
		axios.patch('Tables/Delivered/' + table_number.toString())
	}

	function mapReactTableList(){
		return active_tables.map((table, index) =>(
			<ListItem key = {table.table_number}>
	          <ListItemAvatar>
	            	{table_icons[index]}
	          </ListItemAvatar>
	          <ListItemText
	            primary={"Table " + table.table_number.toString() + ": " + table.table_status}
	          />
	          <Button onClick={handleDeliverFood(table.table_number)} variant='contained'  aria-label="Deliver Food"
                      style={{backgroundColor:'POWDERBLUE', 
                      		  visibility:table.table_status === 'Ready To Deliver'?'visible':'hidden'}}>
                   Delivered 
              	<CheckCircleOutlineIcon/>
              </Button>

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