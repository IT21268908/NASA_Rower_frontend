import { useEffect, useState } from "react";
import "../css/Nav.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function NavigationBar() {
  const [displayNav, handleNav] = useState(false);

  const navTransition = () => {
    if (window.scrollY > 100) {
      handleNav(true);
    } else {
      handleNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navTransition);
    return () => window.removeEventListener("scroll", navTransition);
  }, []);

  return (
    <Navbar
      className={`nav ${displayNav && "nav_change"}`}
      expand="lg"
      fixed="top"
    >
      <Container>
        <Navbar.Brand href="#home">
          <span className={`font_nasa ${displayNav && "nasa_scroll"}`}>
            NASA
          </span>
          <span className={`font_cam ${displayNav && "cam_scroll"}`}>
            .Clicks
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div>
          <h1
            style={{
              fontSize: "1.5rem",
              color: "#e6e6e6",
            }}
            className="font_cam"
          >
            Perseverance Rover Photos
          </h1>
        </div>
      </Container>
    </Navbar>
  );
}
