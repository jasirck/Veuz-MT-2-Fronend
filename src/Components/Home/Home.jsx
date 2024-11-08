import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';  // Import dispatch
import { logout } from '../toolkit/Slice';
import './Home.css'; // Import the updated CSS for styling

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.authReducer);

  const navigateToProfile = () => {
    navigate('/profile');
  };
  useEffect(() => {
    if (!token) {
      console.log(token,'tocken');
      
      navigate('/');
    }else{
      console.log(token,user,'tocken');
      
    }
  }, [token, navigate]);

  const handleLogout = () => {
    dispatch(logout());  // Dispatch logout action
    navigate('/');  // Redirect to admin page after logout
  };

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-links">
          <a href="/" className="navbar-link">Home</a>
          <a href="/profile" className="navbar-link">Profile</a>
        </div>
        <div className="navbar-profile">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
          <img
            src="data:image/png;base64,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"
            alt="Profile"
            className="profile-icon"
            onClick={navigateToProfile}
          />
        </div>
      </nav>

      {/* Header Section */}
      <div className="header">
        <h1>Welcome {user} to the Employee Management System</h1>
      </div>

      {/* Card about JWT */}
      <div className="jwt-card">
        <h2>JWT Authentication</h2>
        <p>
          JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims to be transferred between two parties.
          <br />
          They are used in authentication systems to securely transmit information between the client and the server.
          JWT is commonly used in scenarios where the server needs to verify the user's identity without having to store session data.
        </p>
      </div>

      {/* Profile Button */}
      <div className="actions">
        <button onClick={navigateToProfile} className="profile-button">
          View Profile
        </button>
      </div>

      {/* Logout Button */}
     
    </div>
  );
}

export default Home;
