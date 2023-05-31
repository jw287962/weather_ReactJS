import { Link } from "react-router-dom";

import { useContext, useState } from "react";

import { MyDispatch, MyState } from "../ReducerTopComponent";

import { fetchWeatherCurrent } from "../utility/weather";
function Header() {
  const dispatch = useContext(MyDispatch);
  const state = useContext(MyState);
  function handleHomeClick(e) {
    dispatch({
      type: "home",
    });
  }
  const [searchTerm, setSearchTerm] = useState("");
  // const [error, setError] = useState("");

  function processNewLocation(e) {
    e.preventDefault();
    dispatch({ type: "loading", loading: true });

    console.log();
    if (
      state.locationsData[
        `${searchTerm[0]
          .toUpperCase()
          .concat(searchTerm.substring(1).toLowerCase())}`
      ] !== undefined
    ) {
      dispatch({ type: "error", error: "Duplicate Location" });
      return;
    }

    const processedData = fetchWeatherCurrent(searchTerm);
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
    dispatch({ type: "loading", loading: false });
  }
  return (
    <div className="header">
      <div>
        <Link to={`/`} onClick={handleHomeClick}>
          WEATHER FORECAST
        </Link>
        <a href="https://github.com/jw287962/weather_ReactJS/tree/master">
          <svg
            height="32"
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            data-view-component="true"
            className="octicon octicon-mark-github v-align-middle"
          >
            <path
              fillRule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
        </a>
      </div>
      {!state.expandLocation && (
        <div className="secondaryHeaderTools">
          <form className="locationform" onSubmit={processNewLocation}>
            <label htmlFor="location">LOCATION: </label>
            <input
              type="search"
              id="location"
              name="location"
              placeholder="Search by City Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="loading">
              {state.error ? `${state.error}` : ""}
              {state.loading ? "loading...(please wait)" : ""}{" "}
            </div>
          </form>
        </div>
      )}

      <div className="miscData">
        {state.expandLocation && (
          <span className="miniloading">
            {state.error ? `${state.error}` : ""}
            {state.loading ? "loading...(please wait)" : ""}{" "}
          </span>
        )}
        <span className="timer">Last Refresh: {state.timer}</span>
      </div>
    </div>
  );
}

export default Header;
