import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState([0, 200]);
  const [checked, setChecked] = useState(false);
  const [priceSort, setPriceSort] = useState("price-asc");
  const [showSort, setShowSort] = useState();

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 30 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header
        token={token}
        setUser={setUser}
        search={search}
        setSearch={setSearch}
        value={value}
        setValue={setValue}
        checked={checked}
        setChecked={setChecked}
        priceSort={priceSort}
        setPriceSort={setPriceSort}
        showSort={showSort}
      />
      <Routes>
        <Route
          path="/offer/:id"
          element={<Offer setShowSort={setShowSort} token={token} />}
        ></Route>
        <Route
          path="/signup"
          element={<Signup setUser={setUser} setShowSort={setShowSort} />}
        ></Route>
        <Route
          path="/login"
          element={<Login setUser={setUser} setShowSort={setShowSort} />}
        ></Route>
        <Route
          path="/"
          element={
            <Home
              search={search}
              value={value}
              priceSort={priceSort}
              setShowSort={setShowSort}
              token={token}
            />
          }
        ></Route>
        <Route path="/publish" element={<Publish token={token} setShowSort={setShowSort}/>}></Route>
        <Route path="/payment" element={<Payment setShowSort={setShowSort}/>}></Route> 
      </Routes>
    </Router>
  );
}

export default App;
