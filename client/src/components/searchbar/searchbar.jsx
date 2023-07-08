import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCityByName,
  getForecastByCoords,
} from "../../store/slices/cities/index";
import {
  SearchBarContainer,
  SearchWrapper,
  SearchInput,
  SearchButton,
  ErrorMessage,
} from "./searchbarStyles";
import ForecastCity from "../forecast/forecastCity";

const backgrounds = [
  "https://www.xtrafondos.com/descargar.php?id=5846&resolucion=2560x1440",
  "https://static.vecteezy.com/system/resources/previews/015/324/013/non_2x/sunset-scenery-with-sea-view-and-palm-trees-landscape-illustration-vector.jpg",
  "https://www.xtrafondos.com/descargar.php?id=9759&resolucion=3840x2160",
];

const SearchBar = () => {
  const [city, setCity] = useState("");
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const {
    city: cityData,
    forecast,
    error,
  } = useSelector((state) => state.cities);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) =>
        prevIndex === backgrounds.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setErrorMessage("");
  };

  useEffect(() => {
    if (cityData && cityData.lat !== undefined && cityData.lon !== undefined) {
      dispatch(getForecastByCoords(cityData.lat, cityData.lon));
    }
  }, [cityData, dispatch]);

  const handleSearch = () => {
    if (city.trim() === "") {
      setErrorMessage("Por favor, ingresa un valor de búsqueda");
    } else {
      setErrorMessage("");
      dispatch(getCityByName(city));
      setCity("");
    }
  };

  if (error === "Request failed with status code 400")
    return (
      <div>
        <h1>La ciudad no existe</h1>
      </div>
    );

  return (
    <>
      {forecast.length > 0 ? (
        <ForecastCity forecast={forecast} city={cityData} />
      ) : (
        <SearchBarContainer background={backgrounds[backgroundIndex]}>
          <SearchWrapper>
            <SearchInput
              type="text"
              value={city}
              onChange={handleInputChange}
              placeholder="Buscar ciudad"
            />
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <SearchButton onClick={handleSearch}>Buscar</SearchButton>
          </SearchWrapper>
        </SearchBarContainer>
      )}
    </>
  );
};

export default SearchBar;
