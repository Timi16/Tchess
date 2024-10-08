import React, { useState } from 'react';

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Switch between Login and Register

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin 
      ? "https://tchess-backend.onrender.com/api/auth/login"
      : "https://tchess-backend.onrender.com/api/auth/register";

    // Create the request body dynamically based on login or register
    const body = isLogin
      ? { username, password }
      : { username, email, password }; // Include email only during registration

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        // Store username in localStorage
        localStorage.setItem('username', data.username);
        setIsAuthenticated(true); // Update auth state
      } else {
        alert(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during authentication.");
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>
    </div>
  );
}

export default Login;
