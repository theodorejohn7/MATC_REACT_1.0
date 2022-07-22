import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ShoppingCart from "./ShoppingCart";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../redux/store";
import { Provider } from "react-redux";

describe("Testing Shopping Cart Component", () => {
  test("renders Shopping Cart component succesfully", () => {
  const   newscreen=render(
      <Provider store={store}>
        <ShoppingCart isOpen={true} />
      </Provider>
    );
     
  });


});
