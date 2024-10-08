import React, { useState } from 'react';
import AuthScreen from './AuthScreen';
import Home from './Home';

const App = () => {
  const [username, setUsername] = useState(null);

  const handleLoginSuccess = (user) => {
    setUsername(user);
  };

  return (
    <div>
      {username ? (
        <Home username={username} />
      ) : (
        <AuthScreen navigateToForgotPassword={() => {}} onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;
