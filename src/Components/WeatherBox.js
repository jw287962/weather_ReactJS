import Forecast from "./Forecast";
import WeatherBoxData from "./WeatherBoxData";

import { convertKtoF } from "../utility/weather";

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
    <>
      {data && (
        <Link
          onClick={toggleView}
          className="weatherdetails"
          to={`/location/${data.name}`}
          // href={`/location/${location}`}
          key-location={`${data.name}${0}`}
          data-location={data.name}
        >
          <WeatherBoxData data={data}></WeatherBoxData>
        </Link>
      )}
    </>
  );
}

export default WeatherBox;
