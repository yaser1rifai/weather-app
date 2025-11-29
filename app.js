const readline = require("readline-sync")
const geocode = require("./data/geocode")
const forecast = require("./data/forecast")

// Ask user for country
const country = readline.question("🌍 Enter a country name: ")

if (!country) {
  console.log("❌ You must enter a country name.")
  process.exit()
}

// Step 1 → Get coordinates from Mapbox
geocode(country, (error, data) => {
  if (error) {
    return console.log(error)
  }

  console.log("\n📍 Location Found:")
  console.log("Country:", data.location)
  console.log("Latitude:", data.latitude)
  console.log("Longitude:", data.longitude)

  // Step 2 → Fetch weather using coordinates
  forecast(data.latitude, data.longitude, (error, weatherData) => {
    if (error) {
      return console.log(error)
    }

    console.log("\n🌤 Weather Information:")
    console.log("Temperature:", weatherData.temperature, "°C")
    console.log("Condition:", weatherData.condition)
    console.log("\n✅ Data fetched successfully!\n")
  })
})
