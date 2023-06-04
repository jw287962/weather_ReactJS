import "./css/forecastGraph.css";
import { useState, useEffect } from "react";

import { convertKtoF, findMin } from "../utility/weather";
function ForcastGraph({ organizedForecast, dailyGraphData }) {
  const width = 450;
  const height = 300;
  const graphHeight = height - 50;
  const graphWidth = width - 70;
  let counter = 0;

  let minTemp = 150;
  let maxTemp = 0;

  function handleMouseOver(e) {
    console.log(e);
  }

  useEffect(() => {
    const array = [];
    // hourlyForecast.forEach((elem) => {
    //   for(let i = 0; i <elem.length;i++){
    //   array.push(elem)
    //   }

    // })
  }, [organizedForecast]);
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
      <title id="title">Weather Next 24 Hrs </title>
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
        {organizedForecast &&
          organizedForecast.map((ele, j) => {
            if (dailyGraphData > j) {
              return null;
            }
            return (
              <>
                {ele.map((data) => {
                  counter++;
                  if (counter > 9) return null;
                  minTemp = findMin(convertKtoF(data.main.temp) - 10, minTemp);
                  return (
                    <>
                      <text
                        x={25 + (counter / 9) * graphWidth}
                        y={graphHeight + 25}
                        key={`x-axis,${counter}`}
                      >
                        {data.dt_txt.time.substring(
                          0,
                          data.dt_txt.time.indexOf(":")
                        ) +
                          data.dt_txt.time.substring(
                            data.dt_txt.time.indexOf("M") - 2
                          )}
                      </text>
                      <line
                        x1={(counter / 9) * graphWidth}
                        x2={width}
                        y1={graphHeight + 25}
                        y2={graphHeight + 25}
                      ></line>
                    </>
                  );
                })}
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
        {(counter = 0)}
        {organizedForecast &&
          organizedForecast.map((ele, j) => {
            if (dailyGraphData > j) {
              return null;
            }
            return (
              <>
                {ele.map(() => {
                  if (counter >= 7) return null;
                  counter++;
                  maxTemp = minTemp + 60;
                  return (
                    <>
                      <text
                        x="50"
                        y={
                          graphHeight -
                          (graphHeight *
                            (counter * ((maxTemp - minTemp) / 6))) /
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
                          (graphHeight *
                            (counter * ((maxTemp - minTemp) / 6))) /
                            (maxTemp - minTemp)
                        }
                        y2={
                          graphHeight -
                          (graphHeight *
                            (counter * ((maxTemp - minTemp) / 6))) /
                            (maxTemp - minTemp)
                        }
                      ></line>
                    </>
                  );
                })}
              </>
            );
          })}
        <text x="50" y={height / 2} className="label-title"></text>
      </g>

      <g className="data">
        {(counter = 0)}
        {organizedForecast &&
          organizedForecast.map((ele, j) => {
            if (dailyGraphData > j) {
              return null;
            }
            return (
              <>
                {ele.map((data) => {
                  if (counter > 9) return null;
                  counter++;

                  return (
                    < >
                      <circle
                        cx={33 + (counter / 9) * graphWidth}
                        cy={
                          ((maxTemp - convertKtoF(data.main.temp)) /
                            (maxTemp - minTemp)) *
                          graphHeight
                        }
                        data-value={convertKtoF(data.main.temp)}
                        r="4"
                        onMouseOver={handleMouseOver}
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
              </>
            );
          })}
      </g>
    </svg>
  );
}

export default ForcastGraph;
