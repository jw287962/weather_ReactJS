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
    dispatch({ type: "selection", expandLocation: "" });
    fetchData();

    console.log(state);
  }, []);

  useEffect(() => {
    if (currentLocation != "") {
      fetchWeatherCurrent(currentLocation).then((data) => {
        console.log(data);
        dispatch({
          type: "add_location",
          activeLocation: data.name,
          locationsData: { ...state.locationsData, [data.name]: { ...data } },
        });
      });
      dispatch({ type: "loading", loading: false });
    }
  }, [currentLocation]);

  useEffect(() => {
    const looperArray = () => {
      console.log(state);
      state.locations.forEach((city) => {
        console.log("REFRESH", city);
        fetchWeatherCurrent(city)
          .then((data) => {
            dispatch({
              type: "add_location",
              activeLocation: data.name,
              locationsData: {
                ...state.locationsData,
                [data.name]: { ...data },
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
    if (state.timer >= state.refreshTime) {
      setTimeout(looperArray, 700);
    }

    return () => {};
  }, [state.timer]);

  useEffect(() => {
    const timer = setTimeout(
      () =>
        dispatch({
          type: "timer",
        }),
      1000
    );
    return () => {
      clearInterval(timer);
    };
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
