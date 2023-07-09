import styled from "styled-components";

export const ForecastContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-image: url(https://a-static.besthdwallpaper.com/background-scenery-wallpaper-2048x768-85065_85.jpg);
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const TodayForecast = styled.div`
  text-align: center;
  margin-bottom: 20px;
  backdrop-filter: blur(500px);
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const DailyForecast = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

export const WeatherImage = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 10px;
`;

export const LoadingMessage = styled.div`
  margin-top: 20px;
  font-weight: bold;
`;

export const CityName = styled.h2`
  margin: 10px;
`;

export const DateHeading = styled.h3`
  margin-bottom: 10px;
`;

export const Temperature = styled.p`
  margin-bottom: 5px;
`;

export const Description = styled.p`
  margin-bottom: 5px;
`;

export const CarouselWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #333333 transparent;
  white-space: nowrap;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #333333;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const CarouselSlider = styled.div`
  display: flex;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  @media (max-width: 768px) {
    flex-wrap: nowrap;
  }
`;

export const CarouselSlide = styled.div`
  min-width: 200px;
  padding: 10px;
  flex: 0 0 auto;
  scroll-snap-align: start;
  text-align: center;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  white-space: normal;

  @media (max-width: 768px) {
    margin-right: 15px;
  }
`;

export const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #333333;
  color: #ffffff;
  border: none;
  cursor: pointer;
  z-index: 1;

  &:first-of-type {
    left: 10px;
  }

  &:last-of-type {
    right: 10px;
  }
`;


export const RetryButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4287f5;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2962c2;
  }
`;