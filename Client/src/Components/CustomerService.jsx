import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Styles/CustomerService.css";
function CustomerService() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ht58pnj",
        "template_yf10dtf",
        form.current,
        "9yxR9KU42OkM3L0In"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message send successfully");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <Navbar />
      <div className="customerservice">
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CustomerService;
