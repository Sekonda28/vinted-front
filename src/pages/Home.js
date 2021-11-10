import Header from "../components/Header";
import { Link } from "react-router-dom";

const handleClick = (id) => {
  <Link to={`/offer/${id}`}></Link>;
  console.log("clicked");
  console.log(`/offer/${id}`);
};

const Home = ({ data }) => {
  return (
    <div className="Home">
      <Header />
      <div className="heros">Placeholder</div>
      <div className="home-card-wrapper">
        {data.map((item, index) => {
          return (
            <div className="home-card-container" key={index}>
              <div
                onClick={() => {
                  handleClick(item._id);
                }}
              >
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
