import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({ product }) => {
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          <ShowImage item={product} url="product" />
          <p>${product.price}</p>
          <div className="row">
            <div className="col-6">
              <Link to="/">
                <button className="btn btn-primary mt-2 mb-2 mr-2">
                  View Product
                </button>
              </Link>
            </div>
            <div className="col-6">
              <Link to="/">
                <button className="btn btn-warning mt-2 mb-2 ">
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
