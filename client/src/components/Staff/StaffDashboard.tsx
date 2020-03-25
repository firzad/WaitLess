import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { commonStyles } from "../../styles/generalStyles";

import ActiveTables from './ActiveTables'
import AvailableTables from './AvailableTables'
import AssistanceDialogueIcon from './AssistanceDialogue'


export default function StaffDashboard() {
  const classes: any = commonStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Waitless : Staff View
          </Typography>

          <AssistanceDialogueIcon />

        </Toolbar>
      </AppBar>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
        
            <Grid item md={6}>
              <Paper className={classes.paper}>
    		  <Typography component="h2" variant="h6" color="primary" gutterBottom>Active Tables </Typography>

                <ActiveTables />
              </Paper>
            </Grid>
            <Grid item md={6}>
              <Paper className={classes.paper}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>Available Tables </Typography>

                <AvailableTables />
              </Paper>
            </Grid>

          </Grid>

        </Container>
      </main>
    </div>
  );
}
