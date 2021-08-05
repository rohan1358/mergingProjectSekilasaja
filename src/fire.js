import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyApoZSX1Cuobr23CtzNHHWnmBFj_GyKUFQ",
    authDomain: "sekilasaja-999fd.firebaseapp.com",
    projectId: "sekilasaja-999fd",
    storageBucket: "sekilasaja-999fd.appspot.com",
    messagingSenderId: "424228306771",
    appId: "1:424228306771:web:e38b5c2bee9fa3e7ab2ba6"
  };

const fire = firebase.initializeApp(firebaseConfig);

export default fire;