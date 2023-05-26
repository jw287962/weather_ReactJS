import { reducer } from "./Reducer.js";
export function handlePermission(setSearchTerm) {
  navigator.permissions
    .query({ name: "geolocation" })
    .then((result) => {
      if (result.state === "granted") {
        report(result.state);
      }

      navigator.geolocation.getCurrentPosition(setSearchTerm);
      if (result.state === "denied") {
        report(result.state);
      }
      result.addEventListener("change", () => {
        report(result.state);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function report(state) {
  console.log(`Permission ${state}`);
}
