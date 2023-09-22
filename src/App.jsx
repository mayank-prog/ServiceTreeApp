import React, {useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar/navbar.jsx'
import Header from './components/NavBar/header.jsx'
import PhonePage from './components/LogIn/phonePage';
import OtpPage from './components/LogIn/otpPage'; 
import {  Routes, Route  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './components/MainApp/home';
import Cart from './components/MainApp/cart';
import Requests from "./components/MainApp/requests";
import styled from 'styled-components';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // check for auth token when component mounts
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <React.Fragment>
    {isLoggedIn ? (
    <div className="app">
      <Wrapper>
      <div className="n">
       <Header/>
       </div>
       </Wrapper> 
       <Routes> 
        <Route exact path="/" element={<PhonePage/>} />
        <Route path="/verifyOtp"  element={<OtpPage />} />
        </Routes>
        </div>
      ) : (
      <div className="app">
        <Wrapper>
        <div className="n">
        <Header/>
        <Navbar/> 
        </div>
        </Wrapper>
        <Routes> 
        
        <Route exact path="/" element={<Home/>} />
        <Route path="/Cart"  element={<Cart />} />
        <Route path="/requests"  element={<Requests />} />
        </Routes>
      {/* <HomeLayoutRoute path="/" element={<Home />} /> */}
      {/* <PrivateRoute path="/" element={<PrivateScreen/>} /> */}
      
       {/* <Route path="/forgotpassword" element={<ForgotPasswordScreen/>}/> */}
      {/* <Route path="/passwordreset/:resetToken" element={<ResetPasswordScreen/>}/>   */}
      
  </div>
  )}
   </React.Fragment>
  )
}
export default App


const Wrapper = styled.section`
// .n{
//   position: fixed;
//   top: 0;
//   width: 100%;
//   z-index: 999;
// }
// .app{
//   padding-top: 25px;
// }
`;

