import * as React from "react";
import clsx from 'clsx';
//import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import { userStyles } from "src/styles/userStyles";
import { AppBar, Toolbar, IconButton, Typography, Paper} from "@material-ui/core";
import { commonStyles } from "../../styles/generalStyles";
import { fade, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import ModifyOrder from './ModifyOrder';
import Menu from './Menu'
import Bucket from './Bucket';
//import useMediaQuery from '@material-ui/core/useMediaQuery';
import {MuiThemeProvider,  createMuiTheme } from '@material-ui/core/styles';
//import BottomNavigation from '@material-ui/core/BottomNavigation';
//import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
//import RestoreIcon from '@material-ui/icons/Restore';
//import FavoriteIcon from '@material-ui/icons/Favorite';
//import LocationOnIcon from '@material-ui/icons/LocationOn';
import AssistantIcon from '@material-ui/icons/Assistant';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Image from './kitchen.jpeg';
//import Image2 from './spices_bottom.jpg';
//import { url } from 'inspector';

const drawerWidth = 240;
const newTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#8d6e63',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
      //width: '100%',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      
    },
    paper: {
      padding: theme.spacing(1),
      margin: 'auto',
      width: '100%',
      
      //maxWidth: 250,
    },
    inputRoot: {
      color: 'inherit',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    gridList: {
      //width: ,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: 0,
      height:'100%'
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    bottomnavigation:{
      width: '100%',
      position: 'fixed',
      justify: 'space-between',
      bottom:0,
      top:'auto'

    },
    bottomAppBar:{
      bottom:0,
      top:'auto'
    },
    grow:{
      flexGrow: 1, 
    }
  }),
);
export function Customer() { 
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // const theme = React.useMemo(
  //   () =>
  //     createMuiTheme({
  //       palette: {
  //         type: prefersDarkMode ? 'dark' : 'light',
  //       },
  //     }),
  //   [prefersDarkMode],
  // );

////////////////////////////////////
    //const themeValue: any = newTheme();
//export function Customer(props) {
    //const {handleEntryCustomer} = props
    ////SET handleEntryCustomer(0) once the session is done

     
    const styleClasses: any = userStyles();
    const classes1: any = commonStyles();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [/*index, */setIndex] = React.useState(0);
    const [modifyvalue, setmodifyValue] = React.useState(null);
    const [orderValue, setOrderValue] = React.useState([{a:'b'}]);
    //const [bottomValue, setbottonValue] = React.useState(0);
    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const setBucketValue =(order:any) => {
      setOrderValue((orderValue) => [...orderValue, order]);
    }
    console.log(orderValue)
    return (
      <MuiThemeProvider theme={newTheme}>
       {/* <ThemeProvider theme={theme}> */}
        <div className={styleClasses.root} style={{height:'100vh',opacity:'0.9', backgroundImage: `url(${Image})`}}>
            <AppBar position="static" className={clsx(classes1.appBar)} color='transparent'
            >
                <Toolbar>
                    <Typography variant="h6" className={styleClasses.title}>
                        Customer
                    </Typography>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </div>
                      <IconButton edge="end" className={clsx(classes.menuButton, open && classes.hide)} 
                        color="inherit" 
                        aria-label="open drawer" 
                        onClick={handleDrawerOpen}>
                            <MenuIcon />
                      </IconButton>

                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
            <Bucket setIndex={setIndex} handleDrawerClose={handleDrawerClose} open={open} orderValue={orderValue}/>
            <main className={clsx(classes.content, {[classes.contentShift]: open,})} >
              {/* <Container className={classes1.container}> */}
                  <Grid container spacing={3}>
                    
                    <Grid item md={9}>
                    <Paper variant="elevation" elevation={12} className={classes.paper}>
                      <Menu setmodifyValue={setmodifyValue} open={open}/>
                    </Paper>
                    </Grid>
                    
                    <Grid item md={3}>
                        {modifyvalue?<ModifyOrder setBucketValue={setBucketValue} modifyvalue={modifyvalue}/>:null}
                    </Grid>
                  </Grid>
                  {/* <Bucket /> */}
              {/* </Container> */}
            </main>
            {/* <BottomNavigation
              value={bottomValue}
              onChange={(event, newValue) => {
                setbottonValue(newValue);
              }}
              showLabels
              style={{position: 'fixed'}}
              className={classes.bottomnavigation}
            >
              <BottomNavigationAction label="Assistance" icon={<AssistantIcon />} />
              <BottomNavigationAction label="Chatbot" icon={<ChatBubbleIcon />} />
            </BottomNavigation> */}
            <AppBar position="fixed" color="transparent" className={classes.bottomAppBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="open drawer">
                  <AssistantIcon />
                </IconButton>
                <div className={classes.grow} />
                <IconButton edge="end" color="inherit">
                  <ChatBubbleIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
        </div>
       {/* </ThemeProvider> */}
       </MuiThemeProvider>
    );
}

