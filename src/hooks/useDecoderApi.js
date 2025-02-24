import { useQuery } from '@tanstack/react-query'

export const fetchDecoderApi = async (geoLocationValue, API_KEY) => {
  try {
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${geoLocationValue.latitude}&lon=${geoLocationValue.longitude}&limit=1&appid=${API_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

const useDecoderApi = (geoLocationValue, API_KEY) => {
  return useQuery({
    queryKey: ['decoded_location_name', geoLocationValue],
    queryFn: () => fetchDecoderApi(geoLocationValue, API_KEY),
    //staleTime: 1200,
  })
}

export default useDecoderApi
