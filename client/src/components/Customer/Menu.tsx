import * as React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {/*useState, useEffect, */Fragment} from "react"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box/*, AppBar, Toolbar, IconButton*/, Typography } from "@material-ui/core";
import { commonStyles } from "../../styles/generalStyles";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import axios from '../../axios';

//import interfaces
import {MenuJson, MenuResponse} from "../../interfaces/menu"
import {Category, CategoryResponse} from "../../interfaces/category"


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
export function RenderMenuItems(props){
    const tileData=props.tileData
    //const imagePath = 'assets/Customer/'
    return(<Fragment>
        {
            tileData.map((tile,index) => {
                console.log(tile)
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
    const [current_category,setCategory] = React.useState<Category | any>([]);
    const [menu, setMenu] = React.useState<MenuJson | any>([]);
    const classes1: any = commonStyles();
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    
    
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
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
                console.log(menuData)
                setMenu(menuData)
            }
        )
        }
    })

    function renderCategoryItems(){
        return(current_category.map((category,index) => (
            <TabPanel value={value} index={index}>
                <GridList cellHeight={180} cols={4} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
                    </GridListTile>
                    
                    {
                            menu.filter((item)=>item.category===category.category_name).map((tile,index) => {
                                return(
                                
                            <GridListTile key={tile.menu_id} onClick={()=>props.setmodifyValue(tile)}>
                                {/* <Typography>{tile.img}</Typography> */}
                                {/* <img src={imagePath+tile.img} alt={tile.title} /> */}
                                <GridListTileBar
                                title={tile.item_name}
                                subtitle={<span>$ {tile.price}</span>}
                                />
                            </GridListTile>
                            
                        )})
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