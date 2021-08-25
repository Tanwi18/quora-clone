import React, { useEffect } from 'react';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import Quora from './components/Quora/Quora';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import Login from './components/Login/Login';
import { auth } from './components/firebase/firebase';

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
      
    </div>
  );
}

export default App;
