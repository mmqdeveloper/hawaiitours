import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const EditUser = ({ inputs, title }) => {
  const { userId } = useParams([]);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({});
  const [existingUserData, setExistingUserData] = useState({});
  const location = useLocation();
  const path_current = location.pathname;

  useEffect(() => {
    // Fetch existing user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${userId}`);
        setExistingUserData(response.data); // Assuming your API endpoint returns user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
  
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dizjrni3i/image/upload",
        data
      );
  
      const { url } = uploadRes.data;
  
      const updatedUserData = {
        ...existingUserData,
        ...info,
        image: url,
      };
  
      await axios.put(`/user/${userId}`, updatedUserData);

    } catch (err) {
      console.error("Error updating user:", err);
    }
  };
  
  return (
    <div className="new edit">
      <Sidebar />
      <div className="newContainer editContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : existingUserData.image ||
                    "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    defaultValue={existingUserData[input.id] || ""}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
