import React, { useState } from "react";
import styled from "styled-components";
import { Button, TextField, Typography, CircularProgress, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AuthScreen = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", username: "" });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

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
          response = await fetch("https://tchess-backend.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
        } else {
          response = await fetch("https://tchess-backend.onrender.com/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, username }),
          });
        }

        const data = await response.json();
        
        if (response.ok) {
          if (isLogin) {
            onLoginSuccess(data.username); // Pass username to the parent component
            navigate("/home"); // Navigate to the home page
          } else {
            setSnackbarMessage("Registration successful! Please log in.");
            setSnackbarOpen(true);
            setTimeout(() => {
              navigate("/"); // Redirect to login page after showing message
            }, 3000); // Wait for 3 seconds before navigating
          }
        } else {
          setSnackbarMessage(data.message || "An error occurred");
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error("Error:", error);
        setSnackbarMessage("An unexpected error occurred. Please try again.");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Form has errors");
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
            type="text"
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
          type="email"
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
          type="password"
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
        action={
          <Button color="inherit" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      />
    </Container>
  );
};

export default AuthScreen;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #000000 0%, #001f3f 100%);
`;

const FormWrapper = styled.form`
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
  margin-bottom: 1rem !important;

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
      border-color: #1e90ff;
    }

    &.Mui-focused fieldset {
      border-color: #1e90ff;
    }
  }

  & .MuiFormHelperText-root {
    color: red !important;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 1.5rem !important;
  background-color: #1e90ff !important;
  color: white !important;

  &:hover {
    background-color: #4682b4 !important;
  }
`;

const SwitchModeText = styled(Typography)`
  color: white;
  text-align: center;
  margin-top: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #1e90ff;
  }
`;
