import React , {useState} from 'react'
import { useFormik } from "formik";
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {loginUser, setCurrentUser} from './../../redux'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//validation
 const validationSchema = Yup.object().shape({
  email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
  password: Yup.string()
      .required('Password is required'),
});
//validation close

export default function Login() {
  const classes = useStyles(); //use style in ui
  //set name field
  const Data = useSelector(state => state.auth)
  const history=useHistory()
  const dispatch=useDispatch() 
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues : {
        email: "",
        password: ""
    },
      validationSchema,
      onSubmit(values, e){
       // e.preventDefault()
        dispatch(loginUser(values))
      }
});
if(Data.isLoggedIn){
  if(Data.userdata.user.usertype === "1"){
    history.push(`/superadmin`)
  }
  else if(Data.userdata.user.usertype === "2"){
    history.push(`/admin`)
  }
}
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
         Log In Form
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
          <Typography component="h4" variant="h4" style={{color:"red"}}>
          {Data.error.message}
          </Typography>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email ? true : false}
                helperText={errors.email && touched.email ? errors.email : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                values="password"
                label="Password"
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password ? true : false}
                helperText={errors.password && touched.password ? errors.password :null}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
              Log In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                Not have account? Register
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}