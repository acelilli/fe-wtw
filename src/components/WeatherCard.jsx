import Card from "react-bootstrap/Card";
import { Button, Container } from "react-bootstrap";
import { addDestination } from "../redux/destinationsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function WeatherCard({ weatherData }) {
  const dispatch = useDispatch();
  const myDestinations = useSelector((state) => state.destinations.myDestinations);

  // Funzione add Destination
  const handleAddDestination = () => {
    dispatch(
      addDestination({
        name: weatherData.name,
      })
    );
    console.log("Destinations after adding:", [...myDestinations, weatherData.name]);
  };

  // nel weatherData, la temperatura viene stampatain Kelvin, non in Celsius. Quindi definisco una funzione per ritornarmi la temperatura in celius
  function kelvinToCelsius(kelvin) {
    const celsius = kelvin - 273.15;
    return celsius.toFixed(2);
  }
  return (
    <Container>
      <Card className="ms-0 w-100">
        <Card.Body>
          <Card.Title className="fw-bold">{weatherData.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Weather: {weatherData.weather[0].description}</Card.Subtitle>
          <Card.Text>
            <p>Temperatura: {kelvinToCelsius(weatherData.main.temp)}°C</p>
            <p>Vento</p>
            <p>Altro</p>
          </Card.Text>
          <Button variant="primary" onClick={() => handleAddDestination(weatherData.name)}>
            Add to Destinations
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
