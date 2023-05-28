import "./css/forecastGraph.css";

function ForcastGraph({ hourlyForecast }) {
  return (
    // 500 x 800 size
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      className="graph"
      aria-labelledby="title"
      role="img"
    >
      <title id="title">Weather</title>
      <g className="grid x-grid" id="xGrid">
        <line x1="90" x2="90" y1="5" y2="371"></line>
      </g>
      <g className="grid y-grid" id="yGrid">
        <line x1="90" x2="705" y1="370" y2="370"></line>
      </g>
      <g className="labels x-labels">
        {/* <text x="100" y="400">
          2008
        </text>
        <text x="246" y="400">
          2009
        </text>
        <text x="392" y="400">
          2010
        </text>
        <text x="538" y="400">
          2011
        </text>
        <text x="684" y="400">
          2012
        </text> */}
        <text x="400" y="440" class="label-title">
          Time
        </text>
      </g>
      <g className="labels y-labels">
        <text x="80" y="15">
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
        </text>
        <text x="50" y="200" className="label-title">
          Temp (F)
        </text>
      </g>
    </svg>
  );
}

export default ForcastGraph;
