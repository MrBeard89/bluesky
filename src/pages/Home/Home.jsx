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
//
import { FetchingError } from '../../components/FetchingError/FetchingError'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'
import { Clock } from '../../components/Clock/Clock'

export const Home = ({ localLang, localUnit }) => {
  const {
    geoLocationValue,
    isGeoAllowed,
    geoLocationCity,
    handleCity,
    handleGeoCity,
    API_KEY,
    city,
  } = useContext(AppContext)

  //Geolocator api fetch
  const {
    data: decoderData,
    error: decoderErrorData,
    isLoading: decoderLoading,
    isSuccess: decoderSuccess,
    isError: decoderError,
  } = useDecoderApi(geoLocationValue, API_KEY)

  //Előjelzés api fetch
  const {
    data: weatherData,
    error: weatherErrorData,
    isLoading: weatherLoading,
    isSuccess: weatherSuccess,
    isError: weatherError,
  } = useGetWeather(API_KEY, city, localUnit, localLang)

  function handleSelectingCityValue() {
    handleCity(decoderData[0]?.name)
    handleGeoCity(decoderData[0]?.name)
  }

  if (isGeoAllowed == true && geoLocationCity == '') {
    decoderSuccess ? handleSelectingCityValue() : ''
  }

  if (weatherLoading) {
    return <LoadingSpinner />
  }
  if (weatherError) {
    console.log(weatherErrorData)
    return <FetchingError />
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

  return (
    <div className='home_container'>
      {weatherSuccess ? (
        <>
          {/* Info conatiner */}
          <div className='home_info_container'>
            <div className='inner_info_container'>
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
                {localUnit === 'metric' ? '°C' : '°F'}
              </h1>

              <Clock />
            </div>
          </div>

          {/*Forecast details container */}
          <div className='home_details_wrapper'>
            <div className='home_details_container'>
              <p className='home_details_title'>
                {localLang == 'hu' ? 'Mai Időjárás' : "Today's weather"}{' '}
              </p>
              <div className='home_details_hours_wrapper'>
                {filteredTodayWeatherArr.map((day, i) => {
                  let DinamycDetailsDayIcons = DayIcons[`o${day.weatherIcon}`]
                  let DinamycDetailsNightIcons = NightIcons[`o${day.weatherIcon}`]
                  return (
                    <div key={i} className='home_details_hours_container'>
                      <p className='details_date'>{formatTime(day.date)}</p>
                      {day.weatherIcon.slice(-1) === 'd' ? (
                        <DinamycDetailsDayIcons className='details_day_icon' />
                      ) : (
                        <DinamycDetailsNightIcons className='details_night_icon' />
                      )}
                      <p className='details_temp'>
                        {Math.floor(day.avgTemp)} {localUnit === 'metric' ? '°C' : '°F'}
                      </p>
                      {/* <hr className='details_decor_line' /> */}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* More data container */}
          <div className='home_more_data_wrapper'>
            <div className='home_more_data_container'>
              <p className='home_more_data_title'>
                {localLang == 'hu' ? 'Körülmények' : 'Conditions'}
              </p>
              <button className='home_more_data_link'>
                <a
                  href={`https://www.idokep.hu/idojaras/${city}`}
                  rel='noreferrer noopener'
                  target='_blank'
                >
                  {localLang === 'hu' ? 'Több info' : 'See more'}
                </a>
              </button>
              <div className='home_more_data_info_wrapper home_more_part_1'>
                {/* Valós érzet */}
                <div className='data_info_container'>
                  <div className='icon_container'>
                    <FaTemperatureEmpty className='data_container_icon' />
                  </div>
                  <div className='data_container'>
                    <p className='data_container_title'>
                      {localLang == 'hu' ? 'Valós érzet' : 'Reel feel'}
                    </p>
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
                    <p className='data_container_title'>
                      {localLang == 'hu' ? 'Szélsebesség' : 'Wind speed'}
                    </p>
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
                    <p className='data_container_title'>
                      {localLang == 'hu' ? 'Páratartalom' : 'Humidity'}
                    </p>
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
                    <p className='data_container_title'>
                      {localLang == 'hu' ? 'Tengerszint' : 'Sea level'}
                    </p>
                    <p className='data_container_value'>
                      {Math.floor(weatherData[0].dailyForecast[0].seaLevel)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 5 day forecast */}
          <div className='home_forecast_wrapper'>
            <div className='home_forecast_container'>
              <p className='home_forecast_container_title'>
                {localLang == 'hu' ? '5-napos előrejelzés' : '5-day forecast'}
              </p>
              {Object.values(weatherData[0].groupedTemps).map((forecastData, i) => {
                let DinamycForecastDayIcons = DayIcons[`o${forecastData.icon}`]
                // let DinamycForecastNightIcons = NightIcons[`o${forecastData.icon}`]
                return (
                  <div className='home_forecast_element' key={i}>
                    <p className='forecast_date'>{forecastData.forecastDate}</p>
                    <DinamycForecastDayIcons className='forecast_day_icon' />
                    {/* {forecastData.icon.slice(-1) === 'd' ? (
                      <DinamycForecastDayIcons className='forecast_day_icon' />
                    ) : (
                      <DinamycForecastNightIcons className='forecast_night_icon' />
                    )} */}
                    <p className='forecast_desc'>{forecastData.desc}</p>
                    <p className='forecast_max_min_value'>
                      {Math.floor(forecastData.max)}
                      <span>/{Math.floor(forecastData.min)}</span>
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      ) : (
        <FetchingError />
      )}
    </div>
  )
}
