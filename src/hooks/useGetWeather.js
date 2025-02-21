import { useQuery } from '@tanstack/react-query'

export const fetchWeather = async (API_KEY, city, lang) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=${lang}&appid=${API_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    return data
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
