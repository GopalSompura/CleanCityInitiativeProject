import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
  return (
    <>
      <Navbar />
      <h1>Profile Page</h1>
      <h1>User {username} is logged in</h1>
      <form action="" onSubmit={handleclick} onChange={handleform}>
        <div className="mb-3">
          <input
            onChange={handleform}
            type="text"
            className="form-control"
            placeholder={username}
            name="FirstName"
          />
        </div>

        <div className="mb-3">
          <input
            onChange={handleform}
            type="text"
            className="form-control"
            placeholder={lastname}
            name="LastName"
          />
        </div>

        <div className="mb-3">
          <input
            onChange={handleform}
            type="email"
            className="form-control"
            placeholder={email}
            name="Email"
          />
        </div>
        <h2>Add Image to your profile :</h2>
        <input
          type="file"
          onChange={handleimage}
          accept="image/*"
          name="Image"
        />
        <input className="submitbtn" type="submit" value="Update" />
      </form>
      <Footer />
    </>
  );
}

export default Profile;
