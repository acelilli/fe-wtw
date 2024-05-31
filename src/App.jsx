import logo from "./logo.svg";
import "./App.css";
import "bootstrap";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MainContent from "./components/MainContent";

export default function App() {
  return (
    <div className="App">
      <video autoPlay loop muted>
        <source src={`${process.env.PUBLIC_URL}/bgvid/45959-447087605.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <MainContent />
    </div>
  );
}
