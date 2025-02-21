import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
//Hooks imports
import useGetWeather from '../../hooks/useGetWeather'
import useDecoderApi from '../../hooks/useDecoderApi'
//Icons imports
import { DayIcons } from '../../components/Icons/Icons'
import { NightIcons } from '../../components/Icons/Icons'
//Scss
import '../../styles/pages/Home/Home.scss'

export const Home = () => {
  const { geoLocationValue, isGeoAllowed, handleCity, API_KEY, city, lang, unit } =
    useContext(AppContext)

  //Decoder api fetch
  const {
    data: decoderData,
    error: decoderErrorData,
    isLoading: decoderLoading,
    isSuccess: decoderSuccess,
    isError: decoderError,
  } = useDecoderApi(geoLocationValue, API_KEY)

  decoderSuccess ? handleCity(decoderData[0]?.name) : ''

  //Előjelzés api fetch
  const {
    data: weatherData,
    error: weatherErrorData,
    isLoading: weatherLoading,
    isSuccess: weatherSuccess,
    isError: weatherError,
  } = useGetWeather(API_KEY, city, lang)

  if (decoderLoading || weatherLoading) return <div>Loading...</div>
  if (decoderError || weatherError) return <div>Error...</div>

  console.log(weatherData, weatherData.list[0].weather[0].icon)

  //Dinamikus nappal és éjszakai iconok
  let DinamycDayIcons = DayIcons[weatherData.list[0].weather[0].icon]
  let DinamycNightIcons = NightIcons[weatherData.list[0].weather[0].icon]

  return (
    <div className='home_container'>
      <div className='home_info_container'>
        {weatherSuccess ? (
          <>
            <h1 className='home_city_name'>{weatherData.city.name}</h1>
            <div className='home_description'>{weatherData.list[0].weather[0].description}</div>
            <div className='home_icon_container'>
              {weatherData.list[0].weather[0].icon.slice(-1) === 'd' ? (
                <DinamycDayIcons className='day_icon' />
              ) : (
                <DinamycNightIcons className='night_icon' />
              )}
            </div>

            <h1 className='home_unit'>
              {Math.floor(weatherData.list[0].main.temp)} {unit === 'metric' ? '°C' : '°F'}
            </h1>
          </>
        ) : (
          'No data available'
        )}
      </div>
    </div>
  )
}
