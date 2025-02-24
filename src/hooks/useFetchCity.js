import { useQuery } from '@tanstack/react-query'

export const fetchCity = async (API_KEY, selectedCity, lang, unit) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=${unit}&lang=${lang}&appid=${API_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

const useFetchCity = (API_KEY, selectedCity, lang, unit) => {
  return useQuery({
    queryKey: ['cities', selectedCity],
    queryFn: () => fetchCity(API_KEY, selectedCity, lang, unit),
    //staleTime: 1200,
  })
}

export default useFetchCity
