import React, { useState } from 'react';
import axios from '../Api';
import './EmployeeModal.css';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

function EmployeeModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    is_admin: false, // Add is_admin field
    custom_fields: [],
    password: '',
    confirm_password: '',
  });
  const [customField, setCustomField] = useState({ field_name: '', field_type: 'text', field_value: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const { token } = useSelector((state) => state.authReducer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCustomFieldChange = (e) => {
    const { name, value } = e.target;
    setCustomField({
      ...customField,
      [name]: value,
    });
  };

  const handleAddCustomField = () => {
    if (!customField.field_name || !customField.field_value) {
      setErrorMessage('All fields are required for custom fields.');
      return;
    }

    setFormData({
      ...formData,
      custom_fields: [...formData.custom_fields, customField],
    });
    setCustomField({ field_name: '', field_type: 'text', field_value: '' });
    setErrorMessage('');
  };

  const handleRemoveCustomField = (index) => {
    const updatedFields = formData.custom_fields.filter((_, i) => i !== index);
    setFormData({ ...formData, custom_fields: updatedFields });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validate passwords
    if (formData.password !== formData.confirm_password) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (!formData.name || !formData.email || !formData.position) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('employees/', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      onSubmit(response.data);
      Swal.fire('Success!', 'Employee created successfully.', 'success');
      setFormData({ name: '', email: '', position: '', is_admin: false, custom_fields: [], password: '', confirm_password: '' });
      onClose();
    } catch (error) {
      setErrorMessage('Error creating employee: ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Create New Employee</h3>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form className="employee-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Position</label>
            <input type="text" name="position" value={formData.position} onChange={handleChange} required />
          </div>

          {/* Password Fields */}
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />
          </div>

          {/* Admin Field */}
          <div className="input-group">
            <label>Is Admin</label>
            <input type="checkbox" name="is_admin" checked={formData.is_admin} onChange={(e) => setFormData({ ...formData, is_admin: e.target.checked })} />
          </div>

          {/* Custom Fields */}
          <div className="custom-fields-section">
            <label>Add Custom Field</label>
            <div className="custom-field-inputs">
              <input
                type="text"
                name="field_name"
                placeholder="Field Name"
                value={customField.field_name}
                onChange={handleCustomFieldChange}
              />
              <select name="field_type" value={customField.field_type} onChange={handleCustomFieldChange}>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
              </select>
              <input
                type="text"
                name="field_value"
                placeholder="Field Value"
                value={customField.field_value}
                onChange={handleCustomFieldChange}
              />
            </div>
            <button type="button" onClick={handleAddCustomField}>Add Custom Field</button>
            {formData.custom_fields.length > 0 && (
              <div className="custom-fields-list">
                {formData.custom_fields.map((field, index) => (
                  <div key={index} className="custom-field">
                    <span>{field.field_name}: {field.field_value}</span>
                    <button type="button" onClick={() => handleRemoveCustomField(index)}>Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="submit-button">Create Employee</button>
        </form>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default EmployeeModal;
