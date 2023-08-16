import React from "react";
import "../Styles/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer class="footer">
        <div class="contain">
          <div class="row">
            <div class="footer-col">
              <ul>
                <h4>Services</h4>
                <Link className="servicelink" to="/WasteCollection">
                  Waste Collection
                </Link>
                <Link className="servicelink" to="/LostAndFoundObjects">
                  Lost and Found Objects
                </Link>
              </ul>
            </div>
            <div class="footer-col">
              <ul>
                <h4>get help</h4>
                <Link className="servicelink" to="/Payment">
                  Payment
                </Link>
                <Link className="servicelink" to="/Customerservice">
                  Contact Us
                </Link>
              </ul>
            </div>
            <div class="footer-col">
              <ul>
                <h4>Company</h4>
                <Link className="servicelink" to="">
                  About us
                </Link>
              </ul>
            </div>
            <div class="footer-col">
              <h4>follow us</h4>
              <div class="social-links">
                <a href="#">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
