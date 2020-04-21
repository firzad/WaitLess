import React from 'react';
import { Typography, Grid, FormControl, FormGroup, FormControlLabel, TextField, Paper} from '@material-ui/core';
import { Theme, createStyles, makeStyles/*, withStyles, WithStyles*/ } from '@material-ui/core/styles';
//import { userStyles } from "src/styles/userStyles";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import EcoIcon from '@material-ui/icons/Eco';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';


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
        paddingLeft:'3.2vw',
        margin: '10px 0 0 2px',
      },
    paper: {
      padding: theme.spacing(1),
      margin: 'auto',
      width: 500,
      opacity:'0.95',
      height: '78vh',
      overflow: 'overlay',
      overflowX: 'hidden',
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
// const styles = (theme: Theme) =>
// createStyles({
// root: {
//     margin: 0,
//     padding: theme.spacing(2),
// },
// closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
// },
// });
/*export interface GridTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
  }
  
  const GridTitle = withStyles(styles)((props: GridTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <Grid className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
    </Grid>
     
    );
  });*/

export default function ModifyOrder(props){
    const menuD=props.modifyvalue
    const [itemDetails, setitemDetails] = React.useState<ItemDetailsJson | any>([]);
    const classes = useStyles();
    const [state, setState] = React.useState({
        ingredient: true,
      });
  
    const [expand_ingredients, setExpandIngredients] = React.useState(false);
    function handleExpClick(){
        setExpandIngredients(!expand_ingredients)
    }
    const [detail_click, setDetailClick] = React.useState(false);
    function handleDetailClick(){
        setDetailClick(!detail_click)
    }

    React.useEffect(() => {
        setExpandIngredients(false)
        setDetailClick(false)
        axios.get('ItemDetails/'+menuD.menu_id.toString()).then(
            (res:ItemDetailsJsonResponse) =>{
                const itemDetailsList=res.data
                setitemDetails([])
                setitemDetails(itemDetailsList)
                console.log("ID")
                console.log(itemDetailsList)
            }
        )
    }, [menuD])
   
    var ingredientsList: string[]=[]
    itemDetails.map((obj) => (
        ingredientsList.push(obj.ingredients)
    ))
    
    //const IL = ingredientsList.join(', ');
    const IL = itemDetails.filter(obj=>obj.modifiable!=='True').map((obj) => (obj.ingredients)).join(', ')

    const description = menuD.description
    const [remarksState, setRemarksState] = React.useState("");
    const [orderQuantityState, setOrderQuantityState] = React.useState(0);
    const [ingredientsChecked, setIngredientsChecked]= React.useState<String | any>([])
    //const [ingredientState, setIngredientState]= React.useState(false)
    //const ingredientsObject: String[] = []; 
    const handleOnClickOrder =(event) =>{
        props.setBucketValue(
            {
            "item_name":menuD.item_name,
            "menu_id":menuD.menu_id,
            "ingredient":ingredientsChecked,
            "remarks":remarksState,
            "quantity":orderQuantityState,
            "price":menuD.price,
            "ordered":false,
        }
        )
        setRemarksState("");
        setOrderQuantityState(0);
        //setIngredientsChecked([]);
        props.setmodifyValue(null);
    }
    const handleQuantityClick = (event) =>{
        setOrderQuantityState( stateCount => 
          event === 'Add' ? stateCount + 1: stateCount - 1
        );
    }
    const handleRemarks= (event) => {
        setRemarksState(event.target.value);
    }
    const checkQuantity = ()=>{
        if(orderQuantityState>=1){
            return false
        }
        else{
            return true
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        //setIngredientState(true);

        let ingredientName=event.target.name
        console.log(itemDetails)
    
        if(event.target.checked){
            setIngredientsChecked((ingredientsChecked) => [...ingredientsChecked, ingredientName])
        }
        else{
            setIngredientsChecked(ingredientsChecked => {
                const ingredientsObject = ingredientsChecked.filter((item,j) => item !== ingredientName);
                return ingredientsObject
            });
        }
        //setIngredientState(false);
      }; 
    //   const [open, setOpen] = React.useState(false);

    //   const handleClose = () => {
    //     setOpen(false);
    //   };
    //const onClose: () => void;

    return(
        <div className={classes.root}>
            <Paper className={classes.paper} variant="elevation" elevation={12}>
            <List component="nav" aria-label="menu item list">
                <ListItem>
                  <ListItemIcon style={{minWidth:'42px'}}>
                    <RestaurantMenuIcon/>
                  </ListItemIcon>
                  <ListItemText primary={<Typography variant="h5" align="left" style={{fontWeight:700}}>
                        {menuD.item_name}
                    </Typography>}/>
                </ListItem>
                <ListItem style={{maxHeight: '20px', marginBottom:'15px'}}>
                  <ListItemIcon style={{minWidth:'20px', minHeight: '20px'}}>
                    <AttachMoneyIcon/>
                  </ListItemIcon>
                  <ListItemText primary={<Typography variant="caption" align="left" style={{fontSize: '1.15em',color:'rgba(0, 0, 0, 0.64)'}}>
                        {menuD.price}
                    </Typography>}/>
                </ListItem>
              </List>
              <Divider />
              <List component="nav" aria-label="description">
                <ListItem style={{paddingBottom: '5px'}}>
                    <ListItemText primary={<Typography variant="body1" align="left">
                        {description}
                    </Typography>}/>
                </ListItem>

                <ListItem disabled={ingredientsList.length===0} button onClick={handleDetailClick} style={{maxHeight: '40px', marginBottom: '4px'}}>
                    <ListItemIcon style={{minWidth:'30px', minHeight: '20px'}}>
                        <EcoIcon/>
                    </ListItemIcon>
                  <ListItemText primary={<Typography variant="body1" align="left">
                        Additional Details
                    </Typography>}/>
                    {detail_click ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Divider/>

                <Collapse in={detail_click} unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem style={{paddingLeft:'3.2vw'}}>
                    <ListItemText primary={<Typography variant="body2" align="left">
                        Contains: {IL}
                    </Typography>}/>
                  </ListItem>
                </List>
                </Collapse>
                <Divider style={{visibility:detail_click ? 'visible' : 'hidden'}}/>


                <ListItem disabled={itemDetails.length===0} button onClick={handleExpClick} style={{maxHeight: '40px',marginTop:'4px',marginBottom: '4px'}}>
                  <ListItemIcon style={{minWidth:'30px', minHeight: '20px'}}>
                        <EditIcon/>
                    </ListItemIcon>
                  <ListItemText primary={<Typography variant="body1" align="left">
                        Customize
                    </Typography>}/>
                    {expand_ingredients ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Divider/>

                <Collapse in={expand_ingredients}>
                <List component="div" disablePadding>
                  <ListItem button>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormGroup>
                        {itemDetails.filter(obj=>obj.modifiable==='True').map((obj, index) => (
                            <FormControlLabel key={index} 
                                control={<Checkbox /*checked={ingredientState}*/ onChange={handleChange} name={obj.ingredients} />}
                                label={<Typography variant="body2" align="left">{obj.ingredients}</Typography>} labelPlacement="end"
                            />
                            ))}
                        </FormGroup>
                    </FormControl>

                  </ListItem>
                </List>
                </Collapse>
                <Divider style={{visibility:expand_ingredients ? 'visible' : 'hidden'}}/>

                <ListItem style={{paddingTop:'6vh'}}>
                    <Grid item container direction="row" align-item="center" justify="center" spacing ={1}>
                    <TextField id="remarks" label="Remarks" variant="outlined" value={remarksState}
                        onChange={handleRemarks} />
                    </Grid>
                </ListItem>
                <ListItem>
                    <Grid item container direction="row" align-item="center" justify="center" spacing ={1}>
                    <Grid item>
                    <IconButton disabled={checkQuantity()} aria-label="delete" onClick={()=>handleQuantityClick("Delete")}>
                        <RemoveCircleIcon  style={{ fontSize: 31 }}/>
                    </IconButton>
                    </Grid> 
                    
                    <Grid item>
                    <TextField disabled value ={orderQuantityState} id="itemQuantity" variant="outlined" InputProps={{style: {height:40, width:40} }}/>
                    </Grid>
                    <Grid item>
                    <IconButton aria-label="add" onClick={()=>handleQuantityClick("Add")}>
                        <AddCircleIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                    </Grid>
                </Grid>
                </ListItem>
                <ListItem alignItems='center'>
                    <Grid item container direction="row" align-item="center" justify="center" spacing ={1}>
                    <Button disabled={checkQuantity()} variant="contained" size="medium" color="primary" className={classes.margin} onClick={handleOnClickOrder}>
                    ADD TO CART
                    </Button>
                    </Grid>
                </ListItem>
              </List>
            </Paper>
        </div>
    )
}
