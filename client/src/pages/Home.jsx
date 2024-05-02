import React from "react";
import "../App.css";
import Navbar from "../components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <>
      <div className="navContainer">
        <Navbar />
      </div>
    </>
  );
}

export default Home;
