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

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

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

app.delete("/api/delete/:movieName", (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";
  db.query(sqlDelete, name, (error, result) => {
    if (error) console.log(error);
  });
});

app.put("/api/update", (req, res) => {
  const review = req.body.movieReview;
  const name = req.body.movieName;
  const sqlUpdate =
    "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
  db.query(sqlUpdate, [review, name], (error, result) => {
    if (error) console.log(error);
  });
});
