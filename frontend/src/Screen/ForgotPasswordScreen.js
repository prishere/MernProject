import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { forgotPasswordUser, login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const ForgotPasswordScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { loading, success, error } = userForgotPassword;

  useEffect(() => {
    if (success) {
      history.push("/successPassword");
    }
  }, [history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordUser(email));
  };
  return (
    <FormContainer>
      <h1>Trouble Signing In?</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="btn-block">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ForgotPasswordScreen;
