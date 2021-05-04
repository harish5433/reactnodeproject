import React from 'react';
import {useSelector} from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, roles, ...rest}) => {
    const Data = useSelector(state => state.auth)
    console.log(Data)
    const token =localStorage.getItem('jwtToken');
    return <Route {...rest} component={(props) => {
        if(Data.isLoggedIn){
            const userType=Data.userdata.user.usertype
            if (roles !== userType) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/'}} />
            }
            else {
                return <Component {...props} />
            }
        }else{
            return <Redirect to="/login"/>
        }
    }} />
}

export default PrivateRoute;