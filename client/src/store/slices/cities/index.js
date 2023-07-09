import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    city: null,
    forecast: [],
    loading: false,
    error: null,
    lastRequestDate: null,
  },
  reducers: {
    cityRequest: (state) => {
      state.loading = true;
    },
    citySuccess: (state, action) => {
      state.city = action.payload;
      state.loading = false;
    },
    cityFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    forecastRequest: (state) => {
      state.loading = true;
    },
    forecastSuccess: (state, action) => {
      state.forecast = action.payload;
      state.loading = false;
    },
    forecastFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getCityDetails: (state) => {
      state.details = null;
    },
    getCityDetailsSuccess: (state, action) => {
      state.details = action.payload;
    },
    getCityDetailsFail: (state, action) => {
      state.error = action.payload;
    },
    updateLastRequestDate: (state) => {
      state.lastRequestDate = new Date().toISOString();
    },
  },
});

export const {
  cityRequest,
  citySuccess,
  cityFail,
  forecastRequest,
  forecastSuccess,
  forecastFail,
  getCityDetails,
  getCityDetailsSuccess,
  getCityDetailsFail,
  updateLastRequestDate,
} = citiesSlice.actions;

export const getCityByName = (name) => async (dispatch, getState) => {
  try {
    const {
      cities: { lastRequestDate },
    } = getState();
    const currentDate = new Date();
    const cachedData = localStorage.getItem("cityData");

    if (cachedData && lastRequestDate) {
      const lastRequestDateObj = new Date(lastRequestDate);
      const oneDayMilliseconds = 24 * 60 * 60 * 1000;

      if (currentDate - lastRequestDateObj < oneDayMilliseconds) {
        dispatch(citySuccess(JSON.parse(cachedData)));
        return;
      }
    }

    dispatch(cityRequest());
    const { data } = await axios.get(
      `https://weather-api-production-06d0.up.railway.app/city?name=${name}`
    );
    dispatch(citySuccess(data));
    dispatch(cacheForecastData());
    dispatch(updateLastRequestDate());
  } catch (error) {
    dispatch(cityFail(error.message));
  }
};

export const getForecastByCoords = (lat, lon) => async (dispatch) => {
  try {
    dispatch(forecastRequest());
    const { data } = await axios.get(
      `https://weather-api-production-06d0.up.railway.app/forecast?lat=${lat}&lon=${lon}`
    );
    dispatch(forecastSuccess(data));
    dispatch(cacheForecastData());
    dispatch(updateLastRequestDate());
  } catch (error) {
    dispatch(forecastFail(error.message));
  }
};

export const cacheForecastData = () => (dispatch, getState) => {
  const {
    cities: { forecast },
  } = getState();

  try {
    localStorage.setItem("forecastData", JSON.stringify(forecast));
  } catch (error) {
    console.error("Error saving forecast data to localStorage:", error);
  }
};

export default citiesSlice.reducer;
