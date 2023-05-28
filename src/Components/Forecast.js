import Header from "./Header";
import ForcastGraph from "./ForecastGraph";

import { useEffect, useState } from "react";
import { MyDispatch, MyState } from "../ReducerTopComponent";

import WeatherBox from "./WeatherBox";
import {
  fetchWeatherCurrent,
  fetchWeatherForecast,
  fetchHourlyForecast,
} from "../utility/weather";

import { useContext } from "react";

import { images, imageNum } from "../utility/Images";
import { useParams } from "react-router-dom";

import "./css/forecast.css";

function Forecast() {
  const dispatch = useContext(MyDispatch);
  const state = useContext(MyState);
  const [forecast, setForecast] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState();

  const { id } = useParams();
  const [data, setData] = useState();

  async function updateData() {
    const data = await fetchWeatherCurrent(id);
    dispatch({
      type: "add_location",
      activeLocation: data.city,
      locationsData: {
        ...state.locationsData,
        [data.city]: { ...data },
      },
    });
  }
  async function checkNoData() {
    if (state && state.expandLocation === "") {
      const data = await fetchWeatherCurrent(id);
      // console.log(state);
      // console.log(data);

      dispatch({
        type: "add_location",
        activeLocation: data.city,
        locationsData: {
          ...state.locationsData,
          [data.city]: { ...data },
        },
      });
      setData(data);
    } else {
      setData(state.locationsData[state.expandLocation]);
    }
  }
  async function fetchForecast() {
    const result = await fetchWeatherForecast(state.expandLocation || id);
    setForecast(Object.values(result[`${state.expandLocation || id}`]));

    const hourlyData = await fetchHourlyForecast(state.expandLocation);
    console.log("hourly", hourlyData);
    setHourlyForecast(hourlyData);
    dispatch({ type: "loading", loading: false });
  }
  function fetchAllData() {
    updateData();
    fetchForecast();
  }

  useEffect(() => {
    dispatch({ type: "loading", loading: true });
    dispatch({ type: "selection", expandLocation: id });
    checkNoData();
    fetchForecast();
  }, []);

  // useEffect(() => {}, [data]);
  useEffect(() => {
    if (state.timer >= state.refreshTime) {
      setTimeout(fetchAllData, 700);
    }
  }, [state.timer]);

  useEffect(() => {
    const timer = setTimeout(
      () =>
        dispatch({
          type: "timer",
        }),
      1000
    );
    return () => {
      clearInterval(timer);
    };
  }, [state]);
  function processAMPM(string) {
    // console.log(string);
    const num = string * 1;

    if (num > 11) {
      if (num === 12) {
        return num + " PM";
      }
      return num - 12 + " PM";
    } else {
      if (num === 0) {
        return num + 12 + " AM";
      }
      return num + " AM";
    }
  }

  function kelvinToF(num) {
    return Math.round(((num - 273.15) * 9) / 5 + 32);
  }
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
      {/* <ForcastGraph hourlyForecast={hourlyForecast}></ForcastGraph> */}

      {hourlyForecast && (
        <div className="hourlyforecast">
          <div>
            <div className="date">Today:</div>
          </div>
          {hourlyForecast.map((timedata) => (
            <div className="hourlyforecastmini">
              {
                <div className="date">
                  {groupByDate(timedata.dt_txt.substring(5, 13))}
                </div>
              }

              <div className="flexrow btw">
                <div>{processAMPM(timedata.dt_txt.substring(11, 13))} </div>
                <div>Feels Like: {kelvinToF(timedata.main.feels_like)}</div>
                <div>
                  <strong>Min:</strong> {kelvinToF(timedata.main.temp_min)}{" "}
                  <strong>Max:</strong> {kelvinToF(timedata.main.temp_max)}
                </div>
                <div> Wind: {timedata.wind.speed} m/s</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function groupByDate(string) {
  if (string.substring(string.length - 2) === "00") {
    return string.substring(0, string.length - 2);
  } else {
  }
}

export default Forecast;
