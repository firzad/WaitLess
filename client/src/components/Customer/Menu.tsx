import * as React from "react";
//import clsx from 'clsx';
//import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
//import PropTypes from 'prop-types';
//import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//import { Link } from "react-router-dom";
//import { userStyles } from "src/styles/userStyles";
import { Box/*, AppBar, Toolbar, IconButton*/, Typography } from "@material-ui/core";
import { commonStyles } from "../../styles/generalStyles";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import tileData from './tileData';
import categoryList from './categoryList';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  
  function a11yProps(index: any) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }  

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
      //width: '100%',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      //width: ,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);

export default function Menu(){
    const imagePath = 'assets/Customer/'
    //const styleClasses: any = userStyles();
    const classes1: any = commonStyles();
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    return(
        <Container maxWidth="lg" className={classes1.container}>
            <Grid container spacing={3}>
                <Tabs 
                value={value} 
                onChange={handleChange}
                aria-label="Categories tabs" 
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto">
                
                {categoryList.map((category,index) => (
                <Tab label={category.label} {...a11yProps(index)}/>
                ))}
                </Tabs>
            </Grid>
            {categoryList.map((category,index) => (
            <TabPanel value={value} index={index}>
                <GridList cellHeight={180} cols={4} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
                    </GridListTile>
                    {tileData.map(tile => (
                    <GridListTile key={tile.img}>
                        console.log("---------")
                        console.log(title.img)
                        <Typography>{tile.img}</Typography>
                        <img src={imagePath+tile.img} alt={tile.title} />
                        <GridListTileBar
                        title={tile.title}
                        subtitle={<span>$ {tile.author}</span>}
                        />
                    </GridListTile>
                    ))}
                </GridList>
            </TabPanel>
            ))}
        </Container>
    );
} 