import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import {app} from "@/lib/firebase";
import {updateAccount} from "@/lib/firebase-account";

const auth = getAuth(app);

const verifyLogin = (props, onSettings) => {
  
  if (onSettings) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        props.setEmail(auth.currentUser.email);
        props.setDisplayName(auth.currentUser.displayName);
        setTimeout(() => {
          props.setLoading(false);
        }, 1000);
      } else {
        props.router.push("/sign_in");
      }
    });
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let nome = user.displayName;
        
        if (nome == null) {
          let email  = auth.currentUser.email
          email = email.split('@')[0];
          updateProfile(auth.currentUser, { displayName: email });
          nome = user.displayName;
        } 
        
        props.setAuthenticated(true);
        props.setUser(nome);
        setTimeout(() => {
          props.setLoading(false);
        }, 2000);
      } else {
        setTimeout(() => {
          props.router.push("/sign_in");
        }, 2000);
        props.setAuthenticated(false);
      }
    });
  }
  
}
  
  
const loginWithEmailAndPassword = (props) => {
  signInWithEmailAndPassword(auth, props.email, props.password)
    .then((userCredential) => {
      setTimeout(() => {
        props.router.push("/");
      }, 1000);
    })
    .catch((error) => {
      props.setLoading(false);
      const errorMessage = error.message;
      props.setError(errorMessage);
    });
}

const signupWithEmailAndPassword = (props) => {
  createUserWithEmailAndPassword(auth, props.email, props.password).then((userCredential) => {
    updateProfile(auth.currentUser, {
      displayName: `${props.name} ${props.lastName}`
    });
  });
}

const logout = (props) => {
  auth.signOut();
  props.setLoading(true);
  setTimeout(() => {
    props.router.push("/sign_in");
  }, 1000);
}

export {auth, verifyLogin, signupWithEmailAndPassword, loginWithEmailAndPassword, logout}