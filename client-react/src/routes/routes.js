import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import HomePage from './../pages/homepage/home'
import Register from './../pages/register/register'
import Login from './../pages/login/login'
import SuperAdminLayout from './../pages/super_admin/layout'
import AdminLayout from './../pages/admin/layout'

import PrivateRoute from './../util.js/privateRoute'

export default function Routes() {
    const loading = useSelector(state => state.loader.loading)
    return (
        <>
        <Router>
            { loading &&
                <div style={{textAlign:"center"}}>
                <Loader
                type="ThreeDots"
                color="#00BFFF"
                secondaryColor="Grey"
                height={100}
                width={100}
                />
            </div>
            }
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <PrivateRoute path="/superadmin" roles={"1"} component={SuperAdminLayout}/>
                <PrivateRoute  path="/admin" roles={"2"} component={AdminLayout}/>
            </Switch>
        </Router>
        </>
    )
}
