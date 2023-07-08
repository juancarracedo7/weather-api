import {
  ForecastContainer,
  TodayForecast,
  LoadingMessage,
  WeatherImage,
  CityName,
  DateHeading,
  Temperature,
  Description,
  CarouselWrapper,
  CarouselSlider,
  CarouselSlide,
} from "./forecastCityStyles";

const ForecastCity = ({ forecast, city }) => {
  if (!forecast || forecast.length === 0 || !city) {
    return <LoadingMessage>Cargando pronóstico...</LoadingMessage>;
  }

  const renderHourlyForecasts = () => {
    const hourlyForecasts = forecast.slice(1);

    return hourlyForecasts.map((hour) => {
      return renderHourlyForecast(hour);
    });
  };

  const renderHourlyForecast = (hour) => {
    return (
      <CarouselSlide key={hour.dt}>
        <DateHeading>{hour.dt}</DateHeading>
        <Temperature>Temperatura: {hour.temp}°C</Temperature>
        <Temperature>Sensación térmica: {hour.feels_like}°C</Temperature>
        <Temperature>Humedad: {hour.humidity}%</Temperature>
        <Temperature>Presión: {hour.pressure} hPa</Temperature>
        <Description>Estado del tiempo: {hour.description}</Description>
        <WeatherImage src={hour.icon} alt="Estado del tiempo" />
      </CarouselSlide>
    );
  };

  return (
    <ForecastContainer>
      <TodayForecast>
        <CityName>
          Pronóstico para {city.name}-{city.country}
        </CityName>
        <DateHeading>Hoy</DateHeading>
        <Temperature>Temperatura: {forecast[0].temp}°C</Temperature>
        <Temperature>Sensación térmica: {forecast[0].feels_like}°C</Temperature>
        <Temperature>Humedad: {forecast[0].humidity}%</Temperature>
        <Temperature>Presión: {forecast[0].pressure} hPa</Temperature>
        <Description>
          Estado del tiempo: {forecast[0].description}
        </Description>
        <WeatherImage src={forecast[0].icon} alt="Estado del tiempo" />
      </TodayForecast>
      <CarouselWrapper>
        <CarouselSlider>{renderHourlyForecasts()}</CarouselSlider>
      </CarouselWrapper>
    </ForecastContainer>
  );
};

export default ForecastCity;
