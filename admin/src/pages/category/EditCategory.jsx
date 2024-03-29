import "./category.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from "react";
import { categoryInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useParams } from "react-router-dom";


const EditCategory = () => {
  const { categoryId } = useParams();

  const [info, setInfo] = useState({});
  const [file, setFile] = useState("");
  const [category, setCategory] = useState([]);

  const { data: categoryData, loading: categoryLoading, error: categoryError } = useFetch("/category");

  const [defaultCategory, setDefaultCategory] = useState([]);
  console.log("test  " + defaultCategory)

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
        setDefaultCategory(selectedCategory.parentCategory || "None");
        console.log("Updated info:", info);
      }
    }
  }, [categoryData, categoryId]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleParentCategoryChange = (e) => {
    setDefaultCategory(e.target.value);
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

      const parentCategoryName = defaultCategory;
      console.log("View: " + parentCategoryName)

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
        <div className="top">
          <h1>Edit Category</h1>
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
                    value={info[input.id] || ""}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Parent Category</label>
                <select id="parentCategory" value={defaultCategory} onChange={handleParentCategoryChange}>
                  <option value="None">None</option>
                  {category.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.parentCategory && cat.parentCategory !== "None" ? '━ ' : ''}{cat.name}
                    </option>
                  ))}
                </select>
              </div>
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
              <button className="btn-save" onClick={handleClick}>Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;