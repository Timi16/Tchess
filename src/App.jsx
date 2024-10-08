import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthScreen from './AuthScreen';
import Home from './Home'; // Ensure you have a Home component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
