const express = require("express");
const path = require("path");
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");

const app = express();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj41u26yQxRn6kR_J3mS-GQddhvuoIiVw",
  authDomain: "login-27f1d.firebaseapp.com",
  projectId: "login-27f1d",
  storageBucket: "login-27f1d.appspot.com",
  messagingSenderId: "378025860043",
  appId: "1:378025860043:web:87b1c4371f837f5697f44e"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve the HTML file
app.get("/", (req, res) => {
  res.render("index"); // Make sure you have a views/index.ejs file
});

// Endpoint to login a user
app.post("/log-in", async (req, res) => {
  const { email, password } = req.body;
  const auth = getAuth(firebaseApp);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);
    res.render("dashboard"); // Make sure you have a views/dashboard.ejs file
  } catch (error) {
    const errorMessage = error.message;
    console.log(error);
    res.status(400).send(`Error: ${errorMessage}`);
  }
});

// Endpoint to create a new user
app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  const auth = getAuth(firebaseApp);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);
    res.render("dashboard"); // Make sure you have a views/dashbord.ejs file
  } catch (error) {
    const errorMessage = error.message;
    console.log(error);
    res.status(400).send(`Error: ${errorMessage}`);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
