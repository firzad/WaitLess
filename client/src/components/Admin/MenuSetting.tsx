import * as React from "react";
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Tab, Tabs, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { commonStyles } from "../../styles/generalStyles";
// import { userStyles } from "../../styles/userStyles";
import {Box} from "@material-ui/core";
import AddMenuItem from './AddMenuItem';

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
    const categories = ["Appetizers", "Soups", "Sandwiches"]//, "Italian", "Chinese", "Main Course", "Sides", "Sea Food", "Desserts", "Beverages"]
    const menu = [
      {
        name:"Mozzarella Sticks",
        detail:"Mozzarella Cheese, Fried",
        category:"Appetizers"
      },
      {
        name:"Onion Rings",
        detail:"Onion Rings, Fried",
        category:"Appetizers"
      },
      {
        name:"Greek Fries",
        detail:"Feta, Oregano, House Dressing",
        category:"Appetizers"
      },
      {
        name:"Greek Fries",
        detail:"Feta, Oregano, House Dressing",
        category:"Soups"
      },
      {
        name:"Onion Rings",
        detail:"Onion Rings, Fried",
        category:"Sandwiches"
      },
      {
        name:"Greek Fries",
        detail:"Feta, Oregano, House Dressing",
        category:"Sandwiches"
      }
    ];
    
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return(
            <main className={classes.content}>
                <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="simple tabs example">
                          {categories.map((category, index)=>(
                            <Tab label={category} {...a11yProps(index)} />
                          ))}
                          <Tab label="Add category" {...a11yProps(-1)} />
                </Tabs>

                {categories.map((cm,cat_in)=>(
                  <TabPanel value={value} index={cat_in}>                  
                      {
                        menu.filter((item)=>item.category===cm).map((item,index)=>(
                          <Item name={item.name} detail={item.detail}/>
                        ))
                      }
                      <ExpansionPanel>
                        <AddMenuItem />
                      </ExpansionPanel>                      
                  </TabPanel>
                ))}
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
