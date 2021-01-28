import React from "react";
import { Link } from "react-router-dom";
import NavTop from "./NavTop";
import Header from "./Header";


const Landing = () => {
    return (
      <div className="container">
        <NavTop/>
        <Header/>
      </div>
    );
  }

export default Landing;
