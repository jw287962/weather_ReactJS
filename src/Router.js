import React from "react";
import App from "./App";
import Forecast from "./Components/Forecast";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
const RouterRoute = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/location/*" element={<Forecast />} />
    </Route>
  )
);

export default RouterRoute;
