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
        console.log(data);
        dispatch({
          type: "add_location",
          activeLocation: data.city,
          locationsData: { [data.city]: { data } },
        });
      });
      dispatch({ type: "loading", loading: false });
    }
  }, [currentLocation]);
  console.log("UPDATED STATE", state);

  return (
    <div className="App">
      <Header></Header>
      <form className="locationform" onSubmit={(e) => e.preventDefault()}>
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
        {state.loading ? "loading...(please wait)" : ""}{" "}
      </div>
      <button className="refresh"></button>
      <div className="content"></div>

      <WeatherBox state={state} dispatch={dispatch}></WeatherBox>
    </div>
  );
}

export default App;
