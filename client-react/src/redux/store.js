import {createStore, applyMiddleware, combineReducers} from 'redux'
import logger from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import loaderReducer from './reducer/loaderReducer'
import authReducer from './reducer/authReducer'
import userReducer from './reducer/userReducer'
import categoryReducer from './reducer/categoryReducer'

const rootReducer=combineReducers(
    {
        loader:loaderReducer,
        auth:authReducer,
        user:userReducer,
        category:categoryReducer,
    }
)



const store=createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)))
export default store