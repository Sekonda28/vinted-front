import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

import vintedLogo from "../assets/vinted-logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(Cookies.get("token"))

  return (
    <header>
      <div className="header-container">
        <div className="logo" onClick = {()=>navigate("/")}>
          <img src={vintedLogo} alt="vinted logo" />
        </div>
        <div className="search">
          <input type="text" className="search-input" />
          <p className="slider-bar">Placeholder</p>
        </div>
        {loggedIn ? (
          <button
            onClick={() => {
              Cookies.remove("token");
              navigate("/");
            }}
            className="header-button subscribe"
          >
            Deconnexion
          </button>
        ) : (
          <div className="connect">
            <button
              onClick={() => navigate("/signup")}
              className="header-button subscribe"
            >
              
              S'inscrire
            </button>
            <button
              onClick={() => navigate("/login")}
              className="header-button login"
            >
              Se connecter
            </button>
          </div>
        )}

        <button className="header-button sell-button">
          Vends tes articles
        </button>
      </div>
    </header>
  );
};

export default Header;
