import * as React from "react";
import {useEffect} from "react";
//import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
//import clsx from 'clsx';
import {/*useState, useEffect, */Fragment} from "react"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box/*, AppBar, Toolbar, IconButton*/, Typography } from "@material-ui/core";
//import { commonStyles } from "../../styles/generalStyles";
//import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import axios from '../../axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Burrito from './burrito.jpg';
//import Burrito from './burrito.jpeg';
//import interfaces
import {MenuJson, MenuResponse} from "../../interfaces/menu"
import {Category, CategoryResponse} from "../../interfaces/category"
//import { spacing } from '@material-ui/system';


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  
  function a11yProps(index: any) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }  

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
    cardRoot: {
        //padding: theme.spacing(1),
        //maxWidth: 190,
        width: '10vw',
        height: '100%',
        paddingTop: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginRight:theme.spacing(2),
        //opacity: '0.9'
    },
    media: {
    height: 91,
      },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    cardShift: {
        width: '10vw',
        height: '35vh',
    },
    container: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
      paddingTop: theme.spacing(1),
      paddingBottom: '-10px',
    },
    cardContent:{
      padding:theme.spacing(1)
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
  }),
);
export function RenderMenuItems(props){
    const tileData=props.tileData
    //const imagePath = 'assets/Customer/'
    return(<Fragment>
        {
            tileData.map((tile,index) => {
                return(
                
            <GridListTile key={tile.menu_id} onClick={props.setModify}>
                {/* <Typography>{tile.img}</Typography> */}
                {/* <img src={imagePath+tile.img} alt={tile.title} /> */}
                <GridListTileBar
                title={tile.item_name}
                subtitle={<span>$ {tile.price}</span>}
                />
            </GridListTile>
        )})
    }
    </Fragment>)
}
export default function Menu(props){
	const searchValue = props.searchValue
	const [filtered_menu, setFilteredMenu] = React.useState<MenuJson | any>([])
    const [menu, setMenu] = React.useState<MenuJson | any>([]);


	useEffect(() => {
		//hook called when the search bar is changed
		if (!/\S/.test(searchValue) || searchValue.length === 0){
			//empty search string or whitespaces, default to full menu
			setFilteredMenu(menu)	
		}
		else{
			const tmp_filter: string[] = [] 
			const split_search = searchValue.split(' ') 
			//filter the words in the search
			const key_words: string[] = []
			for (let i = 0; i < split_search.length; i++){
				if (split_search[i] !== '' ){
					key_words.push(split_search[i])
				}
			}

			for (let menu_idx = 0; menu_idx < menu.length; menu_idx++){
				let match_flag = true
				//menu item contains every key word in search bar
				for (let word_idx = 0; word_idx < key_words.length; word_idx++){
					if (!menu[menu_idx].item_name.toLowerCase().includes(key_words[word_idx])){ //check if menu item name contains word
						//menu item does not contain that key word
						match_flag = false
						break
					}
				}
				if (match_flag === true){
					tmp_filter.push(menu[menu_idx]) //menu item contained all keyword

				}
			}
			setFilteredMenu(tmp_filter)
		}
	}, [searchValue, menu])


    const [current_category,setCategory] = React.useState<Category | any>([]);
    //const classes1: any = commonStyles();
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    
    
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    const onModifyMenu = (tile)=>{
        props.setmodifyValue(null);
        props.setmodifyValue(tile);
    }
    React.useEffect(() => {
        if (current_category.length === 0){
        axios.get('Categories').then(
            (res:CategoryResponse) =>{
                const categoryList=res.data
                setCategory(categoryList)
            }
        )
        }
        if (menu.length === 0){
        axios.get('Menu').then(
            (menuItem:MenuResponse)=>{
                const menuData = menuItem.data
                setMenu(menuData)

                //set the search filtered menu data
                setFilteredMenu(menuData)
            }
        )
        }
    })

    function renderCategoryItems(){
        return(current_category.map((category,index) => (
            <TabPanel value={value} key={index} index={index}>
                {/* <GridList cellHeight={250} cols={4} spacing={10} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
                    </GridListTile> */}
                    <Grid container direction="row" style={{padding: '0 0 10px 10px',marginLeft:'10px',marginTop:'-10px',height:'68vh',overflowY:'auto'}}>
                    {
                            filtered_menu.filter((item)=>item.category===category.category_name).map((tile,index) => {
                                return(
                                    <Grid style={{maxHeight:'180px', marginBottom:'10px'}} key={index} item /*xs={props.open?4:3}*/ >
                                      <Card raised={true} 
                                      // className={clsx(classes.cardRoot,{[classes.cardShift]: props.open,})}
                                      className={classes.cardRoot} key={tile.menu_id} onClick={()=>onModifyMenu(tile)}>
                                      <CardActionArea>
                                        <CardMedia
                                          className={classes.media}
                                          image={tile.img_url}
                                          title={tile.item_name}
                                        />
                                        <CardContent className={classes.cardContent}>
                                          <Typography gutterBottom variant="button" component="p" style={{fontSize:'.75vw',marginBottom:'0 !important'}}>
                                            {tile.item_name}
                                          </Typography>
                                          <Typography variant="subtitle1" color="textSecondary" component="p" style={{fontSize:'.85vw',marginBottom:'0 !important'}}>
                                            {<span>${tile.price}</span>}
                                          </Typography>
                                        </CardContent>
                                      </CardActionArea>
                                    </Card>
                                  </Grid>
                                  
                            // <GridListTile key={tile.menu_id} onClick={()=>props.setmodifyValue(tile)}>
                            //     {/* <Typography>{tile.img}</Typography> */}
                            //     {/* <img src={imagePath+tile.img} alt={tile.title} /> */}
                            //     <GridListTileBar
                            //     title={tile.item_name}
                            //     subtitle={<span>$ {tile.price}</span>}
                            //     />
                            // </GridListTile>
                            
                        );
                        })
                    }
                {/* </GridList> */}
                
                </Grid>
            </TabPanel>
            ))

        )
    }
    const categoryList = renderCategoryItems()
    return(
        <Box maxWidth="lg" className={classes.container} style={{'color':'red'}}>
            <Grid container spacing={3}>
                <Tabs 
                value={value} 
                onChange={handleChange}
                aria-label="Categories tabs" 
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                style={{'paddingLeft': '10px'}}>
                
                {current_category.map((category,index) => (
                <Tab style={{'paddingLeft': '10px'}} key={index} label={category.category_name} {...a11yProps(index)}/>
                ))}
                </Tabs>
            {
                categoryList
            }
           </Grid>

        </Box>
    );
}