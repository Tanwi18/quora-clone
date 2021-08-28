import React, { useState } from 'react';
import './Login.css';
// import { FcGoogle } from "react-icons/fc";
import { auth } from '../../components/firebase/firebase';
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { GoogleAuthProvider } from "firebase/auth";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const provider = new GoogleAuthProvider();


const Login = () => {
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    auth.signInWithPopup(provider).catch((e) => {
      alert(e.message);
    });
  };

  // const handleGoogleSignIn = () =>{
  //   const auth = getAuth();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // ...
  //     }).catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // }

  const handleSignIn = (e) => {
    e.preventDefault();

  //   auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((auth) => {
  //       console.log(auth);
  //     })
  //     .catch((e) => alert(e.message));
  // };

  // const registerSignIn = (e) => {
  //   e.preventDefault();

  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((auth) => {
  //       if (auth) {
  //         console.log(auth);
  //       }
  //     })
  //     .catch((e) => alert(e.message));
  // };
  }

return (
  <div className="login">
    <div className="login__container">
      <div className="login__logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScoFVae52utBrTkyL74XmjhO2iVzeWTA0vqA&usqp=CAU"
          alt=""
        />
      </div>
      <div className="login__desc">
        <p>Learn To Ask</p>
        <p style={{ color: "royalblue", fontSize: "25px" }}>
         Created with ❤️ by{" "}
        </p>
        <h3>TEAM BOOLEAN</h3>
      </div>
      <div className="login__auth">
        <div className="login__authOptions">
          <div className="login__authOption">
            <img
              className="login__googleAuth"
              src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
              alt=""
            />
            <p onClick={signIn}>Continue With Google</p>
          </div>
          <div className="login__authOption">
            <img
              className="login__googleAuth"
              src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png"
              alt=""
            />
            <span>Continue With Facebook</span>
          </div>
          <div className="login__authDesc">
            <p>
              <span style={{ color: "blue", cursor: "pointer" }}>
                Sign Up With Email
              </span>
              . By continuing you indicate that you have read and agree to
              Quora's
              <span style={{ color: "blue", cursor: "pointer" }}>
                Terms of Service{" "}
              </span>
              and{" "}
              <span style={{ color: "blue", cursor: "pointer" }}>
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
        <div className="login__emailPass">
          <div className="login__label">
            <h4>Login</h4>
          </div>
          <div className="login__inputFields">
            <div className="login__inputField">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="login__inputField">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="login__forgButt">
            <small>Forgot Password?</small>
            <button >Login</button>
          </div>
          <button >Register</button>
        </div>
      </div>
      <div className="login__lang">
        <p> বাংলা </p>
        <ArrowForwardIosIcon fontSize="small" />
      </div>
      <div className="login__footer">
        <p>About</p>
        <p>Languages</p>
        <p>Careers</p>
        <p>Businesses</p>
        <p>Privacy</p>
        <p>Terms</p>
        <p>Contact</p>
        <p>&copy; Quora Fake Inc. 2021</p>
      </div>
    </div>
  </div>
);
  }


export default Login;


// Tanwi 
//   const [email, setEmail]=useState('');
  //   const [password, setPassword] =useState('');

  //   const handleSetEmail=(e)=>{
  //     setEmail(e.target.value)
  //   }

  //   const handleSetPassword =(e)=>{
  //     setPassword(e.target.value)
  //   }

  //    console.log(email)
  //   console.log(password)

  //  const handleGoogleSignIn=(e)=>{

  //       auth.signInWithPopup(provider)
  // .then((result) => {
  //   var user = result.user;
  //   // setEmail(user.email)
  //   console.log(user)
  //   // ...
  // }).catch((error) => {
  //   alert(error.massage);
  // });
  //     }


  // const handleLogIn=(e)=>{
  //   e.preventDefault();

  //   auth.signInWithEmailAndPassword(email, password)
  //   .then((auth)=>{
  //     console.log(auth)
  //     alert('logged in successfully')
  //   })
  //   .catch((error) => {
  //     alert(error.message);
  //   });
  //   setEmail('');
  //   setPassword('');
  // }


  // const handleSignUp =(e)=> {
  //   e.preventDefault();

  //   auth.createUserWithEmailAndPassword(email, password)
  //   .then((auth)=>{
  //          if(auth){
  //            console.log(auth);
  //            alert('signed up successfully')
  //          }
  //   }
  //   )
  //   .catch((error) => {
  //     alert(error.message);
  //     console.log(error)
      
  //   });
  //   setEmail('');
  //     setPassword('');
  // }

  //     return (
//         <div className="login">
//             <div className="login-input">
//               <input type="text" placeholder="Email" name="email"
//                 value={email} 
//                 onChange={handleSetEmail}
//               >

//               </input>
//               <input type="password" placeholder="Password"
//                value={password}
//                  onChange={handleSetPassword}
//               >

//               </input>
//               <button onClick={handleSignUp}>Sign Up</button>
//               <button type="submit" onClick={handleLogIn}>Login</button>
//             </div>
//             <div className="google-signIn">
//                 {/* <FcGoogle></FcGoogle> */}
//                <button
//                  onClick={handleGoogleSignIn}
//                 >Google Sign In</button>
//             </div>
//         </div>
//     );
// };
