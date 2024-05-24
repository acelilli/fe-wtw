import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { exploreReducer } from "./exploreSlice";

const store = configureStore({
  reducer: {
    explore: exploreReducer, // prima funzionalità da implementare. Da un array di città, composto da oggetti {nomeCitta e ImgUrl}, a partire da nomeCitta faccio la fetch.
    // checkWeather: checkWeatherReducer,
    // destinations: destinationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
