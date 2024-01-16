import "./category.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { categoryInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewCategory = () => {
  const [info, setInfo] = useState({});
  const [file, setFile] = useState("");
  const [category, setCategory] = useState([]);
  const [parentCategory, setParentCategory] = useState("None");

  const { data: categoryData, loading: categoryLoading, error: categoryError } = useFetch("/category");

  useEffect(() => {
    if (categoryData) {
      setCategory(categoryData);
    }
  }, [categoryData]);

  const { data, loading, error } = useFetch("/product");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleParentCategoryChange = (e) => {
    setParentCategory(e.target.value);
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

      const newCategory = {
        ...info,
        image: url,
      };
      await axios.post(`/category/add`, newCategory );
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
          <h1>Add New Category</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {categoryInputs.map((input) => (
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
                <label>Parent Category</label>
                <select
                  id="parentCategory"
                  value={parentCategory}
                  onChange={handleParentCategoryChange}
                >
                  <option value="None">None</option>
                  {category.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>Description</label>
                <input
                  id="description"
                  type="text"
                  placeholder=""
                  onChange={handleChange}
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
              {/* <div className="formInput">
                <label>Choose a Product</label>
                <select
                  id="productId"
                  onChange={(e) => setProductId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((product) => (
                        <option key={product._id} value={product._id}>{product.name}</option>
                      ))}
                </select>
              </div> */}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
