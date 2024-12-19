// Firebase configuration


const firebaseConfig = {
    apiKey: "AIzaSyDfImdWgYRjEiItPckbWzJsYY7Yi6fud14",
    authDomain: "neepco-p.firebaseapp.com",
    projectId: "neepco-p",
    storageBucket: "neepco-p.firebasestorage.app",
    messagingSenderId: "728646816054",
    appId: "1:728646816054:web:7ebdad137c19ee9d9b6397"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Register New User
function registerUser(email, password, name) {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Store additional user info in Firestore
      db.collection("users").doc(user.uid).set({
        name: name,
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      alert("Registration successful!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Log In Existing User
function loginUser(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Log Out User
function logoutUser() {
  auth.signOut()
    .then(() => {
      alert("Logged out successfully!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
} 

// Listen for Authentication State Changes
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User logged in: ", user.email);
  } else {
    console.log("User logged out");
  }
});
