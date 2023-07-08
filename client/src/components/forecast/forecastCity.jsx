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
  import { useEffect, useRef } from "react";
  import * as d3 from "d3";
  import { TiThermometer, TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
  import { WiHumidity } from "react-icons/wi";
  
  const ForecastCity = ({ forecast, city }) => {
    const chartRef = useRef(null);
  
    useEffect(() => {
      if (forecast && forecast.length > 0) {
        createChart();
      }
    }, [forecast]);
  
    const createChart = () => {
      const chartData = forecast.map((hour) => ({
        dt: hour.dt,
        temp: hour.temp,
      }));
  
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const width = window.innerWidth >= 768 ? 800 : window.innerWidth - margin.left - margin.right;
      const height = 235 - margin.top - margin.bottom;
  
      d3.select(chartRef.current).selectAll("svg").remove();
  
      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
      const xScale = d3
        .scaleTime()
        .domain(d3.extent(chartData, (d) => new Date(d.dt)))
        .range([0, width]);
  
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(chartData, (d) => d.temp)])
        .range([height, 0]);
  
      const line = d3
        .line()
        .x((d) => xScale(new Date(d.dt)))
        .y((d) => yScale(d.temp));
  
      svg
        .append("path")
        .datum(chartData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);
  
      svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(xScale));
  
      svg.append("g").call(d3.axisLeft(yScale));
  
      svg.append("text").attr("x", width / 2).attr("y", -10).attr("text-anchor", "middle");
    };
  
    const renderHourlyForecast = (hour) => {
      return (
        <CarouselSlide key={hour.dt}>
          <DateHeading>{hour.dt}</DateHeading>
          <div>
            <TiThermometer />
            <span>Temperatura: {hour.temp}°C</span>
          </div>
          <div>
            <TiThermometer />
            <span>Sensación térmica: {hour.feels_like}°C</span>
          </div>
          <div>
            <WiHumidity />
            <span>Humedad: {hour.humidity}%</span>
          </div>
          <div>
            <TiArrowDownOutline />
            <TiArrowUpOutline />
            <span>Presión: {hour.pressure} hPa</span>
          </div>
          <Description>Estado del tiempo: {hour.description}</Description>
          <WeatherImage src={hour.icon} alt="Estado del tiempo" />
        </CarouselSlide>
      );
    };
  
    const renderHourlyForecasts = () => {
      const hourlyForecasts = forecast.slice(1);
  
      return hourlyForecasts.map((hour) => {
        return renderHourlyForecast(hour);
      });
    };
  
    if (!forecast || forecast.length === 0 || !city) {
      return <LoadingMessage>Cargando pronóstico...</LoadingMessage>;
    }
  
    return (
      <ForecastContainer>
        <TodayForecast>
          <CityName>
            Pronóstico para {city.name}-{city.country}
          </CityName>
          <DateHeading>Hoy</DateHeading>
          <div>
            <Temperature>
              Temperatura: {forecast[0].temp}°C
              <TiThermometer />
            </Temperature>
          </div>
          <div>
            <Temperature>
              Sensación térmica: {forecast[0].feels_like}°C
              <TiThermometer />
            </Temperature>
          </div>
          <div>
            <Temperature>
              Humedad: {forecast[0].humidity}%
              <WiHumidity />
            </Temperature>
          </div>
          <div>
            <Temperature>
              Presión: {forecast[0].pressure} hPa
              <TiArrowDownOutline />
              <TiArrowUpOutline />
            </Temperature>
          </div>
          <Description>Estado del tiempo: {forecast[0].description}</Description>
          <WeatherImage src={forecast[0].icon} alt="Estado del tiempo" />
        </TodayForecast>
        <div>
          <h3>Próximas horas: Temperatura</h3>
          <div ref={chartRef}></div>
        </div>
        <CarouselWrapper>
          <CarouselSlider>{renderHourlyForecasts()}</CarouselSlider>
        </CarouselWrapper>
        <button onClick={() => window.location.reload()}>Buscar otro país</button>
      </ForecastContainer>
    );
  };
  
  export default ForecastCity;
  