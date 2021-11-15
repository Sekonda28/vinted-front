import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ search, value, priceSort, setShowSort }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  setShowSort(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (search === "") {
          const response = await axios.get(
            `https://vinted-api-matt.herokuapp.com/offers?priceMin=${value[0]}&priceMax=${value[1]}&sort=${priceSort}`
          );
          setData(response.data.offer);
        } else {
          const response = await axios.get(
            `https://vinted-api-matt.herokuapp.com/offers?priceMin=${value[0]}&priceMax=${value[1]}&sort=${priceSort}&title=${search}`
          );
          setData(response.data.offer);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, value, priceSort]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="Home">
      <div className="heros">
        <div>
          <div className="heros-message">
            Prêts à faire du tri dans vos placards ?
            <button className="heros-button">Commencer à vendre</button>
          </div>
        </div>
      </div>

      <div className="home-card-wrapper">
        {data.map((item, index) => {
          return (
            <Link to={`/offer/${item._id}`}>
              <div className="home-card-container" key={index}>
                <div className="home-card-username">
                  <span>{item.owner.account.username}</span>
                </div>
                <div>
                {item.product_image.secure_url&&<img src={item.product_image.secure_url} alt="product" />}
                  
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
