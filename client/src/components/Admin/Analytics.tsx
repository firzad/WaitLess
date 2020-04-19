import * as React from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {/* Card, CardContent,*/ Grid, Typography, Avatar, Paper } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import PersonIcon from '@material-ui/icons/Person';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';

import { userStyles } from "../../styles/userStyles";

const bestSellers = [
    {"item_name":"Onion Rings", "sale": 200, "id":1, "number_of_dishes":20},
    {"item_name":"Burger", "sale": 150, "id":2, "number_of_dishes":10},
    {"item_name":"Pasta", "sale": 100, "id":3, "number_of_dishes":23},
    {"item_name":"Coffee", "sale": 97, "id":4, "number_of_dishes":60},
    {"item_name":"Something", "sale": 90, "id":5, "number_of_dishes":13},

]


const useStyles = makeStyles((theme) => ({
    root:{
        flex:1
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      seeMore: {
        marginTop: theme.spacing(3),
      },
      fixedHeight: {
        height: "30vh",
      },
      avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
      },
      icon: {
        fontSize: theme.spacing(8)
      }
}));

export default function Analytics(){
    const styleClasses: any = userStyles();
    const classes: any = useStyles();
    const dataSale = "200";
    const dataMeal = 30;
    const dataCust = 12;
    return(
        <div className={styleClasses.root}>
            <Grid container direction="column" spacing={6}>
                <Grid item container spacing={2}>
                    {/* <Grid item xs>
                        <Typography variant="h5" color="inherit">Last</Typography>
                        <Typography variant="h1" color="primary">24 hr</Typography>
                    </Grid> */}
                    <Grid item xs><DailySummary metric="Last" value={24} icon={<Typography className={classes.icon}>hr</Typography>} acolor="#6573c3" elevate={0}/></Grid>
                    <Grid item xs><DailySummary metric="Total Sale" value={dataSale} icon={<AttachMoneyIcon className={classes.icon}/>} acolor="#ef5350" elevate={1}/></Grid>
                    <Grid item xs><DailySummary metric="Customers served" value={dataCust} icon={<PersonIcon className={classes.icon}/>} acolor="#3f51b5" elevate={1}/></Grid>
                    <Grid item xs><DailySummary metric="Dishes Cooked" value={dataMeal} icon={<LocalDiningIcon className={classes.icon}/>} acolor="#ff9800" elevate={1}/></Grid>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Top 10 Best sellers
                        </Typography>
                        <BestSellers data={bestSellers}/>
                        <div className={classes.seeMore}>
                            <Link color="primary">
                            See more orders
                            </Link>
                        </div>                    
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export function DailySummary(props){
    const classes: any = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const {metric, value, icon, acolor, elevate, ...others} = props;

    console.log(others);
    return(
        <Paper className={fixedHeightPaper} elevation={elevate}>
            <Grid item container className={classes.root}>  
                <Grid item container justify="center">
                    <Typography component="h5" variant="body1" color="primary" gutterBottom>
                        {metric}
                    </Typography>
                </Grid>
            <Grid item container justify="center">
                
                <Grid item>
                    <Avatar className={classes.avatar} style={{backgroundColor:acolor}}>{icon}</Avatar>
                    </Grid>
                </Grid>              
                <Grid item container justify="center">
                <Grid item>
                <Typography variant="h1" component="h1" style={{color:acolor}}>
                    {value}
                </Typography>
                </Grid>
                </Grid>
            </Grid>
        </Paper>
    )

}

export function BestSellers(props){
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell >Item Name</TableCell>
            <TableCell align="right">Sale</TableCell>
            {/* <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell> */}
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
              {/* <TableCell>{row.date}</TableCell> */}
              <TableCell >{row.item_name}</TableCell>
              <TableCell align="right">{row.number_of_dishes}</TableCell>
              {/* <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell> */}
              <TableCell align="right">{row.sale}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
}