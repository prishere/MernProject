import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { resetPasswordUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { USER_RESET_PASSWORD_RESET } from "../constants/userConstants";

const ResetPasswordScreen = ({ history }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { userData } = userForgotPassword;
  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { loading, success, error } = userResetPassword;
  useEffect(() => {
    if (!userData._id || !userData.token || success) {
      history.push("/login"); // please select the link that is sent to your email !!
      dispatch({ type: USER_RESET_PASSWORD_RESET });
    }
  }, [history, userData, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password did not match!");
    } else {
      dispatch(resetPasswordUser({ token: userData.token, password }));
    }
  };
  return (
    <FormContainer>
      <h1>Reset Password</h1>
      {message && <Message variant="danger">{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Reset
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ResetPasswordScreen;
