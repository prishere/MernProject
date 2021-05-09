import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const DefaultErrorScreen = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <p>
      The Page You requested is not Found ! Please Contact Developer For More
      details!!
    </p>
    <Link to="/">
      <Button className="btn btn-md center-align">Go Home</Button>
    </Link>
  </div>
);

export default DefaultErrorScreen;
