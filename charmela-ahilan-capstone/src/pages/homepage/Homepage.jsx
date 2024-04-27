import React from "react";
import MainImage from "../../assets/images/Home-image.png";
import "./Homepage.scss";

function Homepage() {
  return (
    <div className="Homepage">
      <img src={MainImage} />
    </div>
  );
}

export default Homepage;
