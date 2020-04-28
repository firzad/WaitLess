import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TableDialogue from './TableDialogue'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import axios from '../../axios';

export default function ActiveTables(props) {
	const active_tables = props.active_tables
	const table_icons = props.table_icons


	const handleDeliverFood = table_number => e => {
		axios.patch('Tables/Delivered/' + table_number.toString())
	}

	function mapReactTableList() {
		return active_tables.map((table, index) => (
			<ListItem key={table.table_number}>
				<ListItemAvatar>
					{table_icons[index]}
				</ListItemAvatar>
				<ListItemText
					primary={"Table " + table.table_number.toString() + ": " + table.table_status}
				/>
				<Button onClick={handleDeliverFood(table.table_number)} variant='contained' aria-label="Deliver Food"
					style={{
						backgroundColor: 'POWDERBLUE', marginRight: '10px', color: 'rgba(0, 0, 0, 0.6)',
						visibility: table.table_status === 'Ready To Deliver' ? 'visible' : 'hidden'
					}}>
					Delivered
              	<CheckCircleOutlineIcon style={{ fill: 'CADETBLUE', marginLeft: '5px' }} />
				</Button>

				<ListItemSecondaryAction>
					<TableDialogue table={table.table_number} />
				</ListItemSecondaryAction>
			</ListItem>
		))
	}

	const reactTableList = mapReactTableList()
	return (
		<React.Fragment>
			<List>
				{
					reactTableList
				}
			</List>
		</React.Fragment>
	)
}