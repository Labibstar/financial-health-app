import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyAQEXPHbDoToKMEWhvd2wbHyU6EtER9mvE",
    authDomain: "financial-health-app-38ed6.firebaseapp.com",
    projectId: "financial-health-app-38ed6",
    storageBucket: "financial-health-app-38ed6.appspot.com",
    messagingSenderId: "253196588766",
    appId: "1:253196588766:web:131c241bc0a9c4034a544f",
    measurementId: "G-FVMTGVY87Z"
  };
  
  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);
  
  

  export default firebaseapp;