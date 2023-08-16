import * as React from "react";
import "../Styles/Home.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Review from "./Services/Review";
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
      <div className="feedbacks"></div>
      <Footer />
    </>
  );
}

export default Home;
