import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthScreen from "./AuthScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<AuthScreen navigateToForgotPassword={() => window.location.href = '/forgot-password'} />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordScreen navigateToResetPassword={() => window.location.href = '/reset-password'} />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
