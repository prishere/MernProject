import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  deleteNewProduct,
  listNewProducts,
} from "../actions/newProductActions";
import { NEW_PRODUCT_CREATE_RESET } from "../constants/newProductConstants";

const AllNewProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const newProductList = useSelector((state) => state.newProductList);
  const { loading, error, newProducts } = newProductList;

  const newProductDelete = useSelector((state) => state.newProductDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = newProductDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: NEW_PRODUCT_CREATE_RESET });
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(listNewProducts());
  }, [dispatch, userInfo, successDelete]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteNewProduct(id));
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>New Products By Customers</h1>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th></th>
              <th>EMAIL</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {newProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  {product.isAdded ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    " "
                  )}
                </td>
                <td>
                  <a href={`mailto:${product.mail}`}>{product.mail}</a>
                </td>
                <td>{product.name}</td>
                <td>Rs.{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/newproducts/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
                <td>
                  {" "}
                  <LinkContainer to={`/newproduct/${product._id}`}>
                    <Button variant="light" className="btn-sm">
                      Preview
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AllNewProductListScreen;
