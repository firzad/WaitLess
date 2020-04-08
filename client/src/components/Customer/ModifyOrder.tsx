import React from 'react';
import { Typography, Grid, FormLabel, FormControl, FormGroup, FormControlLabel, TextField, Paper } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
//import { userStyles } from "src/styles/userStyles";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex'
    },
    formControl: {
        margin: theme.spacing(3),
      },
    paper: {
      padding: theme.spacing(1),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    margin: {
        margin: theme.spacing(1),
      },
      closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },
  }),
);
export default function ModifyOrder(){
    //const styleClasses: any = userStyles();
    const classes = useStyles();
    const [state, setState] = React.useState({
        ingredient: false,
      });
    const description = "A hamburger (also burger for short) is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun."
    const ingredientsList = [
        {
            ingredientName:"Lettuce"
        },
        {
            ingredientName:"Jalepenos"
        },
        {
            ingredientName:"Olives"
        },
        {
            ingredientName:"Tomatoes"
        },
        {
            ingredientName:"Red Onions"
        },
    ]
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    return(
        <div className={classes.root}>
            <Paper className={classes.paper}>
            <Grid container direction="row" justify="space-around" alignItems="center">
            </Grid>
            <Grid container direction="column" spacing={2} align-items="center">
                <Grid item container direction="row">
                    <Grid item>
                    <Typography variant="h5" align="center">
                        Item Name
                    </Typography>
                    </Grid>
                    <Grid item>
                    <IconButton aria-label="close" className={classes.closeButton}>
                        <CloseIcon />
                    </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={2} sm container>
                    <Grid item xs>
                        <img className={classes.img} alt="complex" src="assets/Customer/b1.jpg" />
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="body2">
                    Description: {description}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body2">
                        Ingredients: 
                    </Typography>
                </Grid>
                <Grid item>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Add Ingredients</FormLabel>
                        <FormGroup>
                        {ingredientsList.map((obj) => (
                            <FormControlLabel
                                control={<Checkbox onChange={handleChange} name={obj.ingredientName} />}
                                label={obj.ingredientName} labelPlacement="start"
                            />
                            ))}
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                        <Typography variant="body2">
                        Remarks: 
                        </Typography>
                        <TextField id="remarks" label="remarks" variant="outlined" />
                    </Grid>
                </Grid>
                <Grid item container direction="row" align-item="center" justify="center" spacing ={1}>
                    <Grid item>
                    <IconButton aria-label="add">
                        <AddCircleIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                    </Grid>
                    <Grid item>
                    <TextField id="itemQuantity" variant="outlined" InputProps={{style: {height:40, width:40} }}/>
                    </Grid>
                    <Grid item>
                    <IconButton aria-label="delete">
                        <RemoveCircleIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                    </Grid> 
                </Grid>
                <Grid item container direction="row" align-item="center" justify="center" spacing ={1}>
                    <Button variant="contained" size="medium" color="primary" className={classes.margin}>
                    ADD ORDER
                    </Button>
                </Grid>
            </Grid>
            </Paper>
        </div>
    )
}