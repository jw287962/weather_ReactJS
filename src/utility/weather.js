import { format, fromUnixTime } from "date-fns";

import { reducer } from "./Reducer.js";

// import date from ".../node_modules/date-fns";
let processedData = {};
// const content = document.querySelector(".loading");
let processedForecast = {};

function groupBy(array) {
  const newArray = [[]];
  let previousString = "";
  let i = 0;
  array.forEach((ele) => {
    const array = updateTimeZone(ele.dt);
    ele.dt_txt = {
      date: array[0].substring(3) + "," + array[1],
      time: array[2].substring(1),
      day: array[0].substring(0, 3),
    };
    const comparison = ele.dt_txt.date;

    if (previousString === "") {
      newArray[i].push(ele);
    } else if (comparison === previousString) {
      newArray[i].push(ele);
    } else if (comparison !== previousString) {
      i++;
      newArray.push([ele]);
    }

    previousString = comparison;
  });
  return newArray;
}
function updateTimeZone(origTime) {
  const newTime = origTime;
  const formatted = formatMSTime(newTime, "eeePPp");
  return formatted.split(",");
}
async function fetchHourlyForecast(location = "", convertToCoordObject) {
  if (location === "") {
    return;
  }

  try {
    let fetchString = "";
    if (convertToCoordObject) {
      // this converts from stored string IE: "34.7367,-86.7519"
      const splitter = location.split(",");
      location = { coords: { longitude: splitter[1], latitude: splitter[0] } };
      fetchString = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=19d6b05066109b1f4f25ae216d98acf3`;
    } else {
      fetchString = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=19d6b05066109b1f4f25ae216d98acf3`;
    }

    const promise = await fetch(fetchString, { mode: "cors" });
    const newData = await promise.json();
    // timezoneOffset = newData.city.timezone;
    const holder = newData.list;
    // const result = groupBy(holder);
    return holder;
  } catch (err) {
    console.log("error", err);
    throw new Error("ERROR:" + err);
  }
}

function getDescriptionForecast(element) {
  const description = element.weather[0].description;

  let holder = capitalizeFirstLetter(description);
  return holder;
}

function getProcessedForecast() {
  return processedForecast;
}

async function fetchWeatherCurrent(
  location = "Madison",
  convertToCoordObject = false
) {
  if (convertToCoordObject) {
    // this converts from stored string IE: "34.7367,-86.7519"
    const splitter = location.split(",");
    location = { coords: { longitude: splitter[1], latitude: splitter[0] } };
  }

  try {
    // content.textContent = "loading ... (please wait)";
    if (location && location.coords) {
      const promise = await fetch(
        "https://api.openweathermap.org" +
          `/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}` +
          "&appid=19d6b05066109b1f4f25ae216d98acf3",
        { mode: "cors" }
      );

      const newData = await promise.json();

      // newData.city = newData.name;
      // newData.humidity = getHumidity(newData);
      newData.sys.sunset = getSunset(newData);
      newData.sys.sunrise = getSunrise(newData);
      // newData.temp = tempToFarenheit(newData);
      // newData.country = getCountry(newData);
      newData.description = getDescription(newData);
      newData.location = await checkLocation(newData);

      // content.textContent = "";
      return newData;

      // promiseEvalUpdateHTML(newData.name);
    } else {
      location = location.trim();
      console.log(location, "location");

      const promise = await fetch(
        "https://api.openweathermap.org" +
          `/data/2.5/weather?q=${location}&` +
          "APPID=19d6b05066109b1f4f25ae216d98acf3",
        { mode: "cors" }
      );

      const newData = await promise.json();
      // processedData.city = newData.name;
      newData.location = await checkLocation(newData);
      // processedData.humidity = getHumidity(newData);
      newData.sys.sunset = getSunset(newData);
      newData.sys.sunrise = getSunrise(newData);
      // processedData.temp = tempToFarenheit(newData);
      // processedData.country = getCountry(newData);
      newData.description = getDescription(newData);
      return newData;
    }
  } catch (err) {
    throw new Error("ERROR:" + err);
  }
}
function getDescription(data) {
  let description = data.weather[0].description;
  description = capitalizeFirstLetter(description);
  return description;
}
function capitalizeFirstLetter(input) {
  let description = input;
  let array = description.split(" ");
  description = "";
  array.forEach((element) => {
    description += element.charAt(0).toUpperCase() + element.slice(1) + " ";
  });
  return description;
}

// function getCountry(data) {
//   return data.sys.country;
// }
// function tempToFarenheit(data) {
//   const currentTemp = data.main.temp;
//   const newTemp = (1.8 * (currentTemp - 273) + 32).toFixed(0);
//   return newTemp;
// }
async function checkLocation(data) {
  const lat = data.coord.lat;
  const lon = data.coord.lon;
  const promise = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?` +
      `lat=${lat}&lon=${lon}&limit=5&appid=19d6b05066109b1f4f25ae216d98acf3`,
    { mode: "cors" }
  );
  const locationData = await promise.json();
  // returns location data with coords and state name
  return locationData;
}

// function getHumidity(data) {
//   const currentHumidity = data.main.humidity;
//   return currentHumidity + "%";
// }

function getSunset(data) {
  const timeOfSunset = fromUnixTime(data.sys.sunset);
  const formattedTime = formatTime(timeOfSunset);
  return formattedTime;
}

function getSunrise(data) {
  const timeOfSunrise = fromUnixTime(data.sys.sunrise);
  const formattedTime = formatTime(timeOfSunrise);
  return formattedTime;
}

function formatTime(data, p = "p") {
  return format(new Date(data), p);
}
function formatMSTime(data, formatter = "p") {
  return format(fromUnixTime(data), formatter);
}
// function getProcessedData() {
//   return processedData;
// }

function convertKtoF(num) {
  // return Math.round(((num - 273.15) * 9) / 5 + 32);
  return (((num - 273.15) * 9) / 5 + 32).toFixed(0);
}

function findMin(num, num2) {
  return num < num2 ? num : num2;
}
function findMax(num, num2) {
  return num > num2 ? num : num2;
}
export {
  getDescriptionForecast,
  fetchWeatherCurrent,
  getProcessedForecast,
  fetchHourlyForecast,
  convertKtoF,
  findMin,
  findMax,
  groupBy,
};
