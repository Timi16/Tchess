import React from 'react';
import styled from 'styled-components';

const Home = ({ username }) => {
  return (
    <Container>
      <Greeting>Hello, {username}!</Greeting>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #000000 0%, #001f3f 100%);
`;

const Greeting = styled.h1`
  color: white;
`;
