import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeDestination } from "../redux/destinationsSlice";
import { fetchACity, fetchWeather } from "../redux/checkWeatherSlice";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

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
    <Container className=" p-2 ms-2 mt-3">
      <h3>My Destinations</h3>
      <p className="text-muted fs-9"> Check or delete your destinations:</p>
      <div className="destinations-container mt-2">
        <ul className="list-unstyled px-2">
          {myDestinations.length > 0 ? (
            myDestinations.map((city, index) => (
              <li
                key={index}
                className="bg-white p-1 px-2 rounded-3 d-flex justify-content-between align-items-center"
              >
                {city}{" "}
                <div>
                  <Button className="btn-info mx-1 " onClick={() => handleSeeWeather(city)}>
                    <SavedSearchIcon />
                  </Button>
                  <Button className="btn-danger" onClick={() => handleRemoveDestination(city)}>
                    <DeleteOutlineRoundedIcon />
                  </Button>
                </div>
              </li>
            ))
          ) : (
            <li>No destinations added yet.</li>
          )}
        </ul>
      </div>
    </Container>
  );
}
