import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
// import NOAuth from '../Components/NOAuth';

export default function NGOsignup() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    let viewIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="18"  fill="currentColor" className="bi bi-eye-slash" viewBox="0">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
      <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
    </svg>`

    let hideIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="currentColor" className="bi bi-eye" viewBox="0">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
    </svg>`

    let viewhide = true;
    const viewhidePass = (e) => {
      e.preventDefault();
      if (viewhide) {
        password.setAttribute ("type","text");
        view.innerHTML = viewIcon;
        viewhide = false;
      }
      else {
        password.setAttribute ("type","password");
        view.innerHTML = hideIcon;
        viewhide = true;
      }
    }

    let viewhideConfirm = true;
    const viewhideConfirmPass = (e) => {
      e.preventDefault();
      if (viewhideConfirm) {
        confirmPassword.setAttribute ("type","text");
        viewConfirm.innerHTML = viewIcon;
        viewhideConfirm = false;
      }
      else {
        confirmPassword.setAttribute ("type","password");
        viewConfirm.innerHTML = hideIcon;
        viewhideConfirm = true;
      }
    }


    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      };
      let isValidationPerformed = false;

      const validate = () => {
        if (password.value !== confirmPassword.value || password.value === "" || confirmPassword.value === "") {
          if (!isValidationPerformed) {
            alert("Password field empty or did not match");
            isValidationPerformed = true;
          }
          return false;
        }
        return true;
      }
      
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Validate the passwords
        if (!validate()) {
          return;
        }
      
        try {
          setLoading(true);
          const { confirmPassword, ...dataWithoutConfirmPassword } = formData;
      
          // Send OTP to the user's email
          await sendOTP(); // Wait for OTP to be sent successfully
      
          // Ask the user to enter the OTP
          const userEnteredOTP = window.prompt('An OTP has been sent to your email. Please enter it here:');
      
          // If the OTP matches, proceed with the registration
          const res = await fetch('/api/NGOAuth/NGOsignup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...dataWithoutConfirmPassword, otp: userEnteredOTP }),
          });
      
          const data = await res.json();
          if (data.success === false) {
            setLoading(false);
            setError(data.message);
            return;
          }
      
          setLoading(false);
          setError(null);
          navigate('/NGOsignin');
        } catch (error) {
          setLoading(false);
          setError(error.message);
        }
      };
      
    
    const sendOTP = async () => {
        try {
            const res = await fetch('/api/NGOAuth/sendOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            });
    
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                return;
            }
    
            alert('OTP sent successfully. Please check your email.');
        } catch (error) {
            setError(error.message);
        }
    };
    
      
      
      

    return (
      <div className='signup'>
        <h1 id='role'>
          Sign Up <br /> as <span id='google'>NGO</span>
        </h1>
        <form onSubmit={handleSubmit} action="" className='signup_form'>
          <h2 id='title'>Sign Up</h2>
          <input className='inputs' type="text" id='username' placeholder='Name' required onChange={handleChange}/>
          <input className='inputs' type="email" name="email" id="email" placeholder='Email' required onChange={handleChange}/>
          <input className='inputs' type="address" name="address" id="address" placeholder='Address' required onChange={handleChange}/>
          <div className="passcontainer">
            <input className='inputs' type="password" id='password' placeholder='Password' required onChange={handleChange}/>
            <button className='view' id='view' onClick={viewhidePass}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="currentColor" className="bi bi-eye" viewBox="0">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                          </svg>
            </button>
          </div>
  
          <div className="passcontainer">
            <input className='inputs' type="password" id='confirmPassword' placeholder='Confirm Password' required onChange={handleChange} />
            <button className='view' id='viewConfirm' onClick={viewhideConfirmPass}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="currentColor" className="bi bi-eye" viewBox="0">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                          </svg>
            </button>
          </div>
  
          <button disabled={loading} className="register" onClick={validate} > {loading ? 'Loading...' : 'Register'} </button>
          {/* <div className="holder"><span>Or, continue with <a id='google' href="/">Google</a> </span> </div> */}
          <div className="holder"><span>Already Have an account? <a className='google' href="/NGOsignin">Sign in</a> </span></div>
          
          {error && <p className='text-red-500 mt-1'>{error}Already Registered</p>} 
          {/* <NOAuth/>         */}
        </form>
      </div>
  )
  
}
