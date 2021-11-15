import { useNavigate } from "react-router";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import { teal } from "@mui/material/colors";
import vintedLogo from "../assets/vinted-logo.png";

const Header = ({
  token,
  setUser,
  setSearch,
  search,
  value,
  setValue,
  checked,
  setChecked, priceSort, setPriceSort
}) => {
  const navigate = useNavigate();

  // Slider design to move to a separate component

  const valuetext = (value) => {
    return `${value} €`;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCheckedChange = (event) => {
    setChecked(event.target.checked);
    if (priceSort === "price-asc"){
      setPriceSort("price-desc")
    } else {
      setPriceSort("price-asc")
    }
  };
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
          <div>
            <div className="sort-section">
                <span className="slider-title">Trier par prix:</span>
               
                <div className = "form-control">
                  <FormControlLabel
                    control={<Switch defaultChecked style={{ color: teal[400]}} color ="default"/>}
                    checked={checked}
                    onChange={handleCheckedChange}
                    label={checked? <i className="fas fa-arrow-circle-down"></i>:<i class="fas fa-arrow-circle-up"></i>}
                    
                  />
                  
                </div>
              <span className="slider-title">Prix entre: </span>
              <div className="slider-bar">
                {/* Slider bar tomove to a separate component */}
                <Box sx={{ width: 300 }}>
                  <Slider
                    getAriaLabel={() => "Price"}
                    // size = "small"
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    valueLabelFormat={(value) => value + " €"}
                    getAriaValueText={valuetext}
                    max={200}
                    style={{ color: teal[400] }}
                    // marks={marks}
                  ></Slider>
                </Box>
              </div>
            </div>
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
