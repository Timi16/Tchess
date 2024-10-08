import React, { useState } from "react";
import styled from "styled-components";
import { Button, TextField, Typography, CircularProgress, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthScreen = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", username: "" });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({ email: "", password: "", username: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", username: "" };

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!isLogin && !username) {
      newErrors.username = "Username is required for registration";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        let response;
        if (isLogin) {
          response = await axios.post(
            "https://tchess-backend.onrender.com/api/auth/login",
            { email, password }
          );
        } else {
          response = await axios.post(
            "https://tchess-backend.onrender.com/api/auth/register",
            { email, password, username }
          );
        }

        // Handle response
        if (response.status === 200) {
          if (isLogin) {
            onLoginSuccess(response.data.username);
            navigate("/home");
          } else {
            setSnackbarMessage("Registration successful! Please log in.");
            setSnackbarOpen(true);
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        } else {
          setSnackbarMessage(response.data.message || "An error occurred");
          setSnackbarOpen(true);
        }
      } catch (error) {
        setSnackbarMessage(error.response?.data?.message || "An unexpected error occurred.");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit}>
        <Title variant="h4">{isLogin ? "Login" : "Register"}</Title>

        {!isLogin && (
          <StyledTextField
            variant="outlined"
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />
        )}

        <StyledTextField
          variant="outlined"
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />

        <StyledTextField
          variant="outlined"
          label="Password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />

        <StyledButton variant="contained" type="submit" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : isLogin ? "Login" : "Register"}
        </StyledButton>

        <SwitchModeText onClick={toggleMode}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </SwitchModeText>
      </FormWrapper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={<Button color="inherit" onClick={handleSnackbarClose}>Close</Button>}
      />
    </Container>
  );
};

export default AuthScreen;

// Styled Components
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0f7fa;
`;

const FormWrapper = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled(Typography)`
  color: #00796b;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;

  & label {
    color: #00796b;
  }

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #00796b;
    }

    &:hover fieldset {
      border-color: #004d40;
    }

    &.Mui-focused fieldset {
      border-color: #004d40;
    }
  }

  & .MuiFormHelperText-root {
    color: #d32f2f !important;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 1.5rem;
  background-color: #00796b !important;
  color: white !important;

  &:hover {
    background-color: #004d40 !important;
  }
`;

const SwitchModeText = styled(Typography)`
  color: #00796b;
  text-align: center;
  margin-top: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #004d40;
  }
`;
