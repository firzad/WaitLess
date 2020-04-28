import { makeStyles, createStyles } from "@material-ui/core/styles";
import customerEntryImage from "./waitless_background.jpg";


const drawerWidth = 240;

export const commonStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    background: {
      backgroundImage: 'url(' + customerEntryImage + ')',
      backgroundSize: 'cover',
      width: '100%',
      height: '100%',
      position: 'fixed',
    },
    fillBar: {
      minHeight: '120px',
      backgroundColor: 'CORNFLOWERBLUE',
      opacity: '0.5',
      flexGrow: 1,
      verticalAlign: 'middle',
      alignItems: 'center',
      color: 'white'
    },
    fillBarB: {
      minHeight: '60px',
      backgroundColor: 'CORNFLOWERBLUE',
      marginTop: '85px',
      opacity: '0.5',
    },
    fillBarW: {
      paddingTop: '20px',
      minHeight: '120px',
      flexGrow: 1,
      verticalAlign: 'middle',
      alignItems: 'center',
    },
    entryButton: {
      backgroundColor: 'SKYBLUE',
      minWidth: '200px',
      minHeight: '100px',
      '&:hover': {
        backgroundColor: 'CORNFLOWERBLUE',
      },
    },
    rootCenter: {
      width: '420px',
      minHeight: '500px',
      margin: '0 auto',
      zIndex: 99,
      display: 'block',
      marginTop: '5%',
      background: 'white',
      textAlign: 'center',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
      borderRadius: '.25em .25em .4em .4em',
      overflow: 'hidden',
      opacity: '0.9',
    },
    tableHead: {
      backgroundColor: 'azure',
      color: theme.palette.common.white,
    },
    tableHeadCell: {
      fontWeight: 'bold',
      fontSize: '16px',
    },
    'tableBody0': {
      backgroundColor: 'whitesmoke',
    },
    'tableBody1': {
      backgroundColor: 'white',
    },
    table: {
      width: '100%',
      minWidth: 700,
      alignItems: 'center',
    },
    divFinish: {
      paddingTop: '20px',
    },
    toolTitle: {
      minWidth: 120,
    },
    tableContainer: {
      alignItems: 'center',
    },
    expBar: {
      width: '100%',
    },
    expansionList: {
      maxHeight: 400,
      overflow: 'auto',
      border: '1px solid rgba(0, 0, 0, .125)',
    },
    toolbar: {
      paddingRight: 24,
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  })
);