import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Table } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Pagination from "react-js-pagination";

const AllEmergencies = () => {
  // console.log(localStorage.getItem("category"));
  const cate = localStorage.getItem("category");
  const [pagination, setPagination] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [showPaginaton, setShowPagination] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const [pagination2, setPagination2] = useState([]);
  const [emergencies2, setEmergencies2] = useState([]);
  const [showPaginaton2, setShowPagination2] = useState(true);
  const [pageNumber2, setPageNumber2] = useState(1);

  const url = `http://127.0.0.1:8000/api/emergency/new?page=${pageNumber}&category=${cate}`;
  const url2 = `http://127.0.0.1:8000/api/emergency/pending?page=${pageNumber2}&category=${cate}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      setEmergencies(res.data.data);
      console.log(res.data.data);
      setPagination(res.data);
    });
    axios.get(url2).then((res2) => {
      setEmergencies2(res2.data.data);
      console.log(res2.data.data);
      setPagination2(res2.data);
    });

    // if (res.data.total === 0) {
    //   setShowPagination(false);
    // }
  }, [url, url2]);

  const showServices = emergencies.map((emergency) => {
    let date = new Date(emergency.created_at);

    return (
      <tr key={emergency.id}>
        <td className="pt-4">{emergency.id}</td>

        <td className="pt-4">{emergency.emergency_name}</td>
        <td className="pt-4">{emergency.status}</td>
        <td className="pt-4">
          {date.toLocaleDateString()} &nbsp; {date.toLocaleTimeString()}
        </td>
        <td className="pt-3">
          <Link
            exact="true"
            to={{
              pathname: `/emergencies/view/${emergency.id}`,
              state: {
                emergency: { emergency },
              },
            }}
          >
            <Button className="btn btn-success" size="sm">
              View
            </Button>
          </Link>
        </td>
      </tr>
    );
  });

  const showServices2 = emergencies2.map((emergency) => {
    let date = new Date(emergency.created_at);
    // let date2 = new Date(emergency.created_at);
    return (
      <tr key={emergency.id}>
        <td className="pt-4">{emergency.id}</td>

        <td className="pt-4">{emergency.emergency_name}</td>
        <td className="pt-4">{emergency.status}</td>
        <td className="pt-4">
          {date.toLocaleDateString()} &nbsp; {date.toLocaleTimeString()}
        </td>
        <td className="pt-3">
          <Link
            exact="true"
            to={{
              pathname: `/emergencies/view/${emergency.id}`,
              state: {
                emergency: { emergency },
              },
            }}
          >
            <Button className="btn btn-success" size="sm">
              View
            </Button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Card className="text-center">
        <Card.Header>
          <h4>Emergencies Manager</h4>
        </Card.Header>
        {/* <Card.Body>
          <Link to={"/services/add"}>
            <Button variant="primary">Add New Service </Button>
          </Link>
        </Card.Body> */}
      </Card>

      <Card
        className="text-center mt-5"
        style={{ borderColor: "#f00", borderWidth: 2 }}
      >
        <Card.Header  style={{ borderWidth: 0 }}>
          <h4>New Emergencies</h4>
        </Card.Header>
        {/* <Card.Body>
          <Link to={"/services/add"}>
            <Button variant="primary">Add New Service </Button>
          </Link>
        </Card.Body> */}
      </Card>

      <Table stripped="true" hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Emergency</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showServices}</tbody>
      </Table>
      {showPaginaton ? (
        <Pagination
          // innerClass="mt-2 pagination"
          innerClass="pagination justify-content-center"
          activePage={pagination.current_page}
          totalItemsCount={pagination.total}
          itemsCountPerPage={pagination.per_page}
          itemClass="page-item"
          linkClass="page-link"
          nextPageText="next"
          prevPageText="prev"
          onChange={(pageNumber) => {
            setPageNumber(pageNumber);
          }}
        />
      ) : null}

      <Card
        className="text-center mt-5"
        style={{ borderColor: "#fa0", borderWidth: 2 }}
      >
        <Card.Header  style={{ borderWidth: 0 }}>
          <h4>Pending Emergencies </h4>
        </Card.Header>
        {/* <Card.Body>
          <Link to={"/services/add"}>
            <Button variant="primary">Add New Service </Button>
          </Link>
        </Card.Body> */}
      </Card>

      <Table stripped="true" hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Emergency</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showServices2}</tbody>
      </Table>
      {showPaginaton2 ? (
        <Pagination
          // innerClass="mt-2 pagination"
          innerClass="pagination justify-content-center"
          activePage={pagination2.current_page}
          totalItemsCount={pagination2.total}
          itemsCountPerPage={pagination2.per_page}
          itemClass="page-item"
          linkClass="page-link"
          nextPageText="next"
          prevPageText="prev"
          onChange={(pageNumber) => {
            setPageNumber2(pageNumber2);
          }}
        />
      ) : null}
    </>
  );
};

export default withRouter(AllEmergencies);
