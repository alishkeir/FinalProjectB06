import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const AddServices = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const onChangeName = (e) => {
    setName(e.target.value);
    // console.log(e.target.value);
  };

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
    // console.log(e.target.files[0]);
  };

  const onAccept = (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/api/service";

    const body = new FormData();
    body.append("service_name", name);
    body.append("image", image);
    body.append("category_id", localStorage.getItem("category"));

    axios
      .post(url, body, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setName("");
        setImage(null);
        setRedirect(true);
      });
  };
  if (redirect) {
    return <Redirect to="/services" />;
  }
  return (
    <>
      <Card className="text-center">
        <Card.Header>
          <h4>Create a Service</h4>
        </Card.Header>
        <Card.Body>
          <Link to={"/services"}>
            <Button variant="warning">Back</Button>
          </Link>
        </Card.Body>
      </Card>

      <Form onSubmit={(e) => onAccept(e)} className="w-50 mx-auto mt-5">
        <div className="form-group">
          <label>Service Name:</label>

          <input
            className="form-control"
            type="text"
            onChange={(e) => {
              onChangeName(e);
            }}
            maxLength="255"
            required
            pattern="[A-Za-z].{1,}"
            title="2 or more letters allowed"
          />
        </div>

        <div className="form-group">
          <label>Service Image:</label>
          <br />
          <input
            className=""
            type="file"
            accept="image/*"
            onChange={(e) => {
              onChangeImage(e);
            }}
            maxLength="255"
            required
          />
        </div>

        <div className="form-group">
          <Button className="btn btn-primary" type="submit">
            Create
          </Button>
        </div>

        {/*!* FIXME: Category Needed */}
      </Form>
    </>
  );
};

export default AddServices;
