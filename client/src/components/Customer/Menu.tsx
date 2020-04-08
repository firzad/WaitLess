import * as React from "react";
//import clsx from 'clsx';
//import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
//import {useState, useEffect, Fragment} from "react"
//import Paper from '@material-ui/core/Paper';
//import PropTypes from 'prop-types';
//import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//import { Link } from "react-router-dom";
//import { userStyles } from "src/styles/userStyles";
import { Box/*, AppBar, Toolbar, IconButton*/, Typography } from "@material-ui/core";
import { commonStyles } from "../../styles/generalStyles";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
//import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
//import tileData from './tileData';
//import categoryList from './categoryList';
import axios from '../../axios';

//import interfaces
//import {Menu, MenuResponse} from "../../interfaces/menu"
import {Category, CategoryResponse} from "../../interfaces/category"
/*
  initialise your states:
  - categories
    . select 
  alternative:
  const [current_category, setCategory] = state
  const list_categories = []
  const menu_items = None
  axios.get(categories){
    setCategory(response[0])
    menu_items = [size(categories)]
    for each category{
      axios.get(categories/menu){
        menu_items.append([array of menu items])
      }
    }
  }
  */


  /*
  RENDER FUNCTION DECLARATIONS
  function renderMenuItems(curr_cat){
    <list>
      menu_items[current_category].map(item){
        <listitem> item.name </listitem>
      }
    </list
  }
  function renderCategories{ 
    <div>
    list_categories.map(){
      <header> category_name </header>
    }
    </div
  }
  //final return statement
  return(
  .....
  .....
    </renderCategories>
    <gridlist>
    </renderMenuItems>
    </gridlist>
  )
  */
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
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);
export default function Menu(props){
    const [current_category,setCategory] = React.useState<Category | any>([]);
    //const [menu, setMenu] = React.useState<Menu | any>([]);
    //const menuItem=[]
    //const imagePath = 'assets/Customer/'
    //const styleClasses: any = userStyles();
    const classes1: any = commonStyles();
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    axios.get('Categories').then(
        (res:CategoryResponse) =>{
            const categoryList=res.data
            setCategory(categoryList)
            /*axios.get('/Menu/Category/'+categoryList.category_id.toString()).then(
                (menuItem:MenuResponse)=>{
                    const menuData = menuItem.data
                    setMenu(menuData)
                }
            )*/
        }
    )

    /*function renderMenuItems(){
        return(tileData.map(tile => (
            <GridListTile key={tile.img} onClick={props.setModify}>
                console.log("---------")
                console.log(title.img)
                <Typography>{tile.img}</Typography>
                <img src={imagePath+tile.img} alt={tile.title} />
                <GridListTileBar
                title={tile.title}
                subtitle={<span>$ {tile.author}</span>}
                />
            </GridListTile>
            ))
        )
    }
    const menuItemList = renderMenuItems()*/

    function renderCategoryItems(){
        return(current_category.map((category,index) => (
            <TabPanel value={category.category_name} index={index}>
                <GridList cellHeight={180} cols={4} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
                    </GridListTile>
                    {
                        // menuItemList
                        console.log(category)
                    }
                </GridList>
            </TabPanel>
            ))

        )
    }
    const categoryList = renderCategoryItems()
    return(
        <Container maxWidth="lg" className={classes1.container}>
            <Grid container spacing={3}>
                <Tabs 
                value={value} 
                onChange={handleChange}
                aria-label="Categories tabs" 
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto">
                
                {current_category.map((category,index) => (
                <Tab label={category.category_name} {...a11yProps(index)}/>
                ))}
                </Tabs>
            </Grid>
            {
                categoryList
            }
        </Container>
    );
}