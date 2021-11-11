import { useNavigate } from "react-router";

import vintedLogo from "../assets/vinted-logo.png";

const Header = () => {
  const navigate = useNavigate()
  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <img src={vintedLogo} alt="vinted logo" />
        </div>
        <div className="search">
          <input type="text" className="search-input" />
          <p className="slider-bar">Placeholder</p>
        </div>
        <div className="connect">
          <button onClick = {()=>navigate("/signup")}className="header-button subscribe"> S'inscrire</button>
          <button className="header-button login">Se connecter</button>
        </div>

        <button className="header-button sell-button">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
