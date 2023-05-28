import { convertKtoF } from "../utility/weather";
import { imageNum, images } from "../utility/Images";

function WeatherBoxData({ data }) {
  return (
    <>
      <div className="location">
        {data.name}, {data.location[0].state}
      </div>
      <div className="temp">
        <img src={images[imageNum(data.description)]}></img>
        <span className="tempdegree">
          {convertKtoF(data.main.temp)}°F&nbsp;<br></br>{" "}
        </span>
        <div className="dailyrange">
          <span className="tempdegree">
            {convertKtoF(data.main.temp_min)}°F -
          </span>
          <span className="tempdegree">
            {convertKtoF(data.main.temp_max)}°F
          </span>
        </div>
      </div>

      <div className="description">{data.description}</div>
      <div className="humidity">Humidity: {data.main.humidity}%</div>

      <div className="forecastbuttons"></div>
      <div className="sundetails">
        <div>{data.sys.country}</div>
        <div>Wind: {data.wind.speed} m/s</div>
        <div className="sunset">Sunset: {data.sys.sunset}</div>
        <div className="sunrise">Sunrise: {data.sys.sunrise}</div>
      </div>
    </>
  );
}

export default WeatherBoxData;
