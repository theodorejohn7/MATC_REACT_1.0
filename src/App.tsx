import React from "react";
 
import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Login = lazy(() => import("./Pages/Login/Login"));
const Home = lazy(() => import("./Pages/Home/Home"));
const SignUp = lazy(() => import("./Pages/SignUp/SignUp"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/signup" />} />
        </Routes>
      </Suspense>
      <h1>Welcome</h1>
    </div>
  );
}

export default App;
