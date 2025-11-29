const request = require("request")

const forecast = (latitude, longitude, callback) => {
  const apiKey = "7f97e74ef23b418c97a155211230503" // your real key

  const url =
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`

  request({ url, json: true }, (error, response) => {
    if (error) {
      return callback("❌ Network error — unable to connect to weather service.", undefined)
    }

    if (response.body.error) {
      return callback("❌ Invalid WeatherAPI token OR wrong coordinates.", undefined)
    }

    callback(undefined, {
      temperature: response.body.current.temp_c,
      condition: response.body.current.condition.text,
      location: response.body.location.name
    })
  })
}

module.exports = forecast
