import * as React from "react";
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Tab, Tabs, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { commonStyles } from "../../styles/generalStyles";
// import { userStyles } from "../../styles/userStyles";
import {Box, Grid, TextField, Button, Card, CardActions, CardContent} from "@material-ui/core";
import AddMenuItem from './AddMenuItem';
import { MenuJson, MenuResponse } from '../../interfaces/menu';
import { Category, CategoryResponse, CategoryPostResponse } from '../../interfaces/category';
import axios from '../../axios';
import { MenuItemDetails } from './MenuItemDetails';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="paper"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MenuSetting(){
    /*const styleClasses: any = userStyles();*/
    const classes: any = commonStyles();
    const [value, setValue] = React.useState(0);
    // Get these from backend
    const [categories, setCategories] = React.useState<Category | any>([]);
    const [menu ,setMenu] = React.useState<MenuJson | any>([]);
    const [newCategory, setCategory] = React.useState("newCategory");
    const [loading, setLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      if (menu.length === 0){
          axios.get(`Menu`).then(
              (res: MenuResponse) => {
                  const Menudata = res.data;
                  console.log(Menudata);
                  setMenu(Menudata);
                  setLoading(false);
              }
          )
      }
      if (categories.length === 0){
        axios.get(`Categories`).then(
          (res: CategoryResponse) => {
            const data = res.data;            
            setCategories(data);
            setLoading(false);
            // console.log(data)
          }
        )
      }
    }, []);
    
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNewCategoryChange = (event) =>{
    setCategory(event.target.value);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const addCategory = () => {
    const new_position = categories.length ? categories[categories.length-1].position_in_menu+2 : 2
    const newC = {
      category_name: newCategory,
      position_in_menu: new_position
    };
    axios.post(`Categories`, newC).then(
      (res:CategoryPostResponse)=>{
        setCategories((categories)=>[...categories, res.data]);
      });
  }

  const addMenu = (newMenu:MenuJson) => {
    setMenu((menu)=>[...menu, newMenu]);
    setOpen(false);
  }

    return(
            <main className={classes.content}>
              {loading?<div>LOADING</div>:
              <React.Fragment>
                <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="simple tabs example">
                          {categories.map((category, index)=>(
                            <Tab label={category.category_name} {...a11yProps(index)} key={index}/>
                          ))}
                          <Tab label="Add category" {...a11yProps(-1)} key={-1}/>
                </Tabs>
                {categories.map((cm,cat_in)=>(
                  <TabPanel value={value} index={cat_in} key={cat_in}>                  
                      {
                        menu.filter((item)=>item.category===cm.category_name).map((item,index)=>(
                          <Item item={item} key={item.menu_id}/>
                        ))
                      }
                      <ExpansionPanel>
                        {/* Add Menu Item */}
                        <Button onClick={()=>setOpen(true)} fullWidth>Add Menu Item</Button>
                      <AddMenuItem category_id={cm.category_id} addMenu={addMenu} open={open} handleClose={handleClose}/> 
                    {/* addMenu={addMenu}/> */}
                      </ExpansionPanel>                      
                  </TabPanel>
                ))}
                <TabPanel value={value} index={categories.length} >
                  <Card>
                    <CardContent>
                          <Grid container alignItems="center">
                            <TextField value={newCategory} label="Category Name" onChange={handleNewCategoryChange}/>
                          </Grid>
                     </CardContent>
                     <CardActions>
                          <Grid container alignItems="center">
                            <Button variant="contained" color="primary" onClick={addCategory}>Save</Button>
                          </Grid>
                     </CardActions>
                  </Card>
                </TabPanel>
              </React.Fragment>}
            </main>
    )
}



export function Item(props){
  const item = props.item
  return(
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="Item3">
        <Typography /*className={classes.heading}*/>{item.item_name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
          <MenuItemDetails item={item} isNew={false}/>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}
