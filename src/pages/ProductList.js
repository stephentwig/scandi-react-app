import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [allProducts, setAllProducts] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState({
    product_ids: [],
  });

  React.useEffect(
    function () {
      fetch("https://scandiweb.ipublishinghouse.com/app/api/v1/getProduct.php")
        .then((response) => response.json())
        .then((data) => setAllProducts(data));
    },
    [allProducts]
  );

  function handleDeleteClick() {
    console.log("handleDeleteClick", selectedProducts);

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

      fetch(
        "https://scandiweb.ipublishinghouse.com/app/api/v1/deleteProduct.php",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
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
    console.log(newSelectedProducts, "handleCheckboxChange");
  }

  const productElementGrid = allProducts.map((product) => {
    return (
      <div className="panel panel-default" key={product.id}>
        <input
          type="checkbox"
          className="delete-checkbox"
          id={product.id}
          name="product_ids"
          onChange={handleCheckboxChange}
          value={product.id}
        />
        <br />

        {product.sku}
        <br />

        {product.name}
        <br />

        {product.price}
        <br />

        {product.product_attribute_value}
      </div>
    );
  });

  return (
    <div>
      <div className="container">
        <div className=".fixed-header">
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

        <form
          action="app\api\v1\deleteProduct.php"
          id="product_list_form"
          method="post"
        >
          <div className="flex-container">
            {/* ProductGrid */}

            {allProducts.length >= 1 && productElementGrid}
          </div>
        </form>
      </div>
    </div>
  );
}
