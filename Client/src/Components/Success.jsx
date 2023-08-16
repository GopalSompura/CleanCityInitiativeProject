import * as React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Payment.css";
function Success() {
  let navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 3000);
  return (
    <>
      <div className="successpage">
        <img
          src="https://images.unsplash.com/photo-1636110642723-c996f04765b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
          alt=""
          style={{ width: "300px", height: "300px" }}
        />
        <h1 style={{ color: "lightgreen", fontSize: "50px" }}>
          Payment successfull
        </h1>
        <h2>You will be redirected to home page now</h2>
      </div>
    </>
  );
}

export default Success;
