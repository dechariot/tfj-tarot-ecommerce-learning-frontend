import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus } from "../admin/apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  });

  const showOrderLength = () => {
    if (orders.length > 0) {
      return (
        <h2 className="mainText display-4 font-weight-bold">Total order: {orders.length}</h2>
      );
    } else {
      return <h2 className="text-danger font-weight-bold display-4">No Orders</h2>;
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {o.status}</h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout
      title="Order"
      description={`Manage all orders`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 p-4 offset-md-2">
          {showOrderLength(orders)}
          {orders.map((o, oIndex) => {
            return (
              <div
                key={oIndex}
                className="mt-5"
                style={{ border: "5px solid  rgb(88, 4, 255)" }}
              >
                <h3 className="mb-5">
                  <span className="mainText font-weight-bold p-2">Orders ID: {o._id}</span>
                </h3>
                <ul className="list-group mb-2">
                  <li className="list-group-item font-weight-bold mainText">Status: {showStatus(o)}</li>
                  <li className="list-group-item font-weight-bold mainText">
                    Transaction ID: {o.transaction_id}
                  </li>
                  <li className="list-group-item font-weight-bold mainText">Amount: ${o.amount}</li>
                  <li className="list-group-item font-weight-bold mainText">Order By {o.user.name}</li>
                  <li className="list-group-item font-weight-bold mainText">
                    Delivery Address: {o.address}
                  </li>
                  <li className="list-group-item font-weight-bold mainText">
                    Order on {moment(o.createdAt).fromNow()}
                  </li>
                </ul>
                <h3 className="mt-4 mb-4 font-weight-bold mainText">
                  TOTAL PRODUCTS: {o.products.length}
                </h3>

                {o.products.map((p, pIndex) => {
                  return (
                    <div
                      className="mb-4"
                      key={pIndex}
                      style={{
                        padding: "20px",
                        border: "1px solid indigo",
                      }}
                    >
                      {showInput("Product name", p.name)}
                      {showInput("Product price", p.price)}
                      {showInput("Product total", p.count)}
                      {showInput("Product Id", p._id)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
