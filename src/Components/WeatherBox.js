function WeatherBox({ state, dispatch }) {
  console.log(state);

  function toggleView() {}
  return state.locations.map((location, i) => {
    const data = state.locationsData[location].data;
    return (
      <div className="weatherdetails" key={`${location}${i}`}>
        <div className="location">{data.city}</div>
        <div className="temp">
          <span className="tempdegree">{data.temp}</span>
          <span className="tempsymbol">°F</span>
        </div>

        <div className="description">{data.description}</div>
        <div className="humidity">{data.humidity}</div>
        <div class="forecastbuttons">
          <button
            class="forecastday"
            id="Madison"
            onClick={toggleView}
            data-forecast="1"
          >
            1 Day
          </button>
          <button
            class="forecastweek"
            id="Madison"
            onClick={toggleView}
            data-forecast="7"
          >
            7 Days
          </button>
          <button
            class="forecastmonth"
            id="Madison"
            onClick={toggleView}
            data-forecast="30"
          >
            30 Days
          </button>
        </div>
        <div className="forecastbuttons"></div>
        <div className="sundetails">
          <div>{data.country}</div>
          <div className="sunset">Sunset: {data.sunset}</div>
          <div className="sunrise">Sunrise: {data.sunrise}</div>
        </div>
      </div>
    );
  });
}

export default WeatherBox;
