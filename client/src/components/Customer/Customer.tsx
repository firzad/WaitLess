import * as React from "react";
import clsx from 'clsx';
//import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { userStyles } from "src/styles/userStyles";
import { AppBar, Toolbar, IconButton, Button, Typography, Paper, Badge } from "@material-ui/core";
import { commonStyles } from "../../styles/generalStyles";
import { fade, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import axios from '../../axios';
import ModifyOrder from './ModifyOrder';
import Menu from './Menu'
import Bucket from './Bucket';
//import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//import BottomNavigation from '@material-ui/core/BottomNavigation';
//import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
//import RestoreIcon from '@material-ui/icons/Restore';
//import FavoriteIcon from '@material-ui/icons/Favorite';
//import LocationOnIcon from '@material-ui/icons/LocationOn';
import HelpIcon from '@material-ui/icons/Help';
// import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
//import Image from './brown.jpeg';
//import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

import io from "socket.io-client";
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { useEffect } from "react";

//import Image2 from './spices_bottom.jpg';
//import { url } from 'inspector';
//import { ImageBackground, StyleSheet, Text, View } from "react-native";
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
			main: '#3e2723',
			dark: '#ba000d',
			//contrastText: '#000',
		},
		contrastThreshold: 3,
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
			//overflow: 'hidden',
			backgroundColor: theme.palette.background.paper,
			//backgroundSize: 'auto'

		},
		typography: {
			fontFamily: [
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(','),
		},
		// container: {
		//   flex: 1,
		//   flexDirection: "column"
		// },
		// image: {
		//   flex: 1,
		//   resizeMode: "cover",
		//   justifyContent: "center"
		// },
		paper: {
			padding: theme.spacing(1),
			margin: 'auto',
			width: '100%',
			opacity: '0.5',
			//overflowY:'auto'
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
			height: '100%',
			overflowY: 'auto',
		},
		contentShift: {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginRight: drawerWidth,
		},
		bottomnavigation: {
			width: '100%',
			position: 'fixed',
			justify: 'space-between',
			bottom: 0,
			top: 'auto'

		},
		bottomAppBar: {
			bottom: 0,
			top: 'auto'
		},
		grow: {
			flexGrow: 1,
		},
		orange: {
			color: theme.palette.getContrastText(deepOrange[500]),
			backgroundColor: deepOrange[500],
		},
	}),
);
export function Customer(props) {
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

	function handleSearchChange(e) {
		setSearchValue(e.target.value)
	}
	const [searchValue, setSearchValue] = React.useState('')

	//const {handleExitCustomer} = props
	////SET sethandleEntryCustomer(0) once the session is done
	const { current_session, table_number, handleExitCustomer } = props
	const [assistance_click, setAssistanceClick] = React.useState(false)

	const styleClasses: any = userStyles();
	const classes1: any = commonStyles();
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [/*index, */setIndex] = React.useState(0);
	const [modifyvalue, setmodifyValue] = React.useState(null);
	const [orderValue, setOrderValue] = React.useState<any>([]);
	const [orderedValue, setOrderedValue] = React.useState<any>([]);
	//const [tableDetails, setTableDetails]= React.useState();
	//const [bottomValue, setbottonValue] = React.useState(0);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const setOrderedBucketValue = (order: any) => {
		setOrderedValue((orderValue) => [...orderValue, order]);
	}
	const handleDrawerClose = () => {
		setOpen(false);
	};
	const setBucketValue = (order: any) => {
		setOrderValue((orderValue) => [...orderValue, order]);
	}
	function JGFIXSETBUCKET(bucket_list) {
		//idk why the other functions were there. cant figure it out, wrote this
		setOrderValue(bucket_list)
	}

	function addAssistanceTable() {
		axios.patch('Tables/Assistance/' + table_number.toString(), { 'assistance': !assistance_click })
		setAssistanceClick(!assistance_click)

		//handleClose()
	}
	const bucketClear = () => {
		setOrderValue([])
	}

	const socket = io.connect('http://localhost:5000');
	useEffect(() => {
		addResponseMessage("Hi! I am Jenny, your waiting assistant for the day. How can I help you?\n1. Recommendations\n2. Oops! Did you make a mistake in the order. I can help you!\n3. Do you need staff assistance?\n4. Quit");
    }, []);

	const handleNewUserMessage = (message: string) => {
		socket.emit('chatRequest', message);
	}
	socket.on('chatResponse', (data) => {
        addResponseMessage(data.responseMessage);
	});

	return (
		<div>
			<MuiThemeProvider theme={newTheme}>
				{/* <ThemeProvider theme={theme}> */}
				<div className={styleClasses.root}>
					<AppBar position="static" className={clsx(classes1.appBar)} style={{ backgroundColor: 'STEELBLUE' }}>
						<Toolbar>
							<Typography style={{ maxWidth: '5.25vw' }} variant="body1" className={styleClasses.title}>
								Table {table_number}
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
									onChange={handleSearchChange}
								/>
							</div>
							{/* <Avatar className={classes.orange}>{table_number}</Avatar> */}
							<Typography variant="h6" className={styleClasses.title} align='right'>
								CART
                    </Typography>

							<IconButton edge="end" className={clsx(classes.menuButton, open && classes.hide)}
								color="secondary"
								aria-label="open drawer"
								onClick={handleDrawerOpen}>
								<Badge badgeContent={orderValue.length} color="error">
									<ShoppingBasketIcon style={{ color: "white" }} />
								</Badge>
								{/* <ShoppingBasketIcon style={{ color: "white" }} /> */}
								{/* <MenuIcon color="secondary" /> */}
							</IconButton>

							{/* <Button color="inherit">Login</Button> */}
						</Toolbar>
					</AppBar>

					<div className={clsx(classes.content)} style={{ height: '100%', opacity: '0.9', backgroundColor: 'ALICEBLUE' }}>
						<Grid container spacing={3} style={{ 'height': '100%', 'display': 'flex' }}>
							<Grid item md={9} >
								<Paper variant="elevation" elevation={5} style={{ 'height': '78vh', 'padding': '10px 5px 0px 5px', 'margin': 'auto', 'width': '100%' }} >

									<Menu setmodifyValue={setmodifyValue} open={open} searchValue={searchValue} />
								</Paper>
							</Grid>

							<Grid item md={3}>
								{modifyvalue ? <ModifyOrder setBucketValue={setBucketValue} setmodifyValue={setmodifyValue} modifyvalue={modifyvalue} /> : null}
							</Grid>
						</Grid>

						{/* <Bucket /> */}
						{/* </Container> */}
					</div>
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
					<div>
						<Widget
							handleNewUserMessage={handleNewUserMessage}
							// profileAvatar={logo}
							title="Waitless"
							subtitle="Chat Assistance"
							senderPlaceHolder="Type the message..."
						/>
					</div>
					<AppBar position="fixed" style={{ backgroundColor: 'STEELBLUE' }} className={classes.bottomAppBar}>
						<Toolbar variant="dense">
							<Button onClick={addAssistanceTable} variant='contained' aria-label="call help"
								style={{ backgroundColor: assistance_click ? 'INDIANRED' : 'POWDERBLUE' }}>
								CALL HELP
                  <HelpIcon />
							</Button>
							<div className={classes.grow} />
							{/* <IconButton edge="end" color="inherit">
								<ChatBubbleIcon />
							</IconButton> */}
						</Toolbar>
					</AppBar>
				</div>
				<Bucket setIndex={setIndex} handleDrawerClose={handleDrawerClose}
					setOrderValue={setOrderValue}
					bucketClear={bucketClear}
					orderedValue={orderedValue}
					setOrderedBucketValue={setOrderedBucketValue}
					JGFIXSETBUCKET={JGFIXSETBUCKET}
					current_session={current_session} table_number={table_number}
					handleExitCustomer={handleExitCustomer}
					open={open} orderValue={orderValue}
				/>
				{/* </ThemeProvider> */}
			</MuiThemeProvider>
		</div>
	);
}

