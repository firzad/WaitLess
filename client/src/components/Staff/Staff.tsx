import React, {useEffect} from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DoneIcon from '@material-ui/icons/Done';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { commonStyles } from "../../styles/generalStyles"
import ActiveTables from './ActiveTables'
import AvailableTables from './AvailableTables'
import AssistanceDialogueIcon from './AssistanceDialogue'
import {Tables, ServerResponse} from "../../interfaces/table"
import axios from '../../axios';

export function Staff() {
  const classes: any = commonStyles();

  const [assistance_tables, setAssistanceTables] = React.useState<Tables | any>([]);
  const [free_tables, setFreeTables] = React.useState<Tables | any>([]);
  const [active_tables, setActiveTables] = React.useState<Tables | any>([]);
  const [table_icons, setTableIcons] = React.useState([<MenuBookIcon />])

  useEffect(() => {
    const interval = setInterval(()=>{
      axios.get(`Tables`).then(
              (res: ServerResponse) => {
                  const data = res.data;
                  let new_active : Tables[] = []
                  let new_available : Tables[] = []
                  let new_assistance : Tables[] = []
                  for (let i = 0; i < data.length; i++){
                    if (data[i].assistance === true){
                      new_assistance.push(data[i])
                    }
                    if (data[i].table_status === 'Empty'){
                      new_available.push(data[i])
                    }
                    else{
                      new_active.push(data[i])
                    }
                  }
                  setTableIcons(createIcons(new_active))
                  setAssistanceTables(new_assistance)
                  setActiveTables(new_active)
                  setFreeTables(new_available)
              }
          )
    }, 1000)
    return () => clearInterval(interval)
  })
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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Waitless : Staff View
          </Typography>
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

                <ActiveTables table_icons={table_icons} active_tables={active_tables} assistance_tables={assistance_tables}/>
              </Paper>
            </Grid>
            <Grid item md={6}>
              <Paper className={classes.paper}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>Available Tables </Typography>

                <AvailableTables free_tables={free_tables}/>
              </Paper>
            </Grid>

          </Grid>

        </Container>
      </main>
    </div>
  );
}
