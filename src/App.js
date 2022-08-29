import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./css/App.css";
import Footer from "./components/Footer";
import ProductAdd from "./pages/ProductAdd";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="add-product" element={<ProductAdd />} />
        <Route path="*" element={<ProductList />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
