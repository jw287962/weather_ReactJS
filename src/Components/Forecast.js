import Header from "./Header";
import WeatherBox from "./WeatherBox";
import {
  fetchWeatherCurrent,
  fetchWeatherForecast,
  fetchHourlyForecast,
} from "../utility/weather";
import { useEffect, useState } from "react";
import { MyDispatch, MyState } from "../ReducerTopComponent";
import { useContext } from "react";

import { images, imageNum } from "../utility/Images";
import { useParams } from "react-router-dom";

function Forecast() {
  const dispatch = useContext(MyDispatch);
  const state = useContext(MyState);
  const [forecast, setForecast] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState({});

  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    async function checkNoData() {
      if (state && state.expandLocation === "") {
        const data = await fetchWeatherCurrent(id);
        if (!state.locationsData[data.city]) {
          dispatch({
            type: "add_location",
            activeLocation: data.city,
            locationsData: {
              ...state.locationsData,
              [data.city]: { ...data },
            },
          });
          setData(data);
        }
      } else {
        setData(state.locationsData[state.expandLocation]);
      }
    }

    checkNoData();
  }, []);

  useEffect(() => {
    async function fetchForecast() {
      const result = await fetchWeatherForecast(state.expandLocation || id);
      setForecast(Object.values(result[`${state.expandLocation || id}`]));

      const hourlyData = await fetchHourlyForecast(state.expandLocation);
      console.log("hourly", hourlyData);
      setHourlyForecast(hourlyData);
    }

    fetchForecast();
  }, [data]);

  return (
    <div>
      <Header></Header>

      {data && (
        <div className="weatherdetails">
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
        </div>
      )}
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
    </div>
  );
}
export default Forecast;
