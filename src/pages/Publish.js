import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";

const Publish = ({ token, setShowSort }) => {

  useEffect(() => {
    setShowSort(false)
    }
  , [setShowSort])
  const navigate = useNavigate();

  const [picture, setPicture] = useState(null);
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
    (token)?
    <div className="publish-main">
      <div className="publish-container">
        <h2>Vends ton article</h2>

        <form onSubmit={handleSubmit}>
          <div className="file-select">
            <div className="preview-without">
              {picture !== null ? (
                <div
                  className="upload-message"
                  onClick={() => {
                    setPicture(null);
                  }}
                >
                  <p>Photo ajout??e avec succ??s ! </p>
                  <p>Clique ici pour en uploader une nouvelle</p>
                </div>
              ) : (
                <div className="input-default">
                  <label htmlFor="picture" className="pic-label">
                    <span className="add-button">+</span>
                    <span>Ajoute une photo</span>
                  </label>
                  <input
                    className="pic-file"
                    id="picture"
                    type="file"
                    required
                    onChange={(event) => setPicture(event.target.files[0])}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="txt-input-groups">
            <div className="txt-input">
              <h4>Titre</h4>
              <input
                type="text"
                placeholder="ex: Chemise S??zanne verte"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="txt-input">
              <h4>D??cris ton article</h4>
              <input
                type="text"
                placeholder="ex: port?? quelquefois, taille correctement"
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>

          <div className="txt-input-groups">
            <div className="txt-input">
              <h4>Marque</h4>
              <input
                type="text"
                placeholder="ex: Zara"
                onChange={(event) => setBrand(event.target.value)}
              />
            </div>

            <div className="txt-input">
              <h4>Taille</h4>
              <input
                type="text"
                placeholder="ex L /40 /12"
                onChange={(event) => setSize(event.target.value)}
              />
            </div>

            <div className="txt-input">
              <h4>Couleur</h4>
              <input
                type="text"
                placeholder="ex: Fuschia"
                onChange={(event) => setColor(event.target.value)}
              />
            </div>

            <div className="txt-input">
              <h4>Etat</h4>
              <input
                type="text"
                placeholder="Neuf avec ??tiquette"
                onChange={(event) => setCondition(event.target.value)}
              />
            </div>
            <div className="txt-input">
              <h4>Lieu</h4>
              <input
                type="text"
                placeholder="ex Londres"
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
          </div>

          <div className="txt-input-groups">
            <div className="txt-input">
              <h4>Prix</h4>
              <div className="checkbox-section">
                <input
                  type="text"
                  placeholder="0.00 ???"
                  onChange={(event) => setPrice(event.target.value)}
                />
                <div className="checkbox-input">
                  <input
                    type="checkbox"
                    name="??changes"
                    id="??changes"
                    value="??change"
                  />
                  <span>Je suis int??ress??(e) par les ??changes</span>
                </div>
              </div>
            </div>
          </div>
          <div className="post-button-container">
            <button className="post-button" type="submit">
              Ajouter
            </button>
          </div>
        </form>
        <span className="error-message">{errorMessage}</span>
      </div>
    </div>: <Navigate to ="/login"/>
  );
};

export default Publish;
