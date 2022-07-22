import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductManagement from "./ProductManagement";
import { Provider } from "react-redux";

import { store } from "../../redux/store";
 
describe("Testing Product Management Page", () => {
  test("render Register Form Title text", () => {
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
});
