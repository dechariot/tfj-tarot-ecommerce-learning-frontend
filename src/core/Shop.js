import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);

  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-dark mb-5 text-white mainColor rounded-lg font-weight-bold" style={{border:"none",fontSize:"1.2rem"}}>
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);

    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title="Shop Page"
      description="Search and find your stuff"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-3 col-sm-12 mb-5">
          <h4 className="font-weight-bold mainText">Filter by category</h4>
          <ul className="pt-2 pb-2 mainColor rounded font-weight-bold">
            <CheckBox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <hr className="mainColor"></hr>
          <h4 className="font-weight-bold mainText" >Filter by prices</h4>
          <ul className="list-group mainColor p-2 font-weight-bold">
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </ul>
        </div>
        <div className="col-9">
          <h2 className="mb-4 mainText font-weight-bold">PRODUCTS</h2>
          <div className="row">
            {filteredResults.map((product, i) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                
                <Card key={i} product={product} />
              </div>
            ))}
          </div>
          <hr></hr>
          <div style={{display:"flex",justifyContent:"center"}}>
          {loadMoreButton()}
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
