import React, { useState } from "react";
import axios from "axios";
import { Link, withRouter, useParams, Redirect } from "react-router-dom";
import { Button, Card,Table } from "react-bootstrap";
import { Confirm } from "react-st-modal";
import "./view.css";

const ViewServices = (props) => {
  let params = useParams();
  // console.log(props.location.state);
  const service = props.location.state.service.service;
  console.log(service);
  const [redirect, setRedirect] = useState(false);

  const deleteService = async () => {
    const deleteUrl = `http://localhost:8000/api/service/${params.id}`;
    await axios.delete(deleteUrl).then(() => setRedirect({ redirect: true }));
  };
  if (redirect) {
    return <Redirect to="/services" />;
  }
  return (
    <>
      <Card className="text-center">
        <Card.Header>
          <h4>Services Manager</h4>
        </Card.Header>
        <Card.Body>
          <Link
            to={{
              pathname: "/services",
            }}
          >
            <Button variant="warning" className="m-2">
              Back
            </Button>
          </Link>
          <Link to={`/services/edit/${service.id}`}>
            <Button variant="primary" className="m-2">
              Edit
            </Button>
          </Link>

          <Button
            className="m-2"
            variant="danger"
            size="md"
            onClick={async () => {
              const isConfirm = await Confirm(
                "Are you sure you want to delete this Service ?"
              );
              if (isConfirm) {
                deleteService();
              }
            }}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
      <div className="image">
        <img
          src={`http://localhost:8000/storage/Service/${service.image}`}
          alt="profile "
          className="profile mb-5 mt-5"
        />
      </div>

      <Table stripped="true" hover className="col-md-5 m-auto mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <td>{service.id}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Service Name</th>
            <td>{service.service_name}</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>{service.category.category_name}</td>
          </tr>
          
            
        </tbody>
      </Table>
    </>
  );
};

export default withRouter(ViewServices);
