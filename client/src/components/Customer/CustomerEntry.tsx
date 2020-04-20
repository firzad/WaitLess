import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";
import { commonStyles } from "../../styles/generalStyles";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Customer } from "./Customer";
import axios from '../../axios';
import {Summary} from '../../interfaces/summary'


export function CustomerEntry(){
	let { table_number } = useParams();
	const [current_session, updateCurrentSession] = React.useState<number | any>(0)
	const [paying, updateCurrentlyPaying] = React.useState(false)

	const classes: any = commonStyles();
	const [page, setPage] = React.useState(0)

	const pages = [
		{
			'component': <CustomerEntryPage handleEntryCustomer={handleEntryCustomer}/>
		},
		{
			'component': <Customer current_session={current_session} table_number={table_number} handleExitCustomer={handleExitCustomer}/>
		}
	]

	function handleEntryCustomer(){
		axios.post<Summary>('Summary',{'table_number':table_number,
										'date_order':new Date().toJSON().slice(0,19).replace('T',' ')})
		.then(
			(res)=>{
				const session = res.data
				updateCurrentSession(session.session_id)
				if (table_number != null){
					axios.patch('Tables/status/'+table_number.toString(),{'table_status':'Seated', 'current_session':session.session_id}).then((res)=>{ //remove the current session from the table
					setPage(1)
				})	
				}
			}
		)	
	}

	function handleExitCustomer(){
		if (table_number != null){
			axios.patch('Tables/status/'+table_number.toString(),{'table_status':'Paying', 'current_session':current_session})
			.then((res) => {
				updateCurrentSession(0)
			})	
		}
		updateCurrentlyPaying(true)
		setPage(0)
	}
	

	function CustomerEntryPage(props){
		useEffect(() => {
			const interval = setInterval(()=>{
			if (table_number != null){
				axios.get(`Tables/`+table_number.toString()).then(
	            (res) => {
	                const data = res.data;
	                if (data.table_status !== 'Paying'){updateCurrentlyPaying(false)}
	                if (data.current_session !== 0 || current_session == null){
	                	if (data.table_status !== 'Paying'){//customer is already in session and page was refreshed. go back into session
		                	updateCurrentSession(data.current_session)
	                		setPage(1)
	                	}
	                }
	        	})
			}
			},1000)
		return () => clearInterval(interval)
		})

		function EnterBox(){
			if (current_session == null){
				return(
					<Button disabled={true} className={classes.entryButton} size='large' variant="contained" onClick={handleEntryCustomer}> Loading </Button>
				)
			}
			else if (paying == true){
				return(
					<Button disabled={true} className={classes.entryButton} size='large' variant="contained" onClick={handleEntryCustomer}> Paying... </Button>
				)
			}
			else{
				return(
					<Button className={classes.entryButton} size='large' variant="contained" onClick={handleEntryCustomer}> Start Order </Button>
				)
			}
		}

		return(
			<Box className={classes.background}>
				<Box className={classes.rootCenter}>
					<Box className={classes.fillBar} alignItems="center" justifyContent="center" display="flex" m='auto'>
						<Typography variant='h4'> Waitless Restaurant </Typography>
					</Box>
					<Box className={classes.fillBarW} alignItems="center" justifyContent="center" display="flex" m='auto'>
						<Typography variant='h5'> Table {table_number} </Typography>
					</Box>
					<Box mt={2} mb={2}>
						<EnterBox/>
					</Box>
					<Box className={classes.fillBarB}></Box>
				</Box>
			</Box>
		)
	}
	

	return(
	pages[page].component
	)
}