import React, { useState } from "react";
import styled from "styled-components";
import { Button, TextField, Typography } from "@mui/material";

const AuthScreen = ({ navigateToForgotPassword }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Container>
      <FormWrapper>
        <Title variant="h4">{isLogin ? "Login" : "Register"}</Title>
        {!isLogin && (
          <StyledTextField
            variant="outlined"
            label="Username"
            type="text"
            fullWidth
            margin="normal"
          />
        )}
        <StyledTextField
          variant="outlined"
          label="Email"
          type="email"
          fullWidth
          margin="normal"
        />
        <StyledTextField
          variant="outlined"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
        />

        {isLogin && (
          <ForgotPasswordText onClick={navigateToForgotPassword}>
            Forgot Password?
          </ForgotPasswordText>
        )}

        <StyledButton variant="contained" fullWidth>
          {isLogin ? "Login" : "Register"}
        </StyledButton>

        <SwitchModeText onClick={toggleMode}>
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </SwitchModeText>
      </FormWrapper>
    </Container>
  );
};

export default AuthScreen;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #000000 0%, #000080 100%);
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`;

const Title = styled(Typography)`
  color: white;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const StyledTextField = styled(TextField)`
  & label {
    color: white;
  }

  & input {
    color: white;
  }

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: white;
    }

    &:hover fieldset {
      border-color: #0000ff;
    }

    &.Mui-focused fieldset {
      border-color: #0000ff;
    }
  }
`;

const StyledButton = styled(Button)`
  margin-top: 1rem !important;
  background-color: #0000ff !important;
  color: white !important;

  &:hover {
    background-color: #1a1aff !important;
  }
`;

const ForgotPasswordText = styled(Typography)`
  color: white;
  text-align: right;
  margin-top: 0.5rem;
  cursor: pointer;
  &:hover {
    color: #0000ff;
  }
`;

const SwitchModeText = styled(Typography)`
  color: white;
  text-align: center;
  margin-top: 1rem;
  cursor: pointer;
  &:hover {
    color: #0000ff;
  }
`;
