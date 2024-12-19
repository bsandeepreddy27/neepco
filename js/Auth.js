
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";

// Firebase configuration (replace with your own credentials)
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

// Signup function
document.getElementById("signup-form")?.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting the default way

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Create the user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successfully created the account
            const user = userCredential.user;
            console.log("Account created for:", user.email);
            // Redirect to login page after successful sign-up
            window.location.href = "login.html";
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error:", errorCode, errorMessage);
            alert("Sign-up failed: " + errorMessage);
        });
});

// Login function
document.getElementById("login-form")?.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting the default way

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successfully logged in
            const user = userCredential.user;
            console.log("Logged in as:", user.email);
            // Redirect user to the dashboard or another page
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error:", errorCode, errorMessage);
            alert("Login failed: " + errorMessage);
        });
});

// Monitor auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // If the user is logged in, show logout and hide login/signup
        document.getElementById("login-link")?.style.display = "none";
        document.getElementById("signup-link")?.style.display = "none";
        document.getElementById("logout-link")?.style.display = "inline";
    } else {
        // If the user is logged out, show login/signup and hide logout
        document.getElementById("login-link")?.style.display = "inline";
        document.getElementById("signup-link")?.style.display = "inline";
        document.getElementById("logout-link")?.style.display = "none";
    }
});

// Logout function
document.getElementById("logout-link")?.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default action

    signOut(auth)
        .then(() => {
            console.log("User logged out");
            // Redirect to home page or login page after logout
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.log("Logout failed:", error.message);
        });
});
