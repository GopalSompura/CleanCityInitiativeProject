import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Avatar from "@mui/material/Avatar";
import "../Styles/Profile.css";
import TextField from "@mui/material/TextField";

function Profile() {
  const username = localStorage.getItem("Username");
  const email = localStorage.getItem("emailid");
  const lastname = localStorage.getItem("lastname");
  const userid = localStorage.getItem("userid");
  const [form, setForm] = useState({});

  const handleimage = (e) => {
    const file = e.target.files[0];
    const profilepic = URL.createObjectURL(file);
    localStorage.setItem("image", profilepic);
  };

  const handleform = (e) => {
    const image = localStorage.getItem("image");
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      Image: image,
    });
  };

  const handleclick = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:8080/${userid}`, {
      method: "PATCH",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    console.log(result);
    localStorage.setItem("updatedusername", result.FirstName);
    localStorage.setItem("updatedlastname", result.LastName);
    localStorage.setItem("updatedmail", result.Email);
    localStorage.setItem("updatedimage", result.Image);
  };
  const profileimg = localStorage.getItem("image");
  const updatedusername = localStorage.getItem("updatedusername");
  const updatedlastname = localStorage.getItem("updatedlastname");
  const updatedmail = localStorage.getItem("updatedmail");
  return (
    <>
      <Navbar updatedimg={profileimg} />
      <div className="profilepage">
        <form action="" onSubmit={handleclick} onChange={handleform}>
          <label htmlFor="file" className="updateprofilepic">
            <Avatar
              style={{ width: 100, height: 100 }}
              className="profilepic"
              alt="Remy Sharp"
              src={profileimg}
            />
            <input
              type="file"
              id="file"
              onChange={handleimage}
              accept="image/*"
              name="Image"
            />
          </label>
          <div className="mb-3">
            <TextField
              required
              id="filled-required"
              label="Firstname"
              defaultValue={updatedusername ? updatedusername : username}
              variant="filled"
              onChange={handleform}
              name="FirstName"
            />
          </div>

          <div className="mb-3">
            <TextField
              required
              id="filled-required"
              label="Lastname"
              defaultValue={updatedlastname ? updatedlastname : lastname}
              variant="filled"
              onChange={handleform}
              name="LastName"
            />
          </div>

          <div className="mb-3">
            <TextField
              required
              id="filled-required"
              label="Email"
              defaultValue={updatedmail ? updatedmail : email}
              variant="filled"
              onChange={handleform}
              name="Email"
            />
          </div>

          <input className="submitbtn" type="submit" value="Update" />
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
