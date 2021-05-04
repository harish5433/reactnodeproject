import React, {useState} from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup'
import {Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import {registerUser} from './../../redux'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
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

// yup validation schema ..............
const validationSchema = Yup.object().shape({
  fname: Yup.string()
    .required("First Name is required"),
  mname: Yup.string()
    .required("Middle is required"),
  lname: Yup.string()
  .required("Last Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email('Email is invalid'),
  password: Yup.string()
  .required("Password is required"),
  cpassword : Yup.string()
  .required("Confirm password is required")
  .oneOf([Yup.ref('password'), null], 'Passwords must match'), 
  gender : Yup.string()
  .required("Gender is required"),
  address: Yup.string()
    .required("Address is required"),
  state: Yup.string()
.required("State is required"),
  city: Yup.string()
  .required("City is required"),
  zip: Yup.string()
  .required("Zip is required")
  .matches(/^[0-9]/,"Zip must be number")
})

export default function Register() {
  const classes = useStyles();
  const dispatch=useDispatch()
  const userdata = useSelector(state => state.auth)
//......validation ........//
const { handleSubmit,handleChange, handleBlur, values, errors, touched } = useFormik({
  initialValues : {
      fname: "",
      mname: "",
      lname: "",
      email: "",
      password: "",
      cpassword: "",
      address: "",
      gender:"",
      state: "",
      city: "",
      zip: "",
      },
      validationSchema,
      onSubmit(values){
        dispatch(registerUser(values));
      }
});

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
         Registration form
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="fname"
                label="First Name"
                value={values.fname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.fname && touched.fname ? true : false}
                helperText={errors.fname && touched.fname ? errors.fname : null}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mname"
                label="Middle Name"
                name="mname"
                value={values.mname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.mname && touched.mname ? true : false}
                helperText={errors.mname && touched.mname ? errors.mname : null}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lname"
                label="Last Name"
                name="lname"
                value={values.lname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.lname && touched.lname ? true : false}
                helperText={errors.lname && touched.lname ? errors.lname : null}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password ? true : false}
                helperText={errors.password && touched.password ? errors.password : null}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="cpassword"
                id="cpassword"
                value={values.cpassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.cpassword && touched.cpassword ? true : false}
                helperText={errors.cpassword && touched.cpassword ? errors.cpassword : null}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                name="address"
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.address && touched.address ? true : false}
                helperText={errors.address && touched.address ? errors.address : null}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
            <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row aria-label="Gender" name="gender" value={values.gender} >
                <FormControlLabel value="Male" control={<Radio color="primary"/>} label="Male" 
                onChange={handleChange}
                onBlur={handleBlur}
                />
                <FormControlLabel value="Female" control={<Radio color="primary"/>} label="Female" 
                onChange={handleChange}
                onBlur={handleBlur}
                />
                </RadioGroup>
                <FormHelperText style={{color:"red"}}>{errors.gender && touched.gender ? errors.gender : null}</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="state"
                label="State"
                name="state"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.state && touched.state ? true : false}
                helperText={errors.state && touched.state ? errors.state : null}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.city && touched.city ? true : false}
                helperText={errors.city && touched.city ? errors.city : null}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="zip"
                variant="outlined"
                required
                fullWidth
                id="zip"
                label="Zip"
                value={values.zip}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.zip && touched.zip ? true : false}
                helperText={errors.zip && touched.zip ? errors.zip : null}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}