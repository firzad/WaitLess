import * as React from "react";
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Tab, Tabs, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {Box, Grid, TextField, Button, Card, CardActions, CardContent} from "@material-ui/core";
import AddMenuItem from './AddMenuItem';
import { MenuJson, MenuResponse } from '../../interfaces/menu';
import { Category, CategoryResponse, CategoryPostResponse } from '../../interfaces/category';
import axios from '../../axios';
import { MenuItemDetails } from './MenuItemDetails';
import DeleteConfirmDialog from './DeleteConfirmDialog';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
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
    const [value, setValue] = React.useState(0);
    const [categories, setCategories] = React.useState<Category | any>([]);
    const [menu ,setMenu] = React.useState<MenuJson | any>([]);
    const [newCategory, setCategory] = React.useState("newCategory");
    const [loading, setLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [del_cat, setdelcat] = React.useState(0);

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
    }, [menu, categories]);
    
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
    const new_position = Math.round(Math.random()*100)
    const newC = {
      category_name: newCategory,
      position_in_menu: new_position
    };
    axios.post(`Categories`, newC).then(
      (res:CategoryPostResponse)=>{
        setCategories((categories)=>[...categories, res.data]);
        setCategory("newCategory");
      });
  }

  const deleteCategory = () => {
    axios.patch(`Categories/`+String(del_cat), {"visibility":false}).then(res=>
      axios.get(`Categories`).then((res:CategoryResponse)=>setCategories(res.data)))
  }

  const onDeleteIconClick = (category_id) => {
    setdelcat(category_id);
    setOpenDelete(true);    
  }

  const addMenu = (newMenu:MenuJson) => {
    setMenu((menu)=>[...menu, newMenu]);
    setOpen(false);
  }

  const updateMenu = () => {
    axios.get(`Menu`).then(
      (res: MenuResponse) => {
          const Menudata = res.data;
          setMenu(Menudata);
      }
    )
  }

    return(
            <main style={{flexGrow:1}}>
              {loading?<div>LOADING</div>:
              <React.Fragment>
                <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="simple tabs example">
                          {categories.map((category, index)=>(
                            <Tab label={<Typography>{category.category_name} <IconButton disabled={value !== index}><DeleteIcon fontSize="small" onClick={()=>onDeleteIconClick(category.category_id)}/></IconButton></Typography>} {...a11yProps(index)} key={index} />//icon={<ExpandMoreIcon onClick={()=>deleteCategory(category.category_id)}/>}/>
                          ))}
                          <Tab label="Add category" {...a11yProps(-1)} key={-1}/>
                </Tabs>
                {categories.map((cm,cat_in)=>(
                  <TabPanel value={value} index={cat_in} key={cat_in}>                  
                      {
                        menu.filter((item)=>item.category===cm.category_name).map((item,index)=>(
                          <Item item={item} key={item.menu_id} updateMenu={updateMenu}/>
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
                <DeleteConfirmDialog open={openDelete} handleClose={()=>setOpenDelete(false)} type="Category" agree={deleteCategory}/>
              </React.Fragment>}
            </main>
    )
}



export function Item(props){
  const item = props.item
  const [open, setOpen] = React.useState(false)
  return(
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="Item3"
        onClick={()=>setOpen((open)=>!open)}>
        <Typography /*className={classes.heading}*/>{item.item_name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {open?
          <MenuItemDetails item={item} isNew={false} updateMenu={props.updateMenu}/>:null
        }
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}
