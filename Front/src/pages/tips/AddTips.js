import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const AddTips = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [logo, setLogo] = useState(null);
  // const [category, setCategory] = useState("");
  const [redirect, setRedirect] = useState(false);

  const onChangeName = (e) => {
    setName(e.target.value);
    // console.log(e.target.value);
  };

  const onChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const onChangeLogo = (e) => {
    setLogo(e.target.files[0]);
  };

  const onAccept = (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/api/tip";

    const body = new FormData();
    body.append("tip_name", name);
    body.append("tip_description", desc);
    body.append("image", image);
    body.append("logo", logo);
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
        setDesc("");
        setImage(null);
        setLogo(null);
        // setCategory("");

        setRedirect(true);
      });
  };
  if (redirect) {
    return <Redirect to="/tips" />;
  }
  return (
    <>
      <Card className="text-center">
        <Card.Header>
          <h4>Create a Student</h4>
        </Card.Header>
        <Card.Body>
          <Link to={"/tips"}>
            <Button variant="warning">Back</Button>
          </Link>
        </Card.Body>
      </Card>

      <Form onSubmit={(e) => onAccept(e)} className="w-50 mx-auto mt-5">
        <div className="form-group">
          <label>Tip Name:</label>

          <input
            className="form-control"
            type="text"
            onChange={(e) => {
              onChangeName(e);
            }}
            maxLength="255"
            required
            pattern="[A-Za-z].{1,}"
            title="Only letters allowed"
          />
        </div>

        <div className="form-group">
          <label>Tip Description:</label>

          <input
            className="form-control"
            type="text"
            onChange={(e) => {
              onChangeDesc(e);
            }}
            maxLength="255"
            required
            pattern="[A-Za-z].{1,}"
            title="Only letters allowed"
          />
        </div>

        <div className="form-group">
          <label>Tip Image:</label>
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
            pattern="[A-Za-z].{1,}"
            title="Only letters allowed"
          />
        </div>

        <div className="form-group">
          <label>Tip Logo:</label>
          <br />

          <input
            className=""
            type="file"
            accept="image/*"
            onChange={(e) => {
              onChangeLogo(e);
            }}
            maxLength="255"
            required
            pattern="[A-Za-z].{1,}"
            title="Only letters allowed"
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

export default AddTips;
