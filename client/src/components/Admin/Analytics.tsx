import * as React from "react";
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Avatar, Paper } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import PersonIcon from '@material-ui/icons/Person';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { userStyles } from "../../styles/userStyles";
import axios from 'src/axios';



const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1
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
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  icon: {
    fontSize: theme.spacing(8)
  }
}));

export default function Analytics() {
  const styleClasses: any = userStyles();
  const classes: any = useStyles();
  const [dataSale, setSale] = React.useState(0);
  const [dataMeal, setMeal] = React.useState(0);
  const [dataCust, setCust] = React.useState(0);
  const [bestSellers, setBestSellers] = React.useState<any>([])

  React.useEffect(() => {
    axios.get(`Summary/Day`).then(
      (res: any) => {
        const summary = res['data'];
        setSale(summary['total_sale'])
        setCust(summary['total_customers'])
      }
    )
    axios.get(`DishSummary`).then(
      (res: any) => {
        const summary = res['data'];
        setMeal(summary['total_dishes'])
        setBestSellers(summary['top_10'])
      }
    )
  }, [])

  return (
    <div className={styleClasses.root}>
      <Grid container direction="column" spacing={6}>
        <Grid item container spacing={2}>
          <Grid item xs><DailySummary metric="Total Sale" value={dataSale} icon={<AttachMoneyIcon className={classes.icon} />} acolor="#ef5350" elevate={1} /></Grid>
          <Grid item xs><DailySummary metric="Customers served" value={dataCust} icon={<PersonIcon className={classes.icon} />} acolor="#3f51b5" elevate={1} /></Grid>
          <Grid item xs><DailySummary metric="Dishes Cooked" value={dataMeal} icon={<LocalDiningIcon className={classes.icon} />} acolor="#ff9800" elevate={1} /></Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Top 10 Best sellers
                        </Typography>
            <BestSellers data={bestSellers} />
            <div className={classes.seeMore}>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export function DailySummary(props) {
  const classes: any = useStyles();

  const { metric, value, icon, acolor, elevate, ...others } = props;

  console.log(others);
  return (
    <Paper className={classes.paper} elevation={elevate}>
      <Grid item container className={classes.root}>
        <Grid item container justify="center">
          <Typography component="h5" variant="body1" color="primary" gutterBottom>
            {metric}
          </Typography>
        </Grid>
        <Grid item container justify="center">

          <Grid item>
            <Avatar className={classes.avatar} style={{ backgroundColor: acolor }}>{icon}</Avatar>
          </Grid>
        </Grid>
        <Grid item container justify="center">
          <Grid item>
            <Typography variant="h1" component="h1" style={{ color: acolor }}>
              {value}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )

}

export function BestSellers(props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell >Item Name</TableCell>
          <TableCell align="right">Sale</TableCell>
          <TableCell align="right">Sale Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.data.map((row) => (
          <TableRow key={row["menu_id"]}>
            <TableCell >{row.item_name}</TableCell>
            <TableCell align="right">{row.number_of_dishes}</TableCell>
            <TableCell align="right">{row.sale}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}