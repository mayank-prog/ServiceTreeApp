import React from "react";
import { Card, Button } from "react-bootstrap";
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';


const CartCard = ({ data, onEdit, onDelete }) => {
  console.log(data);
  return (
    <Card style={{ margin: "10px" }}>
      <div className="d-flex ">
        <div className="flex-grow-1 p-3">
        <Card.Title>Need a <b>{data.request_for}</b> for <b>{data.appliance}</b> repair/service. </Card.Title> 
          <Card.Text style={{ fontSize: "14px", marginBottom: "0" }}>
            {data.description}
          </Card.Text>
        </div>
        <div className="d-flex align-items-center ">
        <div className="btn-group-vertical p-2 gap-4">
          {/* <Button variant="outline-warning" size="sm" className=""  onClick={onEdit}> */}
          {/* <BiEdit /> */}
          {/* </Button> */}
          <Button variant="outline-danger" size="sm"  onClick={onDelete}>
          <MdDelete/>
          </Button>
        </div>
        </div>
      </div>
    </Card>
  );
};

export default CartCard;