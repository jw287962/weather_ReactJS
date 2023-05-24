import Header from "./Header";
import WeatherBox from "./WeatherBox";
import { fetchWeatherForecast } from "../utility/weather";
import { useEffect, useState } from "react";
// import { MyDispatch, MyState } from "../ReducerTopComponent";
// import { useContext } from "react";

import { images, imageNum } from "../utility/Images";
function Forecast({ state, dispatch }) {
  // const dispatch = useContext(MyDispatch);
  // const state = useContext(MyState);
  const [forecast, setForecast] = useState({});
  useEffect(() => {
    async function fetchForecast() {
      const data = fetchWeatherForecast(state.expandLocation);
      const result = await data;
      console.log("result", result);
      setForecast(Object.values(result[`${state.expandLocation}`]));
    }
    fetchForecast();
  }, []);
  return (
    <div className="forecast">
      {Array.isArray(forecast) &&
        forecast.map((day, i) => {
          if (i >= 8) {
            return null;
          }
          return (
            <div className="day">
              <div className="date">{day.date}</div>
              <div className="temperature">{day.temp}</div>
              <img src={images[imageNum(day.description)]}></img>
            </div>
          );
        })}
    </div>
  );
}
export default Forecast;
