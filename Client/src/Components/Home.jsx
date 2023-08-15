import * as React from "react";
import "../Styles/Home.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
function Home() {
  const [reviews, setReviews] = useState([]);
  const handleclick = async () => {
    const getfeedbacks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/feedbacks/getfeedbacks"
        );
        setReviews(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getfeedbacks();
  };

  useEffect(() => {
    handleclick();
  }, []);

  return (
    <>
      <Navbar />
      <div className="backgroundimage"></div>
      <div className="main"></div>
      {reviews.map((r) => {
        return (
          <>
            <h1>{r.senderid}</h1>
            <h1>{r.rating}</h1>
            <h1>{r.comment}</h1>
          </>
        );
      })}
      <Footer />
    </>
  );
}

export default Home;
