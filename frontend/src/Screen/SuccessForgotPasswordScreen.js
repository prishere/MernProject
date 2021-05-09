import React, { useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { USER_FORGOT_PASSWORD_RESET } from "../constants/userConstants";

const SuccessForgotPasswordScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { success } = userForgotPassword;
  useEffect(() => {
    if (!success) {
      history.push("/login");
    }
  }, [success]);

  const onClickHandler = (e) => {
    e.preventDefault();
    history.push("/login");
    dispatch({ type: USER_FORGOT_PASSWORD_RESET });
  };
  return (
    <FormContainer>
      <h1>
        <i className="fas fa-check" style={{ color: "green" }}></i> Email Sent
      </h1>
      <p>A link to reset Your Password is sent to Your email!</p>
      <Button
        onClick={onClickHandler}
        type="submit"
        variant="primary"
        className="btn-block"
      >
        Return to SignIn
      </Button>
    </FormContainer>
  );
};

export default SuccessForgotPasswordScreen;
