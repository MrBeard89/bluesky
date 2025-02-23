import { useQuery } from '@tanstack/react-query'

export const fetchWeather = async (API_KEY, city, lang) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=${lang}&appid=${API_KEY}`
    const response = await fetch(url)
    const data = await response.json()

    // Group data by date
    const groupedWeatherData = {}
    const allWeatherData = []

    //Város név
    let cityNameData = data?.city.name

    data?.list.forEach((entry) => {
      const date = entry.dt_txt.split(' ')[0] // Extract date (YYYY-MM-DD)
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

      return { date, minTemp, maxTemp, avgTemp, weatherDesc, weatherIcon }
    })

    //Átalakitott data push
    allWeatherData.push({ cityNameData, groupedWeatherData, dailyForecast })

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
