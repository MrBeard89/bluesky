import { useQuery } from '@tanstack/react-query'

export const fetchWeather = async (API_KEY, city, lang) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=${lang}&appid=${API_KEY}`
    const response = await fetch(url)
    const data = await response.json()

    //Variables
    const groupedWeatherData = {}
    const allWeatherData = []
    const groupedTemps = []

    //Város név
    let cityNameData = data?.city.name
    // Group data by date
    data?.list.forEach((entry) => {
      const date = entry.dt_txt // Extract date (YYYY-MM-DD)
      if (!groupedWeatherData[date]) groupedWeatherData[date] = []
      groupedWeatherData[date].push(entry)
    })

    // Napi előrejelzés
    const dailyForecast = Object.keys(groupedWeatherData).map((date) => {
      const forecasts = groupedWeatherData[date]
      const minTemp = Math.min(...forecasts.map((f) => f.main.temp_min))
      const maxTemp = Math.max(...forecasts.map((f) => f.main.temp_max))
      const avgTemp = forecasts.reduce((sum, f) => sum + f.main.temp, 0) / forecasts.length
      const weatherDesc = forecasts[0].weather[0].description
      const weatherIcon = forecasts[0].weather[0].icon
      const windSpeed = forecasts[0].wind.speed
      const feelsLike = forecasts[0].main.feels_like
      const humidity = forecasts[0].main.humidity
      const seaLevel = forecasts[0].main.sea_level

      return {
        date,
        minTemp,
        maxTemp,
        avgTemp,
        weatherDesc,
        weatherIcon,
        windSpeed,
        feelsLike,
        humidity,
        seaLevel,
      }
    })
    //Előrejelzés adat kinyerése
    const getMinMaxTemperatures = () => {
      dailyForecast?.forEach((entry) => {
        const date = entry.date.split(' ')[0] // Extract the date (YYYY-MM-DD)
        const temp = entry.avgTemp // Extract temperature
        const weatherIcon = entry.weatherIcon // Extract icon
        const weatherDesc = entry.weatherDesc // Extract desc

        if (!groupedTemps[date]) {
          const dateObj = new Date(date) // Convert string to Date object
          const dayOfWeek =
            lang == 'hu'
              ? dateObj.toLocaleDateString('hu-HU', { weekday: 'long' })
              : dateObj.toLocaleDateString('en-US', { weekday: 'long' }) // Get full weekday name

          groupedTemps[date] = {
            min: temp,
            max: temp,
            icon: weatherIcon,
            forecastDate: dayOfWeek,
            desc: weatherDesc,
          }
        } else {
          groupedTemps[date].min = Math.min(groupedTemps[date].min, temp)
          groupedTemps[date].max = Math.max(groupedTemps[date].max, temp)
        }
      })

      return groupedTemps
    }
    getMinMaxTemperatures()

    //Átalakitott data push
    allWeatherData.push({ cityNameData, dailyForecast, groupedTemps })

    return allWeatherData
  } catch (error) {
    console.log(error)
  }
}

const useGetWeather = (API_KEY, city, lang) => {
  return useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeather(API_KEY, city, lang),
    staleTime: 1200,
  })
}

export default useGetWeather
