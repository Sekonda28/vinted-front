import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = ({ setShowSort }) => {
  const { id } = useParams();
  const [dataItem, setDataItem] = useState();
  const [isLoading, setIsLoading] = useState(true);

  setShowSort(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-api-matt.herokuapp.com/offer/${id}`
        );

        setDataItem(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  console.log(dataItem);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="Offer">
      <div className="offer-body">
        <div className="offer-container">
          <div className="offer-pictures">
            <img
              className="offer-picture"
              src={dataItem.product_image.secure_url}
              alt="product"
            />
          </div>

          <div className="offer-infos">
            <span className="offer-price">{dataItem.product_price} €</span>
            <ul className="offer-list">
              {dataItem.product_details.map((item, index) => {
                const keys = Object.keys(item);
                return (
                  <li key={index}>
                    <span className="product-key">{keys[0].toUpperCase()}</span>
                    <span className="product-value">{item[keys[0]]}</span>
                  </li>
                );
              })}
            </ul>
            <div className="offer-page-break"></div>
            <div className="offer-content">
              <p className="name">{dataItem.product_name}</p>
              <p className="description">{dataItem.product_description}</p>
              <p className="username">{dataItem.owner.account.username}</p>
            </div>
            <button className="acheter-button">Acheter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;


// https://res.cloudinary.com/sekonda28/image/upload/v1636981808/vinted/offers/61925c3023fd7dc7c30452c5.jpg 

// https://res.cloudinary.com/sekonda28/image/upload/v1636983364/vinted/offers/6192624323fd7dc7c30452e1.jpg
