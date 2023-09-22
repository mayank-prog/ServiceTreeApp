import React, { useState , useEffect} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from "axios";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    request_for: Yup.string().required('Selection is required'),
    description: Yup.string().required('Please describe problem in short.')
  });


const RequestForm = ({ initialValues = {}, onSubmit , show, onClose  }) => {
  
    const formik = useFormik({
      initialValues: {
        request_for: "" || "",
        description: "" || ""
      },
      validationSchema,
      onSubmit,
    });

  const objectLength = Object.keys(formik.errors).length;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Request</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <form className="py-2 px-2" onSubmit={formik.handleSubmit}>
      <div className="form-group py-2 px-2">   
      <label for="">Need a</label>
        <select 
             class="form-control"
             id="request_for"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.request_for}
             >
            <option selected>Select your need</option>
            <option value="Electrician">Electrician</option>
            <option value="Plumber">Plumber</option>
         </select>
         {formik.touched.request_for && formik.errors.request_for ? (
            <span className="text-danger">{formik.errors.request_for}</span>
        ) : null}
      </div> 
      <div class="form-group py-2 px-2">
            <label for="exampleFormControlTextarea1">Describe appliance name and problem</label>
            <textarea 
                class="form-control" 
                id="description" 
                rows="3"
                name="description"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                >
            </textarea>
            
        {formik.touched.description && formik.errors.description ? (
            <span className="text-danger">{formik.errors.description}</span>
        ) : null}
      </div>
   
      <div className="d-grid gap-2 col-6 mx-auto mt-3">
        <Button type="submit" className={`btn btn-warning ${objectLength ? 'disabled': ''}`}>Add</Button> 
      </div>

      
        </form>
      </Modal.Body>

      
    </Modal>
  );
}

export default RequestForm;