import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h4">Welcome, {username}!</Typography>
      <Typography variant="subtitle1">You are logged in successfully.</Typography>
      <StyledButton variant="contained" onClick={handleLogout}>
        Logout
      </StyledButton>
    </Container>
  );
};

export default Home;

// Styled Components
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #e0f7fa;
`;

const StyledButton = styled(Button)`
  margin-top: 1.5rem;
  background-color: #00796b !important;
  color: white !important;

  &:hover {
    background-color: #004d40 !important;
  }
`;
