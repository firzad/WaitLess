import * as React from "react";
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import { userStyles } from "src/styles/userStyles";
import { AppBar, Toolbar, IconButton, Typography} from "@material-ui/core";
import { commonStyles } from "../../styles/generalStyles";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ModifyOrder from './ModifyOrder';
import Menu from './Menu'
import Bucket from './Bucket';

const drawerWidth = 240;
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
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
  }),
);
export function Customer(props) {
    //const {handleEntryCustomer} = props
    ////SET handleEntryCustomer(0) once the session is done

     
    const styleClasses: any = userStyles();
    const classes1: any = commonStyles();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [/*index, */setIndex] = React.useState(0);
    const [modifyvalue, setmodifyValue] = React.useState(null);
    const [orderValue, setOrderValue] = React.useState([{a:'b'}]);
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
        <div className={styleClasses.root}>
            <AppBar position="static" className={clsx(classes1.appBar)}>
                <Toolbar>
                    <Typography variant="h6" className={styleClasses.title}>
                        Customer
                    </Typography>
                      <IconButton edge="end" className={clsx(classes.menuButton, open && classes.hide)} 
                        color="inherit" 
                        aria-label="open drawer" 
                        onClick={handleDrawerOpen}>
                            <MenuIcon />
                      </IconButton>

                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
            <Bucket setIndex={setIndex} handleDrawerClose={handleDrawerClose} open={open}/>
            <main className={clsx(classes.content, {[classes.contentShift]: open,})} >
              <Container className={classes1.container}>
                  <Grid container spacing={3}>
                    <Grid item md={9}>
                      <Menu setmodifyValue={setmodifyValue}/>
                    </Grid>
                    <Grid item md={3}>
                        {modifyvalue?<ModifyOrder setBucketValue={setBucketValue} modifyvalue={modifyvalue}/>:null}
                    </Grid>
                  </Grid>
                  <Bucket orderValue={orderValue}/>
              </Container>
            </main>
        </div>
    );
}

