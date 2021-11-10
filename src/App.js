import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Offer from "./pages/Offer";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vinted-api-matt.herokuapp.com/offers"
        );
        setData(response.data.offers);
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
    <Router>
      <Routes>
        <Route path="/" element={<Home data={data} />}></Route>
        <Route path="/offer/:id" element={<Offer data={data} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
