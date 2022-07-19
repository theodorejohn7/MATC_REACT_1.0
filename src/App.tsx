import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Footer from "./components/Footer/Footer";

import Navbar from "./components/Navbar/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

const Login = lazy(() => import("./Pages/Login/Login"));

const Register = lazy(() => import("./Pages/Register/Register"));

const SignUp = lazy(() => import("./Pages/SignUp/SignUp"));
const ProductManagement = lazy(
  () => import("./Pages/Management/ProductManagement")
);
const Cart = lazy(() => import("./components/ShoppingCart/ShoppingCart"));

const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));

function App() {
  return (
    <div className="App">
      {/* <Menubar brand={navigation.brand} links={navigation.links} /> */}
      {/* <ResponsiveNavbar /> */}
      <ShoppingCartProvider>
        <Navbar />
        <Container className="mb-4">
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/register" element={<Register />} />

              <Route path="/productmgmt" element={<ProductManagement />} />

              {/* <Route path="/cart" element={<Cart />} /> */}

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
