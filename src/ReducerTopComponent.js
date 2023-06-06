import App from "./App.js";

import Cookies from "universal-cookie";
import { format, fromUnixTime, addWeeks } from "date-fns";

import { useReducer, createContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Forecast from "./Components/Forecast.js";
import { reducer } from "./utility/Reducer.js";
import { useState } from "react";
import { fetchWeatherCurrent } from "./utility/weather.js";

export const MyDispatch = createContext("dispatch");
export const MyState = createContext("state");

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
function Reducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cookies = new Cookies();

  const [cookieArray, setCookieArray] = useState(cookies.get("locations"));
  useEffect(() => {
    dispatch({ type: "loading", loading: true });
    async function updateDisplayWithCookie() {
      // console.log(true, cookieArray);

      if (cookieArray === undefined) {
        return;
      }
      if (cookieArray)
        for (let i = 0; i < cookieArray.length; i++) {
          const city = cookieArray[i];
          fetchWeatherCurrent(city, true)
            .then((data) => {
              dispatch({
                type: "add_location",
                activeLocation: `${data.coord.lat},${data.coord.lon}`,
                locationsData: {
                  [`${data.coord.lat},${data.coord.lon}`]: { ...data },
                },
              });
              dispatch({ type: "error", error: "" });
              // setError("");
            })
            .catch((err) => {
              dispatch({
                type: "error",
                error: "Try Again: No Location Found",
              });
              // setError("Try Again: No Location Found");
            });
        }

      dispatch({ type: "loading", loading: false });
    }

    updateDisplayWithCookie();
  }, [cookieArray]);

  useEffect(() => {
    const day = addWeeks(new Date(), 1);

    cookies.set("locations", state.locations, {
      expires: day,
      path: "/weather_ReactJS",
    });
  }, [state.locations]);

  useEffect(() => {
    document.title = "Weather App";
  }, []);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "location/:id",
        element: <Forecast></Forecast>,
      },
    ],
    { basename: "/weather_ReactJS" }
  );
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
