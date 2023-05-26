import "./App.css";
import { useState, useEffect, useReducer } from "react";
import Header from "./Components/Header";
import { fetchWeatherCurrent } from "./utility/weather";
import WeatherBox from "./Components/WeatherBox";
import { handlePermission } from "./utility/permissions";

import { reducer } from "./utility/Reducer";

import { useContext } from "react";
import { MyDispatch, MyState } from "./ReducerTopComponent";

function App() {
  const dispatch = useContext(MyDispatch);
  const state = useContext(MyState);
  // const initialState = {
  //   locations: [],
  //   activeLocation: "",
  //   toggleTime: 1,
  //   loading: true,
  //   expandLocation: "",
  //   locationsData: {},
  // };
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [currentLocation, setCurrentLocation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "loading", loading: true });
      await handlePermission(setCurrentLocation);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (currentLocation != "") {
      fetchWeatherCurrent(currentLocation).then((data) => {
        dispatch({
          type: "add_location",
          activeLocation: data.city,
          locationsData: { ...state.locationsData, [data.city]: { ...data } },
        });
      });
      dispatch({ type: "loading", loading: false });
    }
  }, [currentLocation]);

  useEffect(() => {
    const looperArray = () => {
      state.locations.forEach((city) => {
        console.log("refresh", city);
        fetchWeatherCurrent(city)
          .then((data) => {
            dispatch({
              type: "add_location",
              activeLocation: data.city,
              locationsData: {
                ...state.locationsData,
                [data.city]: { ...data },
              },
            });
            dispatch({ type: "error", error: "" });
            // setError("");
          })
          .catch((err) => {
            dispatch({ type: "error", error: "Try Again: No Location Found" });
            // setError("Try Again: No Location Found");
          });
      });
    };
    const inter = setTimeout(looperArray, 10000);
    return () => clearInterval(inter);
  }, [state]);

  return (
    <div className="App">
      <Header></Header>
      {!state.expandLocation && (
        <>
          {/* <button className="refresh"></button> */}
          <div className="content"></div>
          {state.locations.map((location, i) => {
            const data = state.locationsData[location];
            return <WeatherBox data={data}></WeatherBox>;
          })}
        </>
      )}

      {state.expandLocation && (
        <>
          <button className="refresh"></button>
          <div className="content"></div>

          <WeatherBox></WeatherBox>
        </>
      )}
    </div>
  );
}

export default App;
