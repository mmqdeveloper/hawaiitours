import "./product.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { productInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
const NewProduct = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [category, setCategory] = useState([]);

  const { data, loading, error } = useFetch("/category");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setCategory(value);
  };

  console.log(files)

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

      const newproduct = {
        ...info,
        category,
        photos: list,
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
          <div className="right">
            <h1 className="title">Add New Product</h1>
            <form>
              <div className="formInput avatar">
                <label className="images" htmlFor="file">
                  <img
                    src={
                      files
                        ? URL.createObjectURL(files[0])
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                  />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {productInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <TextField
                    id={input.id}
                    label={input.label}
                    variant="outlined"
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">

                <FormControl>
                  <InputLabel id="featured-label">Featured</InputLabel>
                  <Select
                    labelId="featured-label"
                    id="featured"
                    label="Featured"
                    onChange={handleChange}
                  >
                    <MenuItem value={false}>No</MenuItem>
                    <MenuItem value={true}>Yes</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="formInput">
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
              <Button onClick={handleClick} variant="contained">Send</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
