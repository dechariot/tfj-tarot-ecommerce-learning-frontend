import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };
  const { categories, category, search, results, searched } = data;

  useEffect(() => {
    loadCategories();
  }, []);

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };
  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>

        <div className="container">
          <div className="row">
          {results.map((product, i) => (
            <div className="col-4 mb-3">
              <Card key={i} product={product} />
            </div>
          ))}
          </div>
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit} className="bg-white">
      <span className="input-group-text mainColor" style={{borderRadius:"30px"}} >
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2 font-weight-bold mainText bg-light" style={{borderRadius:"30px"}} onChange={handleChange("category")}>
              <option  value="ALL">Pick Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            style={{borderRadius:"30px",border:"none"}}
            placeholder=""
            onChange={handleChange("search")}
          />
        </div>
        <div className="btn input-group-append">
          <button className="input-group-text mainColor font-weight-bold" style={{border:"none",fontSize:"1.2em"}}>Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">
      {searchedProducts(results)}
      </div>
    </div>
  );
};

export default Search;
 