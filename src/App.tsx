import { Container } from "react-bootstrap";

import "./App.css";
import "./globalStyles.scss";

import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

import { UserloginContextProvider } from "./context/UserLoginContext";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { AppRoutes } from "./components/Routes/AppRoutes";

function App() {
  return (
    <div className="App">
      <UserloginContextProvider>
        <ShoppingCartProvider>
          <Navbar />
          <Container className="mb-4">
            <AppRoutes />
            <Footer />
          </Container>
        </ShoppingCartProvider>
      </UserloginContextProvider>
    </div>
  );
}

export default App;
