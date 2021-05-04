import React, {createRef} from 'react'
import {NavLink ,Link} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {logOut} from './../../redux/action/authAction'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbar : {
      background:"#2dcaed",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: `green`,
      fontWeight:"600",
    },
    linkText: {
        textTransform: `uppercase`,
        color: `white`,
        fontWeight:"600"
    }
}));
  
export default function HeaderPage() {
    const classes = useStyles();
    
    const homeRef=createRef();
    const aboutRef=createRef();
    const contactRef=createRef();

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const signOut = () => {
    dispatch(logOut());
  };
    return (
      <div className={classes.root}>
        <AppBar position="static" /* style={{background:"#2dcaed"}} */>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h5" className={classes.title}>
              <Link to="/">
                E-commarce
              </Link>
            </Typography>
            <Button>
              <Link 
                to="/" 
                activeclassname="active" 
                className={classes.linkText}
              >
                Home
              </Link>
            </Button>
            <Button>
              <Link 
                to="/" 
                activeclassname="active" 
                className={classes.linkText}
              >
                About
              </Link>
            </Button>
            <Button>
              <Link 
                to="/" 
                activeclassname="active" 
                className={classes.linkText}
              >
                Contact
              </Link>
            </Button>
            <Button>
              <Link 
                to="/register" 
                activeclassname="active" 
                className={classes.linkText}
              >
                Register
              </Link>
            </Button>
            <Button>
              <Link 
                to="/login" 
                activeclassname="active" 
                className={classes.linkText}
              >
                Log In
              </Link>
            </Button>
            <Button>
              <Link 
                to="/" 
                activeclassname="active" 
                className={classes.linkText} 
                onClick={signOut}
              >
                Logout
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    )
}
