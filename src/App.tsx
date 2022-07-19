import { lazy, Suspense } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { Spin } from "antd";

import "./App.css";
import Home from "./Pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

const Login = lazy(() => import("./Pages/Login/Login"));
const Register = lazy(() => import("./Pages/Register/Register"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));
const ProductManagement = lazy(
  () => import("./Pages/Management/ProductManagement")
);

function App() {
  return (
    <div className="App">
      <ShoppingCartProvider>
        <Navbar />
        <Container className="mb-4">
      
          <Suspense
            fallback={
              <Spin
                spinning={true}
                tip="Loading..."
              > </Spin>
            }
          >
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/productmgmt" element={<ProductManagement />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate replace to="/home" />} />
            </Routes>
          </Suspense>
          <Footer />
        </Container>
      </ShoppingCartProvider>
    </div>
  );
}

export default App;
