import Header from "./Header";
import ForcastGraph from "./ForecastGraph";
import WeatherBoxData from "./WeatherBoxData";

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

  const [toggleDate, setToggleDate] = useState(0);

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
    const hourlyData = await fetchHourlyForecast(state.expandLocation || id);
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
          <WeatherBoxData data={data}></WeatherBoxData>
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
        <div>
          {hourlyForecast.map((date, i) => (
            <div
              className="hourlyforecast"
              data-date={date[0].dt_txt.date}
              onClick={() => setToggleDate(i)}
            >
              <div className="date">
                {i === 0 ? "Today" : date[0].dt_txt.date}
              </div>
              {toggleDate === i &&
                date.map((timedata) => (
                  <>
                    
                    <div
                      className={`hourlyforecastmini ${timedata.dt_txt.date}`}
                    >
                      <div>
                        <div>{timedata.dt_txt.time}</div>
                        <div>Feel: {kelvinToF(timedata.main.feels_like)}°F</div>
                        <div>
                          <span className="min">
                            {kelvinToF(timedata.main.temp_min) + "°F"}
                          </span>
                          {" - "}
                          <span className="max">
                            {kelvinToF(timedata.main.temp_max) + "°F"}
                          </span>
                        </div>
                        {/* <div> Wind: {timedata.wind.speed} m/s</div> */}
                      </div>
                    </div>
                  </>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Forecast;
