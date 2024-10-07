import React from "react";
import styled from "styled-components";
import { Button, TextField, Typography } from "@mui/material";

const ResetPasswordScreen = () => {
  return (
    <Container>
      <FormWrapper>
        <Title variant="h4">Reset Password</Title>
        <StyledTextField
          variant="outlined"
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
        />
        <StyledTextField
          variant="outlined"
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
        />
        <StyledButton variant="contained" fullWidth>
          Reset Password
        </StyledButton>
      </FormWrapper>
    </Container>
  );
};

export default ResetPasswordScreen;

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
