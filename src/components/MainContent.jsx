import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../assets/myContent.css";
import { ExploreCarousel } from "./ExploreCarousel";
import { cities } from "../redux/exploreSlice";

export default function MainContent() {
  // Estraiamo i dati meteo delle città dallo stato globale
  const citiesWeather = useSelector((state) => state.explore.citiesWeather);
  return (
    <>
      <Container className="myContent">
        <ExploreCarousel cities={cities} citiesWeather={citiesWeather} />
      </Container>
    </>
  );
}
