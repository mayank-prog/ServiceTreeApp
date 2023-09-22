import React, { useState, useEffect } from 'react';
import RequestForm from '../utiles/requestForm';
import { Button } from 'react-bootstrap';
import {BASE_URL} from '../../services/halper.js';


function Home() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const handleRequestFormOpen = () => {
    setShowRequestForm(true);
  };

  const handleRequestFormClose = () => {
    setShowRequestForm(false);
  };

  const handleSubmit = async (values) => {
    console.log(values);
  }

  return (
    <div>
      <h1>Welcome to My App!</h1>
      {/* <Button className="btn-warning col-8" onClick={handleRequestFormOpen} >Add Address</Button>
      <RequestForm
        show={showRequestForm}
        onClose={handleRequestFormClose}
        onSubmit={handleSubmit}
        /> */}
      
    </div>
  );
}

export default Home;
