import React, { useState } from "react";
import axios from "axios";
import { Link, withRouter, useParams, Redirect } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { Confirm } from "react-st-modal";

const ViewTips = (props) => {
  let params = useParams();
  // console.log(props.location.state);
  const tip = props.location.state.tip.tip;
  const [redirect, setRedirect] = useState(false);

  const deleteTip = async () => {
    const deleteUrl = `http://localhost:8000/api/tip/${params.id}`;
    await axios.delete(deleteUrl).then(() => setRedirect({ redirect: true }));
  };
  if (redirect) {
    return <Redirect to="/tips" />;
  }
  return (
    <div>
      <Link to={"/tips"}>
        <Button variant="warning">Back</Button>
      </Link>
      <Link to={`/tips/${tip.id}/edit`}>
        <Button variant="primary">Edit</Button>
      </Link>

      <Button
        variant="danger"
        size="md"
        onClick={async () => {
          const isConfirm = await Confirm(
            "Are you sure you want to delete this Tip ?"
          );
          if (isConfirm) {
            deleteTip();
          }
        }}
      >
        Delete
      </Button>

      <h1>View</h1>
      <img alt='profile' src={`http://localhost:8000/storage/Tip/${tip.logo}`} />
      <img alt='profile' src={`http://localhost:8000/storage/Tip/${tip.image}`} />
    </div>
  );
};

export default withRouter(ViewTips);
