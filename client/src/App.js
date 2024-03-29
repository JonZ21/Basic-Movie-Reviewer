import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  //states?
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [reviewList, setReviewList] = useState([]);
  const [newReview, setNewReview] = useState([]);

  //request
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setReviewList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    setReviewList([
      ...reviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

  //function
  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="App">
      <h1 className="title">Movie Review Website</h1>
      <div className="form">
        <label>Movie Name</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Review</label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />

        <button onClick={submitReview}>Submit Review</button>
        {reviewList.map((value) => {
          return (
            <div className="card">
              <h1>{value.movieName} </h1>
              <p>{value.movieReview}</p>

              <button
                onClick={() => {
                  deleteReview(value.movieName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(value.movieName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
