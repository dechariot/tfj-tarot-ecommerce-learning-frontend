import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "../admin/apiAdmin";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    producer: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    producer,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const { user, token } = isAuthenticated();

  //load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          producer: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
        });
      }
      console.log(data);
    });
  };

  const newPostForm = () => (
    <form className="mb-3 text-light font-weight-bold" onSubmit={clickSubmit}>
      <h4>Photo Upload</h4>
      <div className="form-group">
        <label className="btn btn-light rounded-pill mt-2" style={{width:"100%"}}>
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
            
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-light font-weight-bold">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-light font-weight-bold">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-light font-weight-bold">Producer</label>
        <input
          onChange={handleChange("producer")}
          type="text"
          className="form-control"
          value={producer}
        />
      </div>

      <div className="form-group">
        <label className="text-light font-weight-bold">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-light font-weight-bold">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Please select a category</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-light font-weight-bold">Shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option>Please select a category</option>
          <option value="0">No Shipping</option>
          <option value="1">Shipping Available</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-light font-weight-bold">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>

      <button className="btn btn-light mainText font-weight-bold rounded-pill mt-1 ">Create Product</button>
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
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>Product is successfully created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <p>Loading...</p>
      </div>
    );

    const goBack = () => (
      <div>
        <Link to="/admin/dashboard" className="text-white">
          Back to Dashboard
        </Link>
      </div>
    );

  return (
    <Layout
      title="Create a new Product"
      description={`Good day ${user.name}, ready to create a new product?`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2 mb-2 mainColor p-5" style={{borderRadius:"30px"}}>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
