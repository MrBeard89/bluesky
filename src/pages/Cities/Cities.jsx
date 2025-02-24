import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Box, Button, FormControl, TextField } from '@mui/material'
import useFetchCity from '../../hooks/useFetchCity'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'
import { FetchingError } from '../../components/FetchingError/FetchingError'

export const Cities = () => {
  const {
    API_KEY,
    city,
    lang,
    unit,
    selectedCity,
    selectedCityArray,
    handleSelectedCity,
    handleSelectedCityArray,
  } = useContext(AppContext)
  const [cityValue, setCityValue] = useState('')
  const [isCity, setIsCity] = useState(true)

  const handleInit = (cityValue) => {
    handleSelectedCity(cityValue)
    handleSelectedCityArray(cityValue)
    setCityValue('')
    setIsCity(true)
  }

  const fetchCity = async (API_KEY, cityValue) => {
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
    setCityValue(e.target.value)
    e.target.value.length == 0 ? setIsCity(true) : ''
  }

  return (
    <div className='cities_input_container'>
      <FormControl fullWidth>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '2rem' }}>
          <TextField
            id='outlined-basic'
            variant='outlined'
            sx={{ bgcolor: 'white', width: '80%' }}
            placeholder='Search cities...'
            value={cityValue}
            onChange={(e) => handleCityValue(e)}
          />

          <Button onClick={() => fetchCity(API_KEY, cityValue)}>Search</Button>
        </Box>
      </FormControl>

      <Box className='cities_container'>
        {cityValue.length == 0 ? (
          <p>Start searching for cities</p>
        ) : isCity == false ? (
          <p style={{ color: 'red' }}>City not found...</p>
        ) : (
          ''
        )}
      </Box>
      <Box>
        {selectedCityArray.map((x, i) => {
          return <Box key={i}>{x}</Box>
        })}
      </Box>
    </div>
  )
}
