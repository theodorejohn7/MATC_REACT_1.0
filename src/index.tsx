import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { ApolloProvider } from "@apollo/client";

import { Provider } from "react-redux";
import { store } from "./redux/store";


// import client from "../src/graphql/apolloConfig";


import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>

    {/* <ApolloProvider client={client}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </ApolloProvider> */}
    </Provider>
  </React.StrictMode>
);
