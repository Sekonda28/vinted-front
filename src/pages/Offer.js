
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [dataItem, setDataItem] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
            {/* Replace src with prop once pics uploaded */}
            <img
              className="offer-picture"
              src={dataItem.product_image.secure_url}
              alt="product"
            />
          </div>

          <div className="offer-infos">
            <span>{dataItem.product_price} €</span>
            <ul className="offer-list">
              {dataItem.product_details.map((item, index) => {
                return (
                  <li key={index}>
                    <span>{Object.keys(item)}</span>
                    <span>{Object.values(item)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
