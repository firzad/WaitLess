import * as React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import UploadImage from './UploadImage';
import axios from 'src/axios';
import { MenuResponse } from 'src/interfaces/menu';
import { ItemDetailsJson, ItemDetailsJsonResponse } from 'src/interfaces/itemdetails';


export function MenuItemDetails(props) {
  const item = props.item;
  const [name, setName] = React.useState("Untitled");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [ingredients, setIngredients] = React.useState<any>([]);
  const [image_file, setImageFile] = React.useState("");
  const [new_ingredient_name, setNewIngredient] = React.useState("");
  const [new_in_modi, setNewModi] = React.useState(false);
  const [new_in_calorie, setNewCal] = React.useState(0);

  const isNew = props.isNew;
  React.useEffect(() => {
    if (!isNew) {
      axios.get(`ItemDetails/` + String(item.menu_id)).then(
        (res: ItemDetailsJsonResponse) => {
          setIngredients(res.data);
        })
      // setIngredients(testingredients);
      setName(item.item_name);
      setDescription(item.description);
      setPrice(item.price);
    }
  }, [item, isNew]);

  const addMenu = () => {
    if (!image_file) {
      alert("Upload Image first!!!");
      return
    }
    const newMenu = {
      "category_id": item.category_id,
      "item_name": name,
      "description": description,
      "price": price,
      "position_in_menu": 1,
      "imgfile": image_file
    }

    axios.post(`Menu`, newMenu).then(
      (res: MenuResponse) => {
        const newMD = res.data
        Promise.all(
          ingredients.map(ingredient => {
            let new_item_detail = {
              'ingredient': ingredient.ingredients,
              'calorie': ingredient.calorie,
              'modifiable': ingredient.modifiable
            }
            return axios.post<ItemDetailsJson>(`ItemDetails/` + String(newMD['menu_id']), new_item_detail)
          })
        ).then(props.addMenu(newMD))
      }
    ).catch(err => console.log(err));
  }

  const addIngredients = () => {
    const newIngredient = {
      'ingredients': new_ingredient_name,
      'calorie': new_in_calorie,
      'modifiable': new_in_modi ? "True" : "False"
    }
    setIngredients((ingredients) => [...ingredients, newIngredient]);
    setNewModi(false);
    setNewIngredient("");
    setNewCal(0);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewModi(Boolean(event.target.checked));
  };

  const saveMenu = () => {
    const modifiedMenu = {
      "item_name": name,
      "description": description,
      "price": price
    }
    axios.patch(`Menu/` + String(item.menu_id), modifiedMenu).then((res) => props.updateMenu())
  }

  const deleteMenu = () => {
    axios.patch(`Menu/` + String(item.menu_id), { "visibility": false }).then((res) =>
      props.updateMenu()
    )
  }

  return (
    <Card style={{ flex: 1 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            {
              isNew ?
                <UploadImage setImageFile={setImageFile} /> :
                <img style={{ maxWidth: "15vw" }} alt="complex" src={item.img_url} />
            }
          </Grid>
          <Grid item container xs={12} sm >
            <Grid item spacing={3} xs container>
              <Grid item xs={6}><TextField value={name} label="Menu Item Name" variant="outlined" fullWidth onChange={event => setName(event.target.value)} /></Grid>
              <Grid item xs={6}><TextField value={price} label="Price" variant="outlined" fullWidth onChange={event => setPrice(Number(event.target.value))} /></Grid>
              <Grid item xs={12}>
                <TextField value={description} label="Description" variant="outlined" multiline fullWidth rows={3} onChange={event => setDescription(event.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Ingredient (100g serving)</TableCell>
                        <TableCell>Modifiable</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ingredients.map((ingredient, index) => (
                        <TableRow key={index}>
                          <TableCell>{ingredient.ingredients}</TableCell>
                          <TableCell><Checkbox checked={ingredient.modifiable === "False" ? false : true} disabled={true} /></TableCell>
                          <TableCell align="right"><IconButton><EditIcon /></IconButton></TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell><TextField placeholder="Ingredient" value={new_ingredient_name} onChange={(event) => setNewIngredient(event.target.value)} /></TableCell>
                        <TableCell><Checkbox checked={new_in_modi} onChange={handleChange} /></TableCell>
                        <TableCell align="right"><IconButton onClick={addIngredients}><AddIcon /></IconButton></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">${price}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item container justify="flex-end">
            {isNew ?
              <Grid item>
                <Button variant="contained" color="primary" onClick={addMenu}>Add</Button>
              </Grid> :
              <Grid item container spacing={2} justify="flex-end">
                <Grid item><Button variant="contained" color="primary" onClick={saveMenu}>Save</Button></Grid>
                <Grid item><Button variant="contained" color="primary" onClick={deleteMenu}>Delete</Button></Grid>
              </Grid>
            }
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}