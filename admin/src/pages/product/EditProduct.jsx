import "./product.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from "react";
import { productInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { productId, categoryId } = useParams();

  const [info, setInfo] = useState({});
  const [file, setFile] = useState("");
  const [category, setCategory] = useState([]);
  const [userList, setUserList] = useState([]);

  const [defaultCategory, setDefaultCategory] = useState([]);
  
  const { data: categoryData, loading: categoryLoading, error: categoryError } = useFetch("/category");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/product/${productId}`);
        const productData = response.data;
        setInfo(productData);
        setCategory(productData.categories);
        setDefaultCategory(productData.categories || "None");
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductData();
  }, [productId]);

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
        url = info.product_image || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";
      }

      const parentCategoryName = defaultCategory;
      console.log("View: " + parentCategoryName)

      const updateProduct = {
        ...info,
        categories: parentCategoryName,
        product_image: url,
      };

      await axios.put(`/product/${productId}`, updateProduct);
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
          <h1>Edit Product</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Image</label>
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : info.product_image || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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

              <div className="formInput" key={info.name}>
                <label>Product Name</label>
                <input
                  id="product_name"
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                  value={info.name || ""}
                />
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
                <label>Price</label>
                <input
                  id="price"
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter price"
                  value={info.price || ""}
                />
              </div>

              <div className="formInput">
                <label>SKU</label>
                <input
                  id="sku"
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter SKU"
                  value={info.sku || ""}
                />
              </div>

              <div className="formInput">
                <label>Tags</label>
                <input
                  id="tags"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter tags"
                  value={info.tags || ""}
                />
              </div>

              <div className="formInput">
                <label>Badge</label>
                <input
                  id="badge"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter badge"
                  value={info.badge || ""}
                />
              </div>

              <div className="formInput">
                <label>Commission Rate</label>
                <input
                  id="commission_rate"
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter commission rate"
                  value={info.commission_rate || ""}
                />
              </div>

              <div className="formInput">
                <label>Product Notes</label>
                <input
                  id="product_notes"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter product notes"
                  value={info.product_notes || ""}
                />
              </div>

              <div className="formInput">
                <label>Pickup</label>
                <input
                  id="pickup"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter pickup"
                  value={info.pickup || ""}
                />
              </div>

              <div className="formInput">
                <label>SEO Title</label>
                <input
                  id="seo_title"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter SEO Title"
                  value={info.seo_title || ""}
                />
              </div>

              <div className="formInput">
                <label>Meta Description</label>
                <input
                  id="meta_desc"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Meta Description"
                  value={info.meta_desc || ""}
                />
              </div>

              <div className="formInput">
                <label>Keyphrase</label>
                <input
                  id="keyphrase"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Keyphrase"
                  value={info.keyphrase || ""}
                />
              </div>

              <div className="formInput">
                <label>Vendor</label>
                <input
                  id="vendor"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter vendor"
                  value={info.vendor || ""}
                />
              </div>

              <div className="formInput">
                <label>API</label>
                <input
                  id="api"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter API"
                  value={info.api || ""}
                />
              </div>

              <div className="formInput">
                <label>Categories</label>
                <select id="categories" onChange={handleParentCategoryChange} value={defaultCategory}>
                  <option value="None">None</option>
                  {categoryLoading
                    ? "Loading"
                    : categoryData &&
                      categoryData.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.parentCategory && cat.parentCategory !== "None" ? '━ ' : ''}{cat.name}
                        </option>
                      ))}
                </select>
              </div>

              <div className="formInput">
                <label>Author</label>
                <select id="author" onChange={handleChange} value={info.author}>
                  <option value="">Select an author</option>
                  {userList.map((user) => (
                    <option key={user._id} value={user.username}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formInput">
                <label>Status</label>
                <select id="status" onChange={handleChange} value={info.status}>
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

export default EditProduct;
