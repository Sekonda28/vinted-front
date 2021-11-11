
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vinted-api-matt.herokuapp.com/offers"
        );

        setData(response.data.offer);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="Home">
      <div className="heros">Placeholder</div>
      <div className="home-card-wrapper">
        {data.map((item, index) => {
          return (
            <Link to={`/offer/${item._id}`}>
              <div className="home-card-container" key={index}>
                <div className="home-card-username">
                  <span>{item.owner.account.username}</span>
                </div>
                <div>
                  <img src={item.product_image.secure_url} alt="product" />
                </div>
                <div className="home-card-price-size-brand">
                  <span>{item.product_price} €</span>
                  <span>{item.product_details[2].condition.toUpperCase()}</span>
                  <span>{item.product_details[0].brand.toUpperCase()}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
