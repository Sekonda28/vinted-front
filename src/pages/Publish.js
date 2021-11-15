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
            </div>
          </div>

          <div className="txt-input-groups">
            <div className="txt-input">
              <h4>Titre</h4>
              <input
                type="text"
                placeholder="ex: Chemise Sézanne verte"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="txt-input">
              <h4>Décris ton article</h4>
              <input
                type="text"
                placeholder="ex: porté quelquefois, taille correctement"
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
              {" "}
              <h4>Couleur</h4>{" "}
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
                placeholder="Neuf avec étiquette"
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
                  placeholder="0.00 €"
                  onChange={(event) => setPrice(event.target.value)}
                />
                <div className="checkbox-input">
                  {/* <label for="échanges" className="checkbox-design"></label> */}
                  <input
                    type="checkbox"
                    name="échanges"
                    id="échanges"
                    value="échange"
                  />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>

          <button className = "header-button sell-button" type="submit">Ajouter</button>
        </form>
        <span className="error-message">{errorMessage}</span>
      </div>
    </div>
  );
};

export default Publish;
