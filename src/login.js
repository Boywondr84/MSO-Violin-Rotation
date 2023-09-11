// CSS imports
import "spectre.css";
import "./style.css";

// Firebase import
import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIvjMfNmUtDkaQmEiEu3D0ib1RhMI-o8Q",
  authDomain: "mso-violin-i-rotation.firebaseapp.com",
  projectId: "mso-violin-i-rotation",
  storageBucket: "mso-violin-i-rotation.appspot.com",
  messagingSenderId: "1032349611479",
  appId: "1:1032349611479:web:5d03da1703b054e43c8792",
};

const APP = initializeApp(firebaseConfig);
const AUTH = getAuth(APP);

const LOGIN_ERROR = document.querySelector(".loginError");
let URL =
  "file:///C:/Users/ryank/Desktop/projects/Firestore/MSO_Violin_Rotation_Dee/MSO-Violin-Rotation/dist/index.html";

// set this up as its own page? on successful signup or login redirect?
// login form

const LOGIN_FORM = document.querySelector(".form-group-login");
LOGIN_FORM.addEventListener("submit", (event) => {
  event.preventDefault();

  const loginEmail = LOGIN_FORM.loginEmail.value;
  const loginPW = LOGIN_FORM.loginPassword.value;

  signInWithEmailAndPassword(AUTH, loginEmail, loginPW)
    .then((cred) => {
      const USER = cred.user;
      console.log(USER, "logged in");
      if (!cred.user) {
        return;
      } else {
        // MODAL_FILTER.classList.remove("active");
        // GET_TABLE.classList.remove("blurTable");
        window.location = URL;
      }
    })
    .catch((err) => {
      console.log(err.message);
      LOGIN_FORM.reset();

      const errLogin = document.createElement("h4");
      errLogin.innerHTML = "User not found!";
      LOGIN_ERROR.appendChild(errLogin);

      const myTimeout = setTimeout(myErrorMsg, 4000);

      function myErrorMsg() {
        errLogin.innerHTML = "";
      }
      myTimeout();
    });
});

// // logout form
// const LOGOUT = document.querySelector(".logout");
// LOGOUT.addEventListener("click", () => {
//   signOut(AUTH)
//     .then(() => {
//       console.log("logged out");
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

// signup form
const SIGNUP_FORM = document.querySelector(".form-group-signup");
SIGNUP_FORM.addEventListener("submit", (event) => {
  event.preventDefault();

  const signupEmail = SIGNUP_FORM.signupEmail.value;
  const signupPW = SIGNUP_FORM.signupPassword.value;

  createUserWithEmailAndPassword(AUTH, signupEmail, signupPW)
    .then((cred) => {
      console.log(cred.user, " created");
      if (!cred.user) {
        return;
      } else {
        alert("Thank you for signing up! Now you may log in.");
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
});
