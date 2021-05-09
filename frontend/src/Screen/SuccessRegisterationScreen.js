import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { USER_REGISTER_RESET } from "../constants/userConstants";
import FormContainer from "../components/FormContainer";
const SuccessRegisterationScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success } = userRegister;
  const clickHandler = () => {
    history.push("/");
    dispatch({ type: USER_REGISTER_RESET });
  };
  useEffect(() => {
    if (!success) {
      history.push("/");
    }
  }, [success]);

  return (
    <FormContainer>
      <h1>You Have Successfully Registerd !! </h1>

      <p>
        Please check Your mail and confirm the email account by clicking on The
        email
      </p>
      <Button className="btn btn-block" onClick={clickHandler}>
        Home
      </Button>
    </FormContainer>
  );
};

export default SuccessRegisterationScreen;
