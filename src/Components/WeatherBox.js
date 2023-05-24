import Forecast from "./Forecast";
// import { MyDispatch, MyState } from "../ReducerTopComponent";

// import { useContext } from "react";
import { images, imageNum } from "../utility/Images";

function WeatherBox({ state, dispatch }) {
  // const dispatch = useContext(MyDispatch);

  function toggleView(e) {
    e.preventDefault();
    // I could change display based on url and have back buttonw ork.
    window.history.pushState(
      { page: "location" },
      "",
      `/location/${e.target.dataset.location}`
    );
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
      <>
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
        <Forecast state={state} dispatch={dispatch}></Forecast>
      </>
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
