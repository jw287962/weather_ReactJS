import "./css/forecastGraph.css";

function ForcastGraph({ hourlyForecast }) {
  const width = 500;
  const height = 500;
  const graphHeight = height - 50;
  const graphWidth = width - 50;
  let counter = 0;
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
        <line x1="90" x2="90" y1="5" y2="450"></line>
      </g>
      <g className="grid y-grid" id="yGrid">
        <line x1="90" x2="705" y1="450" y2="450"></line>
      </g>
      <g className="labels x-labels">
        {hourlyForecast &&
          hourlyForecast.map((ele) => (
            <>
              {ele.map((data) => {
                counter++;
                if (counter >= 7) return null;
                return (
                  <>
                    <text
                      x={50 + (counter / 7) * graphWidth}
                      y={graphWidth + 25}
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
        <text x={width / 2} y={height} class="label-title">
          Time (Hour)
        </text>
      </g>
      <g className="labels y-labels">
        {(counter = 0)}

        {hourlyForecast &&
          hourlyForecast.map((ele) => (
            <>
              {ele.map((data, counter) => {
                if (counter >= 7) return null;
                return (
                  <>
                    <text x="70" y={graphHeight - counter * (graphHeight / 7)}>
                      {counter * 10}
                    </text>
                  </>
                );
              })}
            </>
          ))}

        {/* <text x="80" y="15">
          80
        </text>
        <text x="80" y="131">
          60
        </text>
        <text x="80" y="248">
          40
        </text>
        <text x="80" y="373">
          20
        </text> */}
        <text x="50" y="200" className="label-title">
          Temp (F)
        </text>
      </g>
    </svg>
  );
}

export default ForcastGraph;
