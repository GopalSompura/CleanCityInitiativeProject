import * as React from "react";
import "../Styles/Payment.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";
function Payment() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const handleamount = (e) => {
    setAmount(e.target.value);
  };
  const handledescription = (e) => {
    setDescription(e.target.value);
  };

  const handlepayment = async () => {
    await axios
      .post("http://localhost:8080/payment/checkout", { amount, description })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Navbar />
      <input
        type="text"
        name="amount"
        placeholder="Amount"
        className="amounttext"
        onChange={handleamount}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        className="descriptiontext"
        onChange={handledescription}
      />
      <button onClick={() => handlepayment()}>Pay now</button>
      <Footer />
    </>
  );
}

export default Payment;
