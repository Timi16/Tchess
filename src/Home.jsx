import React from 'react';

const Home = () => {
  const username = localStorage.getItem('username');

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>This is your home page.</p>
      {/* Add more content here */}
    </div>
  );
};

export default Home;
