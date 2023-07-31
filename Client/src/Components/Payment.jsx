import * as React from "react";
import "../Styles/Payment.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
function Payment() {
  return (
    <>
      <Navbar />
      <div className="main">
        <h1>Pay here for the services</h1>
        <input type="button" id="paybtn" value="Pay Now" />
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default Payment;
