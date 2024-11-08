import React, { useEffect, useState } from 'react';
import axios from '../Api';
import './Dashboard.css';
import EmployeeModal from './EmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';
import EmployeeDetailsModal from './EmployeeDetailsModal';
import { useNavigate } from 'react-router-dom';
import { logout } from '../toolkit/Slice';
import { useDispatch, useSelector } from 'react-redux';

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user,is_admin } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (!is_admin){
      navigate('/')
    }
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('employees/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                params: { search: searchTerm }  
            });
            console.log(response.data);
            
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    fetchEmployees();
}, [token, searchTerm]);  // Depend on token and searchTerm


  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setIsDetailsModalOpen(true);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
    setIsEditModalOpen(false); // Close edit modal after update
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };


  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin');
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Hello, {user} . . .</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="employee-header">
        <div className="actions">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button className="create-button" onClick={() => setIsModalOpen(true)}>
            Create Employee
          </button>
        </div>
      </div>

      <div className="employee-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Email</th>
              <th>Extra</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button className="details-button" onClick={() => handleViewDetails(employee)}>
                      Full
                    </button>
                  </td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditEmployee(employee)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <EmployeeModal onClose={() => setIsModalOpen(false)} onSubmit={handleAddEmployee} />
      )}

      {isEditModalOpen && (
        <EditEmployeeModal employee={editingEmployee} onClose={handleCloseModal} onUpdate={handleUpdateEmployee} />
      )}

      {isDetailsModalOpen && (
        <EmployeeDetailsModal employee={selectedEmployee} onClose={() => setIsDetailsModalOpen(false)} />
      )}
    </div>
  );
}

export default Dashboard;
