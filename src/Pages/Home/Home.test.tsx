import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import Products from "../../components/Products/Products";

import Home from "./Home";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

describe("Testing Home Page", () => { 
 


  test("Loading", async () => {
    render(
        <Provider store={store}>
        <Products />
      </Provider>
    );

    expect(screen.getByText("Loading Updated Products .... ")).toBeInTheDocument();
  

    await waitFor(() => {
        expect(screen.getByText("Loading Updated Products .... ")).toBeInTheDocument();
    });
  });


});
