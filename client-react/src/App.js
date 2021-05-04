import React, {useEffect} from 'react'
import {Provider} from 'react-redux'

import jwt from "jsonwebtoken";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from './redux/store'
import {logOut, setCurrentUser} from './redux'
import setAuthToken from './util.js/setAuthToken'
import Routes from './routes/routes'

function App() {

  useEffect(()=> {
    const token=localStorage.getItem("jwtToken")
    if(token){
      setAuthToken(token);
     jwt.verify(token,'secret',function(err,decode){
      if(err){
        store.dispatch(setCurrentUser(null, false));
      }else{
        store.dispatch(setCurrentUser(decode, true));
      }
     });
    }
  },[])

  return (

    <div className="App">
      <Provider store={store}>
        <Routes/>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Provider>
    </div>
  );
}
export default App;
