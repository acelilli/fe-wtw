import Card from "react-bootstrap/Card";
import { Button, Container, Row, Col } from "react-bootstrap";
import { addDestination } from "../redux/destinationsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

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

  //Parte del codice dedicato alle icone
  const icon = weatherData.weather[0].icon || "unknown";
  const iconPath = `${process.env.PUBLIC_URL}/icons/${icon}.png`;

  const isPlaceholder =
    weatherData.name === "Your City here" &&
    weatherData.weather[0].description === "Weather description" &&
    weatherData.main.temp === 0;

  return (
    <Card className="ms-0 w-100 rounded-5">
      <Card.Body className="position-relative">
        <Row className="p-2 d-flex justify-content-center align-items-center">
          <Col xs={12} md={6} className="justify-content-center">
            <h1 className="mb-0">{weatherData.name}</h1>
            <p className="text-muted pt-0">{weatherData.weather[0].description}</p>
          </Col>
          <Col xs={12} md={6} className=" justify-content-center">
            <div>
              <img src={iconPath} alt="Weather Icon" style={{ width: "100%", maxWidth: "110px" }} />
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-space-evenly">
          <Col xs={12} md={6} className="mt-3 p-0">
            <hr />
            {!isPlaceholder && (
              <div>
                <p className="fs-4">{kelvinToCelsius(weatherData.main.temp)}°C</p>
                <p className="text-muted">
                  Temp. Min: {kelvinToCelsius(weatherData.main.temp_min)}°C
                  <br />
                  Temp. Max: {kelvinToCelsius(weatherData.main.temp_max)}°C
                </p>
              </div>
            )}
          </Col>
          <Col xs={12} md={6} className="mt-3 ">
            {!isPlaceholder && (
              <div>
                <hr />
                <p className="text-muted">
                  Humidity: {weatherData.main.humidity}% <br />
                  Wind: {weatherData.wind.speed} km/h
                </p>
                <hr />
              </div>
            )}
            {!isPlaceholder && (
              <Button
                className="px-1 mt-2 mb-1"
                variant="primary"
                onClick={() => handleAddDestination(weatherData.name)}
              >
                Add Destination <FavoriteBorderRoundedIcon />
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
