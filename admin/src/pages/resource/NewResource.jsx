import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState, useEffect } from "react";
import { resourceInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewResource = () => {
  const [info, setInfo] = useState({});
  const [file, setFile] = useState("");
  const [product, setProduct] = useState([]);

  const { data, loading, error } = useFetch("/product");

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    console.log(value)
    setProduct(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      let url;

      if (file) {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dizjrni3i/image/upload",
          data
        );
        url = uploadRes.data.url;
      } else {
        url = "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";
      }

      const newResource = {
        ...info,
        product: product,
        image: url,
      };
      console.log()

      await axios.post(`/resource/add`, newResource);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Resource</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {resourceInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Description</label>
                <ReactQuill
                  id="desc"
                  onChange={(value) => handleChange({ target: { id: 'desc', value } })}
                  placeholder="Enter description"
                  value={info.desc || ""}
                />
              </div>
              <div className="formInput">
                <label>Image</label>
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
                <label htmlFor="file">
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>Product</label>
                <select id="product" onChange={handleSelect} value={product}>
                  <option value="None">None</option>
                    {loading
                      ? "loading"
                      : data &&
                        data.map((product) => (
                          <option key={product._id} value={product.name}>{product.name}</option>
                        ))}
                </select>
              </div>
              <div className="formInput">
                <label>Status</label>
                <select id="status" onChange={handleChange}>
                  <option value={false}>Private</option>
                  <option value={true}>Public</option>
                </select>
              </div>
              <button className="btn-save" onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewResource;
