import "./css/forecastGraph.css";
import { useState, useEffect, useRef } from "react";

import { convertKtoF, findMin } from "../utility/weather";
function ForcastGraph({ organizedForecast, dailyGraphData }) {
  const width = document.querySelector(".graph")?.clientWidth || 500;
  const height = document.querySelector(".graph")?.clientHeight || 300;

  const graphHeight = height - 50;
  const graphWidth = width - 70;
  let counter = 0;

  let minTemp = 150;
  let maxTemp = 0;
  const distFromLeftEdge = useRef();
  const resized = useRef(true);
  const [horizontalValue, setHorizontalValue] = useState(0);
  const [currentDay, setCurrentDay] = useState([]);

  window.addEventListener("resize", () => {
    resized.current = true;
  });
  function handleHover(e) {
    if (resized.current) {
      const svg = document.querySelector(".graph");
      distFromLeftEdge.current = svg.getBoundingClientRect().x;
      resized.current = false;
    }

    let currentXOnSVG = e.clientX - distFromLeftEdge.current - 35;
    currentXOnSVG = Math.max(70, currentXOnSVG);
    currentXOnSVG = Math.min(graphWidth - 10, currentXOnSVG);

    setHorizontalValue(currentXOnSVG);
  }

  function handleLeave(e) {
    setHorizontalValue(0);
  }
  useEffect(() => {
    // setCurrentDay([data]);
    const dataPoints = [];
    let count = 0;
    if (Array.isArray(organizedForecast)) {
      organizedForecast.map((ele, j) => {
        if (dailyGraphData > j) {
          return null;
        }
        ele.map((data) => {
          if (count > 8) return null;
          count++;
          dataPoints.push(data);
        });
      });
    }
    setCurrentDay(dataPoints);
  }, [organizedForecast, dailyGraphData]);

  useEffect(() => {}, [currentDay]);

  // useEffect(() => {}, [height]);
  return (
    // 500 x 800 size
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      className="graph"
      aria-labelledby="title"
      // role="img"
      height={height}
      width={width}
      onMouseMove={handleHover}
      onMouseLeave={handleLeave}
      // transform=""
    >
      {/* <title id="title">Weather Next 24 Hrs </title> */}
      {organizedForecast && (
        <>
          <g className="grid x-grid" id="xGrid">
            <line x1="70" x2="70" y1="5" y2={graphHeight}></line>
          </g>
          <g className="grid y-grid" id="yGrid">
            <line x1="70" x2={width} y1={graphHeight} y2={graphHeight}></line>
          </g>
        </>
      )}
      <g className="labels x-labels">
        {currentDay &&
          currentDay.length > 0 &&
          currentDay.map((data, i) => {
            minTemp = findMin(convertKtoF(data.main.temp) - 10, minTemp);

            return (
              <>
                <text
                  x={25 + ((i + 1) / 9) * graphWidth}
                  y={graphHeight + 25}
                  key={`x-axis,${i + 1}`}
                >
                  {data.dt_txt.time.substring(0, data.dt_txt.time.indexOf(":"))}

                  {data.dt_txt.time.substring(
                    data.dt_txt.time.indexOf("M") - 2
                  )}
                </text>
                <line
                  x1={((i + 1) / 9) * graphWidth}
                  x2={width}
                  y1={graphHeight + 25}
                  y2={graphHeight + 25}
                ></line>
              </>
            );
          })}

        {/* <text x="100" y="400">
          2008
        </text>
     */}
        <text x={width / 2} y={height} className="label-title"></text>
      </g>
      <g className="labels y-labels">
        {currentDay &&
          currentDay.length > 0 &&
          currentDay.map((data, i) => {
            const counter = i + 1;
            maxTemp = minTemp + 60;

            return (
              <>
                <text
                  x="50"
                  y={
                    graphHeight -
                    (graphHeight * (counter * ((maxTemp - minTemp) / 6))) /
                      (maxTemp - minTemp)
                  }
                  key={`y-axis,${counter}`}
                >
                  {minTemp + counter * 10} °F
                </text>

                <line
                  className="dottedgrid"
                  x1="70"
                  x2={width}
                  y1={
                    graphHeight -
                    (graphHeight * (counter * ((maxTemp - minTemp) / 6))) /
                      (maxTemp - minTemp)
                  }
                  y2={
                    graphHeight -
                    (graphHeight * (counter * ((maxTemp - minTemp) / 6))) /
                      (maxTemp - minTemp)
                  }
                ></line>
              </>
            );
          })}

        <text x="50" y={height / 2} className="label-title"></text>
      </g>

      <g className="data">
        {currentDay &&
          currentDay.length > 0 &&
          currentDay.map((data, i) => {
            const counter = i + 1;
            maxTemp = minTemp + 60;

            return (
              <>
                <circle
                  cx={33 + (counter / 9) * graphWidth}
                  cy={
                    ((maxTemp - convertKtoF(data.main.temp)) /
                      (maxTemp - minTemp)) *
                    graphHeight
                  }
                  data-value={convertKtoF(data.main.temp)}
                  r="4"
                  key={`dataPoints,${counter}`}
                >
                  {convertKtoF(data.main.temp)}
                </circle>
                <text
                  x={33 + (counter / 9) * graphWidth}
                  y={
                    ((maxTemp - convertKtoF(data.main.temp)) /
                      (maxTemp - minTemp)) *
                      graphHeight -
                    5
                  }
                >
                  {convertKtoF(data.main.temp)}
                </text>
              </>
            );
          })}
      </g>

      {horizontalValue && (
        <g>
          <rect
            x={horizontalValue}
            y="20"
            width="80"
            height="20"
            className="rectangleData"
          ></rect>
          <text x={horizontalValue} y="35">
            Hello
          </text>
          <line
            className="dottedgrid"
            x1={horizontalValue + 35}
            y1="0"
            x2={horizontalValue + 35}
            y2={graphHeight}
          ></line>
        </g>
      )}
    </svg>
  );
}

export default ForcastGraph;
