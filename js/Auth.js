// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-auth.js";

// Firebase configuration (Replace this with your project config)
const firebaseConfig = {
    apiKey: "AIzaSyDfImdWgYRjEiItPckbWzJsYY7Yi6fud14",
    authDomain: "neepco-p.firebaseapp.com",
    projectId: "neepco-p",
    storageBucket: "neepco-p.firebasestorage.app",
    messagingSenderId: "728646816054",
    appId: "1:728646816054:web:7ebdad137c19ee9d9b6397"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Signup
document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Sign-up successful!");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.error("Error signing up:", error.message);
            alert("Error: " + error.message);
        });
});

// Handle Login
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful!");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.error("Error logging in:", error.message);
            alert("Error: " + error.message);
        });
});
