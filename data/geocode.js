const request = require("request");

const geocode = (address, callback) => {
  
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw";

  request({ url, json: true }, (error, response) => {
    if (error) {
      return callback(
        "❌ Network error — unable to connect to geocoding service.",
        undefined
      );
    }

    if (response.body.message) {
      return callback("❌ Invalid API token for Mapbox.", undefined);
    }

    if (!response.body.features || response.body.features.length === 0) {
      return callback("❌ Location not found. Please enter a valid place name.", undefined);
    }

    const data = response.body.features[0];

    callback(undefined, {
      latitude: data.center[1],
      longitude: data.center[0],
      location: data.place_name,
    });
  });
};

module.exports = geocode;
