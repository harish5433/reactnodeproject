import React, {useEffect}from 'react';
import {useParams, useHistory, useLocation}from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {useSelector, useDispatch} from 'react-redux'
import { getUSER } from './../../redux'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding :'30px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#E91E63',
    backgroundColor: '#dbc1e0',
    border: '1px solid blue',
    margin:'auto'
  },
  heading: {
    padding: '10px',
    color: 'green',
    textAlign: "center",
  }
}));

export default function UserProfile() {
    const classes = useStyles();
    const Data = useSelector(state => state.user.userId)
    const id=useParams();
    const dispatch=useDispatch()
    const history=useHistory()
    const location=useLocation()
    console.log("ttt",location)
    useEffect(() => {
      dispatch(getUSER(id.userId));
    },[]);
    return (
        <div className={classes.root}>
          <Typography variant="h4" className={classes.heading}>
            User Profile
          </Typography>
          <Grid container spacing={0} xs={12}>
            <Grid item xs={6} >
              <Paper className={classes.paper}>Name</Paper>
            </Grid>
            <Grid item xs={6} >
              <Paper className={classes.paper}>{Data.fname} {Data.mname} {Data.lname}</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Email</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>{Data.email}</Paper>
            </Grid>
            <Grid item xs={6} >
              <Paper className={classes.paper}>Address</Paper>
            </Grid>
            <Grid item xs={6} >
              <Paper className={classes.paper}>{Data.address}</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Gender</Paper>
            </Grid>
            <Grid item xs={6} >
              <Paper className={classes.paper}>{Data.gender}</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>State</Paper>
            </Grid>
            <Grid item xs={6} >
              <Paper className={classes.paper}>{Data.state}</Paper>
            </Grid>
            <Grid item xs={6} >
              <Paper className={classes.paper}>City</Paper>
            </Grid>
            <Grid item xs={6} >
              <Paper className={classes.paper}>{Data.city}</Paper>
            </Grid>
            <Grid item xs={6} >
              <Paper className={classes.paper}>Zip</Paper>
            </Grid>
            <Grid item xs={6} >
              <Paper className={classes.paper}>{Data.zip}</Paper>
            </Grid>
          </Grid>
        </div>
      )
}
