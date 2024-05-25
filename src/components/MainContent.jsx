import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import "../assets/myContent.css";
import { ExploreCarousel } from "./ExploreCarousel";
import CheckWeather from "./CheckWeather";
import WeatherCard from "./WeatherCard";
import { cities } from "../redux/exploreSlice"; // bisogna passare l'array delle cities dall'elemento padre di explore

export default function MainContent() {
  // Estraiamo i dati meteo delle città dallo stato globale
  const citiesWeather = useSelector((state) => state.explore.citiesWeather);
  const [weatherData, setWeatherData] = useState(null);
  const handleCitySearch = (data) => {
    setWeatherData(data);
  };

  return (
    <>
      <Container className="myContent">
        <Row>
          <ExploreCarousel cities={cities} citiesWeather={citiesWeather} />
        </Row>
        <Row>
          {/*<Col md={4}><MyDestinations/></Col>*/}
          <Col md={6} className="d-flex flex-column align-items-center py-3">
            <CheckWeather onCitySearch={handleCitySearch} />
            {weatherData && <WeatherCard weatherData={weatherData} />}
          </Col>
        </Row>
      </Container>
    </>
  );
}
