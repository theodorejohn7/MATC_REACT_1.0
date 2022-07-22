import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductManagement from "./ProductManagement";
import { Provider } from "react-redux";

import { store } from "../../redux/store";
import userEvent from "@testing-library/user-event";

describe("Testing Product Management Page", () => {
  test("renders Product Management Page succesfully", () => {
    render(
      <Provider store={store}>
        <ProductManagement />
      </Provider>
    );
    const RegisterText = screen.getByText("Display Mutton Data", {
      exact: false,
    });
    expect(RegisterText).toBeInTheDocument();
  });

  test("displays buttons for each category", () => {
    render(
      <Provider store={store}>
        <ProductManagement />
      </Provider>
    );
    const muttonButton = screen.getByText("Display Mutton Data", {
      exact: false,
    });
    const chickenButton = screen.getByText("Display Chicken Data", {
      exact: false,
    });
    const seafoodButton = screen.getByText("Display SeaFood Data", {
      exact: false,
    });
    expect(muttonButton).toBeInTheDocument();
    expect(chickenButton).toBeInTheDocument();
    expect(seafoodButton).toBeInTheDocument();
  });
});
