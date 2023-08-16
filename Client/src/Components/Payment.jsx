import * as React from "react";
import "../Styles/Payment.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function Payment() {
  const handlepayment = async () => {
    const amount = 1500;
    const description = "Waste Collection";
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
      {/* <div className="pay">
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
      </div> */}

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
                <StyledTableCell>Service name</StyledTableCell>
                <StyledTableCell>Pay</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  WasteCollection
                </StyledTableCell>
                <StyledTableCell>1500</StyledTableCell>
                <StyledTableCell align="right">
                  <button
                    className="sendpaybtn"
                    onClick={() => handlepayment()}
                  >
                    Pay now
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
