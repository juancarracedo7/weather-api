import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define el slice de Redux llamado "cities"
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
    // Acción para indicar que se está realizando una solicitud de ciudad
    cityRequest: (state) => {
      state.loading = true;
    },
    // Acción para actualizar el estado con la ciudad recibida
    citySuccess: (state, action) => {
      state.city = action.payload;
      state.loading = false;
    },
    // Acción para actualizar el estado en caso de error durante la solicitud de ciudad
    cityFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Acción para indicar que se está realizando una solicitud de pronóstico
    forecastRequest: (state) => {
      state.loading = true;
    },
    // Acción para actualizar el estado con el pronóstico recibido
    forecastSuccess: (state, action) => {
      state.forecast = action.payload;
      state.loading = false;
    },
    // Acción para actualizar el estado en caso de error durante la solicitud de pronóstico
    forecastFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Acción para restablecer los detalles de la ciudad a null
    getCityDetails: (state) => {
      state.details = null;
    },
    // Acción para actualizar el estado con los detalles de la ciudad recibidos
    getCityDetailsSuccess: (state, action) => {
      state.details = action.payload;
    },
    // Acción para actualizar el estado en caso de error al obtener los detalles de la ciudad
    getCityDetailsFail: (state, action) => {
      state.error = action.payload;
    },
    // Acción para actualizar la fecha y hora de la última solicitud de ciudad
    updateLastRequestDate: (state) => {
      state.lastRequestDate = new Date().toISOString();
    },
  },
});

// Exporta las acciones creadas por createSlice
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

// Acción asíncrona para obtener los datos de una ciudad por su nombre
export const getCityByName = (name) => async (dispatch, getState) => {
  try {
    const { cities: { lastRequestDate } } = getState(); // Obtiene la fecha y hora de la última solicitud del estado
    const currentDate = new Date(); // Obtiene la fecha y hora actuales
    const cachedData = localStorage.getItem("cityData"); // Obtiene los datos de la ciudad del almacenamiento local

    if (cachedData && lastRequestDate) {
      const lastRequestDateObj = new Date(lastRequestDate); // Convierte la fecha y hora de la última solicitud en un objeto Date
      const oneDayMilliseconds = 24 * 60 * 60 * 1000; // Calcula el número de milisegundos en un día

      if (currentDate - lastRequestDateObj < oneDayMilliseconds) {
        // Utiliza los datos en caché si la solicitud más reciente ocurrió en el mismo día
        dispatch(citySuccess(JSON.parse(cachedData)));
        return;
      }
    }

    dispatch(cityRequest());
    // Realiza una solicitud HTTP para obtener los datos de la ciudad por su nombre
    const { data } = await axios.get(`http://localhost:3001/city?name=${name}`);
    // Actualiza el estado con los datos de la ciudad recibidos
    dispatch(citySuccess(data));
    // Guarda los datos en caché
    dispatch(cacheForecastData());
    // Actualiza la fecha y hora de la última solicitud
    dispatch(updateLastRequestDate());
  } catch (error) {
    // Actualiza el estado en caso de error durante la solicitud de ciudad
    dispatch(cityFail(error.message));
  }
};

// Acción asíncrona para obtener el pronóstico de una ciudad por su latitud y longitud
export const getForecastByCoords = (lat, lon) => async (dispatch, getState) => {
  try {
    const { cities: { lastRequestDate } } = getState(); // Obtiene la fecha y hora de la última solicitud del estado
    const currentDate = new Date(); // Obtiene la fecha y hora actuales
    const cachedData = localStorage.getItem("forecastData"); // Obtiene los datos del pronóstico del almacenamiento local

    if (cachedData && lastRequestDate) {
      const lastRequestDateObj = new Date(lastRequestDate); // Convierte la fecha y hora de la última solicitud en un objeto Date
      const oneDayMilliseconds = 24 * 60 * 60 * 1000; // Calcula el número de milisegundos en un día

      if (currentDate - lastRequestDateObj < oneDayMilliseconds) {
        // Utiliza los datos en caché si la solicitud más reciente ocurrió en el mismo día
        dispatch(forecastSuccess(JSON.parse(cachedData)));
        return;
      }
    }

    dispatch(forecastRequest());
    // Realiza una solicitud HTTP para obtener el pronóstico por latitud y longitud
    const { data } = await axios.get(`http://localhost:3001/forecast?lat=${lat}&lon=${lon}`);
    // Actualiza el estado con los datos del pronóstico recibidos
    dispatch(forecastSuccess(data));
    // Guarda los datos en caché
    dispatch(cacheForecastData());
    // Actualiza la fecha y hora de la última solicitud
    dispatch(updateLastRequestDate());
  } catch (error) {
    // Actualiza el estado en caso de error durante la solicitud de pronóstico
    dispatch(forecastFail(error.message));
  }
};

// Acción para guardar los datos de los podcasts en caché
export const cacheForecastData = () => (dispatch, getState) => {
  const { cities: { forecast } } = getState(); // Obtiene los datos del pronóstico del estado
  
  try {
  // Guarda los datos en el almacenamiento local como una cadena JSON
  localStorage.setItem("forecastData", JSON.stringify(forecast));
  } catch (error) {
  console.error("Error saving forecast data to localStorage:", error);
  }
  };

export default citiesSlice.reducer;
