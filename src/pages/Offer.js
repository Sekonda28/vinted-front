import Header from "../components/Header";
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
      <Header />
      <div className="offer-body">
        <div className="offer-container">
          <div className="offer-pictures">
            {/* Replace src with prop once pics uploaded */}
            <img
              className="offer-picture"
              src={dataItem.product_image.secure_url}
              // src="https://images.www.fendi.com/images/h80/hb6/9105753899038/8BH372ABVLF0PWZ_01_large-grey#product-medium"
              alt="bag"
            />
          </div>

          <div className="offer-infos">
            <span>{dataItem.product_price} €</span>
            {dataItem.product_details.map((item, index) => {
              return (
                <ul className="offer-list" key={index}>
                  <li>
                    <span>{Object.keys(item)}</span>
                    <span>{Object.values(item)}</span>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
