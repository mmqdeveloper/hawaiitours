import React, { useState, useEffect } from "react";
import "./product.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const NewProduct = () => {
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [category, setCategory] = useState([]);
  
  const { data: categoryData, loading: categoryLoading, error: categoryError } = useFetch("/category");

  useEffect(() => {
    if (categoryData) {
      setCategory(categoryData);
    }
  }, [categoryData]);


  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setCategory(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dizjrni3i/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newProduct = {
        ...info,
        categories: category,
        hero_image: list[0],
      };

      await axios.post("/product/add", newProduct);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files.length
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label>Product Name</label>
                <input
                  id="name"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter product name"
                />
              </div>

              <div className="formInput">
                <label>Description</label>
                <input
                  id="desc"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter description"
                />
              </div>

              <div className="formInput">
                <label>Price</label>
                <input
                  id="price"
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter price"
                />
              </div>

              <div className="formInput">
                <label>SKU</label>
                <input
                  id="sku"
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter SKU"
                />
              </div>

              <div className="formInput">
                <label>Tags</label>
                <input
                  id="tags"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter tags"
                />
              </div>

              <div className="formInput">
                <label>Author</label>
                <input
                  id="author"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter author"
                />
              </div>

              <div className="formInput">
                <label>Badge</label>
                <input
                  id="badge"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter badge"
                />
              </div>

              <div className="formInput">
                <label>Commission Rate</label>
                <input
                  id="commission_rate"
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter commission rate"
                />
              </div>

              <div className="formInput">
                <label>Product Notes</label>
                <input
                  id="product_notes"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter product notes"
                />
              </div>

              <div className="formInput">
                <label>Pickup</label>
                <input
                  id="pickup"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter pickup"
                />
              </div>

              <div className="formInput">
                <label>SEO Title</label>
                <input
                  id="seo_title"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter SEO Title"
                />
              </div>

              <div className="formInput">
                <label>Meta Description</label>
                <input
                  id="meta_desc"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Meta Description"
                />
              </div>

              <div className="formInput">
                <label>Keyphrase</label>
                <input
                  id="keyphrase"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Keyphrase"
                />
              </div>

              <div className="formInput">
                <label>Vendor</label>
                <input
                  id="vendor"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter vendor"
                />
              </div>

              <div className="formInput">
                <label>API</label>
                <input
                  id="api"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter API"
                />
              </div>

              <div className="formInput">
                <label>Status</label>
                <select id="status" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>

              <div className="formInput">
                <label>Categories</label>
                <select id="categories" onChange={handleSelect} value={category}>
                  {categoryLoading
                    ? "Loading"
                    : categoryData &&
                      categoryData.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                </select>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
