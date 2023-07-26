import { Link, useNavigate } from "react-router-dom";
import "../Styles/Signin&Signup.css";
import { useState } from "react";
import Footer from "./Footer";
function Signup() {
  const [form, setForm] = useState({});
  const [validation, setValidation] = useState("");
  const [error, setError] = useState(true);
  const navigate = useNavigate();
  const handleform = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/signup", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    console.log(result);
    if (result.user || result.message) {
      alert(result.message);
      setError(false);
      setValidation(result.message);
    } else if (
      form.Email === "" ||
      form.Password === "" ||
      form.ConfirmPassword === "" ||
      form.FirstName === "" ||
      form.LastName === ""
    ) {
      setError(false);
      setValidation("Every field must be filled");
    } else {
      navigate("/Signin");
    }
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form className="form-signup" onSubmit={handlesubmit}>
            <h1>Sign up</h1>

            <div className="mb-3">
              <input
                onChange={handleform}
                type="text"
                className="form-control"
                placeholder="First Name  *"
                name="FirstName"
              />
            </div>

            <div className="mb-3">
              <input
                onChange={handleform}
                type="text"
                className="form-control"
                placeholder="LastName  *"
                name="LastName"
              />
            </div>

            <div className="mb-3">
              <input
                onChange={handleform}
                type="email"
                className="form-control"
                placeholder="Enter Email  *"
                name="Email"
              />
            </div>

            <div className="mb-3">
              <input
                onChange={handleform}
                type="password"
                className="form-control"
                placeholder="Enter Password  *"
                name="Password"
              />
            </div>

            <div className="mb-3">
              <input
                onChange={handleform}
                type="password"
                className="form-control"
                placeholder="Confirm Password  *"
                name="ConfirmPassword"
              />
            </div>
            {error ? "" : <p className="validations">{validation}</p>}

            <input className="submitbtn" type="submit" value="Submit" />
            <p className="forgot-password text-right">
              Already registered ?<Link to="/Signin"> Sign in here</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
