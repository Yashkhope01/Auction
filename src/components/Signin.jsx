import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      const res = await axios.post('http://localhost:5001/signin', { username, password });
      console.log('Signin Response:', res.data);
      if (res.data.token) {
        localStorage.setItem('authToken', res.data.token);
        navigate('/dashboard'); 
      } else {
        setError('Invalid credentials'); 
      }
    } catch (err) {
      console.error('Signin Request Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to sign in. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Signin</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSignin} className="signin-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
             placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signin-button">Signin</button>
      </form>
    </div>
  );
}

export default Signin;