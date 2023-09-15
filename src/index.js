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
  deleteField,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
  FieldValue,
  QuerySnapshot,
  onValue,
} from "firebase/firestore";

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

const DB = getFirestore();
const AUTH = getAuth(APP);
onAuthStateChanged(AUTH, (user) => {
  if (user) {
    const UID = user.uid;
    console.log(UID);

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

    // fetch & update single violinists' db data
    const VLN_DATA_DISPLAY = document.querySelector(".updateVlnData");
    const VLN_DATA_DISPLAY_NAME = document.getElementById("displayName");
    const VLN_DATA_ADJ_ROTATION_EL = document.getElementById("adjRotationEl");
    const VLN_DATA_RNOC_EL = document.getElementById("rnocEl");
    const VLN_DATA_ON_CALL_EL = document.getElementById("onCallEl");
    const VLN_DATA_ROTATION_EL = document.getElementById("rotationEl");
    const VLN_DATA_MINUTES_EL = document.getElementById("minutesEl");

    // modal
    const MODAL_OPEN = document.querySelector(".modal");
    // const MODAL_FILTER = document.querySelector(".modal1");

    // dynamically display any leave data
    const GET_LEAVE_DATE = document.getElementById("leaveDateDB");
    const GET_LEAVE_TYPE = document.getElementById("leaveTypeDB");
    const GET_LEAVE_NOTES = document.getElementById("leaveNotesDB");
    const DELETE_LEAVE = document.getElementById("leaveDelete");

    // const LOGIN_ERROR = document.querySelector(".loginError");

    // Log out
    let logOut = "./login.html";

    // get all collection data
    getDocs(COLREF)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          violinistsData.push({ ...doc.data(), id: doc.id });
        });
        for (let i = 1; i <= violinistsData.length; i++) {
          // console.log(violinistsData[i].leave);

          // Violinists sorted by position
          const SORTVIOLINS = violinistsData;
          SORTVIOLINS.sort((a, b) => {
            return a.position - b.position;
          });

          // Fetch form pulls names from DB and uses ID values to submit for data retrieval
          // get by id form action begins at line 208

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

          // dynamically displayed DB data to DOM table
          fullViolinName.innerHTML = `${violinistsData[i].firstName} ${violinistsData[i].lastName}`;
          VLN_FULL_NAME.appendChild(fullViolinName);

          fullViolinAdjRotation.innerHTML = violinistsData[i].adjRotation;
          if (
            (violinistsData[i].adjRotation > 0 &&
              violinistsData[i].adjRotation <= 1) ||
            (violinistsData[i].adjRotation < 0 &&
              violinistsData[i].adjRotation >= -1)
          ) {
            fullViolinAdjRotation.innerHTML = `${violinistsData[i].adjRotation} service`;
          } else if (
            violinistsData[i].adjRotation <= 0 ||
            violinistsData[i].adjRotation > 1
          ) {
            fullViolinAdjRotation.innerHTML = `${violinistsData[i].adjRotation} services`;
          } else {
            fullViolinAdjRotation.innerHTML = "None";
          }
          VLN_ADJUSTED_ROTATION.appendChild(fullViolinAdjRotation);

          fullViolinRNOC.innerHTML = violinistsData[i].rnocTime;
          if (violinistsData[i].rnocTime == 1) {
            fullViolinRNOC.innerHTML = `${violinistsData[i].rnocTime} service`;
          } else if (violinistsData[i].rnocTime > 1) {
            fullViolinRNOC.innerHTML = `${violinistsData[i].rnocTime} services`;
          } else {
            fullViolinRNOC.innerHTML = "None";
          }
          VLN_RNOC.appendChild(fullViolinRNOC);

          fullViolinOnCall.innerHTML = violinistsData[i].onCallTime;
          if (violinistsData[i].onCallTime == 1) {
            fullViolinOnCall.innerHTML = `${violinistsData[i].onCallTime} service`;
          } else if (violinistsData[i].onCallTime > 1) {
            fullViolinOnCall.innerHTML = `${violinistsData[i].onCallTime} services`;
          } else {
            fullViolinOnCall.innerHTML = "None";
          }
          VLN_ON_CALL.appendChild(fullViolinOnCall);

          fullViolinRotation.innerHTML = violinistsData[i].rotationTime;
          if (violinistsData[i].rotationTime == 1) {
            fullViolinRotation.innerHTML = `${violinistsData[i].rotationTime} service`;
          } else if (violinistsData[i].rotationTime > 1) {
            fullViolinRotation.innerHTML = `${violinistsData[i].rotationTime} services`;
          } else {
            fullViolinRotation.innerHTML = "None";
          }
          // rotation background color changes based on count
          if (violinistsData[i].rotationTime >= 12) {
            fullViolinRotation.setAttribute("class", "Danger");
          }
          VLN_ROTATION.appendChild(fullViolinRotation);

          fullViolinMinutes.innerHTML = violinistsData[i].minutesTime;
          if (violinistsData[i].minutesTime == 1) {
            fullViolinMinutes.innerHTML = `${violinistsData[i].minutesTime} minute`;
          } else if (violinistsData[i].minutesTime > 1) {
            fullViolinMinutes.innerHTML = `${violinistsData[i].minutesTime} minutes`;
          } else {
            fullViolinMinutes.innerHTML = "None";
          }
          VLN_MINUTES.appendChild(fullViolinMinutes);
        }
      })
      .catch((err) => {
        console.log(err);
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

        // destructuring violinDataByID[0]
        const {
          adjRotation,
          firstName,
          lastName,
          leave,
          minutesTime,
          onCallTime,
          rnocTime,
          rotationTime,
        } = violinDataByID[0];
        // console.log(leave);

        // Player DB data displayed in update form
        VLN_DATA_DISPLAY.removeAttribute("id", "hidden");
        VLN_DATA_DISPLAY_NAME.innerHTML = `Data for ${firstName} ${lastName}:`;

        VLN_DATA_ADJ_ROTATION_EL.value = `${adjRotation}`;
        if (!VLN_DATA_ADJ_ROTATION_EL.value) {
          VLN_DATA_ADJ_ROTATION_EL.value = 0;
        }

        VLN_DATA_RNOC_EL.value = `${rnocTime}`;
        if (!VLN_DATA_RNOC_EL.value) {
          VLN_DATA_RNOC_EL.value = 0;
        }

        VLN_DATA_ON_CALL_EL.value = `${onCallTime}`;
        if (!VLN_DATA_ON_CALL_EL.value) {
          VLN_DATA_ON_CALL_EL.value = 0;
        }

        VLN_DATA_ROTATION_EL.value = `${rotationTime}`;
        if (!VLN_DATA_ROTATION_EL.value) {
          VLN_DATA_ROTATION_EL.value = 0;
        }

        VLN_DATA_MINUTES_EL.value = `${minutesTime}`;
        if (!VLN_DATA_MINUTES_EL.value) {
          VLN_DATA_MINUTES_EL.value = 0;
        }

        // Modal table create dynamically
        // loop over player leave data here

        for (let i = 0; i < leave.length; i++) {
          let rowNum = i;

          // dynamically create 'tr' in Modal display
          let fullViolinLeaveDate = document.createElement("tr");
          fullViolinLeaveDate.innerHTML = leave[i].date;
          GET_LEAVE_DATE.appendChild(fullViolinLeaveDate);

          let fullViolinLeaveType = document.createElement("tr");
          fullViolinLeaveType.innerHTML = leave[i].type;
          GET_LEAVE_TYPE.appendChild(fullViolinLeaveType);

          let fullViolinLeaveNote = document.createElement("tr");
          fullViolinLeaveNote.innerHTML = leave[i].message;
          GET_LEAVE_NOTES.appendChild(fullViolinLeaveNote);

          let violinLeaveDelete = document.createElement("tr", "button");
          violinLeaveDelete.classList.add("btn", "deleteRow");
          violinLeaveDelete.setAttribute("id", `deleteBtn-${rowNum}`);
          violinLeaveDelete.innerHTML = "Delete";
          // violinLeaveDelete.value = `${playerLeave[i].date} ${playerLeave[i].type} ${playerLeave[i].message}`;
          DELETE_LEAVE.appendChild(violinLeaveDelete);
        }
      });
    });

    const UPDATE_VLN_FORM = document.querySelector(".updateVlnData");
    UPDATE_VLN_FORM.addEventListener("submit", (event) => {
      event.preventDefault();

      const DOCREF = doc(DB, "Violinists", violinFormId[0]);

      updateDoc(DOCREF, {
        adjRotation: UPDATE_VLN_FORM.adjRotation.value,
        rnocTime: UPDATE_VLN_FORM.rnocTime.value,
        onCallTime: UPDATE_VLN_FORM.onCallTime.value,
        rotationTime: UPDATE_VLN_FORM.rotationTime.value,
        minutesTime: UPDATE_VLN_FORM.minutesTime.value,
      }).then(() => {
        alert(
          `Data Updated for ${violinDataByID[0].firstName} ${violinDataByID[0].lastName}`
        );
        window.location.reload();
      });
      UPDATE_VLN_FORM.setAttribute("id", "hidden");
    });

    // Reset button
    const BTN_RESET = document.getElementById("startOver");
    BTN_RESET.addEventListener("click", function () {
      // UPDATE_VLN_FORM.setAttribute("id", "hidden");
      window.location.reload();
    });

    let leaveBtn = document.getElementById("requestForm");
    leaveBtn.addEventListener("click", function (event) {
      event.preventDefault();
      MODAL_OPEN.classList.add("active");
    });

    let leaveBtnClose = document.getElementById("closeModal");
    leaveBtnClose.addEventListener("click", function () {
      MODAL_OPEN.classList.remove("active");
    });

    // Modal save
    const ADD_LEAVE_FORM = document.querySelector(".leave-data");
    ADD_LEAVE_FORM.addEventListener("submit", (event) => {
      event.preventDefault();

      const DOCREF = doc(DB, "Violinists", violinFormId[0]);

      updateDoc(DOCREF, {
        leave: arrayUnion({
          date: leaveDate.value,
          type: leaveType.value,
          message: leaveMessage.value,
        }),
      }).then(() => {
        alert("Leave submitted successfully!");
        ADD_LEAVE_FORM.reset();
      });
    });

    // Modal delete buttons - currently deletes all leave data - possible to delete one index at a time?
    const DELETE_THIS_ROW = document.querySelector(".deleteRow");
    DELETE_THIS_ROW.addEventListener("click", (event) => {
      event.preventDefault();

      // const DOCREF = doc(DB, "Violinists", violinFormId[0]);

      // updateDoc(DOCREF, {
      //   leave: deleteField(),
      // }).then(() => {
      //   alert("Leave Deleted!");
      // }),
      alert("Delete currently unavailable. Contact admin for manual deletion.");
    });

    // signup and login form in login.js
    // logout form
    const LOGOUT = document.querySelector(".logoutUser");
    LOGOUT.addEventListener("click", () => {
      signOut(AUTH)
        .then(() => {
          window.location = logOut;
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  } else {
    // alert("Need to log in");
    window.location = logOut;
    return;
  }
});
