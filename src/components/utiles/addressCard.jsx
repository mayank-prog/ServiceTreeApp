import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from "react-bootstrap";
import { BiMap } from 'react-icons/bi';
import {  CiEdit } from 'react-icons/ci';
import AddressForm from "../utiles/addressForm";
import ProgressBar from 'react-bootstrap/ProgressBar';
import {BASE_URL} from '../../services/halper.js';



function AddressCard({ address, onEdit }) {
  
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editaddress, setEditAaddress] = useState(address);

  const handleAddressFormOpen = () => {
    setShowAddressForm(true);
  };

  const handleAddressFormClose = () => {
    setShowAddressForm(false);
  };

  const handleSubmit = async (values) => {
    const id = values._id;
    const newId = id.replaceAll('"', '');
    console.log(newId)
    try {
      setIsLoading(true);
      const response = await axios.put(`${BASE_URL}/address/${newId}`, {...values} );
      setIsLoading(false);
    } catch (err) {
      console.log(err)
      // setIsLoading(false);
    }
    setShowAddressForm(false);
    window.location.reload(false);
  };
  // console.log("AddressCard->" ,address);
  return (
      <React.Fragment>
          <div className="text py-2 px-2">
            <h5>Saved Addresses</h5>
         </div> 
       <Card style={{ margin: "10px", borderWidth: "0" }}>
        <div className="d-flex align-items-center">
          <BiMap  size="40px" className="mr-4" />
        <div className="flex-grow-1 p-3">
         <Card.Title style={{ marginBottom: "5px" }}>{"Home"}</Card.Title>
         <Card.Text style={{ fontSize: "14px", marginBottom: "0" }}>
           {address.complete_address}, {address.land_Mark}
         </Card.Text>
         <Card.Text style={{ fontSize: "14px", marginBottom: "0" }}>
          {address.city}-{address.zip}, {address.state}
         </Card.Text>
         <CiEdit onClick={handleAddressFormOpen} size="20px" />
       </div>
        </div>
    </Card> 
    <AddressForm
        initialValues={address}
        show={showAddressForm}
        onClose={handleAddressFormClose}
        onSubmit={handleSubmit}
        />
  </React.Fragment>  
  );
}
export default AddressCard;