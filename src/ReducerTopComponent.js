import App from "./App.js";

import { useReducer, createContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header.js";
import Forecast from "./Components/Forecast.js";
import { reducer } from "./utility/Reducer.js";
export const MyDispatch = createContext("dispatch");
export const MyState = createContext("state");

function Reducer() {
  useEffect(() => {
    document.title = "Weather App";
  });
  const initialState = {
    locations: [],
    activeLocation: "",
    toggleTime: 1,
    loading: true,
    expandLocation: "",
    locationsData: {},
    error: "",
    timer: 0,
    refreshTime: 40,
  };
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/location/:id",
        element: <Forecast></Forecast>,
      },
    ],
    { basename: "/weather_ReactJS" }
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <MyDispatch.Provider value={dispatch}>
        <MyState.Provider value={state}>
          <RouterProvider router={router} />
        </MyState.Provider>
      </MyDispatch.Provider>
    </div>
  );
}

export default Reducer;
