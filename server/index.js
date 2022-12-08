const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cruddatabase",
});

app.use(bodyParser.urlencoded({ extended: true })); // middleware?

// req is request from frontend
// res is response to frontend

//nodemon keeps on refeshing and compling the application
app.use(cors());
app.use(express.json());

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);";
  db.query(sqlInsert, [movieName, movieReview], (error, result) => {
    console.log(result);
  });
});

app.get("/test", (req, res) => {
  res.send("test");
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
