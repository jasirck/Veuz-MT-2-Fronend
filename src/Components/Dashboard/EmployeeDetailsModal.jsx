import React from 'react';
import './EmployeeDetailsModal.css';

function EmployeeDetailsModal({ employee, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Employee Details</h3>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Position:</strong> {employee.position}</p>

        <h4>Custom Fields</h4>
        {employee.custom_fields && employee.custom_fields.length > 0 ? (
          <ul>
            {employee.custom_fields.map((field, index) => (
              <li key={index}>
                <strong>{field.field_name}:</strong> {field.field_value}
              </li>
            ))}
          </ul>
        ) : (
          <p>No custom fields available.</p>
        )}

        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default EmployeeDetailsModal;
