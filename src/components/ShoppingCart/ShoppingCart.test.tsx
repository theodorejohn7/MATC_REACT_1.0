import { render } from "@testing-library/react";
import ShoppingCart from "./ShoppingCart";

import { store } from "../../redux/store";
import { Provider } from "react-redux";

describe("Testing Shopping Cart Component", () => {
  test("renders Shopping Cart component succesfully", () => {
    render(
      <Provider store={store}>
        <ShoppingCart isOpen={true} />
      </Provider>
    );
  });
});
