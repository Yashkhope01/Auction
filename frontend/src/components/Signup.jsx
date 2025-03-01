import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5001/signup', {
        username,
        password
      });

      // Consider a more user-friendly success message (e.g., a modal or banner)
      alert('Signup successful! Please sign in.'); 
      navigate('/signin'); 
    } catch (err) {
      console.error('Signup Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container"> 
      <h2>Signup</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSignup} className="signup-form">
        <div className="input-group">
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

        <div className="input-group">
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

        <button type="submit" className="signup-button">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;