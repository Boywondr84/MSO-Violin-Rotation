// CSS imports
import "spectre.css";
import "./style.css";

// Firebase import
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
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

// get violinist data - Fetch form
let violinFormId = [];

// holds single violinist data from Fetch
let violinDataByID = [];

// get by ID form
const GET_MSO_VIOLINIST = document.getElementById("get-violinist-select");
const GET_MSO_DATA = document.querySelector(".getID");

// display violin data dynamically
const VLN_FULL_NAME = document.getElementById("fullName");
const VLN_ADJUSTED_ROTATION = document.getElementById("adjustedRotation");
const VLN_RNOC = document.getElementById("rnoc");
const VLN_ON_CALL = document.getElementById("onCall");
const VLN_ROTATION = document.getElementById("rotation");
const VLN_MINUTES = document.getElementById("minutes");

// get all collection data
getDocs(COLREF).then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    violinistsData.push({ ...doc.data(), id: doc.id });
  });
  for (let i = 1; i <= violinistsData.length; i++) {
    // console.log(violinistsData[i].adjRotation);

    // Violinists sorted by position
    const SORTVIOLINS = violinistsData;
    SORTVIOLINS.sort((a, b) => {
      return a.position - b.position;
    });

    // Fetch form pulls names from DB and uses ID values to submit for data retrieval
    // get by id form action begins at line 111
    let getSelectedViolinist = document.createElement("option");
    getSelectedViolinist.text = `${violinistsData[i].firstName} ${violinistsData[i].lastName}`;
    getSelectedViolinist.value = violinistsData[i].id;
    GET_MSO_VIOLINIST.appendChild(getSelectedViolinist);

    // variables to dynamically create 'td' in DB display
    let fullViolinName = document.createElement("tr");
    let fullViolinAdjRotation = document.createElement("tr");
    let fullViolinRNOC = document.createElement("tr");
    let fullViolinOnCall = document.createElement("tr");
    let fullViolinRotation = document.createElement("tr");
    let fullViolinMinutes = document.createElement("tr");

    fullViolinName.innerHTML = `${violinistsData[i].firstName} ${violinistsData[i].lastName}`;
    VLN_FULL_NAME.appendChild(fullViolinName);

    fullViolinAdjRotation.innerHTML = violinistsData[i].adjRotation;
    VLN_ADJUSTED_ROTATION.appendChild(fullViolinAdjRotation);

    fullViolinRNOC.innerHTML = violinistsData[i].rnoc;
    VLN_RNOC.appendChild(fullViolinRNOC);
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
const DELETE_VIOLINIST = document.querySelector(".delete");
DELETE_VIOLINIST.addEventListener("submit", (event) => {
  event.preventDefault();

  const DOCREF = doc(DB, "Violinists", GET_MSO_DATA.value);

  deleteDoc(DOCREF).then(() => {
    alert("Violinist deleted!");
    window.location.reload();
  });
});

// get data for violinist
const GET_DATA = document.querySelector(".getVlnData");
GET_DATA.addEventListener("submit", (event) => {
  event.preventDefault();
  violinFormId.push(GET_MSO_DATA.value);
  const DOCREF = doc(DB, "Violinists", GET_MSO_DATA.value);

  getDoc(DOCREF).then((doc) => {
    violinDataByID.push({ ...doc.data() });
    // console.log(violinDataByID[0]);
  });
});
