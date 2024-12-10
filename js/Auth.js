// Firebase Configuration for Sign Up and Login 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

// Firebase Configuration Object
const firebaseConfig = {
    apiKey: "AIzaSyDfImdWgYRjEiItPckbWzJsYY7Yi6fud14",
    authDomain: "neepco-p.firebaseapp.com",
    projectId: "neepco-p",
    storageBucket: "neepco-p.firebasestorage.app",
    messagingSenderId: "728646816054",
    appId: "1:728646816054:web:7ebdad137c19ee9d9b6397"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up Form Handling
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    // Create New User with Email and Password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update Display Name with the provided username
    await updateProfile(userCredential.user, {
      displayName: username
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
    // Sign in with Email and Password using Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");

    // Redirect to Dashboard after successful login
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Login Error:", error.message);
    alert("Login failed: " + error.message);
  }
});

// Firebase Configuration for Authentication State and Logout
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

// Initialize Firebase for Authentication State
const appAuth = initializeApp(firebaseConfig);
const authState = getAuth(appAuth);

// Handle User Authentication State
onAuthStateChanged(authState, (user) => {
  if (user) {
    // If the user is logged in, hide the login and signup links, show logout link
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
  const auth = getAuth();
  try {
    await signOut(auth);
    alert("Logged out successfully!");
    window.location.href = "index.html"; // Redirect to home after logging out
  } catch (error) {
    console.error("Logout Error:", error.message);
    alert("Logout failed: " + error.message);
  }
});
