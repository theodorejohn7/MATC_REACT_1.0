import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CarouselComp from "./CarouselComp";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

describe("Testing Navbar Component", () => {
  test("renders Navbar component succesfully", () => {
    render(<CarouselComp />);
  });

  test("renders Previous and next button successfully", async () => {
    render(<CarouselComp />);

    const Next = await screen.getByText("Next");
    const Previous = await screen.getByText("Previous");

    expect(Next).toBeInTheDocument();
    expect(Previous).toBeInTheDocument();
  });
});
