import React from 'react';
import { commonStyles } from "../../styles/generalStyles";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Customer } from "./Customer";





export function CustomerEntry(){
	const classes: any = commonStyles();
	const [page, setPage] = React.useState(0)

	const pages = [
		{
			'component': <CustomerEntryPage handleEntryCustomer={handleEntryCustomer}/>
		},
		{
			'component': <Customer handleEntryCustomer={handleEntryCustomer}/>
		}
	]

	function handleEntryCustomer(){
		setPage(1)
	}

	/*function handleExitCustomer(){
		setPage(0)
	}*/
	

	function CustomerEntryPage(props){
		return(
			<Box className={classes.background}>
				<Box className={classes.rootCenter}>
					<Box className={classes.fillBar} alignItems="center" justifyContent="center" display="flex" m='auto'>
						<Typography variant='h4'> Waitless Restaurant </Typography>
					</Box>
					<Box className={classes.fillBarW} alignItems="center" justifyContent="center" display="flex" m='auto'>
						<Typography variant='h5'> Table 1 </Typography>
					</Box>
					<Box mt={2} mb={2}>
						<Button className={classes.entryButton} size='large' variant="contained" onClick={handleEntryCustomer}> Start Order </Button>
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