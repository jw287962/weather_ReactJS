import Forecast from "./Forecast";
import WeatherBoxData from "./WeatherBoxData";

import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";

import { convertKtoF } from "../utility/weather";
import { images, imageNum } from "../utility/Images";

import { MyDispatch, MyState } from "../ReducerTopComponent";
import { useContext } from "react";

import { Link } from "react-router-dom";
function WeatherBox({ data, num }) {
  const dispatch = useContext(MyDispatch);
  const state = useContext(MyState);

  function toggleView(e) {
    dispatch({
      type: "selection",
      expandLocation: e.target.dataset.location,
    });
  }
  function handleDelete(e) {
    e.preventDefault();
    const copy = state.locationsData;
    delete copy[data.name];
    dispatch({
      type: "removeLocation",
      locations: state.locations.splice(num, 1),
      locationsData: copy,
    });

    console.log(data);
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
          <div onClick={handleDelete} className="deleteContainer">
            <Icon className="delete" path={mdiDelete} size={1.4} />
          </div>
        </Link>
      )}
    </>
  );
}

export default WeatherBox;
