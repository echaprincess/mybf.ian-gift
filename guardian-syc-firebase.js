import { firebaseConfig } from "./firebase-config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.connectGuardian = async function () {
  const name = document.getElementById("name").value;
  const birthday = document.getElementById("birthday").value;

  await setDoc(doc(db, "guardian", "status"), {
    connected: true,
    name,
    birthday,
    lastSeen: new Date().toISOString()
  });

  alert("Guardian Connected Successfully 💙");
};
