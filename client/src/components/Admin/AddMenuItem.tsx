import * as React from "react";
import {  Box, Button, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TextField } from "@material-ui/core";
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import UploadImage from './UploadImage';

export default function AddItem(){
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
                <Box p={5}>
                    <form  noValidate autoComplete="off">
                    
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
    )
}