import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card mb-5" style={{border:'4px solid  rgb(88, 4, 255)'}}>
        <h4 className="card-header text-white rounded-0 mainColor" style={{border:"none"}}>Admin Panel</h4>
        <ul className="list-group rounded-0">
          <li className="list-group-item">
            <Link className="nav-link mainText font-weight-bold" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link mainText font-weight-bold" to="/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link mainText font-weight-bold" to="/admin/orders">
              View Orders
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link mainText font-weight-bold" to="/admin/products">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link mainText font-weight-bold" to={`/profile/${_id}`}>
              Edit Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => (
    <div className="card mb-5"style={{border:'4px solid  rgb(88, 4, 255)'}}>
      <h3 className="card-header text-white rounded-0 mainColor font-weight-bold">Admin Information</h3>
      <ul className="list-group rounded-0">
        <li className="list-group-item font-weight-bold mainText">{name}</li>
        <li className="list-group-item font-weight-bold mainText">{email}</li>
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
        <div className="col-4">{adminLinks()}</div>
        <div className="col-8">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
