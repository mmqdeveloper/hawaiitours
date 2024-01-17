import "./category.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { categoryInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditCategory = () => {
  const { categoryId } = useParams([]);
  const [info, setInfo] = useState({});
  const [file, setFile] = useState("");
  const [category, setCategory] = useState([]);
  const [parentCategory, setParentCategory] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`/category/${categoryId}`);
        setCategory(response.data);
        if (response.data.parentCategory) {
          const parentCategoryId = response.data.parentCategory;
          const parentCategoryResponse = await axios.get(`/category/${parentCategoryId}`);
          setParentCategory(parentCategoryResponse.data.childrenCategories || []);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  const handleParentCategoryChange = (e) => {
    setInfo((prev) => ({ ...prev, parentCategory: e.target.value }));
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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

      const updatedCategory = {
        ...info,
        image: url,
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
                    defaultValue={category[input.id] || ""}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Parent Category</label>
                {parentCategory.length > 0 ? (
                  <select
                    id="parentCategory"
                    onChange={handleParentCategoryChange}
                    value={info.parentCategory || ""}
                  >
                    <option value="">None</option>
                    {parentCategory.map((parentCat) => (
                      <option key={parentCat._id} value={parentCat._id}>
                        {parentCat.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>No parent category available</p>
                )}
              </div>
              <div className="formInput">
                <label>Description</label>
                <input
                  id="description"
                  type="text"
                  placeholder=""
                  onChange={handleChange}
                  defaultValue={category.description || ""}
                />
              </div>
              <div className="formInput">
                <label>Image</label>
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : category.image || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
