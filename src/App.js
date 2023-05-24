import "./App.css";
import { useState, useEffect, useReducer } from "react";
import Header from "./Components/Header";
import { fetchWeatherCurrent } from "./utility/weather";
import WeatherBox from "./Components/WeatherBox";
import { handlePermission } from "./utility/permissions";

import { reducer } from "./utility/Reducer";

function App() {
  const initialState = {
    locations: [],
    activeLocation: "",
    toggleTime: 1,
    loading: true,
    expandLocation: "",
    locationsData: {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useState("");
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
        if (state.locationsData[data.city]) {
          dispatch({
            type: "refresh",
            locationsData: { ...state.locationsData, [data.city]: { ...data } },
          });
        } else {
          dispatch({
            type: "add_location",
            activeLocation: data.city,
            locationsData: { ...state.locationsData, [data.city]: { ...data } },
          });
        }
      });
      dispatch({ type: "loading", loading: false });
    }
  }, [currentLocation]);

  function processNewLocation(e) {
    e.preventDefault();
    console.log();
    if (
      state.locationsData[
        `${searchTerm[0].toUpperCase().concat(searchTerm.substring(1))}`
      ] !== undefined
    ) {
      setError("Duplicate Location");
      return;
    }
    dispatch({ type: "loading", loading: true });

    const processedData = fetchWeatherCurrent(searchTerm);
    processedData
      .then((data) => {
        dispatch({
          type: "add_location",
          activeLocation: data.city,
          locationsData: { ...state.locationsData, [data.city]: { ...data } },
        });
        setError("");
      })
      .catch((err) => {
        setError("Try Again: No Location Found");
      });
    dispatch({ type: "loading", loading: false });
  }

  useEffect(() => {
    const looperArray = () => {
      console.log(state);
      state.locations.forEach((city) => {
        fetchWeatherCurrent(city)
          .then((data) => {
            console.log("refresh", city);
            dispatch({
              type: "refresh",
              locationsData: {
                ...state.locationsData,
                [data.city]: { ...data },
              },
            });
            setError("");
          })
          .catch((err) => {
            setError("Try Again: No Location Found");
          });
      });
    };
    const inter = setTimeout(looperArray, 10000);
    return () => clearInterval(inter);
  }, [state]);
  return (
    <div className="App">
      <Header state={state} dispatch={dispatch}></Header>
      {!state.expandLocation && (
        <>
          <form className="locationform" onSubmit={processNewLocation}>
            <label htmlFor="location">LOCATION:</label>
            <input
              type="search"
              id="location"
              name="location"
              placeholder="Search by City Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <div className="loading">
            {error}
            {state.loading ? "loading...(please wait)" : ""}{" "}
          </div>
          <button className="refresh"></button>
          <div className="content"></div>

          <WeatherBox state={state} dispatch={dispatch}></WeatherBox>
        </>
      )}
      {state.expandLocation && (
        <>
          <div className="loading">
            {error}
            {state.loading ? "loading...(please wait)" : ""}{" "}
          </div>
          <button className="refresh"></button>
          <div className="content"></div>

          <WeatherBox
            state={state}
            dispatch={dispatch}
            expandLocation={state.expandLocation}
          ></WeatherBox>
        </>
      )}
    </div>
  );
}

export default App;
