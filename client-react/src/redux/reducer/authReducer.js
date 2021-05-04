import {REGISTER_USER, LOGIN_USER,SET_CURRENT_USER, LOGOUT_USER, ERROR} from './../action/authType'
import { toast } from "react-toastify";
const initialStage={
    isLoggedIn:false,
    token:null,
    userdata:null,
    error:{}
}
const authReducer=(state=initialStage, action)=>{
    switch(action.type){
        case REGISTER_USER: return{
            ...state,
            user:action.payload
        }
        case LOGIN_USER: return{
            ...state,
             token:action.payload,
             isLoggedIn:false
        }
        case SET_CURRENT_USER: return{
            ...state,
            userdata:action.payload.user,
            isLoggedIn: action.payload.loggedIn
        }
        case LOGOUT_USER: return{
            ...state,
            isLoggedIn:false
        }
        case ERROR: return{
            ...state,
            error:action.payload
        }
        default: 
        return state
    }
}
export default authReducer