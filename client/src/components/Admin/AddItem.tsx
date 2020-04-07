import React, {Component} from 'react';
import {  Box, Button, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TextField } from "@material-ui/core";
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import UploadImage from './UploadImage';
import { commonStyles } from "../../styles/generalStyles";

import { Header } from 'semantic-ui-react'

class AddItem extends Component {
classes: any = commonStyles();

render() {
return (
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
                                        <Box p={20}>
                                         <form  noValidate autoComplete="off">
                                         <Header size='medium'>Add Ingredient</Header>
                                         <div>
                                         	<UploadImage/>
                                         </div>
                                        	<div >
                                        		<div>
                                        		<TextField required id="outlined-basic" label="Item Name" variant="outlined" />
                                        		<TextField required id="outlined-basic" label="Cost" variant="outlined" />
                                        		</div>

                                        		<div>
                                          		<TextField id="outlined-basic" label="Description" variant="outlined" />
                                          		</div>

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
                                          		        </TableHead>
                                          		        <TableBody>
                                          		        
                                          		        </TableBody>
                                          		      </Table>
                                          		    </TableContainer>
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
                            )
      }
}
export default AddItem;
