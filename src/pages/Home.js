import Header from "../components/Header";
import { Link } from "react-router-dom";

const Home = ({ data }) => {
  return (
    <div className="Home">
      <Header />
      <div className="heros">Placeholder</div>
      <div className="home-card-wrapper">
        {data.map((item, index) => {
          return (
            <Link to={`/offer/${item._id}`}>
              <div className="home-card-container" key={index}>
                <p>{item._id}</p>
                {console.log(item)}
                <p>{item.product_name}</p>
                <p>{item.product_price}</p>
                {item.product_details.map((detail, index) => {
                  return (
                    <div key={index}>
                      {detail.brand}
                      {detail.condition}
                    </div>
                  );
                })}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
