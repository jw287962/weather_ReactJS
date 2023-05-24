import React from "react";
import App from "./App";
import Forecast from "./Components/Forecast";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "location/:id",
    element: <Forecast></Forecast>,
  },
]);

export default router;

// createRoutesFromElements(
//   <Route path="/" element={<App />}>
//     <Route path="location/*" element={<Forecast />} />
//   </Route>
// )
