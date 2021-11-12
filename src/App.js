import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [search, setSearch] = useState(null)

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {expires: 30});
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };


  return (
    <Router>
      <Header token={token} setUser={setUser} search = {search} setSearch={setSearch}/>
      <Routes>
        <Route path="/offer/:id" element={<Offer />}></Route>
        <Route path="/signup" element={<Signup setUser={setUser} />}></Route>
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
        <Route path="/" element={<Home search={search}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
