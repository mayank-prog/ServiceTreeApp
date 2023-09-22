import { Card, Button, Badge } from 'react-bootstrap';
import { CgSandClock } from 'react-icons/cg';
import { IoIosCloudDone } from 'react-icons/io';
import { useState } from 'react';

function ServiceCard({ data, onEdit }) {
  const [isCanceled, setIsCanceled] = useState(false);

  const handleCancel = () => {
    setIsCanceled(true);
  };

  return (
      
    <Card style={{ margin: "10px" }} className={isCanceled ? "canceled" : ""}>
      <Card.Body>
        <div className="d-flex justify-content-between">
      <Card.Title >Need a <b>{data.service_category}</b> for <b>{data.request_for}</b> repair/service. </Card.Title> 
        {data.service_status !="Done" && (
            <CgSandClock color="blue" size="40px" />
        )}
        {data.service_status =="Done" && (
           <IoIosCloudDone color="green" size="40px"/>
        )}
 
        </div>
        <Card.Title className="h6">By date :- {data.date_of_served}</Card.Title>
          
        
        <Card.Text>
          {data.description}
        </Card.Text>
        
      </Card.Body>
    </Card>
  );
}

export default ServiceCard;
