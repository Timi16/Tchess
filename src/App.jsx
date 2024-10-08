import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthScreen from './AuthScreen';
import Home from './Home';

const App = () => {
  const [username, setUsername] = useState(null);

  const handleLoginSuccess = (user) => {
    setUsername(user);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={username ? <Navigate to="/home" /> : <AuthScreen onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/home"
          element={username ? <Home username={username} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
