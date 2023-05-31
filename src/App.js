import "./App.css";
import { useState, useEffect } from "react";
import Header from "./Components/Header";
import { fetchWeatherCurrent } from "./utility/weather";
import WeatherBox from "./Components/WeatherBox";
import { handlePermission } from "./utility/permissions";

import { useContext } from "react";
import { MyDispatch, MyState } from "./ReducerTopComponent";
import Cookies from "universal-cookie";

function App() {
  const dispatch = useContext(MyDispatch);
  const state = useContext(MyState);
  const cookies = new Cookies();
  const [currentLocation, setCurrentLocation] = useState("");
  function refreshDispatch(data) {
    dispatch({
      type: "add_location",
      activeLocation: data.name,
      locationsData: { ...state.locationsData, [data.name]: { ...data } },
    });
  }
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "loading", loading: true });
      await handlePermission(setCurrentLocation);
    };

    dispatch({ type: "selection", expandLocation: "" });
    fetchData();
  }, []);

  useEffect(() => {
    if (currentLocation != "") {
      fetchWeatherCurrent(currentLocation).then((data) => {
        console.log(data);
        refreshDispatch(data);
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
            refreshDispatch(data);
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
          {state.locations &&
            state.locations.map((location) => {
              const data = state.locationsData[location];
              if (data && data.name)
                return <WeatherBox data={data} key={location}></WeatherBox>;
              else return null;
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
