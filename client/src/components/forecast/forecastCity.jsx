import ForecastChart from "../forecastChart/forecastChart";
import HourlyForecast from "../hourlyForecast/hourlyForecast";
import TodayForecasts from "../todayForecast/todayForecast";
import { ForecastContainer, LoadingMessage, RetryButton } from "./forecastCityStyles";

const ForecastCity = ({ forecast, city }) => {
    if (!forecast || !city) {
      return <LoadingMessage>Loading forecast...</LoadingMessage>;
    }
    console.log("forecast", forecast)
    console.log("city", city)
  
    return (
      <ForecastContainer>
        <TodayForecasts forecast={forecast} city={city} />
        <ForecastChart forecast={forecast} />
        <HourlyForecast forecast={forecast} />
        <RetryButton onClick={() => window.location.reload()}>Search another city</RetryButton>
      </ForecastContainer>
    );
  };
  
  export default ForecastCity;