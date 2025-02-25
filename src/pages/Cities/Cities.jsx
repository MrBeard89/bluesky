import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Box, FormControl } from '@mui/material'

//Scss import
import '../../styles/pages/Cities/Cities.scss'
//Icon imports
import { FaSearch } from 'react-icons/fa'
import { TiDeleteOutline } from 'react-icons/ti'
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import { fetchWeather } from '../../hooks/useGetWeather'

export const Cities = () => {
  const {
    API_KEY,
    lang,
    unit,
    selectedCityArray,
    handleCity,
    handleGeoCity,
    handleSelectedCity,
    handleSelectedCityArray,
    handleDeleteSelectedCityArray,
  } = useContext(AppContext)
  const [cityValue, setCityValue] = useState('')
  const [isCity, setIsCity] = useState(true)

  const handleInit = (cityValue) => {
    handleSelectedCity(cityValue)
    handleSelectedCityArray(cityValue)
    setCityValue('')
    setIsCity(true)
  }

  //Város keréshez
  const fetchCity = async (API_KEY, cityValue) => {
    if (!isNaN(cityValue) && cityValue.length !== 0) {
      alert(
        lang === 'hu' ? 'Ne használj számokat a kereséshez!' : 'Do not use numbers to the search!'
      )
      return
    } else if (cityValue.length === 0) {
      alert(lang === 'hu' ? 'Adj meg egy város nevet!' : 'You have to type a valid cityname!')
      return
    } else if (cityValue === selectedCityArray.find((x) => x === cityValue)) {
      setCityValue('')
      alert(lang === 'hu' ? 'Már rákerestél erre a városra!' : 'You alreday search for this city!')
      return
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${API_KEY}`
      const response = await fetch(url)
      const data = await response.json()

      data?.message == 'city not found' ? setIsCity(false) : handleInit(cityValue)

      return data
    } catch (error) {
      console.log(error)
    }
  }

  const handleCityValue = (e) => {
    setCityValue(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
    e.target.value.length == 0 ? setIsCity(true) : ''
  }

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  //Keresés utáni fetch
  const fetchAgain = async (value) => {
    handleGeoCity('')
    handleCity(value)
    navigate('/bluesky/home')
    const data = await queryClient.fetchQuery({
      queryKey: ['weather', value],
      queryFn: () => fetchWeather(API_KEY, value, unit, lang),
      enabled: !!value,
    })
    return data
  }

  //Enter funkció
  let cityInput = document.getElementById('cityInput')

  cityInput?.addEventListener(
    'keypress',
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        document.getElementById('my_Btn').click()
        //setCityValue('')
        e.stopImmediatePropagation()
      }
    },
    { once: true }
  )

  return (
    <div className='cities_wrapper'>
      {/* Cities wrapper */}
      <div className='title_wrapper'>
        <h2 className='cities_title'>{lang === 'hu' ? 'Városaim' : 'My Cities'}</h2>
      </div>

      <FormControl fullWidth className='cities_input_wrapper'>
        <Box className='cities_input_container'>
          <input
            id='cityInput'
            className='cities_input_field'
            placeholder={lang === 'hu' ? 'Városok keresése' : 'Search cities...'}
            value={cityValue}
            type='text'
            onChange={(e) => handleCityValue(e)}
          />

          <button
            id='my_Btn'
            className='cities_search_btn'
            onClick={() => fetchCity(API_KEY, cityValue)}
          >
            <FaSearch className='cities_search_btn_icon' />
          </button>
        </Box>

        {/* Alert box */}
        <Box className='cities_alert_wrapper'>
          <Box className='cities_alert_container'>
            {cityValue.length == 0 ? (
              <p className='search_for_cities'>
                {lang === 'hu' ? 'Kezdj el városokat keresni...' : 'Start searching for cities...'}
              </p>
            ) : isCity == false ? (
              <p className='not_found'>
                {lang === 'hu' ? 'Város nem található!' : 'City not found!'}
              </p>
            ) : (
              <p className='placeholder'></p>
            )}
          </Box>
        </Box>
      </FormControl>

      {/* Cities array component*/}
      <Box className='cities_list_container'>
        {selectedCityArray.length === 0 ? (
          <p>{lang === 'hu' ? 'Nincsenek városaid!' : 'You not have any cities!'}</p>
        ) : (
          selectedCityArray.map((x, i) => {
            return (
              <Box key={i} className='cities_list_wrapper'>
                <p className='cities_list_element' onClick={() => fetchAgain(x)}>
                  {x}
                </p>
                <button
                  className='cities_list_element_btn'
                  onClick={() => handleDeleteSelectedCityArray(x)}
                >
                  <TiDeleteOutline className='list_element_icon' />
                </button>
              </Box>
            )
          })
        )}
      </Box>
    </div>
  )
}
