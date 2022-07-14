import React from "react";
 
import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Menubar from "./components/Menubar/Menubar";
import navigation from "./components/Menubar/Navigation";
import ResponsiveNavbar from "./components/ResponsiveNavbar/ResponsiveNavbar"
import Footer from "./components/Footer/Footer";
const Login = lazy(() => import("./Pages/Login/Login"));
 
const Register = lazy(() => import("./Pages/Register/Register"));

const SignUp = lazy(() => import("./Pages/SignUp/SignUp"));
const ProductManagement = lazy(()=> import("./Pages/Management/ProductManagement"))
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));

function App() {
  return (
    <div className="App">
      {/* <Menubar brand={navigation.brand} links={navigation.links} /> */}
   <ResponsiveNavbar />

      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/register" element={<Register />} />

          <Route path="/productmgmt" element={<ProductManagement />} />


          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </Suspense>
       <Footer />
    </div>
  );
}

export default App;
