import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";

export default function ProductList() {
  const [allProducts, setAllProducts] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState({
    product_ids: [],
  });

  useEffect(function() {
    fetch("https://scandiweb.ipublishinghouse.com/")
      .then((response) => response.json())
      .then((data) => setAllProducts(data));
  }, []);

  function handleDeleteClick() {
    if (selectedProducts.product_ids.length > 0) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let urlencoded = new URLSearchParams();
      for (
        let index = 0;
        index < selectedProducts.product_ids.length;
        index++
      ) {
        urlencoded.append(
          `product_ids[${index}]`,
          selectedProducts.product_ids[index]
        );
      }

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch("https://scandiweb.ipublishinghouse.com/delete", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const productIds = selectedProducts.product_ids;

          // Filter out all the deleted IDs (leave the ones that are not deleted)
          const newProductList = allProducts.filter((product) => {
            if (productIds.includes(product.id)) {
              return false;
            } else {
              return true;
            }
          });

          // Empty out the selected Product list
          setSelectedProducts({ product_ids: [] });
          setAllProducts(newProductList);
        })
        .catch((error) => console.log("error", error));
    }
  }

  function handleCheckboxChange(event) {
    const { name, value, type, checked } = event.target;

    let selectedProduct_ids = selectedProducts.product_ids;
    selectedProduct_ids.push(value);
    const newSelectedProducts = {
      ...selectedProducts,
      [name]: selectedProduct_ids,
    };
    setSelectedProducts(newSelectedProducts);
  }

  const productElementGrid = allProducts.map((product) => {
    return (
      <ProductGrid
        key={product.id}
        id={product.id}
        sku={product.sku}
        name={product.name}
        price={product.price}
        attribute={product.product_attribute_value}
        runHandleCheckboxChange={handleCheckboxChange}
      />
    );
  });

  return (
    <div>
      <div className="container">
        <div className="fixed-header">
          <div className="row">
            <div className="col-md-7">
              <h1>
                <b>Product List</b>
              </h1>
            </div>
            <div className="col-md-2">
              <Link
                to="/add-product"
                id="add_button"
                className="btn btn-success btn-sm"
              >
                ADD
              </Link>
            </div>
            <div className="col-md-3">
              <button
                id="delete-product-btn"
                className="btn btn-danger btn-sm"
                onClick={handleDeleteClick}
              >
                MASS DELETE
              </button>
            </div>
          </div>
          <hr />
        </div>
        {/* <!-- beneath the header -->*/}

        <form action="" id="product_list_form" method="post">
          <div className="flex-container">
            {/* ProductGrid */}

            {allProducts.length >= 1 && productElementGrid}
          </div>
        </form>
      </div>
    </div>
  );
}
