import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyCKqE-uNTT1zyyHICAlvffWpvAjneaVspo",
    authDomain: "projeto-bloco-infnet.firebaseapp.com",
    databaseURL: "https://projeto-bloco-infnet-default-rtdb.firebaseio.com",
    projectId: "projeto-bloco-infnet",
    storageBucket: "projeto-bloco-infnet.appspot.com",
    messagingSenderId: "894934387454",
    appId: "1:894934387454:web:e542e5fd3b6c8f17bd33af",
    measurementId: "G-MMJM3GCK29"
};

const app = initializeApp(firebaseConfig);

export { app }