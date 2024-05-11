import { Container } from "react-bootstrap";
import "./css/App.css";
import Routes from "./routes";
import { useContext } from "react";
import { AppContext } from "./context/AuthContext";
import DefaultLayout from "./layout";
import Login from "./layout/login";

function App() {
  const { isAuthenticated } = useContext(AppContext);
  const Layout = isAuthenticated ? DefaultLayout : Login;

  return (
    <div className="App">
      <Container className="main-container">
        <Layout>
          <Routes />
        </Layout>
      </Container>
    </div>
  );
}

export default App;