import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchACity, fetchWeather } from "../redux/checkWeatherSlice";
import SearchIcon from "@mui/icons-material/Search";

export default function CheckWeather({ onCitySearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  //Gestiamo la ricerca
  const handleSearch = async () => {
    try {
      const cityData = await dispatch(fetchACity(searchQuery)).unwrap();
      console.log("Fetched city Data:", cityData);
      if (cityData.length > 0) {
        const weatherData = await dispatch(fetchWeather(cityData[0])).unwrap();
        onCitySearch({
          myCityData: [cityData[0]], // Popola l'array con cityData
          weatherData: [weatherData], // Popola l'array con myWeather
        });
      } else {
        alert("Nessuna città trovata!");
      }
    } catch (error) {
      console.error("Errore durante la ricerca:", error);
    }
  };
  // Per far fronte al problema della pagina che si ricarica al premere invio aggiungo una funzione che blocca questo evento predefinito.
  //In questo modo la ricerca viene avviata o al click del bottone o al submit
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <Form onSubmit={handleSubmit} className="ms-0 d-flex flex-direction-row align-items-start">
      <Form.Group className="mb-1 px-2" controlId="searchCity">
        <Form.Control
          type="text"
          placeholder="Search a city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Form.Text className="text-muted">We'll research the weather of your next destination ❤️</Form.Text>
      </Form.Group>
      <Button variant="info" onClick={handleSearch}>
        <SearchIcon />
      </Button>
    </Form>
  );
}
