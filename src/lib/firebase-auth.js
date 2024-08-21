import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {app} from "@/lib/firebase";
//import {useRouter} from "next/navigation";

const auth = getAuth(app);

const verifyLogin = (router, setAuthenticated, setUser, setLoading) => {
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const nome = user.displayName;
      setAuthenticated(true);
      setUser(nome);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      setTimeout(() => {
        router.push("/sign_in");
      }, 2000);
      setAuthenticated(false);
    }
  });
}
  
  
const loginWithEmailAndPassword = (router, props, setLoading, setError) => {
  signInWithEmailAndPassword(auth, props.email, props.password)
    .then((userCredential) => {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    })
    .catch((error) => {
      setLoading(false);
      const errorMessage = error.message;
      setError(errorMessage);
    });
}

export {loginWithEmailAndPassword, verifyLogin}