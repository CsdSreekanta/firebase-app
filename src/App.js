import "./App.css";
import app from "./firebase.init";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(() => {
        setUser({});
      });
  };

  const googleSingIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const gitHubSignIn= ()=>{
    signInWithPopup( auth, gitProvider)
    .then((result)=>{
      const user = result.user;
     
      console.log(user)
    })
    .catch((error)=>{
      console.error(error)
    })
  }
  return (
    <div className="App">
      {user.email ? (
        <button onClick={handleSignOut}>SignOut</button>
      ) : (
        <div>
          <button onClick={googleSingIn}>GoogleSingIn</button>
          <button onClick={gitHubSignIn}>gitHubSingIn</button>
        </div>
      )}
      <h1>{user.displayName}</h1>
    </div>
  );
}

export default App;
