import { TiThermometer, TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { TodayForecast , WeatherImage, CityName, DateHeading, Temperature } from "../forecast/forecastCityStyles";

const TodayForecasts = ({ forecast, city }) => {
    console.log("nameToday", city.name)
    console.log("forecastToday", forecast)
  return (
    <TodayForecast>
      <CityName>
        Forecast for {city && city?.name}-{city && city?.country}
      </CityName>
      <DateHeading>Today</DateHeading>
      <div>
        <Temperature>
          Temperature: {forecast[0].temp}°C
          <TiThermometer />
        </Temperature>
      </div>
      <div>
        <Temperature>
          Feels like: {forecast[0].feels_like}°C
          <TiThermometer />
        </Temperature>
      </div>
      <div>
        <Temperature>
          Humidity: {forecast[0].humidity}%
          <WiHumidity />
        </Temperature>
      </div>
      <div>
        <Temperature>
          Pressure: {forecast[0].pressure} hPa
          <TiArrowDownOutline />
          <TiArrowUpOutline />
        </Temperature>
      </div>
      <WeatherImage src={forecast[0].icon} alt="Weather condition" />
    </TodayForecast>
  );
};

export default TodayForecasts;
