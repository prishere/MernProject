import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  createNewProduct,
  deleteNewProduct,
  listMyNewProducts,
} from "../actions/newProductActions";
import { NEW_PRODUCT_CREATE_RESET } from "../constants/newProductConstants";

const NewProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const newProductListMy = useSelector((state) => state.newProductListMy);
  const { loading, error, myProducts } = newProductListMy;

  const newProductDelete = useSelector((state) => state.newProductDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = newProductDelete;

  const newProductCreate = useSelector((state) => state.newProductCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    newProduct: createdProduct,
  } = newProductCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: NEW_PRODUCT_CREATE_RESET });
    if (!userInfo) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/user/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listMyNewProducts());
    }
  }, [dispatch, userInfo, successDelete, successCreate, createdProduct]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteNewProduct(id));
    }
  };
  const createProductHandler = (e) => {
    e.preventDefault();
    dispatch(createNewProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Added Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : myProducts.length === 0 ? (
        <Message> Want To Sell Your Own Product? click on Above Button</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {myProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  {product.isAdded ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    " "
                  )}
                </td>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>Rs.{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/user/product/${product._id}/edit`}>
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

export default NewProductListScreen;
