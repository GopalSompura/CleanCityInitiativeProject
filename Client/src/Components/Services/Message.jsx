import * as React from "react";
import { useState } from "react";
import "../../Styles/Services.css";
import { useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function Message() {
  const userdetails = localStorage.getItem("user");
  const currentuser = JSON.parse(userdetails);
  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState([]);
  const [receivedmessages, setReceivedmessages] = useState([]);
  const [sentmessages, setSentmessages] = useState([]);
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

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/messages/receivedmessages/${currentuser.userid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = await res.json();
        setReceivedmessages(response);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentuser.userid]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/messages/receivedmessages/${currentuser.userid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = await res.json();
        setSentmessages(response);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentuser.userid]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <Navbar />
      {/* <div className="Messagebox">
        {messages.map((m) => {
          return (
            <>
              <h1 className="messagetitle">{m.title}</h1>
              <p className="messagetext">{m.text}</p>
            </>
          );
        })}
      </div> */}
      <h1>Recent Messages</h1>
      <div className="mes">
        <TableContainer
          component={Paper}
          sx={{
            width: 1000,
          }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Message</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map((m) => (
                <StyledTableRow key={m.title}>
                  <StyledTableCell component="th" scope="row">
                    {m.username}
                  </StyledTableCell>
                  <StyledTableCell>{m.title}</StyledTableCell>
                  <StyledTableCell align="right">{m.text}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <h1>Received Messages</h1>
      <div className="mes">
        <TableContainer
          component={Paper}
          sx={{
            width: 1000,
          }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Message</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receivedmessages.map((m) => (
                <StyledTableRow key={m.title}>
                  <StyledTableCell component="th" scope="row">
                    {m.username}
                  </StyledTableCell>
                  <StyledTableCell>{m.title}</StyledTableCell>
                  <StyledTableCell align="right">{m.text}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <h1>Sent Messages</h1>
      <div className="mes">
        <TableContainer
          component={Paper}
          sx={{
            width: 1000,
          }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Message</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sentmessages.map((m) => (
                <StyledTableRow key={m.title}>
                  <StyledTableCell component="th" scope="row">
                    {m.username}
                  </StyledTableCell>
                  <StyledTableCell>{m.title}</StyledTableCell>
                  <StyledTableCell align="right">{m.text}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div> */}
      <Footer />
    </>
  );
}
