import React from "react";
import Navbar from "../Navbar";
import "../../Styles/Services.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Footer from "../Footer";
import Rating from "@mui/material/Rating";

function WasteCollection() {
  const [value, setValue] = React.useState(0);
  const [feedback, setFeedback] = useState("");
  console.log(value);
  console.log(feedback);

  const userdetails = localStorage.getItem("user");
  const currentuser = JSON.parse(userdetails);
  const token = localStorage.getItem("token");

  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newmessages, setNewmessages] = useState("");
  const [newtitle, setNewtitle] = useState("");
  const [receivedmessage, setreceivedmessage] = useState(null);
  const socket = useRef();
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
    localStorage.setItem("receiverid", receiverid);
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
      setMessages([...messages, res.data]);
      setNewmessages("");
      setNewtitle("");
    } catch (error) {
      console.log(error);
    }
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
        <h1>Give Review</h1>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="inputmessage"
          placeholder="Write your review"
          onChange={(e) => setFeedback(e.target.value)}
          value={feedback}
          minLength="3"
        ></textarea>
        <button className="sendMessagebtn">Submit Feedback</button>
      </div>
      <Footer />
    </>
  );
}

export default WasteCollection;
