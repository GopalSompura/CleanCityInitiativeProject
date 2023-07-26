import * as React from "react";
import "../Styles/Home.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
function Home() {
  return (
    <>
      <Navbar />
      <div className="backgroundimage"></div>
      <div className="main">
        <h1>Main Header</h1>
        <h1>Main Body</h1>
      </div>
      <Footer />
    </>
  );
}

export default Home;
