import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// con slice creo la slice in sè, thunk mi serve per fare le chiamate asincrone
import axios from "axios";

//Creiamo un array di città in cui ho il nome della città e l'url a una immagine
export const cities = [
  {
    cityName: "Rome",
    imgUrl: "https://cdn.pixabay.com/photo/2020/05/17/12/56/rome-5181486_1280.jpg",
    lat: 41.9028,
    lon: 12.4964,
  },
  {
    cityName: "Madrid",
    imgUrl: "https://cdn.pixabay.com/photo/2017/09/04/16/13/madrid-2714570_1280.jpg",
    lat: 40.4168,
    lon: -3.7038,
  },
  {
    cityName: "Paris",
    imgUrl: "https://cdn.pixabay.com/photo/2020/11/22/19/19/louvre-5767708_1280.jpg",
    lat: 48.8566,
    lon: 2.3522,
  },
  {
    cityName: "London",
    imgUrl: "https://cdn.pixabay.com/photo/2017/06/11/18/03/big-ben-2393098_1280.jpg",
    lat: 51.5074,
    lon: -0.1278,
  },
  {
    cityName: "New York",
    imgUrl: "https://cdn.pixabay.com/photo/2020/01/10/20/05/new-york-4756152_1280.jpg",
    lat: 40.7128,
    lon: -74.006,
  },
  {
    cityName: "Tokyo",
    imgUrl: "https://cdn.pixabay.com/photo/2021/05/01/09/59/city-6220689_1280.jpg",
    lat: 35.6895,
    lon: 139.6917,
  },
  {
    cityName: "Seoul",
    imgUrl: "https://cdn.pixabay.com/photo/2022/08/05/05/59/seoul-7366037_1280.jpg",
    lat: 37.5665,
    lon: 126.978,
  },
];

// metto l'url della mia API in una const cosicchè sia riutilizzabile.
// Nb: nella fetch di explore prendo la lat e la lon delle città che ho già nell'array cities.
const weatherApi = "https://api.openweathermap.org/data/2.5/weather";
const apik = "d2f0cb3825395c7de55d96f5e48979ac";

//definiamo l'initial state fuori così da riutilizzare solo la const
const initialState = {
  loading: false,
  weatherData: [], // qui verranno caricati i dati meteo delle città
  error: null,
};

export const fetchExploreWeather = createAsyncThunk("explore/fetchExploreWeather", async () => {
  const requests = cities.map(
    (city) =>
      //con .map mappo iterando le città nell'array city
      //quindi creo un array di richieste axios => generando una richiesta per ciascuna città
      axios
        .get(`${weatherApi}?lat=${city.lat}&lon=${city.lon}&appid=${apik}`)
        .then((response) => ({ cityName: city.cityName, imgUrl: city.imgUrl, ...response.data }))
    // aspetto la risposta aggiungendo la proprietà cityName col nome della città richiesta
  );
  const weatherData = await Promise.all(requests);
  return weatherData;
});

//Con le città definite in un array statico + la fetch per ogni città pronta, creiamo, infine, la slice.
const exploreSlice = createSlice({
  name: "explore",
  // initialState => lo stato iniziale del reducer, che è inizialmente vuoto e definito in precedenza. Viene aggiornato con le azioni
  initialState,
  //i reducers in questo caso si occupano di fare le fetch dei dati, quindi saranno:
  // 1. per il caricamento
  // 2. per il success
  // 3. per il fallimento
  // MA poichè è un'azione async, non viene fatto in reducers!
  reducers: {},
  // extraReducers viene utilizzato quando si ha a che vedere con un'azione che si è già definita in precedenza, ad esempio, come in questo caso, quando abbiamo creato un Thunk che si occupa di una fetch. (se hai un createAsyncThunk => nello slice usa extraReducers)
  //extraReducers ha un argomento chiamato BUILDER
  extraReducers: (builder) => {
    // 1. Il caricamento dei dati = pending
    builder
      .addCase(fetchExploreWeather.pending, (state) => {
        state.loading = true;
      })
      // 2. Il popolamento dei dati = fullfilled
      .addCase(fetchExploreWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload; // metto i dati ricevuti in weatherData
      })
      // 3. l'errore nel caricamento = rejected
      .addCase(fetchExploreWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const exploreReducer = exploreSlice.reducer;
