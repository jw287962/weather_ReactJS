import "./css/forecastGraph.css";

import { convertKtoF } from "../utility/weather";
function ForcastGraph({ hourlyForecast }) {
  const width = 500;
  const height = 300;
  const graphHeight = height - 50;
  const graphWidth = width - 50;
  let counter = 0;

  let minTemp = 150;
  function findMin(num, num2) {
    return num < num2 ? num : num2;
  }
  return (
    // 500 x 800 size
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      className="graph"
      aria-labelledby="title"
      role="img"
      height={height}
      width={width}
      // transform=""
    >
      <title id="title">Weather</title>
      <g className="grid x-grid" id="xGrid">
        <line x1="90" x2="90" y1="5" y2={graphHeight}></line>
      </g>
      <g className="grid y-grid" id="yGrid">
        <line x1="90" x2={width} y1={graphHeight} y2={graphHeight}></line>
      </g>
      <g className="labels x-labels">
        {hourlyForecast &&
          hourlyForecast.map((ele) => (
            <>
              {ele.map((data) => {
                counter++;
                if (counter >= 7) return null;
                minTemp = findMin(convertKtoF(data.main.temp), minTemp);
                return (
                  <>
                    <text
                      x={50 + (counter / 7) * graphWidth}
                      y={graphHeight + 25}
                    >
                      {data.dt_txt.time.substring(
                        0,
                        data.dt_txt.time.indexOf(":")
                      ) +
                        data.dt_txt.time.substring(
                          data.dt_txt.time.indexOf("M") - 2
                        )}
                    </text>
                  </>
                );
              })}
            </>
          ))}
        {/* <text x="100" y="400">
          2008
        </text>
     */}
        <text x={width / 2} y={height} class="label-title"></text>
      </g>
      <g className="labels y-labels">
        {(counter = 0)} {(minTemp -= 10)}
        {hourlyForecast &&
          hourlyForecast.map((ele) => (
            <>
              {ele.map((data) => {
                if (counter >= 7) return null;
                counter++;

                return (
                  <>
                    <text x="70" y={graphHeight - counter * (graphHeight / 7)}>
                      {minTemp + counter * 10} °F
                    </text>
                  </>
                );
              })}
            </>
          ))}
        <text x="50" y={height / 2} className="label-title"></text>
      </g>
    </svg>
  );
}

export default ForcastGraph;
