import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthScreen from './AuthScreen';
import Home from './Home';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginSuccess = (username) => {
    setLoggedInUser(username);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<AuthScreen onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/home"
          element={<Home username={loggedInUser} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
