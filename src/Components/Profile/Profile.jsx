import React, { useState, useEffect } from 'react';
import axios from '../Api';  // Adjust if your API import is different
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Profile.css';

function Profile() {
  const { token, user } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      navigate('/');
    }
  }, [token, navigate]);

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  return (
    <div className="profile-container">
      <div className="header">
        <h1>Profile - {user}</h1>
      </div>

      {profile ? (
        <div className="profile-info">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Position:</strong> {profile.position}</p>

          <button onClick={handleEditProfile} className="edit-button">
            Edit Profile
          </button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
