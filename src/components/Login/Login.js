import React, { useState } from 'react';
import './Login.css';
// import { FcGoogle } from "react-icons/fc";
import { auth, provider } from '../../components/firebase/firebase';

const Login = () => {
    const [email, setEmail]=useState('');
    const [password, setPassword] =useState('');

    const handleSetEmail=(e)=>{
      setEmail(e.target.value)
    }

    const handleSetPassword =(e)=>{
      setPassword(e.target.value)
    }

     console.log(email)
    console.log(password)

   const handleGoogleSignIn=(e)=>{

        auth.signInWithPopup(provider)
  .then((result) => {
    var user = result.user;
    // setEmail(user.email)
    console.log(user)
    // ...
  }).catch((error) => {
    alert(error.massage);
  });
      }


  const handleLogIn=(e)=>{
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .then((auth)=>{
      console.log(auth)
      alert('logged in successfully')
    })
    .catch((error) => {
      alert(error.message);
    });
    setEmail('');
    setPassword('');
  }


  const handleSignUp =(e)=> {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((auth)=>{
           if(auth){
             console.log(auth);
             alert('signed up successfully')
           }
    }
    )
    .catch((error) => {
      alert(error.message);
      console.log(error)
      
    });
    setEmail('');
      setPassword('');
  }
      
    return (
        <div className="login">
            <div className="login-input">
              <input type="text" placeholder="Email" name="email"
                value={email} 
                onChange={handleSetEmail}
              >

              </input>
              <input type="password" placeholder="Password"
               value={password}
                 onChange={handleSetPassword}
              >

              </input>
              <button onClick={handleSignUp}>Sign Up</button>
              <button type="submit" onClick={handleLogIn}>Login</button>
            </div>
            <div className="google-signIn">
                {/* <FcGoogle></FcGoogle> */}
               <button
                 onClick={handleGoogleSignIn}
                >Google Sign In</button>
            </div>
        </div>
    );
};

export default Login;