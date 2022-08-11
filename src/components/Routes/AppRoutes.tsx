import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../../Pages/Home/Home";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

const Login = lazy(() => import("../../Pages/Login/Login"));
const Register = lazy(() => import("../../Pages/Register/Register"));
const NotFound = lazy(() => import("../../Pages/NotFound/NotFound"));
const ProductManagement = lazy(() => import("../../Pages/Management/ProductManagement"));

export const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      }>
      <Routes>
        <Route
          path="/home"
          element={
            <ErrorBoundary name="Home">
              <Home />
            </ErrorBoundary>
          }
        />
        <Route
          path="/login"
          element={
            <ErrorBoundary name="Login">
              <Login />
            </ErrorBoundary>
          }
        />
        <Route
          path="/register"
          element={
            <ErrorBoundary name="Register">
              <Register />
            </ErrorBoundary>
          }
        />

        <Route
          path="/productmgmt"
          element={
            <ProtectedRoute>
              <ErrorBoundary name="Product Management">
                <ProductManagement />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/404"
          element={
            <ErrorBoundary name="Not Found">
              <NotFound />
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </Suspense>
  );
};
