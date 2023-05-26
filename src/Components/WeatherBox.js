import Forecast from "./Forecast";
import { MyDispatch, MyState } from "../ReducerTopComponent";

import { useContext } from "react";
import { images, imageNum } from "../utility/Images";

import { Link } from "react-router-dom";
function WeatherBox({ data }) {
  const dispatch = useContext(MyDispatch);
  const state = useContext(MyState);

  function toggleView(e) {
    dispatch({
      type: "selection",
      expandLocation: e.target.dataset.location,
    });
  }

  if (state.expandLocation) {
    const data = state.locationsData[state.expandLocation];
    return <Forecast state={state} dispatch={dispatch}></Forecast>;
  }
  return (
    <Link
      onClick={toggleView}
      className="weatherdetails"
      to={`/location/${data.city}`}
      // href={`/location/${location}`}
      key-location={`${data.city}${0}`}
      data-location={data.city}
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
    </Link>
  );
}

export default WeatherBox;
