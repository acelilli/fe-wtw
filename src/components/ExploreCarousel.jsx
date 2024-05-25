import Carousel from "react-bootstrap/Carousel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExploreWeather } from "../redux/exploreSlice";
import "../assets/exploreStyle.css";

export function ExploreCarousel() {
  const { weatherData, loading, error } = useSelector((state) => state.explore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExploreWeather());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // nel weatherData, la temperatura viene stampatain Kelvin, non in Celsius. Quindi definisco una funzione per ritornarmi la temperatura in celius
  function kelvinToCelsius(kelvin) {
    const celsius = kelvin - 273.15;
    return celsius.toFixed(2);
  }

  return (
    <Carousel className="rounded-carousel">
      {weatherData.map((city) => (
        <Carousel.Item key={city.cityName} interval={1000}>
          <div className="cityImg">
            <img src={city.imgUrl} alt={city.cityName} />
          </div>
          <Carousel.Caption>
            <h3>{city.cityName}</h3>
            <div>
              <p className="pb-0 mb-0">Temperature: {kelvinToCelsius(city.main.temp)}°C</p>
              <p className="pb-0 mb-2">Weather: {city.weather[0].description}</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
