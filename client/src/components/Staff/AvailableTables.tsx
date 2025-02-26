import React, {useEffect} from 'react';
import List from '@material-ui/core/List';
import Restaurant from '@material-ui/icons/Restaurant';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import axios from '../../axios';

//import interfaces
import {ServerResponse} from "../../interfaces/table"

export default function AvailableTables(props){
	const {free_tables, setFreeTables} = props

	useEffect(() => {
		const interval = setInterval(() => {
			axios.get(`Tables/free`).then(
	        (res: ServerResponse) => {
	            const data = res.data;
	            setFreeTables(data);
	        })
	    },1000)
	    return() => clearInterval(interval)
	})
	
	function mapReactTableList(){
		return free_tables.map((table) =>(
			<ListItem key = {table.table_number}>
	          <ListItemAvatar>
	            <Avatar>
	              <Restaurant	 />
	            </Avatar>
	          </ListItemAvatar>
	          <ListItemText
	            primary={"Table " + table.table_number.toString()}
	          />
	          <ListItemSecondaryAction>
	            <ListItemText
	            primary={table.table_size.toString() + ' Seats'}
	          />
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
	
