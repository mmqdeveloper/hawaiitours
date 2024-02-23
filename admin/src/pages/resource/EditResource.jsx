import "./resource.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { resourceInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useParams } from "react-router-dom";


const EditResource = () => {
  const { resourceId } = useParams();

  const [info, setInfo] = useState({});
  const [file, setFile] = useState("");
  const [resource, setResource] = useState([]);

  const { data: resourceData, loading: resourceLoading, error: resourceError } = useFetch("/resource");

  const [defaultResource, setDefaultResource] = useState([]);
  console.log("test  "+ defaultResource)
  
  useEffect(() => {
    console.log(resourceData);
    if (resourceData) {
      setResource(resourceData);
      const selectedResource = resourceData.find((cat) => cat._id === resourceId);
      console.log(selectedResource)
      if (selectedResource) {
        setInfo({
          name: selectedResource.name,
          description: selectedResource.description,
          slug: selectedResource.slug,
          image: selectedResource.image,
          parentResource: selectedResource.parentResource,
        });
        setDefaultResource(selectedResource.parentResource || "None");
        console.log("Updated info:", info);
      }
    }
  }, [resourceData, resourceId]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleParentResourceChange = (e) => {
    setDefaultResource(e.target.value);
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
        url = resource.image || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";
      }

      const parentResourceName = defaultResource;
      console.log("View: " + parentResourceName)

      const updatedResource = {
        ...info,
        image: url,
        parentResource: parentResourceName,
      };
      await axios.put(`/resource/${resourceId}`, updatedResource);
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
          <h1>Edit Resource</h1>
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
                  value={info[input.id] || ""}
                />
              </div>
            ))}
            <div className="formInput">
              <label>Parent Resource</label>
              <select id="parentResource" value={defaultResource} onChange={handleParentResourceChange}>
                <option value="None">None</option>
                {resource.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.parentResource && cat.parentResource !== "None" ? '━ ' : ''}{cat.name}
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
            <button className="btn-save" onClick={handleClick}>Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditResource;
