import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Table } from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Confirm } from "react-st-modal";

import Pagination from "react-js-pagination";
const AllAdmins = () => {
  const [pagination, setPagination] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [showPaginaton, setShowPagination] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const cate = localStorage.getItem("category");
  const [redirect, setRedirect] = useState(false);

  const url = `http://127.0.0.1:8000/api/admin/admins?page=${pageNumber}&category=${cate}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      // console.log(res)
      setAdmins(res.data.data);
      setPagination(res.data);
      // if (res.data.total === 0) {
      //   setShowPagination(false);
      // }
    });
  }, [url]);

  const deleteAdmin = async (id) => {
    const deleteUrl = `http://localhost:8000/api/admin/admins/${id}`;
    await axios.delete(deleteUrl);
    axios.get(url).then((res) => {
      // console.log(res)
      setAdmins(res.data.data);
      setPagination(res.data);
      // if (res.data.total === 0) {
      //   setShowPagination(false);
      // }
    });
  };
  if (redirect) {
    return <Redirect to="/admins" />;
  }
  const showAdmins = admins.map((admin) => {
    return (
      <tr key={admin.id}>
        <td className="pt-4">{admin.id}</td>
        <td className="pt-4">{admin.name}</td>
        <td className="pt-4">{admin.email}</td>
        <td className="pt-3">
          {/* <Link to={`/tips/${tip.id}`}> */}
          <Link
            exact="true"
            to={{
              pathname: `/admins/edit/${admin.id}`,
              state: {
                admin: { admin },
              },
            }}
          >
            <Button className="btn btn-success" size="sm">
              Edit
            </Button>
          </Link>

          <Button
            className="ml-2"
            variant="danger"
            size="sm"
            onClick={async () => {
              const isConfirm = await Confirm(
                "Are you sure you want to delete this Admin ?"
              );
              if (isConfirm) {
                deleteAdmin(admin.id);
              }
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Card className="text-center">
        <Card.Header>
          <h4>Admins Manager</h4>
        </Card.Header>
        <Card.Body>
          <Link to={"/admins/add"}>
            <Button variant="primary">Add New Admin </Button>
          </Link>
        </Card.Body>
      </Card>

      <Table stripped="true" hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Admin Name</th>
            <th>Admin Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showAdmins}</tbody>
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

export default withRouter(AllAdmins);
