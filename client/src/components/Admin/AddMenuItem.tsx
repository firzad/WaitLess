import * as React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import { MenuItemDetails } from './MenuItemDetails';

export default function AddMenuItem(props){
    const data = {
        item_name: "Untitled",
        description: "Describe The Menu Item",
        price:0,
        category_id: props.category_id
    }
    return (
        
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            scroll="body"
            maxWidth="lg"
        >
            <DialogTitle>
                <Grid container xs justify="space-between">
                    <Grid item>Add New Menu Item</Grid>
                    <Grid item><IconButton onClick={props.handleClose}><CloseIcon/></IconButton></Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <MenuItemDetails item={data} isNew={true} addMenu={props.addMenu}/>
            </DialogContent>
        </Dialog>
    )
}