import React from 'react';
import { Typography, Grid, FormLabel, FormControl, FormGroup, FormControlLabel, TextField, Paper } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
//import { userStyles } from "src/styles/userStyles";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
//import CloseIcon from '@material-ui/icons/Close';
import axios from '../../axios';
import {ItemDetailsJson, ItemDetailsJsonResponse} from "../../interfaces/itemdetails"
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
        //position: 'relative',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },
  }),
);
export default function ModifyOrder(props){
    const menuD=props.modifyvalue
    const [itemDetails, setitemDetails] = React.useState<ItemDetailsJson | any>([]);
    const classes = useStyles();
    const [state, setState] = React.useState({
        ingredient: true,
      });
  
    React.useEffect(() => {
        if(itemDetails.length===0){
            axios.get('ItemDetails/'+menuD.menu_id.toString()).then(
                (res:ItemDetailsJsonResponse) =>{
                    const itemDetailsList=res.data
                    setitemDetails(itemDetailsList)
                }
            )
        }
    })
    console.log(itemDetails)
    var ingredientsList: string[]=[]
    itemDetails.map((obj) => (
        ingredientsList.push(obj.ingredients)
    ))
    const IL = ingredientsList.join(', ');
    const description = menuD.description
    const [remarksState, setRemarksState] = React.useState("");
    const [orderQuantityState, setOrderQuantityState] = React.useState(0);
    const [ingredientsChecked, setIngredientsChecked]= React.useState<String | any>([])
    //const ingredientsObject: String[] = []; 
    const handleOnClickOrder =(event) =>{
        console.log("&&&")
        console.log(ingredientsChecked);
        props.setBucketValue(
            {
            "item_name":menuD.item_name,
            "ingredient":ingredientsChecked,
            "remarks":remarksState,
            "quantity":orderQuantityState
        }
        )
    }
    const handleQuantityClick = (event) =>{
        setOrderQuantityState( stateCount => 
          event === 'Add' ? stateCount + 1: stateCount - 1
        );
    }
    const handleRemarks= (event) => {
        setRemarksState(event.target.value);
    }
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });

        let ingredientName=event.target.name
    
        if(event.target.checked){
            setIngredientsChecked((ingredientsChecked) => [...ingredientsChecked, ingredientName])
        }
        else{
            setIngredientsChecked(ingredientsChecked => {
                const ingredientsObject = ingredientsChecked.filter((item,j) => item !== ingredientName);
                return ingredientsObject
            });
        }
      }; 
    return(
        <div className={classes.root}>
            <Paper className={classes.paper} variant="elevation" elevation={12}>
            <Grid container direction="row" justify="space-around" alignItems="center">
            </Grid>
            <Grid container direction="column" spacing={2} align-items="center">
                <Grid item container direction="row">
                    <Grid item>
                    <Typography variant="h5" align="center">
                        {menuD.item_name}
                    </Typography>
                    </Grid>
                    <Grid item>
                    {/* <IconButton aria-label="close" className={classes.closeButton}>
                        <CloseIcon />
                    </IconButton> */}
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
                        Ingredients: {IL}
                    </Typography>
                </Grid>
                <Grid item>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Add Ingredients</FormLabel>
                        <FormGroup>
                        {itemDetails.map((obj) => (
                            <FormControlLabel
                                control={<Checkbox onChange={handleChange} name={obj.ingredients} />}
                                label={obj.ingredients} labelPlacement="start"
                            />
                            ))}
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Grid container direction="row" justify="center" alignItems="center">
                        {/* <Typography variant="body2">
                        Remarks: 
                        </Typography> */}
                        <TextField id="remarks" label="Remarks" variant="outlined" value={remarksState}
                        onChange={handleRemarks} />
                    </Grid>
                </Grid>
                <Grid item container direction="row" align-item="center" justify="center" spacing ={1}>
                    <Grid item>
                    <IconButton aria-label="add" onClick={()=>handleQuantityClick("Add")}>
                        <AddCircleIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                    </Grid>
                    <Grid item>
                    <TextField disabled value ={orderQuantityState} id="itemQuantity" variant="outlined" InputProps={{style: {height:40, width:40} }}/>
                    </Grid>
                    <Grid item>
                    <IconButton aria-label="delete" onClick={()=>handleQuantityClick("Delete")}>
                        <RemoveCircleIcon style={{ fontSize: 31 }}/>
                    </IconButton>
                    </Grid> 
                </Grid>
                <Grid item container direction="row" align-item="center" justify="center" spacing ={1}>
                    <Button variant="contained" size="medium" color="primary" className={classes.margin} onClick={handleOnClickOrder}>
                    ADD ORDER
                    </Button>
                </Grid>
            </Grid>
            </Paper>
        </div>
    )
}