import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import AddressCard from '../utiles/addressCard';
import CartCard from '../utiles/cartCard'
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import { addDays, subDays, setHours, setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaLuggageCart } from "react-icons/fa";
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';
import { date } from 'yup';
import AddressForm from "../utiles/addressForm";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartItem } from "../../store/reducers/cartSlice";
import RequestForm from '../utiles/requestForm';
import { addToCart } from "../../store/reducers/cartSlice";
import {BASE_URL} from '../../services/halper.js';


const Date1 = () => {
  const [startDate, setStartDate] = useState(null);
  let date = JSON.stringify(startDate)
  date = date.slice(1,11)
  console.log(startDate)
  console.log(date)
    return (
        <Wrapper>
        <div className="date-picker-wrapper mb-3">
         <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={subDays(new Date(), 0)}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select service date"
        className="date-picker-input"
        />
         <span className="calendar-icon">
        <FaCalendarAlt />
         </span>
        </div>
      </Wrapper>
    );
};


function Cart() {
  const cartItems = useSelector((state) => state.cart.requests);
  const dispatch = useDispatch();
  const [address, setAaddress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const handleRequestFormOpen = () => {
    setShowRequestForm(true);
  };

  const handleRequestFormClose = () => {
    setShowRequestForm(false);
  };

  const handleSubmitRequest = async (values) => {
    dispatch(addToCart(values));
    setShowRequestForm(false);
  }

  const handleAddressFormOpen = () => {
    setShowAddressForm(true);
  };

  const handleAddressFormClose = () => {
    setShowAddressForm(false);
  };

  function handleDeleteItem(id) {
    console.log(id);
    dispatch(removeFromCart(id));
  }

  function handleUpdateItem(i) {
    console.log("update");
    // dispatch(updateCartItem({ id, quantity }));
  }

  const handleSubmit = async (values) => {
    const id = localStorage.getItem('user_id');
    const newId = id.replaceAll('"', '');
    console.log(values);
    const newValues = {
      user_id :newId,
      complete_address: values.city,
      land_Mark: values.land_Mark,
      city: values.city,
      state: values.state,
      zip: values.zip
    }
    console.log(newValues);

    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/address/add`, {...newValues} );
      setIsLoading(false);
      setAaddress(response.data);
    } catch (err) {
      console.log(err)
      setIsLoading(false);
      
    }
    setShowAddressForm(false);
    
  };

    useEffect(() => {
        const id = localStorage.getItem('user_id');
        const fetchData = async () => {
            const url = `${BASE_URL}/address/byUserID/`+id.replaceAll('"', '');
            console.log(url);
          try {
            setIsLoading(true);
            const response = await axios.get(url);
            console.log();
            setAaddress(response.data);
            setIsLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

  return (
    <React.Fragment>

     {isLoading ?  
         <ProgressBar animated now={100} />
         :
        <>
        {cartItems.length ? cartItems.map((data,i) => (
            <CartCard data={data}  onEdit={()=>handleUpdateItem(i)} onDelete={()=>handleDeleteItem(i)} />
        )) :
        <div className="text-center py-4 px-4">
          <FaLuggageCart size="30px"/>
          <br></br>
          <text>Your cart is empty</text>
        </div>
          }
        <RequestForm
        show={showRequestForm}
        onClose={handleRequestFormClose}
        onSubmit={handleSubmitRequest}
        />
        <div className="text-center py-4 px-4">
        <Button className="btn-warning" size="sm" onClick={handleRequestFormOpen} >add new request</Button>
        </div>
        {address ? <div>
        <AddressCard address={address} /> 
        <div className="text-center">
          <Date1/>
          <Button className="btn-warning col-8">Book an Appointment</Button>
        </div>
        </div>
        : <div className="text-center py-2 px-2"><Button className="btn-warning col-8" onClick={handleAddressFormOpen} >Add Address</Button></div> 
        }
        {address ? <AddressForm
        initialValues={address}
        show={showAddressForm}
        onClose={handleAddressFormClose}
        onSubmit={handleSubmit}
        /> 
        : 
        <AddressForm
        show={showAddressForm}
        onClose={handleAddressFormClose}
        onSubmit={handleSubmit}
        /> }
        

        </>
      } 
    </React.Fragment>
  );
}

export default Cart;



const Wrapper = styled.section`
.date-picker-wrapper {
    position: relative;
    display: inline-block;
  }
  
  .date-picker-input {
    width: 200px;
    height: 40px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .calendar-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: dark;
    font-size: 18px;
    cursor: pointer;
  }
  
`;