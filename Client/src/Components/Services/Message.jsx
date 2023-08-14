import * as React from "react";
import { useState } from "react";
import "../../Styles/Services.css";
import { useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Message() {
  const userdetails = localStorage.getItem("user");
  const currentuser = JSON.parse(userdetails);
  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState([]);
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
  }, [conversation._id, currentuser.userid]);
  return (
    <>
      <Navbar />
      <div className="Messagebox">
        {messages.map((m) => {
          return (
            <>
              <h2 className="title">{m.title}</h2>
              <p className="messagetext">{m.text}</p>
            </>
          );
        })}
      </div>

      <Footer />
    </>
  );
}
