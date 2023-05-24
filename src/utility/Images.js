function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(
  require.context("../asset/images", false, /\.(png|jpe?g|svg)$/)
);

function imageNum(description) {
  if (description.includes("Cloud")) {
    return 0;
  } else if (description.includes("Rain")) return 1;
  else if (description.includes("Sun") || description.includes("Clear")) {
    return 2;
    // 2
  } else {
    return 3;
  }
}

export { imageNum, images };
