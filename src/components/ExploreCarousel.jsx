import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExploreWeather } from "../redux/exploreSlice";
import "../assets/exploreStyle.css";
import { Color, Palette } from "color-thief-react";

export function ExploreCarousel() {
  const { weatherData, loading, error } = useSelector((state) => state.explore);
  const dispatch = useDispatch();
  const [colors, setColors] = useState([]);

  useEffect(() => {
    dispatch(fetchExploreWeather());
  }, [dispatch]);

  useEffect(() => {
    // Resetta l'array di colori al cambio di weatherData. in modo tale che i colori siano diversi per ciascuna slide
    setColors([]);
  }, [weatherData]);

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

  // funzione per convertire il colore hex in rgba per poter dare un po' di trasparenza alla stroke del nome città
  function hexToRGBA(hex, alpha) {
    if (!hex || hex.length < 7) {
      // Gestisci il caso in cui hex sia undefined o non abbia il formato corretto
      return "rgba(0, 0, 0, 0)"; // O un valore predefinito appropriato
    }

    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha || 1})`;
  }

  return (
    <Carousel className="rounded-carousel">
      {weatherData.map((city, index) => (
        <Carousel.Item key={city.cityName} interval={1000}>
          <Palette src={city.imgUrl} crossOrigin="anonymous" format="hex" colorCount={4}>
            {({ data, loading }) => {
              if (loading) return <p>Loading...</p>;

              // Save the colors for each image
              if (!colors[index]) {
                setColors((prevColors) => {
                  const newColors = [...prevColors];
                  newColors[index] = data;
                  console.log("My Colors:", newColors, prevColors);
                  return newColors;
                });
              }

              const gradient = `linear-gradient(75deg, ${colors[index]?.[1] || "#000"}, ${
                colors[index]?.[2] || "#fff"
              })`;

              return (
                <>
                  <div className="cityImg">
                    <img src={city.imgUrl} alt={city.cityName} />
                  </div>
                  <Carousel.Caption className="carousel-city-weather">
                    <h4
                      style={{
                        backgroundImage: gradient,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        WebkitTextFillColor: "transparent",
                        fontSize: "40pt",
                        textShadow: `1px 1px ${hexToRGBA(colors[index]?.[0], 0.5)}, 
                 -1px -1px ${hexToRGBA(colors[index]?.[1], 0.5)}, 
                 1px -1px ${hexToRGBA(colors[index]?.[2], 0.5)}, 
                 -1px 1px ${hexToRGBA(colors[index]?.[3], 0.5)}`,
                      }}
                    >
                      {city.cityName}
                    </h4>
                    <div>
                      <p className="pb-0 mb-0">Temperature: {kelvinToCelsius(city.main.temp)}°C</p>
                      <p className="pb-0 mb-2">Weather: {city.weather[0].description}</p>
                    </div>
                  </Carousel.Caption>
                </>
              );
            }}
          </Palette>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
