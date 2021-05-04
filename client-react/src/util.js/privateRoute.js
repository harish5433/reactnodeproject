import React, {useEffect} from 'react';
import jwt from "jsonwebtoken";
import {useSelector, useDispatch} from 'react-redux'
import { Route, Redirect } from 'react-router-dom';
import {setCurrentUser} from './../redux'
const PrivateRoute = ({component: Component, roles, ...rest}) => {
    const dispatch=useDispatch()
    useEffect(()=> {
        const token=localStorage.getItem("jwtToken")
        if(token === null){
            dispatch(setCurrentUser(null, false))
        } else {
            jwt.verify(token,'secret',function(err,decode){
            if(err){
                 dispatch(setCurrentUser(null, false))
            }})
        }
      },[])

    const Data = useSelector(state => state.auth)
    return <Route {...rest} component={(props) => {
        if(!Data.isLoggedIn){
            return <Redirect to="/login"/>
        }else{
            const userType=Data.userdata?.user?.usertype
            if (roles !== userType) {
                // role not authorised so redirect to home page
                return <Redirect to="/"/>
            }
            else {
                return <Component {...props} />
            }
        }
    }} />
}

export default PrivateRoute;