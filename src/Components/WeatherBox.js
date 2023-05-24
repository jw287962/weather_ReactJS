import Forecast from "./Forecast";
// import { MyDispatch, MyState } from "../ReducerTopComponent";

// import { useContext } from "react";
function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(
  require.context("../asset/images", false, /\.(png|jpe?g|svg)$/)
);

function imageNum(description) {
  if (description.includes("Cloud")) {
    return 0;
  } else if (description.includes("Rain")) return 1;
  else if (description.includes("Sun") || description.includes("Clear")) {
    return 2;
    // 2
  } else {
    return 3;
  }
}

function WeatherBox({ expandLocation, state, dispatch }) {
  // const dispatch = useContext(MyDispatch);

  function toggleView(e) {
    e.preventDefault();
    console.log(e.target.dataset.location);
    dispatch({
      type: "selection",
      expandLocation: e.target.dataset.location,
    });
  }
  // const state = useContext(MyState);

  if (state.expandLocation) {
    const data = state.locationsData[state.expandLocation];
    return (
      <a
        onClick={toggleView}
        className="weatherdetails"
        key-location={`${state.expandLocation}`}
        data-location={state.expandLocation}
        href={`location/${state.expandLocation}`}
      >
        <div className="location">
          {data.city}, {data.location[0].state}
        </div>
        <div className="temp">
          <img src={images[imageNum(data.description)]}></img>
          <span className="tempdegree">{data.temp}</span>
          <span className="tempsymbol">°F</span>
        </div>

        <div className="description">{data.description}</div>
        <div className="humidity">Humidity: {data.humidity}</div>

        <div className="forecastbuttons"></div>
        <div className="sundetails">
          <div>{data.country}</div>
          <div className="sunset">Sunset: {data.sunset}</div>
          <div className="sunrise">Sunrise: {data.sunrise}</div>
        </div>
      </a>
    );
  }
  return state.locations.map((location, i) => {
    const data = state.locationsData[location];
    return (
      <a
        onClick={toggleView}
        className="weatherdetails"
        key-location={`${location}${i}`}
        data-location={location}
        href={`location/${location}`}
      >
        <div className="location">
          {data.city}, {data.location[0].state}
        </div>
        <div className="temp">
          <img src={images[imageNum(data.description)]}></img>
          <span className="tempdegree">{data.temp}</span>
          <span className="tempsymbol">°F</span>
        </div>

        <div className="description">{data.description}</div>
        <div className="humidity">Humidity: {data.humidity}</div>

        <div className="forecastbuttons"></div>
        <div className="sundetails">
          <div>{data.country}</div>
          <div className="sunset">Sunset: {data.sunset}</div>
          <div className="sunrise">Sunrise: {data.sunrise}</div>
        </div>
      </a>
    );
  });
}

export default WeatherBox;
