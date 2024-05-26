import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeDestination } from "../redux/destinationsSlice";

export default function MyDestinations() {
  const myDestinations = useSelector((state) => state.destinations.myDestinations);
  const dispatch = useDispatch();

  // Funzione per rimuovere la destinazione dall'elenco:
  const handleRemoveDestination = (city) => {
    dispatch(removeDestination(city));
    console.log(
      "Destinations after removing:",
      myDestinations.filter((dest) => dest !== city)
    );
  };

  return (
    <Container>
      <h3>My Destinations</h3>
      <ul>
        {myDestinations.length > 0 ? (
          myDestinations.map((city, index) => (
            <li key={index}>
              {city} - <Button className="btn-info">C</Button>
              <Button className="btn-danger" onClick={() => handleRemoveDestination(city)}>
                X
              </Button>
            </li>
          ))
        ) : (
          <li>No destinations added yet.</li>
        )}
      </ul>
    </Container>
  );
}
