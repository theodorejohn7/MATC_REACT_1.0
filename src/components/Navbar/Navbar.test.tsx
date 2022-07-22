import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Navbar from "./Navbar";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

describe("Testing Navbar Component", () => {
  test("renders Navbar component succesfully", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
  });

  test("renders Menu elements in Navbar succesfully", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const StoreMenu = screen.getByText("Store", {
      exact: true,
    });

    const LoginMenu = screen.getByText("Login", {
      exact: true,
    });

    const RegisterMenu = screen.getByText("Register", {
      exact: true,
    });

    expect(StoreMenu).toBeInTheDocument();
    expect(LoginMenu).toBeInTheDocument();
    expect(RegisterMenu).toBeInTheDocument();
  });
});
