import React from "react";
import Navbar from "../Navbar";
import "../../Styles/Services.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Footer from "../Footer";
import Rating from "@mui/material/Rating";
import Review from "./Review";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

function WasteCollection() {
  const [success, setSuccess] = useState(false);
  const [reviewsuccess, setReviewsuccess] = useState(false);
  const userdetails = localStorage.getItem("user");
  const currentuser = JSON.parse(userdetails);
  const token = localStorage.getItem("token");
  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newmessages, setNewmessages] = useState("");
  const [newtitle, setNewtitle] = useState("");
  const [receivedmessage, setreceivedmessage] = useState(null);
  const socket = useRef();

  const [feedback, setFeedback] = useState({
    reviewedby: currentuser.username,
    rating: 0,
    comment: "",
    userimage: currentuser.image,
  });

  useEffect(() => {
    if (currentuser.userid != "64ace0757520c5dbededc62e") {
      const obj = {
        senderId: currentuser.userid,
        receiverId: "64ace0757520c5dbededc62e",
      };
      const handleservice = async () => {
        try {
          const res = await axios.post(
            "http://localhost:8080/conversations/Conversation",
            obj
          );
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      };
      handleservice();
    }
  }, [currentuser.userid]);

  // useEffect(() => {
  //   if (currentuser.userid == "64ace0757520c5dbededc62e") {
  //     const obj = {
  //       senderId: currentuser.userid,
  //       receiverId: "64abf0ad1ef56656d9918b3d",
  //     };
  //     const handleservice = async () => {
  //       try {
  //         const res = await axios.post(
  //           "http://localhost:8080/conversations/Conversation",
  //           obj
  //         );
  //         console.log(res);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     handleservice();
  //   }
  // }, []);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getmessage", (data) => {
      setreceivedmessage({
        sender: data.senderid,
        text: data.text,
        title: data.title,
      });
    });
  }, []);
  useEffect(() => {
    receivedmessage &&
      conversation?.members.includes(receivedmessage.sender) &&
      setMessages((prev) => [...prev, receivedmessage]);
  }, [receivedmessage, conversation]);
  useEffect(() => {
    socket.current.emit("adduser", currentuser.userid);
    socket.current.on("getusers", (users) => {
      console.log(users);
    });
  }, [currentuser]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/conversations/${currentuser.userid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = await res.json();
        response.map((r) => {
          return setConversation(r);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [currentuser.userid]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/messages/${conversation._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = await res.json();
        setMessages(response);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [conversation._id]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
    const receiverid = conversation.members.find(
      (member) => member !== currentuser.userid
    );
    const message = {
      username: currentuser.username,
      sender: currentuser.userid,
      receiver: receiverid,
      text: newmessages,
      conversationId: conversation._id,
      title: newtitle,
    };

    socket.current.emit("sendmessaage", {
      username: currentuser.username,
      senderid: currentuser.userid,
      receiverid,
      text: newmessages,
      title: newtitle,
    });
    try {
      const res = await axios.post(
        "http://localhost:8080/messages/Message",
        message
      );
      setMessages([...messages, res.data]);
      setNewmessages("");
      setNewtitle("");
    } catch (error) {
      console.log(error);
    }
  };

  const handlechange = (event) => {
    setFeedback({
      ...feedback,
      [event.target.name]: event.target.value,
    });
  };

  const handlefeedback = async (event) => {
    event.preventDefault();
    setReviewsuccess(true);
    setTimeout(() => {
      setReviewsuccess(false);
    }, 3000);
    try {
      // Send feedback data to the backend API endpoint
      const res = await axios.post(
        "http://localhost:8080/feedbacks/reviews",
        feedback
      );
      // Clear the form input values
      console.log(res);
      setFeedback({
        revieweby: currentuser.username,
        rating: 0,
        comment: "",
        userimage: currentuser.image,
      });
    } catch (error) {
      // Handle any errors that occur during form submission
      console.error("Error submitting feedback:", error);
    }
    //over
  };
  return (
    <>
      <Navbar />
      {success && (
        <Stack
          sx={{ width: "100%" }}
          spacing={2}
          style={{
            alignItems: "center",
            position: "relative",
            top: "20px",
          }}
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
      <div className="wastepage">
        <img
          src="https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
          alt=""
          className="wasteimage"
        />
        {token ? (
          <div className="messageContent">
            <div className="sendMessage">
              <TextField
                id="outlined-basic"
                name="title"
                label="Title"
                onChange={(e) => setNewtitle(e.target.value)}
                value={newtitle}
                variant="outlined"
              />
              <TextField
                id="outlined-multiline-static"
                label="Write your message"
                multiline
                rows={9}
                fullWidth={true}
                onChange={(e) => setNewmessages(e.target.value)}
                value={newmessages}
                defaultValue="Default Value"
              />
              <button className="sendMessagebtn" onClick={handlesubmit}>
                Send
              </button>
            </div>
            <Link to="/Payment">
              <button
                className="sendMessagebtn"
                style={{ position: "relative", right: "50px" }}
              >
                Pay Now for this service
              </button>
            </Link>
          </div>
        ) : (
          <h2>This is main content</h2>
        )}
      </div>

      <Review />
      <div className="mainreview">
        <h1 className="reviewtext">
          Let us know how was your experience with WasteCollection service{" "}
        </h1>
        <img
          src="https://images.unsplash.com/photo-1633613286991-611fe299c4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt=""
          className="reviewimage"
        />
      </div>
      {reviewsuccess && (
        <Stack
          sx={{ width: "100%" }}
          spacing={2}
          style={{ alignItems: "center" }}
        >
          <Alert
            icon={false}
            severity="success"
            style={{
              backgroundColor: "blueviolet",
              color: "white",
            }}
          >
            feedback Submitted
          </Alert>
        </Stack>
      )}
      <div className="feedback">
        <form onSubmit={handlefeedback} className="rate">
          <Rating
            name="rating"
            value={feedback.rating}
            onChange={handlechange}
          />
          <TextField
            id="outlined-multiline-static"
            label="Write your comment"
            multiline
            rows={5}
            sx={{ width: "400px" }}
            name="comment"
            fullWidth={true}
            onChange={handlechange}
            value={feedback.comment}
            defaultValue="Default Value"
          />
          <button className="sendMessagebtn">Submit</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default WasteCollection;
