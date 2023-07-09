import { TiThermometer, TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { CarouselSlide, DateHeading, Description, WeatherImage, CarouselSlider, CarouselWrapper} from "../forecast/forecastCityStyles";
const HourlyForecast = ({ forecast }) => {
  const renderHourlyForecast = (hour) => {
    return (
      <CarouselSlide key={hour.dt}>
        <DateHeading>{hour.dt.slice(0, 16)}hs</DateHeading>
        <div>
          <TiThermometer />
          <span>Temperature: {hour.temp}°C</span>
        </div>
        <div>
          <TiThermometer />
          <span>Feels like: {hour.feels_like}°C</span>
        </div>
        <div>
          <WiHumidity />
          <span>Humidity: {hour.humidity}%</span>
        </div>
        <div>
          <TiArrowDownOutline />
          <TiArrowUpOutline />
          <span>Pressure: {hour.pressure} hPa</span>
        </div>
        <Description>Weather: {hour.description}</Description>
        <WeatherImage src={hour.icon} alt="Weather" />
      </CarouselSlide>
    );
  };

  const renderHourlyForecasts = () => {
    const hourlyForecasts = forecast.slice(1);

    return hourlyForecasts.map((hour) => {
      return renderHourlyForecast(hour);
    });
  };

  return (
    <>
      <CarouselWrapper>
        <CarouselSlider>{renderHourlyForecasts()}</CarouselSlider>
      </CarouselWrapper>
    </>
  );
};

export default HourlyForecast;
