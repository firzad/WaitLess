import * as React from "react";
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { userStyles } from "../../styles/userStyles";
import { AppBar, Toolbar, IconButton, Typography, CssBaseline } from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
// import PersonIcon from '@material-ui/icons/Person';
import TableChartIcon from '@material-ui/icons/TableChart';
import BarChartIcon from '@material-ui/icons/BarChart';

import MenuSetting from './MenuSetting';
import TableSetting from './TableSetting';
// import StaffSetting from './StaffSetting';
import Analytics from './Analytics';



import SideBar from './sidebar';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
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
      marginRight: theme.spacing(2),
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
      marginLeft: 0,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
  }),
);

const settings = [
    {
        'title': 'Menu',
        'icon': <LocalDiningIcon/>,
        'component': <MenuSetting/>
    },
    {
        'title': 'Tables',
        'icon': <TableChartIcon/>,
        'component': <TableSetting/>
    },
    // {
    //     'title': 'Staff',
    //     'icon': <PersonIcon/>,
    //     'component': <StaffSetting/>
    // },
    {
        'title': 'Analytics',
        'icon': <BarChartIcon/>,
        'component': <Analytics/>
    }
]

export function Admin() {
    const styleClasses: any = userStyles();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [index, setIndex] = React.useState(0);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    return (
        <div className={styleClasses.root}>
            <CssBaseline />
            <AppBar style={{backgroundColor:'STEELBLUE'}} position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
                <Toolbar>
                        <IconButton color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}>
                            <MenuIcon />
                        </IconButton>
                    <Typography variant="h6" className={styleClasses.title}>
                        Admin
                    </Typography>
                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
            <SideBar settingsList={settings} setIndex={setIndex} handleDrawerClose={handleDrawerClose} open={open}/>
            <main className={clsx(classes.content, {
                [classes.contentShift]: open,
                })} >        
             <div className={classes.drawerHeader} />
                {settings[index].component}
            </main>
        </div>
    );
}
