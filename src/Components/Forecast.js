import Header from "./Header";
import ForcastGraph from "./ForecastGraph";
import WeatherBoxData from "./WeatherBoxData";

import { useEffect, useState } from "react";
import { MyDispatch, MyState } from "../ReducerTopComponent";

import {
  fetchWeatherCurrent,
  fetchHourlyForecast,
  findMin,
  findMax,
  groupBy,
  getDescriptionForecast,
  convertKtoF,
} from "../utility/weather";

import { useContext } from "react";

import { images, imageNum } from "../utility/Images";
import { useParams } from "react-router-dom";

import "./css/forecast.css";

function Forecast() {
  const dispatch = useContext(MyDispatch);
  const state = useContext(MyState);
  const [forecast, setForecast] = useState({});
  const [organizedForecast, setOrganizedForecast] = useState();
  // const [dailyGraphData, setDailyGraphData] = useState(0);

  const [toggleDate, setToggleDate] = useState(0);

  const { id } = useParams();
  const [data, setData] = useState();

  async function updateData() {
    const data = await fetchWeatherCurrent(id);
    dispatch({
      type: "add_location",
      activeLocation: data.name,
      locationsData: {
        ...state.locationsData,
        [data.name]: { ...data },
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
        activeLocation: data.name,
        locationsData: {
          ...state.locationsData,
          [data.name]: { ...data },
        },
      });
      setData(data);
    } else {
      setData(state.locationsData[state.expandLocation]);
    }
  }
  async function fetchForecast() {
    const hourlyData = await fetchHourlyForecast(state.expandLocation || id);
    const grouped = groupBy(hourlyData);
    setForecast(reduceHourlyData(grouped));
    setOrganizedForecast(grouped);

    dispatch({ type: "loading", loading: false });
  }
  function fetchAllData() {
    updateData();
    fetchForecast();
  }
  function reduceHourlyData(hourlyData) {
    const newArray = [];
    hourlyData.map((ele) => {
      const dayWeather = {
        temp_min: 500,
        temp_max: 0,
        day: ele[0].dt_txt.day,
      };
      ele.map((elem) => {
        dayWeather.temp_min = findMin(elem.main.temp_min, dayWeather.temp_min);
        dayWeather.temp_max = findMax(elem.main.temp_max, dayWeather.temp_max);
        dayWeather.description = getDescriptionForecast(elem);
      });
      newArray.push(dayWeather);
    });

    return newArray;
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
              <div className="day" key={day.day}>
                <div className="date">{day.day}</div>
                <img src={images[imageNum(day.description)]}></img>
                <div className="temperature">
                  {convertKtoF(day.temp_max)}°F
                </div>{" "}
                <span>|</span>
                <div className="temperature min">
                  {convertKtoF(day.temp_min)}°F
                </div>
              </div>
            );
          })}
      </div>
      {organizedForecast && <h2 className="graphTitle">Next 24 HRS Graph</h2>}
      <div className="graphContainer">
        <ForcastGraph
          organizedForecast={organizedForecast}
          dailyGraphData={toggleDate}
        ></ForcastGraph>
      </div>
      {organizedForecast && (
        <div>
          {organizedForecast.map((date, i) => (
            <div
              className="hourlyforecast"
              data-date={date[0].dt_txt.date}
              onClick={() => setToggleDate(i)}
              key={`${date[0].dt_txt.date}`}
            >
              <div className="date">
                {i === 0 ? "Today" : date[0].dt_txt.date}
              </div>
              {toggleDate === i &&
                date.map((timedata) => (
                  <>
                    <div
                      className={`hourlyforecastmini ${timedata.dt_txt.date}`}
                      key={`${timedata.dt_txt.date}${timedata.dt_txt.time}`}
                    >
                      <div>
                        <div>{timedata.dt_txt.time}</div>
                        <div>
                          Feel: {convertKtoF(timedata.main.feels_like)}°F
                        </div>
                        <div>
                          <span className="min">
                            {convertKtoF(timedata.main.temp_min) + "°F"}
                          </span>
                          {" - "}
                          <span className="max">
                            {convertKtoF(timedata.main.temp_max) + "°F"}
                          </span>
                        </div>
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
