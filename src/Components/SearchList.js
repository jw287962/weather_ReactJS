import "../Components/css/searchArea.css";
import { useContext, useEffect } from "react";
import { fetchWeatherCurrent } from "../utility/weather";

import { MyDispatch, MyState } from "../ReducerTopComponent";
function SearchList({ location, setSearchTerm }) {
  const dispatch = useContext(MyDispatch);
  const state = useContext(MyState);
  useEffect(() => {
  
  }, []);

  async function processNewLocation(e) {
    e.preventDefault();
    dispatch({ type: "loading", loading: true });
    const processedData = fetchWeatherCurrent({
      coords: { latitude: location.lat, longitude: location.lon },
    });
    processedData
      .then((data) => {
        dispatch({
          type: "add_location",
          activeLocation: data.name,
          locationsData: { ...state.locationsData, [data.name]: { ...data } },
        });
        dispatch({ type: "error", error: "" });
      })
      .catch((err) => {
        dispatch({ type: "error", error: "Try Again: No Location Found" });
      });
    setSearchTerm("");
    dispatch({ type: "loading", loading: false });
  }
  return (
    <button className="searchList" onClick={processNewLocation}>
      {location.name}, {location && location.state ? `${location.state},` : ""}{" "}
      {location.country}
    </button>
  );
}

export default SearchList;
