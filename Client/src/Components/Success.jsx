import * as React from "react";
import { useNavigate } from "react-router-dom";
function Success() {
  let navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 3000);
  return (
    <>
      <h1>Payment successfull</h1>
      <h2>You will be redirected to home page now</h2>
    </>
  );
}

export default Success;
