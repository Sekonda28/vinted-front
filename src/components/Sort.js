import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import { teal } from "@mui/material/colors";

const Sort = ({
  value,
  setValue,
  priceSort,
  setPriceSort,
  checked,
  setChecked,
}) => {
  const valuetext = (value) => {
    return `${value} €`;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCheckedChange = (event) => {
    setChecked(event.target.checked);
    if (priceSort === "price-asc") {
      setPriceSort("price-desc");
    } else {
      setPriceSort("price-asc");
    }
  };
  return (
    <div className="sort-section">
      <span className="slider-title">Trier par prix:</span>

      <div className="form-control">
        <FormControlLabel
          control={
            <Switch
              defaultChecked
              style={{ color: teal[400] }}
              color="default"
            />
          }
          onChange={handleCheckedChange}
          label={
            checked ? (
              <i className="fas fa-arrow-circle-down"></i>
            ) : (
              <i className="fas fa-arrow-circle-up"></i>
            )
          }
        />
      </div>
      <span className="slider-title">Prix entre: </span>
      <div className="slider-bar">
        <Box sx={{ width: 300 }}>
          <Slider
            getAriaLabel={() => "Price"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => value + " €"}
            getAriaValueText={valuetext}
            max={200}
            style={{ color: teal[400] }}
          ></Slider>
        </Box>
      </div>
    </div>
  );
};
export default Sort;
