import React, { useEffect } from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import Quora from './components/Quora/Quora';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import Login from './components/Login/Login';
import { auth } from './components/firebase/firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
const user = useSelector(selectUser);
const dispatch = useDispatch();

useEffect(()=>{
  auth.onAuthStateChanged((authUser)=>{
    if(authUser) {
      dispatch(login({
        uid: authUser.uid,
        photo: authUser.photoURL,
        name: authUser.displayName,
        email: authUser.email
      }));
      console.log(authUser);
    }
    else {
       dispatch(logout());
    }
  })
}, [dispatch]);
  return (
    <div className="App">
     {
      user ? (<Quora></Quora>) :(<Login></Login>)
     }
      <Router>
        <Switch>
          <Route path ='/admin'>
              <Quora></Quora>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
