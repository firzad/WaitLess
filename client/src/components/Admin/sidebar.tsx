import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

import {
          Drawer,
          List,
          Divider,
          IconButton,
          ListItem,
          ListItemIcon,
          ListItemText
        } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
  }),
);


export default function SideBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const settings = props.settingsList
  


  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={props.handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
          <ListItem button>
              <ListItemText>
                  <Link to="/home">Home</Link>
              </ListItemText>
          </ListItem>
        {settings.map((obj, index) => (
          <ListItem button key={obj.title} onClick={() => props.setIndex(index)}>
            <ListItemIcon>{obj.icon}</ListItemIcon>
            <ListItemText primary={obj.title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}