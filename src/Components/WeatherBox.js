import Forecast from "./Forecast";

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

function WeatherBox({ state, dispatch }) {
  function toggleView() {
    console.log("not done");
  }
  return state.locations.map((location, i) => {
    const data = state.locationsData[location];
    return (
      <div className="weatherdetails" key={`${location}${i}`}>
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
        {/* <div className="forecastbuttons">
          <button
            className="forecastday"
            id="Madison"
            onClick={toggleView}
            data-forecast="1"
          >
            1 Day
          </button>
          <button
            className="forecastweek"
            id="Madison"
            onClick={toggleView}
            data-forecast="7"
          >
            7 Days
          </button>
          <button
            className="forecastmonth"
            id="Madison"
            onClick={toggleView}
            data-forecast="30"
          >
            30 Days
          </button>
        </div> */}
        <div className="forecastbuttons"></div>
        <div className="sundetails">
          <div>{data.country}</div>
          <div className="sunset">Sunset: {data.sunset}</div>
          <div className="sunrise">Sunrise: {data.sunrise}</div>
        </div>
        <Forecast></Forecast>
      </div>
    );
  });
}

export default WeatherBox;
