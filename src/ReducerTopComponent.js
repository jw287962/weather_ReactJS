import App from "./App.js";

// import { useReducer, createContext } from "react";

// export const MyDispatch = createContext("dispatch");
// export const MyState = createContext("state");

function Reducer() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <App />,
  //   },
  //   {
  //     path: "location/:id",
  //     element: <Forecast></Forecast>,
  //   },
  // ]);

  return (
    <div>
      {/* <MyDispatch.Provider value={dispatch}> */}
      {/* <MyState.Provider value={state}> */}
      <App></App>
      {/* </MyState.Provider> */}
      {/*  </MyDispatch.Provider> */}
    </div>
  );
}

export default Reducer;
