import {auth} from './firebase-auth'
import {EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile} from "firebase/auth";

const reauthenticateCurrentUser =  (props) => {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, props.password);
  
  reauthenticateWithCredential(user,  credential).then( (response) => {
    props.setOpenModalReauthenticate(false);
    props.setOpenModal(true);
    props.setError("");
  }).catch((error) => {
    props.setError(error.message);
  });
}

const updateAccount = (props, isPassword) => {
  if(isPassword) {
    updatePassword(auth.currentUser, props.newPassword)
      .then(() => {
        props.setOpenModal(false);
      })
      .catch((error) => {
        props.setError(error.message);
      });
    
  } else {
    updateProfile(auth.currentUser, { displayName: props.newDisplayName })
      .then(() => {
        props.setDisplayName(props.newDisplayName);
        props.setOpenModal(false);
      })
      .catch((error) => {
        props.setError(error.message);
      });
  }
  
}

function resetPassword(props) {
  if (props.email.length > 0) {
    props.sendPasswordResetEmail(auth, props.email)
      .then(() => {
        props.setSuccess(true);
      })
      .catch((error) => {
        const message = error.message;
        props.setError(message)
      })
  }
}

export {reauthenticateCurrentUser, updateAccount, resetPassword};