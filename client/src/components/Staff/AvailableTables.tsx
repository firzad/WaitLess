import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Restaurant from '@material-ui/icons/Restaurant';
import ListItem from '@material-ui/core/ListItem';
import MoreVert from '@material-ui/icons/MoreVert';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import axios from '../../axios';

//import interfaces
import {Tables, ServerResponse} from "../../interfaces/table"


export default function AvailableTables(){

	const [free_tables, setFreeTables] = React.useState<Tables | any>([]);

	useEffect(() => {
        axios.get(`Tables/free`).then(
            (res: ServerResponse) => {
                const data = res.data;
                setFreeTables(data);
            }
        )
    });

		
	function mapReactTableList(){

		return free_tables.map((table) =>(
			<ListItem key = {table.table_number}>
	          <ListItemAvatar>
	            <Avatar>
	              <Restaurant	 />
	            </Avatar>
	          </ListItemAvatar>
	          <ListItemText
	            primary={"Table " + table.table_number.toString() + ': ' + table.table_size.toString() + ' Seats'}
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