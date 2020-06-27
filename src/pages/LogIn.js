import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./style/LogIn.css";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <form className="form_login">
        <input
          type="text"
          id="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="myButton">
            LOG IN
          </button>
      </form>
    </div>
  );
};

export default LogIn;
