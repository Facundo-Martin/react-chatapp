import { Button } from "@mui/material";
import React from "react";
import "./Login.css";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "./firebase";
import Typed from "react-typed";

function Login() {
  const googleHandler = async () => {
    // provider.setCustomParameters({ prompt: "select_account" });
    const provider = new GoogleAuthProvider();

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

  const facebookHandler = async () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  const anonymousHandler = async () => {
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
        <h1>
          <Typed
            strings={["Chatsio...", "Sign In to Chat!"]}
            typeSpeed={100}
            backSpeed={50}
            loop
          />
        </h1>
      </div>

      <Button onClick={googleHandler}>
        <img
          className="login__button-icon"
          src="https://img.icons8.com/color/344/google-logo.png"
          alt="Google Logo"
        />
        Sign In with Google
      </Button>
      <Button onClick={facebookHandler}>
        <img
          className="login__button-icon"
          src="https://img.icons8.com/fluency/452/facebook.png"
          alt="Google Logo"
        />
        Sign In with Facebook
      </Button>
      <Button onClick={anonymousHandler}>
        <img
          className="login__button-icon"
          src="https://img.icons8.com/ios-glyphs/452/user--v1.png"
          alt="Google Logo"
        />
        Sign In as Guest
      </Button>
    </div>
  );
}

export default Login;
