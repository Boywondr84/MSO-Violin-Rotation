// CSS imports
import "spectre.css";
import "./style.css";

// Firebase import
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIvjMfNmUtDkaQmEiEu3D0ib1RhMI-o8Q",
  authDomain: "mso-violin-i-rotation.firebaseapp.com",
  projectId: "mso-violin-i-rotation",
  storageBucket: "mso-violin-i-rotation.appspot.com",
  messagingSenderId: "1032349611479",
  appId: "1:1032349611479:web:5d03da1703b054e43c8792",
};

initializeApp(firebaseConfig);

const DB = getFirestore();

// collection reference from DB
const COLREF = collection(DB, "Violinists");

// Violinists DB Data
let violinistsData = [{}];

// get by ID form
const GET_MSO_VIOLINIST = document.getElementById("get-violinist-select");
const GET_MSO_DATA = document.querySelector(".getID");

// get all collection data
getDocs(COLREF).then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    violinistsData.push({ ...doc.data(), id: doc.id });
  });
  for (let i = 1; i <= violinistsData.length; i++) {
    // console.log(violinistsData[1]);

    // Violinists sorted by position
    const SORTVIOLINS = violinistsData;
    SORTVIOLINS.sort((a, b) => {
      return a.position - b.position;
    });

    // get form pull names from DB and uses ID values to submit for data retrieval
    // get by id form action begins at line
    let getSelectedViolinist = document.createElement("option");
    getSelectedViolinist.text = `${violinistsData[i].firstName} ${violinistsData[i].lastName}`;
    getSelectedViolinist.value = violinistsData[i].id;
    GET_MSO_VIOLINIST.appendChild(getSelectedViolinist);
  }
});

// add a violinist
const ADD_VIOLINIST_FORM = document.querySelector(".form-group-add");
ADD_VIOLINIST_FORM.addEventListener("submit", (event) => {
  event.preventDefault();

  addDoc(COLREF, {
    firstName: ADD_VIOLINIST_FORM.first.value,
    lastName: ADD_VIOLINIST_FORM.last.value,
    position: ADD_VIOLINIST_FORM.position.value,
  }).then(() => {
    alert(
      `Violinist ${ADD_VIOLINIST_FORM.first.value} ${ADD_VIOLINIST_FORM.last.value} added successfully!`
    );
    ADD_VIOLINIST_FORM.reset();
    window.location.reload();
  });
});

// delete violinist
const DELETE_VIOLINIST = document.querySelector(".getVlnDataById");
DELETE_VIOLINIST.addEventListener("submit", (event) => {
  event.preventDefault();

  const DOCREF = doc(DB, "Violinists", GET_MSO_DATA.value);

  deleteDoc(DOCREF).then(() => {
    alert("Violinist deleted!");
    window.location.reload();
  });
});
