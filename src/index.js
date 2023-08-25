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

// delete violinist
// const DELETE_VIOLINIST_BY_ID = document.getElementById(
//   "delete-violinist-by-id"
// );

// get all collection data
getDocs(COLREF).then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    violinistsData.push({ ...doc.data(), id: doc.id });
  });
  for (let i = 1; i <= violinistsData.length; i++) {
    console.log(violinistsData[1]);

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
