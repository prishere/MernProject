import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./Screen/HomeScreen";
import ProductScreen from "./Screen/ProductScreen";
import CartScreen from "./Screen/CartScreen";
import LoginScreen from "./Screen/LoginScreen";
import RegisterScreen from "./Screen/RegisterScreen";
import ProfileScreen from "./Screen/ProfileScreen";
import ShippingScreen from "./Screen/ShippingScreen";
import PaymentScreen from "./Screen/PaymentScreen";
import PlaceOrderScreen from "./Screen/PlaceOrderScreen";
import OrderScreen from "./Screen/OrderScreen";
import UserListScreen from "./Screen/UserListScreen";
import UserEditScreen from "./Screen/UserEditScreen";
import ProductListScreen from "./Screen/ProductListScreen";
import ProductEditScreen from "./Screen/ProductEditScreen";
import OrderListScreen from "./Screen/OrderListScreen";
import NewProductListScreen from "./Screen/NewProductListScreen";
import NewProductEditScreen from "./Screen/NewProductEditScreen";
import AllNewProductListScreen from "./Screen/AllNewProductListScreen";
import AllNewProductEditScreen from "./Screen/AllNewProductEditScreen";
import SuccessRegisterationScreen from "./Screen/SuccessRegisterationScreen";
import ForgotPasswordScreen from "./Screen/ForgotPasswordScreen";
import SuccessForgotPasswordScreen from "./Screen/SuccessForgotPasswordScreen";
import ResetPasswordScreen from "./Screen/ResetPasswordScreen";
import DefaultErrorScreen from "./Screen/DefaultErrorScreen";
import NewProductPreviewScreen from "./Screen/NewProductPreviewScreen";
function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container className="py-3">
          <Switch>
            <Route path="/orders/:id" component={OrderScreen} exact />
            <Route path="/placeorder" component={PlaceOrderScreen} exact />
            <Route path="/payment" component={PaymentScreen} exact />
            <Route path="/shipping" component={ShippingScreen} exact />
            <Route path="/login" component={LoginScreen} exact />
            <Route path="/register" component={RegisterScreen} exact />
            <Route path="/profile" component={ProfileScreen} exact />
            <Route path="/product/:id" component={ProductScreen} exact />
            <Route path="/admin/userlist" component={UserListScreen} exact />
            <Route
              path="/admin/productlist"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
              exact
            />
            <Route path="/admin/orderlist" component={OrderListScreen} exact />
            <Route
              path="/admin/user/:id/edit"
              component={UserEditScreen}
              exact
            />
            <Route path="/cart/:id?" component={CartScreen} exact />
            <Route path="/search/:keyword" component={HomeScreen} exact />
            <Route path="/page/:pageNumber" component={HomeScreen} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
              exact
            />
            <Route path="/" component={HomeScreen} exact />
            <Route path="/newproduct" component={NewProductListScreen} exact />
            <Route
              path="/user/product/:id/edit"
              component={NewProductEditScreen}
              exact
            />
            <Route
              path="/newproduct/:id"
              component={NewProductPreviewScreen}
              exact
            />
            <Route
              path="/admin/newproducts"
              component={AllNewProductListScreen}
              exact
            />
            <Route
              path="/admin/newproducts/:id/edit"
              component={AllNewProductEditScreen}
              exact
            />
            <Route
              path="/successpage"
              component={SuccessRegisterationScreen}
              exact
            />
            <Route
              path="/forgotPassword"
              component={ForgotPasswordScreen}
              exact
            />
            <Route
              path="/successPassword"
              component={SuccessForgotPasswordScreen}
              exact
            />
            <Route
              path="/resetPassword"
              component={ResetPasswordScreen}
              exact
            />
            <Route component={DefaultErrorScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
