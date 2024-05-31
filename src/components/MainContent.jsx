import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import "../assets/myContent.css";
import { ExploreCarousel } from "./ExploreCarousel";
import CheckWeather from "./CheckWeather";
import WeatherCard from "./WeatherCard";
import MyDestinations from "./MyDestinations";
import { cities } from "../redux/exploreSlice"; // bisogna passare l'array delle cities dall'elemento padre di explore

export default function MainContent() {
  // Voglio vedere comunque la card WeatherCard ma con del contenuto placeholder.
  // Definisco il contenuto placholder della card
  const placeholderWeatherData = {
    name: "Your City here",
    weather: [{ description: "Weather description" }],
    main: { temp: 0 },
    wind: { speed: "Wind speed" },
  };
  // Estraiamo i dati meteo delle città dallo stato globale
  const citiesWeather = useSelector((state) => state.explore.citiesWeather);
  const [weatherData, setWeatherData] = useState(placeholderWeatherData);
  const handleCitySearch = (data) => {
    setWeatherData(data);
  };

  //Gestione delle destinations, dell'array del loro component
  const [myDestinations, setMyDestinations] = useState([]);
  const addDestination = (city) => {
    setMyDestinations([...myDestinations, city]);
  };

  return (
    <>
      <Container className="myContent">
        <Row>
          <ExploreCarousel cities={cities} citiesWeather={citiesWeather} />
        </Row>
        <Row>
          <Col md={5}>
            <MyDestinations onCitySearch={handleCitySearch} />
          </Col>
          <Col md={7} className="d-flex flex-column align-items-center py-3 px-4">
            <CheckWeather onCitySearch={handleCitySearch} />
            {weatherData && <WeatherCard weatherData={weatherData} addDestination={addDestination} />}
          </Col>
        </Row>
        <Row>
          <div className="mt-2 mb-0">
            <p className="text-muted mb-0">
              Icons created by{" "}
              <a href="https://www.flaticon.com/authors/freepik" title="sun icons">
                Freepik - Flaticon
              </a>
            </p>
          </div>
        </Row>
      </Container>
    </>
  );
}
