import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { exploreReducer } from "./exploreSlice";
import { checkWeatherReducer } from "./checkWeatherSlice";
import { destinationsReducer } from "./destinationsSlice";

const store = configureStore({
  reducer: {
    explore: exploreReducer, // prima funzionalità: da un array di città composto da oggetti {nomeCitta, ImgUrl, lon, lat} faccio la fetch per recuperarne le info meteo (nb. la api utilizza come parametri lon e lat). I dati verranno visualizzati in un carosello.
    checkWeather: checkWeatherReducer,
    destinations: destinationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
