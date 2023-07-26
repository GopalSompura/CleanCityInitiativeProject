import { Link, useNavigate } from "react-router-dom";
import "../Styles/Signin&Signup.css";
import { useState } from "react";
import Footer from "./Footer";

function Signin() {
  const [form, setForm] = useState({});
  const [validation, setValidation] = useState("");
  const [error, setError] = useState(true);
  let navigate = useNavigate();

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
      alert(user.message);
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

            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

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
