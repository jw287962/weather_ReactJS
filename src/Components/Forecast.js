import Header from "./Header";
import WeatherBox from "./WeatherBox";

// import { MyDispatch, MyState } from "../ReducerTopComponent";
// import { useContext } from "react";
function Forecast({ state, dispatch }) {
  // const dispatch = useContext(MyDispatch);
  // const state = useContext(MyState);
  console.log(state);
  return (
    <div>
      <Header></Header>
      <WeatherBox></WeatherBox>
    </div>
  );
}
export default Forecast;
