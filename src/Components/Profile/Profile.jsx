import React, { useState, useEffect } from 'react';
import axios from '../Api'; // Adjust if your API import path is different
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Profile.css';
import EditProfileModal from './EditProfileModal';

function Profile() {
  const { token, user } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile); // Update the profile in the component
    closeModal();
  };

  // Handle back navigation
  const handleBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  return (
    <div className="profile-container">
      <div className="header">
        <h1>Profile - {user}</h1>
        <button onClick={handleBack} className="back-button">
          Back
        </button>
      </div>

      {profile ? (
        <div className="profile-info">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Position:</strong> {profile.position}</p>

          <div className="button-group">
            <button onClick={handleEditProfile} className="edit-button">
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      {isModalOpen && (
        <EditProfileModal
          profile={profile}
          onClose={closeModal}
          onSave={handleProfileUpdate}
        />
      )}
    </div>
  );
}

export default Profile;
