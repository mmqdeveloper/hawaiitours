import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./productDetail.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="productDetailContainer">
      <div className="productDetailHeader">
        <h2 className="productDetailHeading">{product.name}</h2>
      </div>
      <div className="productDetailBody">
        <div className="productDetailImageContainer">
          <img
            src={product.product_image}
            alt={product.name}
            className="productDetailImage"
          />
        </div>
        <div className="productDetailInfo">
          <p className="productDetailDescription">{product.desc}</p>
          <p className="productDetailPrice">Price: ${product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
