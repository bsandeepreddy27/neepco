// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { doc, getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";

// Firebase Configuration Object
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign Up Form Handling
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    // Create New User with Email and Password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update Display Name with the provided username
    await updateProfile(userCredential.user, { displayName: username });

    // Save user data to Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      username: username,
      email: email,
      createdAt: new Date()
    });

    alert("Account created successfully!");
    window.location.href = "dashboard.html"; // Redirect after successful signup
  } catch (error) {
    console.error("Signup Error:", error.message);
    alert("Signup failed: " + error.message);
  }
});

// Login Form Handling
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Sign in with Email and Password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");

    // Redirect to Dashboard after successful login
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Login Error:", error.message);
    alert("Login failed: " + error.message);
  }
});

// Firebase Authentication State and Logout Handling
onAuthStateChanged(auth, (user) => {
  if (user) {
    // If the user is logged in, hide login and signup links, show logout link
    document.getElementById("login-link").style.display = "none";
    document.getElementById("signup-link").style.display = "none";
    document.getElementById("logout-link").style.display = "inline";
  } else {
    // If no user is logged in, show login and signup links, hide logout link
    document.getElementById("login-link").style.display = "inline";
    document.getElementById("signup-link").style.display = "inline";
    document.getElementById("logout-link").style.display = "none";
  }
});

// Logout functionality
document.getElementById("logout-link")?.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
    window.location.href = "index.html"; // Redirect to home after logging out
  } catch (error) {
    console.error("Logout Error:", error.message);
    alert("Logout failed: " + error.message);
  }
});
