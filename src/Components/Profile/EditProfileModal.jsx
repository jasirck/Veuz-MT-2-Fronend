import React, { useState } from 'react';
import axios from '../Api';
import './EditProfileModal.css';
import { useSelector } from 'react-redux';

function EditProfileModal({ profile, onClose, onSave }) {
    const { token, user } = useSelector((state) => state.authReducer);
  const [updatedProfile, setUpdatedProfile] = useState({
    name: profile.name,
    email: profile.email,
    position: profile.position,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('/profile/', updatedProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      onSave(response.data);  // Pass updated profile back to Profile component
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={updatedProfile.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={updatedProfile.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={updatedProfile.position}
            onChange={handleChange}
          />
        </label>
        <div className="modal-actions">
          <button onClick={handleSave} className="save-button">Save</button>
          <button onClick={onClose} className="close-button">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
