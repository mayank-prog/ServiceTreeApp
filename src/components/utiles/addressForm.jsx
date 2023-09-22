import React, { useState , useEffect} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from "axios";
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
    complete_address: Yup.string().required('Complete Address is required'),
    zip: Yup.string()
      .required('Zip Code is required')
      .matches(/^\d{6}$/, 'Zip Code must be 6 digits'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
  });


const AddressForm = ({ initialValues = {}, onSubmit , show, onClose  }) => {
    const [city, setCity] = useState(initialValues.city || '');
    const [state, setState] = useState(initialValues.state || '');
  
    const formik = useFormik({
      initialValues: {
        complete_address: initialValues.complete_address || '',
        land_Mark: initialValues.land_Mark || '',
        zip: initialValues.zip || '',
        city,
        state,
        _id:initialValues._id || ''
      },
      validationSchema,
      onSubmit,
    });
    console.log(initialValues)
    useEffect(() => {
        
        if (formik.values.zip) {
          axios
            .get(`https://api.postalpincode.in/pincode/${formik.values.zip}`)
            .then(response => {
              if (response.data.length > 0) {
                const { PostOffice } = response.data[0];
                const [postOffice] = PostOffice;
                setCity(postOffice.Block);
                setState(postOffice.State);
                formik.setFieldError('zip', '');
                formik.setFieldValue('city', postOffice.Block);
                formik.setFieldValue('state', postOffice.State);
              } else {
                setCity('');
                setState('');
                formik.setFieldError('zip', 'Invalid Zip Code');
              }
            })
            .catch(error => {
              console.error(error);
              setCity('');
              setState('');
              formik.setFieldError('zip', 'Invalid Zip Code');
            });
        }
      }, [formik.values.zip]);    

const objectLength = Object.keys(formik.errors).length

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Address</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <form className="py-2 px-2" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label for="complete_address">Complete Address</label>
        <input
          class="form-control"
          id="complete_address"
          name="complete_address"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.complete_address}
        />
        {formik.touched.complete_address && formik.errors.complete_address ? (
            <span className="text-danger">{formik.errors.complete_address}</span>
        ) : null}
      </div>

      <div className="form-group">
        <label for="land_Mark">Landmark (optional)</label>
        <input
          class="form-control"
          id="land_Mark"
          name="land_Mark"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.land_Mark}
        />
      </div>

      <div className="form-group">
        <label for="zip">Zip Code</label>
        <input
          class="form-control"
          id="zip"
          name="zip"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.zip}
        />
        
        {formik.touched.zip && formik.errors.zip ? (
          <div>{formik.errors.zip}</div>
        ) : null}
        {state && city && (
          <span className="text-success ">
            {city}, {state}
          </span>
        )}
      </div>

      <div className="d-grid gap-2 col-6 mx-auto mt-3">
        <Button type="submit" className={`btn btn-warning ${objectLength ? 'disabled': ''}`}>Save</Button> 
      </div>

      
        </form>
      </Modal.Body>

      
    </Modal>
  );
}

export default AddressForm;