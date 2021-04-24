import React, { useState } from "react";
import axios from "axios";
import { Link, withRouter, useParams, Redirect } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import { Confirm } from "react-st-modal";
// import GoogleMapReact from 'google-map-react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";
//import MyMap from './Map.js'

const ViewEmergencies = (props) => {
  let params = useParams();
  // console.log(props.location.state);
  const emergency = props.location.state.emergency.emergency;
  // console.log(props.location.state.emergency.emergency);
  let date = new Date(emergency.created_at);

  const center = {
    long: emergency.emergency_long,
    lat: emergency.emergency_lat,
  };

  console.log(center);

  const setDone = async () => {
    const UPURL = `http://localhost:8000/api/emergency/${params.id}?_method=PUT`;
    const body = new FormData();
    body.append("status", "done");
    await axios
      .post(UPURL, body, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(() => setRedirect({ redirect: true }));
  };

  const setPending = async () => {
    const UPURL = `http://localhost:8000/api/emergency/${params.id}?_method=PUT`;
    const body = new FormData();
    body.append("status", "pending");
    await axios
      .post(UPURL, body, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(() => setRedirect({ redirect: true }));
  };

  const [redirect, setRedirect] = useState(false);

  // const deleteService = async () => {
  //   const deleteUrl = `http://localhost:8000/api/emergency/${params.id}`;
  //   await axios.delete(deleteUrl).then(() => setRedirect({ redirect: true }));
  // };
  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Card className="text-center">
        <Card.Header>
          <h4>{emergency.emergency_name}</h4>
        </Card.Header>
        <Link to={"/"}>
          <Button className="mt-3 mb-3" variant="warning">
            Back
          </Button>
        </Link>
        {/* <Card.Body></Card.Body> */}
      </Card>

      <Card
        className="text-center mt-3 mb-3"
        style={{
          display: "flex",
          flexDirection: "row",
          borderColor: "transparent",
        }}
      >
        <Button
          className={emergency.status !== "pending" ? "ml-auto mr-5" : "m-auto"}
          variant="success"
          size="md"
          onClick={async () => {
            const isConfirm = await Confirm(
              "Are you sure you want to set this Emergency as Done ?"
            );
            if (isConfirm) {
              setDone();
            }
          }}
        >
          Set As Done
        </Button>
        {emergency.status !== "pending" ? (
          <Button
            className="ml-5 mr-auto"
            variant="info"
            size="md"
            onClick={async () => {
              const isConfirm = await Confirm(
                "Are you sure you want to set this Emergency as Pending ?"
              );
              if (isConfirm) {
                setPending();
              }
            }}
          >
            Set As Pending
          </Button>
        ) : null}
      </Card>

      <WrappedMap
        props={emergency}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,traffic,drawing,places&key=API_KEY`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `500px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />

      <Card className="text-center mt-5 ">
        <Card.Header>
          <h4>User Information</h4>
        </Card.Header>
      </Card>

      <Table stripped="true" hover className="col-md-5 m-auto">
        <thead>
          {/* <tr>
            <th>id</th>
            <th>Emergency</th>
            <th>Status</th>
            <th>Action</th>
          </tr> */}
        </thead>
        <tbody>
          {/* <th>id</th> */}
          <tr>
            <th>Date</th>
            <td>
              {" "}
              {date.toLocaleDateString()} &nbsp; {date.toLocaleTimeString()}
            </td>
          </tr>
          <tr>
            <th>First Name</th>
            <td>{emergency.user.first_name}</td>
          </tr>
          <tr>
            <th>Last Name</th>

            <td>{emergency.user.last_name}</td>
          </tr>
          <tr>
            <th>Phone Number</th>

            <td>{emergency.user.phone_number}</td>
          </tr>
          <tr>
            <th>Medical Condition</th>

            <td>{emergency.user.disease}</td>
          </tr>
          <tr>
            <th>Allergy</th>

            <td>{emergency.user.allergy}</td>
          </tr>
          <tr>
            <th>Medical Treatments</th>

            <td>{emergency.user.medical}</td>
          </tr>

          <tr>
            <th>Latitute</th>

            <td>{emergency.emergency_lat}</td>
          </tr>

          <tr>
            <th>Longitude</th>

            <td>{emergency.emergency_long}</td>
          </tr>

          {/* <th></th>
          <th>{emergency.user.last_name}</th>
          <th>{emergency.user.phone_number}</th>
          <th>{emergency.user.disease}</th>
          <th>{emergency.user.allergy}</th>
          <th>{emergency.user.medical}</th>
          <th>Status</th>
          <th>Action</th> */}
        </tbody>
      </Table>
    </div>
  );
};

export default withRouter(ViewEmergencies);

const Map = (props) => {
  const em = props.props;
  // console.log(em);
  const long = parseFloat(em.emergency_long);
  const lat = parseFloat(em.emergency_lat);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{
        lat: long,
        lng: lat,
      }}
    >
      <Marker
        position={{
          lat: long,
          lng: lat,
        }}
      />
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));
