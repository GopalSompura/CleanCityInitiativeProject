import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Styles/CustomerService.css";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
function CustomerService() {
  const [success, setSuccess] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
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
      {success && (
        <Stack
          sx={{ width: "100%" }}
          spacing={2}
          style={{ alignItems: "center", marginTop: "45px" }}
        >
          <Alert
            icon={false}
            severity="success"
            style={{
              backgroundColor: "blueviolet",
              color: "white",
            }}
          >
            Message Sent
          </Alert>
        </Stack>
      )}
      <div class="contact">
        <img src="img/shape.png" class="square" alt="" />
        <div class="form1">
          <div class="contact-info">
            <h3 class="title">Let's get in touch</h3>
            <p class="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              dolorum adipisci recusandae praesentium dicta!
            </p>

            <div class="info">
              <div class="information">
                <HomeIcon
                  fontSize="large"
                  sx={{ marginRight: "10px", color: "blueviolet" }}
                />
                <p>1286 Foxglove, Mississauga, L5V2N3</p>
              </div>
              <div class="information">
                <EmailIcon
                  fontSize="large"
                  sx={{ marginRight: "10px", color: "blueviolet" }}
                />
                <p>GreenTech@gmail.com</p>
              </div>
              <div class="information">
                <PhoneInTalkIcon
                  fontSize="large"
                  sx={{ marginRight: "10px", color: "blueviolet" }}
                />
                <p>438-984-3249</p>
              </div>
            </div>
          </div>

          <div class="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <h3 class="title">Contact us</h3>
              <div class="input-container">
                <input
                  type="text"
                  name="user_name"
                  class="input"
                  placeholder="Username"
                />
              </div>
              <div class="input-container">
                <input
                  type="email"
                  name="user_email"
                  class="input"
                  placeholder="Email"
                />
              </div>
              <div class="input-container textarea">
                <textarea name="message" class="input" placeholder="Message" />
              </div>
              <input type="submit" value="Send" class="btn" />
            </form>
          </div>
        </div>
      </div>
      {/**Below is previous html */}
      {/* <div className="customerservice">
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
        </form>
      </div> */}
      <Footer />
    </>
  );
}

export default CustomerService;
