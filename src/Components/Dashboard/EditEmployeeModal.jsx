// EditEmployeeModal.jsx
import React, { useState, useEffect } from 'react';
import axios from '../Api';
import './EditEmployeeModal.css';
import { useSelector } from 'react-redux';

function EditEmployeeModal({ employee, onClose, onUpdate }) {
  const [formData, setFormData] = useState(employee || { custom_fields: [] });
  const { token } = useSelector((state) => state.authReducer);


  useEffect(() => {
    if (employee) {
      console.log(employee);
      
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCustomFieldChange = (index, name, value) => {
    const updatedFields = formData.custom_fields.map((field, i) =>
      i === index ? { ...field, [name]: value } : field
    );
    setFormData({ ...formData, custom_fields: updatedFields });
  };

  const handleAddField = () => {
    setFormData({
      ...formData,
      custom_fields: [...formData.custom_fields, { field_name: '', field_value: '', field_type: 'text' }],
    });
  };

  const handleSave = async () => {
    console.log('save');
    
    if (!formData.id) {
      console.error("Employee ID is undefined!");
      return;
    }
  
    try {
      const response = await axios.put(`employees/${formData.id}/`, formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
      });
      onUpdate(response.data); // Update the parent component with the new data
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Edit Employee</h3>
        <form>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
          />

          <label>Position</label>
          <input
            type="text"
            name="position"
            value={formData.position || ''}
            onChange={handleChange}
          />

          <label>Is Admin</label>
          <input
            type="checkbox"
            name="is_admin"
            checked={formData.is_admin || false}
            onChange={handleChange}
          />

          {/* Custom Fields */}
          {formData.custom_fields?.map((field, index) => (
            <div key={index} className="custom-field">
              <label>Field Name</label>
              <input
                type="text"
                value={field.field_name}
                onChange={(e) => handleCustomFieldChange(index, 'field_name', e.target.value)}
              />
              <label>Field Value</label>
              <input
                type="text"
                value={field.field_value}
                onChange={(e) => handleCustomFieldChange(index, 'field_value', e.target.value)}
              />
              <label>Field Type</label>
              <select
                value={field.field_type}
                onChange={(e) => handleCustomFieldChange(index, 'field_type', e.target.value)}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
              </select>
            </div>
          ))}

          {/* Button to add a new custom field */}
          <button type="button" onClick={handleAddField}>Add Custom Field</button>

          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default EditEmployeeModal;
