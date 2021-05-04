import React from 'react';
import { Switch, Route} from 'react-router-dom'
import PrivateRoute from './../../util.js/privateRoute'
import AdminDashbaord from './dashbaord'
import Product from './product'
import SingleImageUploadComponent from './signle_upload'
import MultipleImageUploadComponent from './multi_upload'
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
import {NavLink ,Link} from 'react-router-dom'
const drawerWidth = 240;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      height: "100vh"
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }));

export default function AdminLayout() {
  const classes = useStyles();
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Admin dashboard
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
          <List>
              <ListItem >
              <NavLink  exact to="/admin" canactiveclass="active" className={classes.linkText}><ListItemText primary="Dashboard"/></NavLink>
              </ListItem>
          </List>
          <List>
              <ListItem >
              <NavLink  to="/admin/product" canactiveclass="active" className={classes.linkText}><ListItemText primary="Product"/></NavLink>
              </ListItem>
          </List>
          <List>
              <ListItem >
              <NavLink  to="/admin/multiple_upload" canactiveclass="active" className={classes.linkText}><ListItemText primary="Multi Upload"/></NavLink>
              </ListItem>
          </List>
          <List>
              <ListItem >
              <NavLink  to="/admin/single_upload" canactiveclass="active" className={classes.linkText}><ListItemText primary="Single Upload"/></NavLink>
              </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <PrivateRoute exact path="/admin" roles={"2"} component={AdminDashbaord}/>
            <PrivateRoute exact path="/admin/product" roles={"2"} component={Product}/>
            <PrivateRoute exact path="/admin/multiple_upload" roles={"2"} component={MultipleImageUploadComponent}/>
            <PrivateRoute exact path="/admin/single_upload" roles={"2"} component={SingleImageUploadComponent}/>
          </Switch>
        </main>
      </div>
    )
  }