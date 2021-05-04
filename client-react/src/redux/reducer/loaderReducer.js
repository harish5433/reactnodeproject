import {LOADING} from '../action/authType'
const initialStage={
    loading:false
}
const loaderReducer=(state=initialStage, action)=>{
    switch(action.type){
        case LOADING: return{
              loading:action.payload  
        }
        default: 
        return state
    }
}
export default loaderReducer