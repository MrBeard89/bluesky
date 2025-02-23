import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
//Hooks imports
import useGetWeather from '../../hooks/useGetWeather'
import useDecoderApi from '../../hooks/useDecoderApi'
//Dinamic Icons imports
import { DayIcons } from '../../components/Icons/Icons'
import { NightIcons } from '../../components/Icons/Icons'

//Icons import
import { FaTemperatureEmpty } from 'react-icons/fa6'
import { LuWind } from 'react-icons/lu'
import { FaPercentage } from 'react-icons/fa'
import { SiLevelsdotfyi } from 'react-icons/si'

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
  if (weatherSuccess) {
    console.log(weatherData)
  }

  //Dinamikus nappal és éjszakai iconok
  let DinamycDayIcons = DayIcons[`o${weatherData[0]?.dailyForecast[0].weatherIcon}`]
  let DinamycNightIcons = NightIcons[`o${weatherData[0]?.dailyForecast[0].weatherIcon}`]

  //Dátum átalakitása
  const formatTime = (dateString) => {
    const date = new Date(dateString)
    let hours = date.getHours()
    const amPm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12 // Convert 24-hour format to 12-hour format

    return `${hours}:00 ${amPm}`
  }

  //Get todays forecast
  let filteredTodayWeatherArr
  const filterTodayForecast = () => {
    let date = new Date()
    let day = date.getDate()

    filteredTodayWeatherArr = weatherData[0].dailyForecast.filter(
      (dateOBJ) => dateOBJ.date.split(' ')[0].split('-')[2] == day
    )
  }
  filterTodayForecast()

  console.log(filteredTodayWeatherArr)

  return (
    <div className='home_container'>
      {weatherSuccess ? (
        <>
          {/* Info conatiner */}
          <div className='home_info_container'>
            <h1 className='home_city_name'>{weatherData[0].cityNameData}</h1>
            <div className='home_description'>{weatherData[0].dailyForecast[0].weatherDesc}</div>
            <div className='home_icon_container'>
              {weatherData[0].dailyForecast[0].weatherIcon.slice(-1) === 'd' ? (
                <DinamycDayIcons className='day_icon' />
              ) : (
                <DinamycNightIcons className='night_icon' />
              )}
            </div>

            <h1 className='home_unit'>
              {Math.floor(weatherData[0].dailyForecast[0].avgTemp)}
              {unit === 'metric' ? '°C' : '°F'}
            </h1>
          </div>

          {/*Forecast details container */}
          <div className='home_details_wrapper'>
            <div className='home_details_container'>
              <p className='home_details_title'>Today's forecast</p>
              {filteredTodayWeatherArr.map((day, i) => {
                let DinamycForecastDayIcons = DayIcons[`o${day.weatherIcon}`]
                let DinamycForecastNightIcons = NightIcons[`o${day.weatherIcon}`]
                return (
                  <div key={i} className='home_details_hours_container'>
                    <p className='details_date'>{formatTime(day.date)}</p>
                    {day.weatherIcon.slice(-1) === 'd' ? (
                      <DinamycForecastDayIcons className='details_day_icon' />
                    ) : (
                      <DinamycForecastNightIcons className='details_night_icon' />
                    )}
                    <p className='details_temp'>
                      {Math.floor(day.avgTemp)} {unit === 'metric' ? '°C' : '°F'}
                    </p>
                    {/* <hr className='details_decor_line' /> */}
                  </div>
                )
              })}
            </div>
          </div>

          {/* More data container */}
          <div className='home_more_data_wrapper'>
            <div className='home_more_data_container'>
              <p className='home_more_data_title'>Conditions</p>

              <div className='home_more_data_info_wrapper home_more_part_1'>
                {/* Valós érzet */}
                <div className='data_info_container'>
                  <div className='icon_container'>
                    <FaTemperatureEmpty className='data_container_icon' />
                  </div>
                  <div className='data_container'>
                    <p className='data_container_title'>Reel feel</p>
                    <p className='data_container_value'>
                      {Math.floor(weatherData[0].dailyForecast[0].feelsLike)}
                    </p>
                  </div>
                </div>
                {/* Szélsebesség */}
                <div className='data_info_container'>
                  <div className='icon_container'>
                    <LuWind className='data_container_icon' />
                  </div>
                  <div className='data_container'>
                    <p className='data_container_title'>Wind speed</p>
                    <p className='data_container_value'>
                      {Math.floor(weatherData[0].dailyForecast[0].windSpeed)} km/h
                    </p>
                  </div>
                </div>
              </div>

              <div className='home_more_data_info_wrapper home_more_part_2'>
                {/* Páratartalom */}
                <div className='data_info_container'>
                  <div className='icon_container'>
                    <FaPercentage className='data_container_icon' />
                  </div>
                  <div className='data_container'>
                    <p className='data_container_title'>Humidity</p>
                    <p className='data_container_value'>
                      {Math.floor(weatherData[0].dailyForecast[0].humidity)}
                    </p>
                  </div>
                </div>
                {/* Tengerszint magasság */}
                <div className='data_info_container'>
                  <div className='icon_container'>
                    <SiLevelsdotfyi className='data_container_icon' />
                  </div>
                  <div className='data_container'>
                    <p className='data_container_title'>Sea level</p>
                    <p className='data_container_value'>
                      {Math.floor(weatherData[0].dailyForecast[0].seaLevel)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        'No data available'
      )}
    </div>
  )
}
