import React, { useState, useEffect } from "react";
import "./product.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewProduct = () => {
  const [info, setInfo] = useState({});
  const [file, setFile] = useState("");
  const [category, setCategory] = useState([]);
  const [userList, setUserList] = useState([]);

  const { data: categoryData, loading: categoryLoading, error: categoryError } = useFetch("/category");

  useEffect(() => {
    if (categoryData) {
      setCategory(categoryData);
    }
  }, [categoryData]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        setUserList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);


  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setCategory(value);
  };

  console.log(files)

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

      const newProduct = {
        ...info,
        categories: category,
        product_image: url,
      };

      await axios.post("/product/add", newproduct);
    } catch (err) { console.log(err) }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {productInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectCategory">
                <label>Category</label>
                <select id="category" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                    data.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    ))}
                </select>
                <FormControl>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    label="Category"
                    onChange={handleChange}
                  >
                    {loading
                      ? "loading"
                      : data &&
                      data.map((category) => (
                        <MenuItem
                          key={category._id}
                          value={category._id}
                        >
                          {category.title}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
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
