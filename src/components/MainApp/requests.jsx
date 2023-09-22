import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import AddressCard from '../utiles/addressCard';
import CartCard from '../utiles/cartCard';
import ServiceCard from '../utiles/servicecard';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import { addDays, subDays, setHours, setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { FaSadTear } from "react-icons/fa";
import ProgressBar from 'react-bootstrap/ProgressBar';
import {BASE_URL} from '../../services/halper.js';


import axios from 'axios';
import { date } from 'yup';

function Requests() {
    const [inProgress, setInProgress] = useState([]);
    const [done, setDone] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const id = localStorage.getItem('user_id');
        const fetchData = async () => {
            const url = `${BASE_URL}/service_request/byUserID/`+id.replaceAll('"', '');
            
          try {
            setIsLoading(true);
            const response = await axios.get(url);
            console.log()

            if(response.data.length){
                setIsEmpty(false);
            }
            setDone(response.data.filter((item, index)=>(item.service_status=="Done")));
            setInProgress(response.data.filter((item, index)=>(item.service_status=="InProgress")));
            setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
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
    {!isEmpty  ?
        <>
           {inProgress!=0 && 
              <div className="text py-2 px-2">
                <h5>In progress</h5>
                    {inProgress.map((item, index) => (
                            <ServiceCard data={item} />
                    ))}
             </div>
            }


           {done!=0 && <div className="text py-2 px-2">
                <h5>Done</h5>
                {done.map((item, index) => (
                    <ServiceCard data={item}/>
                ))}
            </div>}
        
            </>
            :
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30vh' }}>
               <FaSadTear size={64} />
             </div>
            
      }
       </>
    } 
    
    </React.Fragment>
  );
}

export default Requests;
