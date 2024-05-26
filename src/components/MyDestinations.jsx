import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeDestination } from "../redux/destinationsSlice";
import { fetchACity, fetchWeather } from "../redux/checkWeatherSlice";

export default function MyDestinations({ onCitySearch }) {
  const myDestinations = useSelector((state) => state.destinations.myDestinations);
  const dispatch = useDispatch();

  // Funzione per rimuovere la destinazione dall'elenco:
  const handleRemoveDestination = (city) => {
    dispatch(removeDestination(city));
    console.log(
      "Destinations after removing:",
      myDestinations.filter((dest) => dest !== city)
    );
  };

  // Funzione per mandare di nuovo il nome della città a FetchACity (e quindi fetchWeather) e ricevere i dati meteo nella card WeatherCard.
  const handleSeeWeather = async (city) => {
    try {
      const cityData = await dispatch(fetchACity(city)).unwrap();
      console.log("Fetched city data from destinations:", cityData);
      if (cityData.length > 0) {
        const weatherData = await dispatch(fetchWeather(cityData[0])).unwrap();
        onCitySearch(weatherData);
      } else {
        alert("No data found from your destinations");
      }
    } catch (error) {
      console.error("Errore durante la ricerca:", error);
    }
  };

  return (
    <Container>
      <h3>My Destinations</h3>
      <ul>
        {myDestinations.length > 0 ? (
          myDestinations.map((city, index) => (
            <li key={index}>
              {city} -{" "}
              <Button className="btn-info" onClick={() => handleSeeWeather(city)}>
                C
              </Button>
              <Button className="btn-danger" onClick={() => handleRemoveDestination(city)}>
                X
              </Button>
            </li>
          ))
        ) : (
          <li>No destinations added yet.</li>
        )}
      </ul>
    </Container>
  );
}
