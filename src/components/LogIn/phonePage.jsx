import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import Logo  from '../../assets/svglogo';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {BASE_URL} from '../../services/halper.js';


const PhonePage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const schema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Invalid phone number')
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      await schema.validate({ phoneNumber });
      const response = await axios.post(`${BASE_URL}/auth/login-and-signup`, { phone:phoneNumber });
      console.log(response);
      setIsLoading(false);
      navigate('/verifyOtp',
        {
        state: { phoneNumber:phoneNumber }
      });
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    
    <React.Fragment>
     <Wrapper>
    {/* <div>
      <h1>Enter your phone number</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Phone Number:
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        {error && <div>{error}</div>}
        <button type="submit" disabled={isLoading}>Send OTP</button>
        {isLoading && <div>Loading...</div>}
      </form>
    </div> */}

    <div className="container mt-4 d-flex justify-content-center align-items-center">
    <form onSubmit={handleSubmit}>
    <div className="card py-4 px-4">
        <div className="text-center">
             <Logo/>
             <h2 className="text-warning">ServiceTree</h2>
        </div>
        <div className="text-center mt-3">
            
        <span className="info-text">Please enter your mobile number to signup or login.</span>
        
        </div>
        <div className="position-relative mt-3 input-group input-group mb-2">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">+91</span>
          </div>
            <input className="form-control" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            <i className='bi bi-telephone'></i>
        </div>
        <div className="text-center mb-2 text-danger">
        {error && <div>{error}</div>}
        </div>
        {/* <div className=" mt-5 d-flex justify-content-between align-items-center"> */}
            <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-warning" type="submit"  disabled={isLoading}>Send OTP</button>
            {isLoading && <ProgressBar animated now={100} />}
          {/* </div> */}
        </div>
    </div>
    </form>
</div>
</Wrapper>
</React.Fragment>
  );
};

export default PhonePage;

const Wrapper = styled.section`


`;
