import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Table } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Pagination from "react-js-pagination";
const AllTips = () => {
  const [pagination, setPagination] = useState([]);
  const [tips, setTips] = useState([]);
  const [showPaginaton, setShowPagination] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const url = `http://127.0.0.1:8000/api/tip?page=${pageNumber}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      setTips(res.data.data);
      setPagination(res.data);
      if (res.data.total === 0) {
        setShowPagination(false);
      }
    });
  }, [url]);

  const showTips = tips.map((tip) => {
    return (
      <tr key={tip.id}>
        <td className="pt-4">{tip.id}</td>
        <td className="m-0">
          <img
            src={`http://localhost:8000/storage/Tip/${tip.logo}`}
            alt="profile "
            style={{ height: 50 }}
          />
        </td>
        <td className="pt-4">{tip.tip_name}</td>
        <td className="pt-3">
          {/* <Link to={`/tips/${tip.id}`}> */}
          <Link
            exact="true"
            to={{
              pathname: `/tips/view/${tip.id}`,
              state: {
                tip: { tip },
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
          <h4>Tips Manager</h4>
        </Card.Header>
        <Card.Body>
          <Link to={"/tips/add"}>
            <Button variant="primary">Add New Tip </Button>
          </Link>
        </Card.Body>
      </Card>

      <Table stripped="true" hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Tip Logo</th>
            <th>Tip Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showTips}</tbody>
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

export default withRouter(AllTips);
