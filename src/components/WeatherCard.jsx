import Card from "react-bootstrap/Card";
import { Button, Container } from "react-bootstrap";

export default function WeatherCard({ weatherData }) {
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
          <Button variant="primary">Add Destination</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
