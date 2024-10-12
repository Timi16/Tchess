import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import { FaUser, FaChess, FaSignOutAlt, FaTrophy } from 'react-icons/fa';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/'); // Redirect to login if not authenticated
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://tchess-backend.onrender.com/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="dashboard-container">
      <Navbar onLogout={handleLogout} />

      <div className="dashboard-content">
        {profile ? (
          <div className="profile-info">
            <div className="circular-avatar">
              <img src={`https://robohash.org/${profile.username}.png?set=set5`} alt="Profile Avatar" />
            </div>
            <h3>{profile.username}</h3>
            <p>ELO Rating: {profile.elo}</p>
            <p>Win/Loss Ratio: {profile.winLossRatio}</p>
            <p>Account Created: {formatDate(profile.createdAt)}</p>
            <button className="button-logout" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

const Navbar = ({ onLogout }) => {
  return (
    <div className="navbar-container">
      <div className="navbar-logo">TChess</div>
      <div className="navbar-menu">
        <div className="navbar-item">
          <FaUser size={24} /> Profile
        </div>
        <div className="navbar-item">
          <FaChess size={24} /> Games
        </div>
        <div className="navbar-item">
          <FaTrophy size={24} /> Leaderboard
        </div>
        <div className="navbar-item" onClick={onLogout}>
          <FaSignOutAlt size={24} /> Logout
        </div>
      </div>
    </div>
  );
};

export default Home;
