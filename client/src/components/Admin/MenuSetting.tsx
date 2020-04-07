import * as React from "react";
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Tab, Tabs, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { commonStyles } from "../../styles/generalStyles";
// import { userStyles } from "../../styles/userStyles";
import {Box, Grid, TextField, Button} from "@material-ui/core";
import AddMenuItem from './AddMenuItem';
import { MenuJson, MenuResponse } from '../../interfaces/menu';
import { Category, CategoryResponse, CategoryPostResponse } from '../../interfaces/category';
import axios from '../../axios';


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
    /*const styleClasses: any = userStyles();*/
    const classes: any = commonStyles();
    const [value, setValue] = React.useState(0);
    // Get these from backend
    const [categories, setCategories] = React.useState<Category | any>([]);
    const [menu ,setMenu] = React.useState<MenuJson | any>([]);
    const [newCategory, setCategory] = React.useState("newCategory")

    React.useEffect(() => {
      if (menu.length === 0){
          axios.get(`Menu`).then(
              (res: MenuResponse) => {
                  const data = res.data;
                  setMenu(data);
                  // setLoading(false);
              }
          )
      }
      if (categories.length === 0){
        axios.get(`Categories`).then(
          (res: CategoryResponse) => {
            const data = res.data;
            setCategories(data);
          }
        )
      }
    });
    
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNewCategoryChange = (event) =>{
    setCategory(event.target.value);
  }

  const addCategory = () => {
    const newC = {
      category_name: newCategory,
      position_in_menu: categories[categories.length-1].position_in_menu+2
    };
    axios.post(`Categories`, newC).then(
      (res:CategoryPostResponse)=>{
        setCategories((categories)=>[...categories, res.data]);
      });
  }

    return(
            <main className={classes.content}>
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
                          <Item name={item.item_name} detail={item.description} key={item.menu_id}/>
                        ))
                      }
                      <ExpansionPanel>
                        <AddMenuItem />
                      </ExpansionPanel>                      
                  </TabPanel>
                ))}
                <TabPanel value={value} index={categories.length}>
                      <Grid container spacing={3} direction="column">
                          <Grid item container alignItems="center">
                            <TextField value={newCategory} label="Category Name" onChange={handleNewCategoryChange}/>
                          </Grid>
                          <Grid item container alignItems="center">
                            <Button onClick={addCategory}>Save</Button>
                          </Grid>
                      </Grid>
                </TabPanel>
            </main>
    )
}

export function ItemDetails(props){
    return (
      <Typography>
        {props.data}
      </Typography>
    )
}

export function Item(props){
  return(
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="Item3">
        <Typography /*className={classes.heading}*/>{props.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <ItemDetails data={props.detail}/>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}
