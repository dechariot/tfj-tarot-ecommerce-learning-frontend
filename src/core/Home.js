import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="The Fool Journey E-commerce App"
      className="container"
    >
      <Search />

      <h2 className="mainText display-5 mb-4" >BEST SELLING</h2>
      <div className="row">
        {productsBySell.map((product, i) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <Card key={i} product={product} />
          </div>
        ))}
      </div>

      <hr></hr>

      <h2 className="mainText display-5 mb-4">LAST ARRIVAL</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <Card key={i} product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
