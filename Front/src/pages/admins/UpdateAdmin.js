import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card } from "react-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";
import axios from "axios";

const AddAdmin = () => {
  const params = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const onChangeName = (e) => {
    setName(e.target.value);
    // console.log(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePass = (e) => {
    setPassword(e.target.value);
  };

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const onAccept = (e) => {
    const cat = localStorage.getItem("category");
    e.preventDefault();
    const url = `http://localhost:8000/api/admin/admins/${params.id}?_method=PUT`;

    const body = new FormData();

    if (name) {
      body.append("name", name);
    } 
    if (email) {
      body.append("email", email);
    }
    if (image) {
      body.append("image", image);
    } 
    if (password) {
      body.append("password", password);
    }

    body.append("category_id", cat);

    axios
      .post(url, body, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setName("");
        setEmail("");
        setImage(null);
        setPassword("");

        setRedirect(true);
      });
  };
  if (redirect) {
    return <Redirect to="/admins" />;
  }
  return (
    <>
      <Card className="text-center">
        <Card.Header>
          <h4>Update an Admin</h4>
        </Card.Header>
        <Card.Body>
          <Link to={"/admins"}>
            <Button variant="warning">Back</Button>
          </Link>
        </Card.Body>
      </Card>

      <Form onSubmit={(e) => onAccept(e)} className="w-50 mx-auto mt-5">
        <div className="form-group">
          <label>Name:</label>

          <input
            className="form-control"
            type="text"
            onChange={(e) => {
              onChangeName(e);
            }}
            maxLength="255"
            pattern="[A-Za-z].{1,}"
            title="2 or more letters allowed"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>

          <input
            className="form-control"
            type="email"
            onChange={(e) => {
              onChangeEmail(e);
            }}
            maxLength="255"
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            className="form-control"
            type="password"
            onChange={(e) => {
              onChangePass(e);
            }}
            maxLength="255"
          />
        </div>

        <div className="form-group">
          <label>Image:</label>
          <br />
          <input
            className=""
            type="file"
            accept="image/*"
            onChange={(e) => {
              onChangeImage(e);
            }}
          />
        </div>

        <div className="form-group">
          <Button className="btn btn-primary" type="submit">
            Save
          </Button>
        </div>

        {/*!* FIXME: Category Needed */}
      </Form>
    </>
  );
};

export default AddAdmin;
