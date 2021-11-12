import { useNavigate } from "react-router";
import Slider from "@mui/material/Slider"
import Box from "@mui/material/Box"
import {teal} from "@mui/material/colors"
import vintedLogo from "../assets/vinted-logo.png";

const Header = ({ token, setUser, setSearch, search, value, setValue }) => {
  const navigate = useNavigate();

  // Slider design to move to a separate component
  const marks = [
    {
      value: 0,
      label: '0 €',
    },
    {
      value: 50,
      label: '50 €',
    },
    {
      value: 100,
      label: '100 €',
    },
    {
      value: 150,
      label: '150 €',
    },
    {value: 200,
    label:'200 €'}
  ];
  

  const valuetext=(value)=> {
    return `${value} €`;
  }

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  }
  // Slider functions end

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
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <div className="slider-bar">
          {/* Slider bar tomove to a separate component */}
            <Box sx={{ width: 300 }}>
              <Slider
                getAriaLabel={() => "Price"}
                size = "small"
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                max={200}
                style={{ color: teal[400] }}
                marks={marks}
              ></Slider>
            </Box>
          </div>
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
