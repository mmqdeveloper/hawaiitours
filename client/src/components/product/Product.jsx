// AllProduct.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./product.css";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/product");
        console.log(response)
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="allProductContainer">
      <h2 className="allProductHeading">All Products</h2>
      <ul className="productList">
        {products.map((product) => (
          product.status && (
            <li className="productItem" key={product._id}>
              <a href={`/product/${product._id}`}>
                <img
                  src={product.product_image}
                  alt={product.name}
                  className="productImage"
                />
                <h3 className="productName">{product.name}</h3>
                <p className="productDescription">{product.desc}</p>
                <p className="productPrice">${product.price}</p>
              </a>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default AllProduct;
