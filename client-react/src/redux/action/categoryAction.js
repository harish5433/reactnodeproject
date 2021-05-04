import {LOADING, ADD_CATEGORY, GETALL_CATEGORY,GET_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY} from './categoryType'
import { toast } from 'react-toastify';
import axios from 'axios'
export const addCategory=(category)=>{
    return(dispatch)=>{
       axios.post("http://localhost:8000/category/add", category)
       .then(res=>{
             dispatch({
               type: ADD_CATEGORY,
               payload: res.data.result
           })
           toast.success("Added Successfully !") 
       })
       .catch(error=>{
        toast.error(error.response.data.message)
       })
   } 
}
export const getAllCategory=()=>{
    return(dispatch)=>{
        axios.get("http://localhost:8000/category")
        .then(res=>{
             dispatch({
                type: GETALL_CATEGORY,
                payload: res.data.result
            })
        })
        .catch(error=>{
            toast.error(error.response.data.message)
        })
    }
}
export const getCategory=(catId)=>{
    return(dispatch)=>{
        axios.get(`http://localhost:8000/category/${catId}`)
        .then(res=>{
             dispatch({
                type: GET_CATEGORY,
                payload: res.data.result
            })
        })
        .catch(error=>{
            toast.error(error.response.data.message)
        })
    }
}
export const updateCategory=(catId,category)=>{
    return(dispatch)=>{
        axios.put(`http://localhost:8000/category/update/${catId}`, category)
        .then(res=>{
             dispatch({
                type: UPDATE_CATEGORY,
                payload: res.data.result
            })
            toast.success("Updated Successfully !") 
        })
        .catch(error=>{
            toast.error(error.response.data.message)
        })
    }
}
export const deleteCategory=(catId)=>{
    return(dispatch)=>{
        axios.delete(`http://localhost:8000/Category/delete/${catId}`)
        .then(res=>{
             dispatch({
                type: DELETE_CATEGORY,
                payload: res.data.result._id
            })
            toast.success("Deleted Successfully !") 
        })
        .catch(error=>{
            toast.error(error.response.data.message)
        })
    }
}