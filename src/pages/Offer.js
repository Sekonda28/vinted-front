import Header from "../components/Header";
import { useParams } from "react-router";

const Offer = () => {
  const { id } = useParams();

  return (
    <div className="Offer">
      <Header />
      <div>
        <p>{id}</p>
      </div>
    </div>
  );
};

export default Offer;
