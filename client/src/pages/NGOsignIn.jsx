import './signin.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
// import NOAuth from '../Components/NOAuth';

export default function NGOsignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear error when component mounts
    dispatch(signInFailure(null));
  }, []);


  let viewhide = true;
  const viewhidePass = (e) => {
    e.preventDefault();
    if (viewhide) {
      password.setAttribute ("type","text");
      view.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="18"  fill="currentColor" className="bi bi-eye-slash" viewBox="0">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
</svg>`;
      viewhide = false;
    }
    else {
      password.setAttribute ("type","password");
      view.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="currentColor" className="bi bi-eye" viewBox="0">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
    </svg>`;
      viewhide = true;
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('api/NGOAuth/NGOsignin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInFailure(null));
      dispatch(signInSuccess(data));
      navigate('/NGODashboard');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='signin'>
      <h1 id='role'>Sign in <br />  as <span className="google">NGO</span></h1>
      <form onSubmit = {handleSubmit} action="" className='signin_form'>
        <h2 id='title'>Sign In</h2>
        <input type="email" className="inputs" id="email"  placeholder='Email' required onChange = {handleChange} />
        <div className="passcontainer"><input type="password" className="inputs" id="password" placeholder='Password' required onChange = {handleChange}/>
        <button className='view' id='view' onClick={viewhidePass}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="currentColor" className="bi bi-eye" viewBox="0">
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
        </svg>
        </button>
        </div>
        
        <button disabled={loading} className="register">{loading ? 'Loading...' : 'Sign in as Donor'}</button>
        <div className="others">
            {/* <span>Or, continue with <a id='google' href="/">Google</a><br/> </span> */}
            <span>Forgot password? <a id='forgot-password' href="/NGOForgotpassword" className='google'>Reset it here</a><br/></span><br/>
            <span>Don't have a account, <a id='google' href="/NGOsignup">Create one</a> </span>
            {error && <p className='text-red-500 mt-1'>{error}</p>} 
        </div>
        {/* <NOAuth/> */}
      </form>
    </div>
  )
}