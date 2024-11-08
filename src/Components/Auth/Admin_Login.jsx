// Admin_Login.js
import React, { useEffect, useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../toolkit/Slice'; // Assuming you have your Redux actions
import axios from '../Api'; // Assuming axios is correctly set up

function Admin_Login() {
  const [User, setUser] = useState({ email: '', password: '' }); 
  const [Error, setError] = useState(''); 
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const { token, is_admin } = useSelector((state) => state.authReducer);
  const is_loged = token && is_admin;

  // If the user is logged in and is an admin, navigate to the dashboard
  useEffect(() => {
    if (is_loged) {
      navigate('/dashboard'); 
    }
  }, [is_loged, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Make the login API call
      const response = await axios.post('login/', {
        email: User.email,  // Change to 'email' here
        password: User.password
      });

      console.log(response);
      
      const { access, name, is_admin } = response.data; 
      
      // Store the data in the Redux store
      dispatch(login({ user: name, token: access, is_admin })); 
      
      // Redirect after successful login
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login Error:', error.response ? error.response.data : error.message); 
    }
  };

  return (
    <div className="auth-container">
      <h2>Admin Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email" 
          placeholder="Enter your email" 
          value={User.email}
          onChange={(e) => setUser({ ...User, email: e.target.value })}  // Fix here for email
          required
        />
        
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={User.password}
          onChange={(e) => setUser({ ...User, password: e.target.value })}
          required
        />
        
        {Error && <p className="error">{Error}</p>} 
        
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a onClick={() => navigate('/register')}>Register</a></p>
    </div>
  );
}

export default Admin_Login;
