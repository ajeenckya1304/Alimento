import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';


const NGONewPasswordForm = () => {
  // const [email] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
  
    try {
      const response = await fetch('/api/NGOAuth/NGOUpdatePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: location.state.email, password, confirmPassword }), // send only password
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('An error occurred while processing your request.');
    }
  
    // Reset the form
    setPassword('');
    setConfirmPassword('');
  };
  
  
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div>
      <h2>Enter New Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default NGONewPasswordForm;
