import { Button } from "@mui/material";
import React from "react";
import "./Login.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "./firebase";

function Login() {
  const googleHandler = async () => {
    // provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://i.postimg.cc/Xv9J138r/IMessage-logo-Apple-Inc.png"
          alt="Chatsio logo"
        />
        <h1>Chatsio</h1>
      </div>

      <Button onClick={googleHandler}>Sign In</Button>
    </div>
  );
}

export default Login;
