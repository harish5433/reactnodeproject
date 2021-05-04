import {GET_USER, GETALL_USER,UPDATE_USER,DELETE_USER} from './../action/userType'
const initialStage={
    user:{
    fname:"",
    mname:"",
    lname:"",
    email:"",
    password:"",
    cpassword:"",
    address:"",
    gender:"",
    state:"",
    city:"",
    zip:""
    },
    userId:{},
    userData:[],
    token:null
}
const userReducer=(state=initialStage, action)=>{
    switch(action.type){
        case GET_USER: return{
            ...state,
            userId:action.payload
        }
        case GETALL_USER: return{
            ...state,
            userData:action.payload
        }
        case UPDATE_USER: return{
            ...state,
            user:action.payload,
        }
        case DELETE_USER: return{
            ...state,
        }
        default: 
        return state
    }
}
export default userReducer