import {LOADING, REGISTER_USER, LOGIN_USER,SET_CURRENT_USER, LOGOUT_USER, ERROR} from './authType'
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import setAuthToken from './../../util.js/setAuthToken'
import jwt from "jsonwebtoken";

export const registerUser=(user)=>{
     return(dispatch)=>{
        dispatch({
            type: LOADING,
            payload: true
        })
        axios.post("http://localhost:8000/register", user)
        .then(res=>{
            dispatch({
                type: REGISTER_USER,
                payload: res.data
            })
            toast.success("Register successfullly !")
        })
        .catch(error=>{
            toast.error(error.response.data.message)
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    } 
}
export const loginUser=(user)=>{
    return async (dispatch)=>{
        dispatch({
            type: LOADING,
            payload: true
        })
        axios.post("http://localhost:8000/login", user)
        .then(res=>{
            const{user, token}=res.data
            localStorage.setItem("user",JSON.stringify(user));
            localStorage.setItem("jwtToken",token);
                setAuthToken(token);
                dispatch({
                    type: LOGIN_USER,
                    payload: {
                        token
                    }
                })
                dispatch(setCurrentUser(jwt.decode(token), true))
                dispatch({
                    type: LOADING,
                    payload: false
                })
                toast.success("LogIn successfully !")
        })
        .catch(error=>{
            toast.error(error.response.data.message)
        })
    }
}
export const setCurrentUser=(user, loggedIn)=>{
     return(dispatch)=>{
            dispatch({
                type: SET_CURRENT_USER,
                payload: {user, loggedIn}
            })
    }
}
export const logOut=()=>{
    return(dispatch)=>{
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
         dispatch(setCurrentUser({}))
        dispatch({
            type: LOGOUT_USER
        })
        window.location.href="/login";
        toast.success("LogOut successfullly !")
    }
}