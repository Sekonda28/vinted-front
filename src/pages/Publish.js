import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Publish = ({ token }) => {
  const navigate = useNavigate();

  const [picture, setPicture] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("price", price);

    try {
      const response = await axios.post(
        "https://vinted-api-matt.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate(`/offer/${response.data._id}`);
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="publish-main">
      <div className="publish-container">
        <h2>Vends ton article</h2>

        <form onSubmit={handleSubmit}>
          <div className="file-select">
            <div className="preview-without">
              <div className="input-default">
              <label for="picture" className="pic-label">
                <span className = "add-button">+</span>
                <span>Ajoute une photo</span>
              </label>
                <input className="pic-file"
                id = "picture"
                  type="file"
                  required
                  onChange={(event) => setPicture(event.target.files[0])}
                />
              </div>
            </div>
          </div>

          <input
            type="text"
            placeholder="title"
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="text"
            placeholder="description"
            onChange={(event) => setDescription(event.target.value)}
          />
          <input
            type="text"
            placeholder="brand"
            onChange={(event) => setBrand(event.target.value)}
          />
          <input
            type="text"
            placeholder="size"
            onChange={(event) => setSize(event.target.value)}
          />
          <input
            type="text"
            placeholder="color"
            onChange={(event) => setColor(event.target.value)}
          />
          <input
            type="text"
            placeholder="condition"
            onChange={(event) => setCondition(event.target.value)}
          />
          <input
            type="text"
            placeholder="city"
            onChange={(event) => setCity(event.target.value)}
          />
          <input
            type="text"
            placeholder="price"
            onChange={(event) => setPrice(event.target.value)}
          />
          <button type="submit">Post</button>
        </form>
        <span className="error-message">{errorMessage}</span>
      </div>
    </div>
  );
};

export default Publish;
