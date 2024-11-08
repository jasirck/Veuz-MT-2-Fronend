import React, { useEffect, useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../toolkit/Slice'; 
import axios from '../Api'; 

function Login() {
  const [User, setUser] = useState({ email: '', password: '' }); 
  const [Error, setError] = useState(''); 
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const {token} = useSelector((state)=>(state.authReducer))
  const is_loged = token
  
  useEffect(() => {
    if (is_loged ) {
      console.log(is_loged);
      navigate('/home');
    }
  }, [is_loged, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('login/', {
        email: User.email,
        password: User.password 
      });
      
      const { access, name, is_admin } = response.data; 
      console.log( access, name, is_admin )
      // Store the data in the Redux store
      dispatch(login({ user: name, token: access, is_admin }));  
      
      navigate('dashboard'); 
    } catch (error) {
      setError('Login failed. Please try again.'); 
      console.error('Login Error:', error.response ? error.response.data : error.message); 
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>User Name</label>
        <input
          type="email" 
          placeholder="Enter your email" 
          value={User.email}
          onChange={(e) => setUser({ ...User, email: e.target.value })}
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

export default Login;
