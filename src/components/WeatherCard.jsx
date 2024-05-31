import Card from "react-bootstrap/Card";
import { Button, Row, Col } from "react-bootstrap";
import { addDestination } from "../redux/destinationsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import "../assets/weatherCard.css";

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
    return celsius.toFixed(0);
  }

  //Parte del codice dedicato alle icone
  const icon = weatherData.weather[0].icon || "unknown";
  const iconPath = `${process.env.PUBLIC_URL}/icons/${icon}.png`;

  const isPlaceholder =
    weatherData.name === "Your City here" &&
    weatherData.weather[0].description === "Weather description" &&
    weatherData.main.temp === 0;

  return (
    <Card className="ms-0 w-100 rounded-5 data-card">
      <Card.Body className="position-relative">
        <Row className="p-2 d-flex justify-content-center align-items-center">
          <Col xs={12} md={6} className="justify-content-center my-0">
            <h3 className="my-1">{weatherData.name}</h3>{" "}
            <p className="text-muted pt-0 mb-0">{weatherData.weather[0].description}</p>
            {!isPlaceholder && <p className="fs-5 mb-0">{kelvinToCelsius(weatherData.main.temp)}°C</p>}
          </Col>
          <Col xs={12} md={6} className=" justify-content-center my-1 py-0">
            <div>
              <img src={iconPath} alt="Weather Icon" style={{ width: "100%", maxWidth: "110px" }} />
            </div>
          </Col>
        </Row>
        <hr className="mx-1 my-1" />
        <Row className="d-flex justify-content-space-evenly">
          <Col xs={12} md={6} className="my-0 py-2">
            {!isPlaceholder && (
              <div>
                <p className="text-muted mb-0">
                  Min: {kelvinToCelsius(weatherData.main.temp_min)}°C
                  <br />
                  Max: {kelvinToCelsius(weatherData.main.temp_max)}°C
                </p>
              </div>
            )}
          </Col>
          <Col xs={12} md={6} className="my-0 py-2">
            {!isPlaceholder && (
              <div>
                <p className="text-muted mb-0">
                  Humidity: {weatherData.main.humidity}% <br />
                  Wind: {weatherData.wind.speed} km/h
                </p>
              </div>
            )}
          </Col>
        </Row>
        <Row className="mt-0 justify-content-center">
          {!isPlaceholder && (
            <Button className="p-1 mt-2 mb-1 mybtn" onClick={() => handleAddDestination(weatherData.name)}>
              <FavoriteBorderRoundedIcon />
            </Button>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}
