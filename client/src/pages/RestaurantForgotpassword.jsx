import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Forgotpassword.css';

const RestaurantForgotpassword = ({email,setEmail}) => {
//   const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('api/RestaurantAuth/RestaurantForgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while processing your request.');
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="forgot-password-page">
      <h2>Forgot Your Password?</h2>
      <p>Please enter the email address associated with your account. We'll send you a link to reset your password.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
          <input type="email" id="email" value={email} onChange={handleChange} required />
        </div>
        {/* Conditionally render the "Verify OTP" button when message is truthy */}
        {message ? (
          <Link to="/Restaurantotp">
            <button type="button" style={{backgroundColor:"#007bff", color:"white",padding: "10px 18px", borderRadius: "6px"}}>Verify OTP</button>
          </Link>
        ) : (
          <button type="submit" style={{backgroundColor:"#007bff", color:"white",padding: "10px 18px", borderRadius: "6px"}}>Get OTP</button>
        )}
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default RestaurantForgotpassword;
