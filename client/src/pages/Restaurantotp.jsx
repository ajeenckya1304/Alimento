import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Restaurantotp = ({ email }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/RestaurantAuth/RestaurantVerifyOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message); // Update success message state
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('An error occurred while processing your request.');
    }
  };

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  // Redirect to NewPasswordForm component when successMessage is set
  if (successMessage) {
    return <Navigate to="/RestaurantNewPasswordForm" state={{ email }} />;
  }

  return (
    <div className="forgot-password-page" style={{padding: "25px"}}>
      <h2>Enter OTP</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="otp">OTP:</label>
          <input type="text" id="otp" value={otp} onChange={handleChange} required style={{height : "28px", marginBottom : "18px", padding: "20px 12px", marginLeft: "12px", borderRadius: "6px"}} />
        </div>
        <button type="submit" style={{backgroundColor:"#007bff", color:"white",padding: "6px 10px", borderRadius: "6px"}} >Verify OTP</button>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default Restaurantotp;
