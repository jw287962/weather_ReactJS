import "./App.css";
import { useState, useEffect, useReducer } from "react";
import Header from "./Components/Header";
import { fetchWeatherCurrent } from "./utility/weather";
import WeatherBox from "./Components/WeatherBox";
import { handlePermission } from "./utility/permissions";
import { reducer } from "./utility/Reducer.js";
const initialState = {
  locations: [],
  activeLocation: "",
  toggleTime: 1,
  loading: true,
  locationsData: {},
};
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [processedData, setProcessData] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);
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
      const processedData = fetchWeatherCurrent(currentLocation);

      processedData.then((data) => {
        dispatch({
          type: "add_location",
          activeLocation: data.city,
          locationsData: { ...state.locationsData, [data.city]: { ...data } },
        });
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
        console.log("before", state.locationsData, data.city);
        dispatch({
          type: "add_location",
          activeLocation: data.city,
          locationsData: { ...state.locationsData, [data.city]: { ...data } },
        });
      })
      .catch((err) => {
        setError("Try Again: No Location Found");
      });
    dispatch({ type: "loading", loading: false });
  }
  return (
    <div className="App">
      <Header></Header>
      <form className="locationform" onSubmit={processNewLocation}>
        <label htmlFor="location">LOCATION:</label>
        <input
          type="search"
          id="location"
          name="location"
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
    </div>
  );
}

export default App;
