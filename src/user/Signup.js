import React, { useState } from "react";
import Layout from "../core/Layout";
import {signup} from "../auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          className="form-control"
          type="text"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          className="form-control"
          type="email"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          className="form-control"
          type="password"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-danger">
        Create new account
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created successfully. Please sign in.
    </div>
  );

  return (
    <Layout
      title="Sign Up"
      description="Sign up to buy your products"
      className="container col-md-4 offset-md-4"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signup;
