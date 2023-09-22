import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import Logo  from '../../assets/svglogo';
import styled from 'styled-components';
import { useNavigate ,useLocation } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {BASE_URL} from '../../services/halper.js';

const OtpPage = (props) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const location = useLocation();
  const {phoneNumber} = location.state;
  let navigate = useNavigate();

  const otpSchema = Yup.object().shape({
    otp: Yup.string()
      .required('Six digit OTP is required')
      .matches(/^[0-9]{6}$/, 'Invalid OTP')
  });

  useEffect(() => {
    if (timeLeft === 0) {
      setError('OTP expired. Please try again.');
      setIsLoading(false);
    } else {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(otp);
    console.log(phoneNumber);
    try {
      setIsLoading(true);
      await otpSchema.validate({ otp });
      const response = await axios.post(`${BASE_URL}/auth/verifyOTP`, { phone: phoneNumber, otp });

      setIsLoading(false);
      const user_id = JSON.stringify(response.data.user._id);
      localStorage.setItem('user_id' , user_id);
      localStorage.setItem('authToken', response.data.token);
       navigate('/',);
       window.location.reload(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <React.Fragment>
    <div className="container mt-4 d-flex justify-content-center align-items-center">
    <form onSubmit={handleSubmit}>
    <div className="card py-4 px-4">
        <div className="text-center">
             <Logo/>
             <h2 className="text-warning">ServiceTree</h2>
        </div>
        <div className="text-center mt-3">
            
        <span className="info-text">A new OTP has been sent to {phoneNumber}. Please enter it below:</span>
        </div>
        <div className="position-relative mt-3 input-group input-group mb-2">
            <input className="form-control " style={{textAlign: "center"}} type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <i className='bi bi-telephone'></i>
        </div>
        
        <div className="text-center mb-2 text-danger">
        {error && <div>{error}</div>}
        </div>
        {/* <div className=" mt-5 d-flex justify-content-between align-items-center"> */}
          <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-warning" type="submit" disabled={isLoading}>Verify OTP</button>
            {isLoading && <ProgressBar animated now={100} />}
          {/* </div> */}
        </div>
        <span className='text-danger text-center pt-1' >OTP expires in {timeLeft} seconds</span>
    </div>
    </form>
</div>

    </React.Fragment>
  );
};

export default OtpPage;
