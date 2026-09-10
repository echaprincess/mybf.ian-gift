import { firebaseConfig } from "./firebase-config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.connectGuardian = async function () {
  const nameInput = document.getElementById("name");
  const birthdayInput = document.getElementById("birthday");
  const btn = document.getElementById("connectBtn");
  const name = nameInput ? nameInput.value.trim() : "";
  const birthday = birthdayInput ? birthdayInput.value : "";

  if (!name) {
    alert("Please enter Guardian Name");
    return;
  }

  try {
    if (btn) {
      btn.disabled = true;
      btn.innerText = "Connecting...";
    }

    await setDoc(doc(db, "guardian", "status"), {
      connected: true,
      name,
      birthday,
      lastSeen: new Date().toISOString()
    });

    const successEl = document.getElementById("success");
    if (successEl) {
      successEl.style.display = "block";
    }
    if (btn) {
      btn.innerText = "Connected Successfully ✅";
    }
  } catch (error) {
    console.error("Error connecting guardian:", error);
    alert("Error connecting guardian: " + error.message);
    if (btn) {
      btn.disabled = false;
      btn.innerText = "Connect Guardian";
    }
  }
};
