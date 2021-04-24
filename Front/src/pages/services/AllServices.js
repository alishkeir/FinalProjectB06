import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Table } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Pagination from "react-js-pagination";
const AllServices = () => {
  const [pagination, setPagination] = useState([]);
  const [services, setServices] = useState([]);
  const [showPaginaton, setShowPagination] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const cat = localStorage.getItem("category");
  const url = `http://127.0.0.1:8000/api/service?page=${pageNumber}&category=${cat}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      setServices(res.data.data);
      setPagination(res.data);
      // if (res.data.total === 0) {
      //   setShowPagination(false);
      // }
    });
  }, [url]);

  const showServices = services.map((service) => {
    return (
      <tr key={service.id}>
        <td className="pt-4">{service.id}</td>
        {/* <td className="m-0">
          <img
            src={`http://localhost:8000/storage/Service/${service.image}`}
            alt="profile "
            style={{ height: 50 }}
          />
        </td> */}
        <td className="pt-4">{service.service_name}</td>
        <td className="pt-3">
          <Link
            exact="true"
            to={{
              pathname: `/services/view/${service.id}`,
              state: {
                service: { service },
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
          <h4>Services Manager</h4>
        </Card.Header>
        <Card.Body>
          <Link to={"/services/add"}>
            <Button variant="primary">Add New Service </Button>
          </Link>
        </Card.Body>
      </Card>

      <Table stripped="true" hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Service Name</th>
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
    </>
  );
};

export default withRouter(AllServices);
