import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./productDetail.css";
import BookingBox from "../../components/bookingBox/BookingBox";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState("");

  const [showLargeImage, setShowLargeImage] = useState(false);

  const openLargeImage = () => {
    setShowLargeImage(true);
  };

  const closeLargeImage = () => {
    setShowLargeImage(false);
  };

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
      <section className="productDetailHeader">
        <h2 className="productDetailHeading">{product.name}</h2>
      </section>
      <section className="productDetailBody">
        <div className="productDetailImageContainer">
          <img
            src={product.product_image}
            alt="Product Name"
            className="productDetailImage"
            onClick={openLargeImage}
          />
        </div>
        <div className="productDetailInfo">
          <p className="productDetailDescription">{product.desc}</p>
          <p className="productDetailPrice">Price: ${product.price}</p>
        </div>
      </section>
    
      {showLargeImage && (
        <div className="largeImageOverlay" onClick={closeLargeImage}>
          <img
            src={product.product_image}
            alt="Product Name"
            className="largeImage"
          />
        </div>
      )}
      <BookingBox/>
    </div>
  );
};

export default ProductDetail;
