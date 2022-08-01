import { render, screen } from "@testing-library/react";

import CarouselComp from "./CarouselComp";

describe("Testing Navbar Component", () => {
  test("renders Navbar component succesfully", () => {
    render(<CarouselComp />);
  });

  test("renders Previous and next button successfully", () => {
    render(<CarouselComp />);

    const Next = screen.getByText("Next");
    const Previous = screen.getByText("Previous");

    expect(Next).toBeInTheDocument();
    expect(Previous).toBeInTheDocument();
  });
});
