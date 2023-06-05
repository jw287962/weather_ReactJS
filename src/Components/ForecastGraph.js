import "./css/forecastGraph.css";
import { useState, useEffect, useRef } from "react";

import { convertKtoF, findMin } from "../utility/weather";
function ForcastGraph({ organizedForecast, dailyGraphData }) {
  const [width, setWidth] = useState(400);
  // document.querySelector(".graph")?.clientWidth || 500;
  const height = document.querySelector(".graph")?.clientHeight || 300;

  const graphHeight = height - 50;
  const yLabelHorizWidth = 50;

  const [currentPoint, setCurrentPoint] = useState(0);
  const graphMiniboxWidth = 120;

  let minTemp = 150;
  let maxTemp = 0;
  const distFromLeftEdge = useRef();
  const [resized, setResized] = useState(true);
  const [horizontalValue, setHorizontalValue] = useState(0);
  const [currentDay, setCurrentDay] = useState([]);

  const [graphWidth, setGraphWidth] = useState(width - yLabelHorizWidth);

  const eachDataPointDistance = width / 9;

  useEffect(() => {
    setWidth(document.querySelector(".graph").clientWidth);
  });
  useEffect(() => {
    setGraphWidth(width - yLabelHorizWidth);
  }, [width]);

  useEffect(() => {
    function setResizedTrue() {
      setResized(true);
    }
    window.addEventListener("resize", setResizedTrue);

    return () => {
      window.removeEventListener("resize", setResizedTrue);
    };
  }, []);
  function handleHover(e) {
    if (resized) {
      const svg = document.querySelector(".graph");
      distFromLeftEdge.current = svg.getBoundingClientRect().x;
      setResized(false);
    }

    let currentXOnSVG =
      e.clientX - distFromLeftEdge.current - graphMiniboxWidth / 2;

    setCurrentPoint(
      Math.max(
        Math.round(
          (currentXOnSVG + graphMiniboxWidth / 2) / eachDataPointDistance
        ) - 1,
        0
      )
    );

    setHorizontalValue(currentXOnSVG);
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

  function calcYLabelPosition(counter) {
    return (
      graphHeight -
      (graphHeight * (counter * ((maxTemp - minTemp) / 6))) /
        (maxTemp - minTemp)
    );
  }

  function calcXLabelPosition(counter) {
    return (counter / 9) * width + yLabelHorizWidth - counter * 1.5;
  }
  function limitHorizontalValue(currentXOnSVG) {
    currentXOnSVG = Math.max(yLabelHorizWidth, currentXOnSVG);
    currentXOnSVG = Math.min(width - graphMiniboxWidth, currentXOnSVG);
    return currentXOnSVG;
  }

  function handleLeave(e) {
    setHorizontalValue(0);
    setCurrentPoint(0);
  }
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
      onTouchMove={handleHover}
      // transform=""
    >
      {/* <title id="title">Weather Next 24 Hrs </title> */}
      {organizedForecast && (
        <>
          <g className="grid x-grid" id="xGrid">
            <line x1="50" x2={width} y1={graphHeight} y2={graphHeight}></line>
          </g>
          <g className="grid y-grid" id="yGrid">
            <line x1="50" x2="50" y1="5" y2={graphHeight}></line>
          </g>
        </>
      )}
      <g className="labels x-labels">
        {currentDay &&
          currentDay.length > 0 &&
          currentDay.map((data, counter) => {
            minTemp = findMin(convertKtoF(data.main.temp) - 10, minTemp);

            return (
              <>
                <text
                  x={calcXLabelPosition(counter) - 9}
                  y={graphHeight + 25}
                  key={`x-axis,${counter + 1}`}
                >
                  {data.dt_txt.time.substring(0, data.dt_txt.time.indexOf(":"))}

                  {data.dt_txt.time.substring(
                    data.dt_txt.time.indexOf("M") - 2
                  )}
                </text>
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
                  x="40"
                  y={calcYLabelPosition(counter)}
                  key={`y-axis,${counter}`}
                >
                  {minTemp + counter * 10} °F
                </text>

                <line
                  className="dottedgrid"
                  x1="50"
                  x2={width}
                  y1={calcYLabelPosition(counter)}
                  y2={calcYLabelPosition(counter)}
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
            const counter = i;
            maxTemp = minTemp + 60;

            return (
              <>
                <circle
                  cx={calcXLabelPosition(counter)}
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
                  x={calcXLabelPosition(counter) - 10}
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
            x={limitHorizontalValue(horizontalValue)}
            y="20"
            width="120"
            height="40"
            className="rectangleData"
          ></rect>

          <text x={limitHorizontalValue(horizontalValue) + 2} y="35">
            {currentDay[`${Math.min(currentPoint, 8)}`]?.weather[0].description}
          </text>
          <text x={limitHorizontalValue(horizontalValue) + 2} y="55">
            {currentDay[`${Math.min(currentPoint, 8)}`]?.dt_txt.time}
          </text>
          <line
            className="dottedgrid"
            x1={Math.max(
              horizontalValue + graphMiniboxWidth / 2,
              yLabelHorizWidth
            )}
            y1="0"
            x2={Math.max(
              horizontalValue + graphMiniboxWidth / 2,
              yLabelHorizWidth
            )}
            y2={graphHeight}
          ></line>
        </g>
      )}
    </svg>
  );
}

export default ForcastGraph;
