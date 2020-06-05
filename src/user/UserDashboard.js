import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const DashBoard = () => {
  const [history, setHistory] = useState([]);
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className="card mb-5" style={{border:"4px solid  rgb(88, 4, 255)"}}>
        <h4 className="card-header mainColor rounded-0 text-light font-weight-bold" >User Links</h4>
        <ul className="list-group" style={{border:"none"}}>
          <li className="list-group-item">
            <Link className="nav-link mainText font-weight-bold" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link mainText font-weight-bold" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => (
    <div className="card mb-5" style={{border:"4px solid  rgb(88, 4, 255)"}}>
      <h3 className="card-header mainColor rounded-0 text-light font-weight-bold">User Information</h3>
      <ul className="list-group rounded-0">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">{role === 1 ? "Admin" : "Buyer"}</li>
      </ul>
    </div>
  );

  const purchaseHistory = (history) => (
    <div className="card mb-5" style={{border:"4px solid  rgb(88, 4, 255)"}}>
      <h3 className="card-header mainColor text-light font-weight-bold">Purchase History</h3>
      <ul className="list-group rounded-0">
        <li className="list-group-item">
          {history.map((h, i) => {
            return (
              <div>
                <hr />
                {h.products.map((p, i) => {
                  return (
                    <div key={i}>
                      <h6>Product name: {p.name}</h6>
                      <h6>Product price: ${p.price}</h6>
                      <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </li>
      </ul>
    </div>
  );

  return (
    <Layout
      title="Dashboard"
      description={`Good day ${name}!`}
      className="container"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
