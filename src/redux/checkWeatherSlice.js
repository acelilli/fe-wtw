import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// con slice creo la slice in sè, thunk serve per fare le chiamate asincrone
import axios from "axios";

const cityApi = "https://api.openweathermap.org/geo/1.0/direct";
const weatherApi = "https://api.openweathermap.org/data/2.5/weather";
const apik = "d2f0cb3825395c7de55d96f5e48979ac";

//definiamo l'initial state così da riutilizzare solo la const.
// Non posso creare un initial state separato per l'uno e l'altro (initialState è una parola chiave)
const initialState = {
  // i dati delle città:
  cityLoading: false,
  cityData: [], // qui verranno caricati i dati meteo delle città
  cityError: null,
  // i dati meteo:
  weatherLoading: false,
  cityWeatherData: [], // qui verranno caricati i dati meteo delle città
  weatherError: null,
};

// Fetch per ricercare la città
export const fetchACity = createAsyncThunk("checkWeather/fetchACity", async (searchQuery) => {
  try {
    const response = await axios.get(`${cityApi}?q=${searchQuery}&limit=5&appid=${apik}`);
    const cityData = response.data;
    return cityData;
  } catch (error) {
    throw new Error("Impossibile trovare la città.");
  }
});

// Fetch per prendere i dati meteo
export const fetchWeather = createAsyncThunk("checkWeather/fetchWeather", async (cityData) => {
  try {
    const response = await axios.get(`${weatherApi}?lat=${cityData.lat}&lon=${cityData.lon}&appid=${apik}`);
    const myWeather = response.data;
    return myWeather;
  } catch (error) {
    throw new Error("Impossibile ottenere i dati meteo.");
  }
});

const checkWeatherSlice = createSlice({
  name: "checkWeather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // PRIMO BUILDER: Per la fetch dei dati delle città
      // 1. Il caricamento dei dati = pending
      .addCase(fetchACity.pending, (state) => {
        state.cityLoading = true;
      })
      // 2. Il popolamento dei dati = fullfilled
      .addCase(fetchACity.fulfilled, (state, action) => {
        state.cityLoading = false;
        state.cityData = action.payload; // metto i dati ricevuti in weatherData
      })
      // 3. l'errore nel caricamento = rejected
      .addCase(fetchACity.rejected, (state, action) => {
        state.cityLoading = false;
        state.cityError = action.error.message;
      })
      // SECONDO BUILDER: per la fetch dei dati meteo
      .addCase(fetchWeather.pending, (state) => {
        state.weatherLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weatherLoading = false;
        state.cityWeatherData = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.weatherLoading = false;
        state.weatherError = action.error.message;
      });
  },
});
export const checkWeatherReducer = checkWeatherSlice.reducer;
