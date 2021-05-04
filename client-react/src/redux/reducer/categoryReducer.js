import {ADD_CATEGORY, GETALL_CATEGORY,GET_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY} from './../action/categoryType'
const initialStage={
    category:{
    },
    catId:{},
    catData:[]
}
const categoryReducer=(state=initialStage, action)=>{
    switch(action.type){
        case ADD_CATEGORY: return{
            ...state,
            catData: [...state.catData, action.payload]
        }
        case GETALL_CATEGORY: return{
            ...state,
            catData: action.payload
        }
        case GET_CATEGORY: return{
            ...state,
            category:action.payload
        }
        case UPDATE_CATEGORY: return{
            ...state,
            catData:state.catData.map((post) => (post._id === action.payload._id ? action.payload : post))
        }
        case DELETE_CATEGORY: return{
            ...state,
            catData:state.catData.filter((post) => post._id !== action.payload)
        }
        default: 
        return state
    }
}
export default categoryReducer