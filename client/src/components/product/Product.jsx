// AllProduct.js
import {
  faStar
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./product.css";
import ReactHtmlParser from 'react-html-parser';


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
      <h2 className="allProductHeading">Featured Tours</h2>
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
                <div className="stickFeatured">Featured</div>
                <div className="info">
                  <h3 className="productName">{product.name}</h3>
                  <div className="productFeedback">
                    <div className="list-star">
                      <FontAwesomeIcon icon={faStar} className="starIcon" />
                      <FontAwesomeIcon icon={faStar} className="starIcon" />
                      <FontAwesomeIcon icon={faStar} className="starIcon" />
                      <FontAwesomeIcon icon={faStar} className="starIcon" />
                      <FontAwesomeIcon icon={faStar} className="starIcon" />
                    </div>
                    <p className="productDescription">{ReactHtmlParser(product.desc)}</p>
                  </div>
                  <p className="productPrice">
                    <span>From</span>
                    <span className="price">
                      ${product.price}
                    </span>
                  </p>
                </div>
              </a>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default AllProduct;
