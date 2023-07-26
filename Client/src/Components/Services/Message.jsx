import * as React from "react";
import "../../Styles/Services.css";
export default function Message(message) {
  return (
    <>
      <div className="Messagebox">
        <h2 className="title">{message.message.title}</h2>
        <p className="messagetext">{message.message.text}</p>
      </div>
    </>
  );
}
