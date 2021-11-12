import { useNavigate } from "react-router";

import vintedLogo from "../assets/vinted-logo.png";

const Header = ({ token, setUser , setSearch, search }) => {
  const navigate = useNavigate();


  return (
    <header>
      <div className="header-container">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={vintedLogo} alt="vinted logo" />
        </div>
        <div className="search">
          <input
            type="text"
            className="search-input"
            placeholder="Recherche des articles"
            value = {search}
            onChange = {(event)=>{setSearch(event.target.value)}}
          />
          <p className="slider-bar">Placeholder</p>
        </div>
        {token ? (
          <button
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
            className="header-button deconnexion"
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
