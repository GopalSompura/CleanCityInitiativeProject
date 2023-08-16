import React from "react";
import Navbar from "../Navbar";
import "../../Styles/Services.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Footer from "../Footer";
import Rating from "@mui/material/Rating";
import Review from "./Review";

function LostAndFoundObjects() {
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
    rating: "",
    comment: "",
  });

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
    const message = {
      sender: currentuser.userid,
      text: newmessages,
      conversationId: conversation._id,
      title: newtitle,
    };
    const receiverid = conversation.members.find(
      (member) => member !== currentuser.userid
    );
    socket.current.emit("sendmessaage", {
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
      alert("Message send Successfully");
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

    try {
      // Send feedback data to the backend API endpoint
      const res = await axios.post(
        "http://localhost:8080/feedbacks/reviews",
        feedback
      );
      // Clear the form input values
      console.log(res);
      setFeedback({ revieweby: currentuser.username, rating: "", comment: "" });
    } catch (error) {
      // Handle any errors that occur during form submission
      console.error("Error submitting feedback:", error);
    }
    //over
  };
  return (
    <>
      <Navbar />
      <div className="wastepage">
        {token ? (
          <div className="messageContent">
            <div className="sendMessage">
              <input
                type="text"
                name="title"
                id=""
                placeholder="Title of the send message "
                className="inputtitle"
                onChange={(e) => setNewtitle(e.target.value)}
                value={newtitle}
                minLength="3"
              />
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="inputmessage"
                placeholder="Write message here"
                onChange={(e) => setNewmessages(e.target.value)}
                value={newmessages}
                minLength="3"
              ></textarea>
              <button className="sendMessagebtn" onClick={handlesubmit}>
                Send
              </button>
            </div>
          </div>
        ) : (
          <h2>This is main content</h2>
        )}
      </div>
      <div className="feedback">
        <h1>Give your Review</h1>
        <form onSubmit={handlefeedback}>
          <Rating
            name="rating"
            value={feedback.rating}
            onChange={handlechange}
          />
          <textarea
            name="comment"
            cols="30"
            rows="10"
            className="inputmessage"
            placeholder="Write your review"
            onChange={handlechange}
            value={feedback.comment}
            minLength="3"
          ></textarea>
          <button className="sendMessagebtn">Submit Feedback</button>
        </form>
      </div>
      <Review />
      <Footer />
    </>
  );
}

export default LostAndFoundObjects;
