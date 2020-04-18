import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


import { commonStyles } from "../../styles/generalStyles"

import ActiveTables from './ActiveTables'
import AvailableTables from './AvailableTables'
import AssistanceDialogueIcon from './AssistanceDialogue'
import {Tables} from "../../interfaces/table"
import axios from '../../axios';


export function Staff() {
  const classes: any = commonStyles();

  const [assistance_tables, setAssistanceTables] = React.useState<Tables | any>([]);
  const [free_tables, setFreeTables] = React.useState<Tables | any>([]);

  function testItemPatch(){
    const order_item_ids = [2]
    axios.patch('TicketItem/Update', {'item_status':'Complete', 'order_item_ids': order_item_ids}).then()
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Waitless : Staff View
          </Typography>
          <Button onClick={testItemPatch}> x </Button>
          <AssistanceDialogueIcon assistance_tables={assistance_tables}/>

        </Toolbar>
      </AppBar>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
        
            <Grid item md={6}>
              <Paper className={classes.paper}>
    		  <Typography component="h2" variant="h6" color="primary" gutterBottom>Active Tables </Typography>

                <ActiveTables assistance_tables={assistance_tables} setAssistanceTables={setAssistanceTables}/>
              </Paper>
            </Grid>
            <Grid item md={6}>
              <Paper className={classes.paper}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>Available Tables </Typography>

                <AvailableTables free_tables={free_tables} setFreeTables={setFreeTables}/>
              </Paper>
            </Grid>

          </Grid>

        </Container>
      </main>
    </div>
  );
}
