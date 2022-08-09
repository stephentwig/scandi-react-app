import React, { useState } from "react";
import Book from "../components/products_attributes/Book";
import DVD from "../components/products_attributes/DVD";
import Furniture from "../components/products_attributes/Furniture";
import { Link, useNavigate } from "react-router-dom";

export default function ProductAdd() {
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    price: "",
    productType: "",
    size: "",
    height: "",
    width: "",
    length: "",
    weight: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => {
      console.log("handleChange", prevData);
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleSelectChange(event) {
    //load the other pages
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => {
      console.log("onSelectChange", prevData);
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleInvalid(event) {
    //() => this.setCustomValidity("Please, provide the data of indicated type");

    const { name, value, type, checked } = event.target;
    setFormData((prevData) => {
      console.log("handleInvalid", prevData);
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
        [event.target.customValidity]:
          "Please, provide the data of indicated type",
      };
    });
  }

  function handleOnInput(event) {
    // (event) => event.target.setCustomValidity("")
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => {
      console.log("handleOnInput", prevData);
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
        [event.target.customValidity]: "",
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(formData, "on submit");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("sku", formData.sku);
    urlencoded.append("name", formData.name);
    urlencoded.append("price", formData.price);
    urlencoded.append("productType", formData.productType);
    urlencoded.append("height", formData.height);
    urlencoded.append("width", formData.width);
    urlencoded.append("length", formData.length);
    urlencoded.append("size", formData.size);
    urlencoded.append("weight", formData.weight);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      "https://scandiweb.ipublishinghouse.com/app/api/v1/saveProduct.php",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    navigate("/");
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <form
            action="#"
            id="product_form"
            method="post"
            onSubmit={handleSubmit}
            className="form-control"
          >
            <div className="fixed-header">
              <div className="row">
                <div className="col-md-7">
                  <h1>
                    <b>Product Add</b>
                  </h1>
                </div>
                <div className="col-md-2">
                  <button
                    id="save_button"
                    type="submit"
                    className="btn btn-success btn-sm"
                  >
                    Save
                  </button>
                </div>
                <div className="col-md-3">
                  <Link
                    to="/"
                    id="cancel_button"
                    className="btn btn-danger btn-sm"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
              <hr />
            </div>

            <div className="row">
              <div className="col-xs-1">
                <label htmlFor="sku">SKU</label>
              </div>
              <div className="col-xs-5">
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  onChange={handleChange}
                  value={formData.sku}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-xs-6	"></div>
            </div>
            <br />
            <div className="row">
              <div className="col-xs-1">
                <label htmlFor="name">Name</label>
              </div>
              <div className="col-xs-5">
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-xs-6	"></div>
            </div>
            <br />
            <div className="row">
              <div className="col-xs-1">
                <label htmlFor="price">Price ($)</label>
              </div>
              <div className="col-xs-5">
                <input
                  type="number"
                  id="price"
                  name="price"
                  onChange={handleChange}
                  value={formData.price}
                  className="form-control"
                  onInvalid={handleInvalid}
                  onInput={handleOnInput}
                  required
                />
              </div>
              <div className="col-xs-6	"></div>
            </div>
            <br />

            <div className="row">
              <div className="col-xs-1">
                <label htmlFor="productType">Type Switcher</label>
              </div>
              <div className="col-xs-5">
                <select
                  id="productType"
                  name="productType"
                  onChange={handleSelectChange}
                  value={formData.productType}
                  className="form-control"
                >
                  <option id="" name="" value="">
                    Select A Product
                  </option>
                  <option id="DVD" name="DVD" value="DVD">
                    DVD
                  </option>
                  <option id="Furniture" value="Furniture">
                    Furniture
                  </option>
                  <option id="Book" value="Book">
                    Book
                  </option>
                </select>
              </div>
              <div className="col-xs-6	"></div>
            </div>
            <br />
            <div id="dynamic_product_attribute">
              {formData.productType === "DVD" && (
                <DVD
                  runHandleChange={handleChange}
                  runHandleOnInput={handleOnInput}
                  runHandleInvalid={handleInvalid}
                  getDVDValue={formData.size}
                />
              )}

              {formData.productType === "Furniture" && (
                <Furniture
                  runHandleChange={handleChange}
                  runHandleOnInput={handleOnInput}
                  runHandleInvalid={handleInvalid}
                  getFurnitureHeight={formData.height}
                  getFurnitureWidth={formData.width}
                  getFurnitureLength={formData.length}
                />
              )}

              {formData.productType === "Book" && (
                <Book
                  runHandleChange={handleChange}
                  runHandleOnInput={handleOnInput}
                  runHandleInvalid={handleInvalid}
                  getBookValue={formData.weight}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
