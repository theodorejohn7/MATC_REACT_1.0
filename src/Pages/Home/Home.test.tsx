import axios from "axios";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
 
import Home from "./Home";
import { store } from "../../redux/store";

const API_URL = process.env.REACT_APP_API_URL;

jest.setTimeout(35000);

describe("Testing Home Page", () => {
  test("Renders Home page", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });

  it("Displays loading message", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const text = await screen.findByText("Loading Updated Products ....");

    expect(text).toBeInTheDocument();
  });

  it("API returns data for category - Mutton", async () => {
    const response = await axios.get(`${API_URL}api/category/mutton`, {
      timeout: 35000,
    });

    expect(response.data[0].category).toEqual("mutton"); // Make an assertion on the result
  });

  it("API returns data for category - Chicken", async () => {
    const response = await axios.get(`${API_URL}api/category/chicken`, {
      timeout: 35000,
    });

    expect(response.data[0].category).toEqual("chicken"); // Make an assertion on the result
  });

  it("API returns data for category - Seafood", async () => {
    const response = await axios.get(`${API_URL}api/category/seafood`, {
      timeout: 35000,
    });

    expect(response.data[0].category).toEqual("seafood"); // Make an assertion on the result
  });
});
