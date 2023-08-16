import { Link, useNavigate } from "react-router-dom";
import "../Styles/Signin&Signup.css";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
function Signin() {
  let success = localStorage.getItem("success");
  let result = localStorage.getItem("result");
  const [form, setForm] = useState({});
  const [validation, setValidation] = useState("");
  const [error, setError] = useState(true);
  const [change, setChange] = useState(success);
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setChange(false);
    }, 3000);
  }, []);

  const handleform = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/signin", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await res.json();
    const userdetails = JSON.stringify(user);
    console.log(user);
    if (!user.match) {
      setError(false);
      setValidation(user.message);
    } else {
      localStorage.setItem("user", userdetails);
      localStorage.setItem("token", user.token);
      localStorage.setItem("Username", user.username);
      localStorage.setItem("emailid", user.email);
      localStorage.setItem("lastname", user.lastname);
      localStorage.setItem("userid", user.userid);
      localStorage.setItem("image", user.image);
      navigate("/");
    }
  };
  return (
    <>
      <div className="auth-wrapper-signin">
        {change && result ? (
          <Stack
            sx={{ width: "100%" }}
            spacing={2}
            style={{ alignItems: "center", marginTop: "25px" }}
          >
            <Alert
              icon={false}
              severity="success"
              style={{
                backgroundColor: "rgb(7, 0, 150)",
                color: "white",
              }}
            >
              Account created Successfully
            </Alert>
          </Stack>
        ) : (
          ""
        )}
        <div className="auth-inner-signin">
          <form onSubmit={handlesubmit}>
            <h1>GreenTech Solution Inc</h1>
            <h2>Sign in with your email address</h2>

            <div className="mb-3">
              <input
                onChange={handleform}
                type="email"
                className="form-control-signin"
                placeholder="Email Address *"
                name="Email"
              />
            </div>

            <div className="mb-3">
              <input
                onChange={handleform}
                type="password"
                className="form-control-signin"
                placeholder="Password *"
                name="Password"
              />
            </div>
            {error ? "" : <p className="validations">{validation}</p>}

            <input className="submitbtn-signin" type="submit" value="Submit" />
            <p className="forgot-password text-right">
              Don't have an Account?
              <Link to="/Signup"> Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signin;
