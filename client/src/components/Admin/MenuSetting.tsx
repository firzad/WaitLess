import * as React from "react";
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Tab, Tabs, AppBar, Toolbar, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { commonStyles } from "../../styles/generalStyles";
/*import { userStyles } from "../../styles/userStyles";*/
import {  Box, Button, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TextField } from "@material-ui/core";
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import UploadImage from './UploadImage';
import { Header } from 'semantic-ui-react'


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

    
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return(
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    
                </Toolbar>
                <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="simple tabs example">
                          <Tab label="Appetizers" {...a11yProps(0)} />
                          <Tab label="Salads" disabled{...a11yProps(1)} />
                          <Tab label="Soups" {...a11yProps(2)} />
                          <Tab label="Sandwiches" {...a11yProps(0)} />
                          <Tab label="Italian" {...a11yProps(1)} />
                          <Tab label="Chinese" {...a11yProps(2)} />
                          <Tab label="Main Course" {...a11yProps(0)} />
                          <Tab label="Sides" {...a11yProps(1)} />
                          <Tab label="Sea Food" disabled {...a11yProps(2)} />
                          <Tab label="Desserts" {...a11yProps(0)} />
                          <Tab label="Beverages" {...a11yProps(1)} />
                          <Tab label="+" {...a11yProps(2)} />
                </Tabs>

                <TabPanel value={value} index={0}>
                
                    <div className={classes.demo}>

                    	<ExpansionPanel>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="Item1">
                              <Typography className={classes.heading}>Mozzarella Sticks</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                Mozzarella Cheese, Fried
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                          <ExpansionPanel>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="Item2">
                              <Typography className={classes.heading}>Onion Rings</Typography>

                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                Fried
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                          <ExpansionPanel>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="Item3">
                              <Typography className={classes.heading}>Greek Fries</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                Feta, Oregano, House Dressing
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                          <ExpansionPanel>
                          	<PopupState variant="popover" popupId="demo-popup-popover">
                          	                          	{(popupState) => (
                          	                          	<div>
                          	                            <Button style={{left : '50%',
                          	                                            right : '50%'}}
                          	                                            id = "AddItemButton"
                          	                                            {...bindTrigger(popupState)}>
                          	                                Add Item +
                          	                            </Button>
                          	                            <Popover
                          	                                        {...bindPopover(popupState)}
                          	                                        anchorOrigin={{
                          	                                          vertical: 'bottom',
                          	                                          horizontal: 'center',
                          	                                        }}
                          	                                        transformOrigin={{
                          	                                          vertical: 'top',
                          	                                          horizontal: 'center',
                          	                                        }}
                          	                                      >
                          	                                      <div>
                          	                                        <Box p={5}>
                          	                                         <form  noValidate autoComplete="off">
                          	                                         <Header size='medium'>Add Ingredient</Header>
                          	                                         &nbsp;

                          	                                         <div>
                          	                                         	<UploadImage/>
                          	                                         </div>
                          	                                         &nbsp;
                          	                                        	<div >
                          	                                        		<div >
                          	                                        		<TextField required id="outlined-basic" label="Item Name" variant="outlined" />
                          	                                        		{' '}
                          	                                        		&nbsp;
                          	                                        		&nbsp;
                          	                                        		<TextField required id="outlined-basic" label="Cost" variant="outlined" />
                          	                                        		</div>
                          	                                        		&nbsp;

                          	                                        		<div>
                          	                                          		<TextField id="outlined-basic" label="Description" variant="outlined" />
                          	                                          		</div>
                          	                                          		&nbsp;

                          	                                          		<div>
                          	                                          		<TableContainer component={Paper}>
                          	                                          		      <Table aria-label="simple table">
                          	                                          		        <TableHead>
                          	                                          		          <TableRow>
                          	                                          		            <TableCell>Ingredient (100g serving)</TableCell>
                          	                                          		            <TableCell>Modifiable</TableCell>
                          	                                          		            <TableCell align="right">Calories</TableCell>
                          	                                          		            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                          	                                          		            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                          	                                          		            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                          	                                          		          </TableRow>
                          	                                          		          <TableRow>
                          	                                          		          	<TableCell align="center">+</TableCell>
                          	                                          		          </TableRow>
                          	                                          		        </TableHead>
                          	                                          		        <TableBody>
                          	                                          		        
                          	                                          		        </TableBody>
                          	                                          		      </Table>
                          	                                          		    </TableContainer>
                          	                                          		    &nbsp;
                          	                                          		</div>

                          	                                          		<button>
                          	                                          			Save
                          	                                          		</button>
                          	                                          	</div>
                          	                                          	</form>
                          	                                        </Box>
                          	                                      </div>
                          	                            </Popover>
                          	                            </div>
                          	                            )}
                          	                            </PopupState>
                          </ExpansionPanel>
                   </div>
                    
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two

                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Item Four
                </TabPanel>
                <TabPanel value={value} index={4}>
                    Item Five
                </TabPanel>
                <TabPanel value={value} index={5}>
                    Item Six
                </TabPanel>
                <TabPanel value={value} index={6}>
                    Item Seven
                </TabPanel>
                <TabPanel value={value} index={7}>
                    Item Eight
                </TabPanel>
                <TabPanel value={value} index={8}>
                    Item Nine
                </TabPanel>
                <TabPanel value={value} index={9}>
                    Item Ten
                </TabPanel>
                <TabPanel value={value} index={10}>
                    Item Eleven
                </TabPanel>
                <TabPanel value={value} index={11}>
                    Item Twelve
                </TabPanel>
            </AppBar>

            <main className={classes.content}>
                
            </main>
        </div>
    )
}


