import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Footer from "./Footer";
import userEvent from "@testing-library/user-event";

describe("Testing Footer Component", () => {
  test("renders Footer component succesfully", () => {
    render(<Footer />);
  });

  test("renders text in Footer component succesfully", () => {
    render(<Footer />);
    const FooterText = screen.getByText("COMPANY", {
      exact: false,
    });
    const contactNumber = screen.getByText("Chennai - 9789123619", {
      exact: false,
    });

    expect(FooterText).toBeInTheDocument();

    expect(contactNumber).toBeInTheDocument();
  });

  test("renders images in Footer succesfully", () => {
    render(<Footer />);

    const logo = screen.getAllByRole("img");
    expect(logo[0]).toHaveAttribute("src", "./img/app-store.svg");
    expect(logo[0]).toHaveAttribute("alt", "app-store-image");
    expect(logo[1]).toHaveAttribute("src", "./img/play-store.png");
    expect(logo[1]).toHaveAttribute("alt", "play-store-image");
  });
});
