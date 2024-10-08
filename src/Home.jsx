import React from 'react';
import styled from 'styled-components';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Container>
      <WelcomeText variant="h4">Welcome, {username}!</WelcomeText>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e0f7fa;
`;

const WelcomeText = styled(Typography)`
  color: #00796b;
  margin-bottom: 2rem;
`;

const StyledButton = styled(Button)`
  background-color: #00796b !important;
  color: white !important;

  &:hover {
    background-color: #004d40 !important;
  }
`;
