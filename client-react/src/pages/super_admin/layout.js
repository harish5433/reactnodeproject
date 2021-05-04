import React from 'react';
import {useDispatch} from 'react-redux'
import { Switch, Route, Link, useHistory} from 'react-router-dom'
import PrivateRoute from './../../util.js/privateRoute'
import SuperAdminDashbaord from './dashbaord'
import AllUser from './alluser'
import UserProfile from './profile'
import Category from './category'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {logOut} from './../../redux'
const drawerWidth = 200;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      marginLeft: '20px',
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#cbd4b4"
    },
    linkText: {
      color: "solid Black",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }));

export default function SuperAdminLayout() {
  const classes = useStyles();
  const history=useHistory()
  const dispatch = useDispatch()
  const signOut = () => {
    dispatch(logOut());
  };
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Super Admin dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <Divider />
          <List >
              <ListItem button className={classes.linkText} onClick={()=>history.push("/superadmin")}>
              <ListItemText primary="Dashboard"/>
              </ListItem>
          </List>
          <List>
              <ListItem button className={classes.linkText} onClick={()=>history.push("/superadmin/users")}>
              <ListItemText primary="All User"/>
              </ListItem>
          </List>
          <List>
              <ListItem button className={classes.linkText} onClick={()=>history.push("/superadmin/category")}>
              <ListItemText primary="Category"/>
              </ListItem>
          </List>
          <List>
              <ListItem button className={classes.linkText} onClick={()=>history.push("/superadmin/users")}>
              <ListItemText primary="extra"/>
              </ListItem>
          </List>
          <Divider/>
          <List>
              <ListItem button className={classes.linkText} onClick={()=>history.push("/login")}>
              <ListItemText primary="Log Out"/>
              </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          <Switch>
            <PrivateRoute exact path="/superadmin" roles={"1"} component={SuperAdminDashbaord}/>
            <PrivateRoute exact path="/superadmin/users" roles={"1"} component={AllUser}/>
            <PrivateRoute exact path="/superadmin/users/:userId" roles={"1"} component={UserProfile}/>
            <PrivateRoute exact path="/superadmin/category" roles={"1"} component={Category}/>
          </Switch>
        </main>
      </div>
    )
  }