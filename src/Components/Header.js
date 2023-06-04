import { Link } from "react-router-dom";

import { useContext, useState, useEffect } from "react";

import { MyDispatch, MyState } from "../ReducerTopComponent";

import SearchList from "./SearchList";

import { fetchWeatherCurrent } from "../utility/weather";
function Header() {
  const dispatch = useContext(MyDispatch);
  const state = useContext(MyState);
  function handleHomeClick(e) {
    dispatch({
      type: "home",
    });
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [searchList, setSearchList] = useState([]);
  // const [error, setError] = useState("");
  useEffect(() => {
    if (searchTerm === "") {
      setSearchList([]);
      return;
    }
    dispatch({ type: "loading", loading: true });

    async function findLocationList() {
      const promiseSearchList = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=` +
          `${searchTerm}&limit=${5}&appid=${`19d6b05066109b1f4f25ae216d98acf3`}`,
        { mode: "cors" }
      );
      const result = await promiseSearchList.json();
      console.log([...result]);
      setSearchList([...result]);
    }

    const timeout = setTimeout(findLocationList, 1000);
    // findLocationList();
    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (searchList.length === 0 && searchTerm != "") {
      dispatch({ type: "error", error: "Try Again: No Location Found" });
      console.log("error searching");
    }
    dispatch({ type: "loading", loading: false });
  }, [searchList]);

  return (
    <div className="header">
      <div>
        <Link to={`/`} onClick={handleHomeClick}>
          WEATHER FORECAST
        </Link>
        <a href="https://github.com/jw287962/weather_ReactJS/tree/master">
          <svg
            height="32"
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            data-view-component="true"
            className="octicon octicon-mark-github v-align-middle"
          >
            <path
              fillRule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
        </a>
      </div>
      {!state.expandLocation && (
        <div className="secondaryHeaderTools">
          <form
            className="locationform"
            onSubmit={(e) => e.preventDefault()}
            autocomplete="off"
          >
            <div className="flexcol f-align-center ">
              <label htmlFor="location">LOCATION: </label>
              <div className="searchArea flexcol">
                <input
                  type="search"
                  id="location"
                  name="location"
                  placeholder="Search by City Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchList.map((ele, i) => (
                  <SearchList
                    location={ele}
                    setSearchTerm={setSearchTerm}
                    key={i}
                  ></SearchList>
                ))}
              </div>
            </div>

            <div className="loading">
              {state.error ? `${state.error}` : ""}
              {state.loading ? "loading...(please wait)" : ""}{" "}
            </div>
          </form>
        </div>
      )}

      <div className="miscData">
        {state.expandLocation && (
          <span className="miniloading">
            {state.error ? `${state.error}` : ""}
            {state.loading ? "loading...(please wait)" : ""}{" "}
          </span>
        )}
        <span className="timer">Last Refresh: {state.timer}</span>
      </div>
    </div>
  );
}

export default Header;
