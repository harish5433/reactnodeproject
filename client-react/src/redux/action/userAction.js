import {GET_USER, GETALL_USER,UPDATE_USER,DELETE_USER} from './userType'
import { toast } from 'react-toastify';
import axios from 'axios'
export const getUSER=(userId)=>{
    return(dispatch)=>{
        axios.get(`http://localhost:8000/users/${userId}`)
        .then(res=>{
             dispatch({
                type: GET_USER,
                payload: res.data.result
                
            })
        })
        .catch(error=>{
            toast.error(error.response.data.message)
        })
    }
}
export const getAllUser=()=>{
    return(dispatch)=>{
        axios.get("http://localhost:8000/users")
        .then(res=>{
             dispatch({
                type: GETALL_USER,
                payload: res.data.result
            })
        })
        .catch(error=>{
            toast.error(error.response.data.message)
        })
    }
}
export const updateUSER=(user)=>{
    return(dispatch)=>{
        axios.put("http://localhost:8000/login", user)
        .then(res=>{
             dispatch({
                type: UPDATE_USER,
                payload: res.data.token
            })
            toast.success("Update Successfully !")
        })
        .catch(error=>{
            toast.error(error.response.data.message)
        })
    }
}
export const deleteUSER=(user)=>{
    return(dispatch)=>{
        axios.delete("http://localhost:8000/users/delete", user)
        .then(res=>{
             dispatch({
                type: DELETE_USER,
                payload: res.data.token
            })
            toast.success("Deleted Successfully !")
        })
        .catch(error=>{
            toast.error(error.response.data.message)
        })
    }
}