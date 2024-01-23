import "./category.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { categoryInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
const EditCategory = () => {
  const { categoryId } = useParams();

  const [info, setInfo] = useState({});
  const [file, setFile] = useState("");
  const [category, setCategory] = useState([]);
  const [parentCategory, setParentCategory] = useState("None");

  const { data: categoryData, loading: categoryLoading, error: categoryError } = useFetch("/category");

  useEffect(() => {
    console.log(categoryData);
    if (categoryData) {
      setCategory(categoryData);
      const selectedCategory = categoryData.find((cat) => cat._id === categoryId);
      console.log(selectedCategory)
      if (selectedCategory) {
        setInfo({
          name: selectedCategory.name,
          description: selectedCategory.description,
          slug: selectedCategory.slug,
          image: selectedCategory.image,
          parentCategory: selectedCategory.parentCategory,
        });
        setParentCategory(selectedCategory.parentCategory || "None");
        console.log("Updated info:", info);
      }
    }
  }, [categoryData, categoryId]);

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
        url = category.image || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";
      }

      const selectedCategoryId = parentCategory;
      const selectedCategory = category.find((cat) => cat._id === selectedCategoryId);
      const parentCategoryName = selectedCategory ? selectedCategory.name : 'None';
      console.log(parentCategoryName)

      const updatedCategory = {
        ...info,
        image: url,
        parentCategory: parentCategoryName,
      };
      await axios.put(`/category/${categoryId}`, updatedCategory);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new edit">
      <Sidebar />
      <div className="newContainer editContainer">
        <Navbar />
        <div className="bottom">
          <div className="right">
            <form >
              <h1>Edit Category</h1>
              {categoryInputs.map((input) => (
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
                  <InputLabel id="parentCategory-label">Category</InputLabel>
                  <Select
                    labelId="parentCategory-label"
                    id="parentCategory"
                    value={parentCategory}
                    label="Category"
                    onChange={handleParentCategoryChange}
                  >
                    <MenuItem value={parentCategory}>None</MenuItem>
                    {category.map((cat) => (
                      <MenuItem key={cat._id} value={cat._id}>
                        {cat.parentCategory && cat.parentCategory !== "None" ? '━' : ''}{cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="formInput">
                <TextField
                  required
                  id="description"
                  label="Description"
                  defaultValue={info.description || ""}
                  value={info.description || ""}
                />
              </div>
              <div className="formInput">
                <label>Image</label>
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : info.image || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
              <button onClick={handleClick}>Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
