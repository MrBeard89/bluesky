import { createContext, useEffect, useState } from 'react'

export const AppContext = createContext(null) // Create a context object

export const AppContextProvider = ({ children }) => {
  //Weather API_KEY
  const API_KEY = import.meta.env.VITE_API_KEY

  // States
  const [active, setActive] = useState('home')
  const [selectedCity, setselectedCity] = useState('')
  const [isGeoAllowed, setIsGeoAllowed] = useState(false)
  const [geoLocationCity, setGeoLocationCity] = useState('')
  const [city, setCity] = useState('Budapest') //alapértelmezés Budapest

  const [geoLocationValue, setGeoLocationValue] = useState({
    latitude: 47.497913,
    longitude: 19.040236,
  }) //alapértelmezés Budapest

  /////////////////////////////////////////
  //Geo adatok lekérdezése function
  function getGeoLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location access granted!')
        handlePosition(position)
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          console.log('Location access denied:', error.message)
          handleError(error)
        } else {
          console.log('Geolocation error:', error.message)
        }
      }
    )
  }
  //Gea adatok handle functions
  function handlePosition(position) {
    setGeoLocationValue((prev) => ({
      ...prev,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }))
    setIsGeoAllowed(true)
  }
  function handleError(error) {
    setIsGeoAllowed(false)
  }
  /////////////////////////////////////////

  // Handle functions
  const handleActiveNavbar = (nav) => {
    setActive(nav)
  }
  const handleCity = (city) => {
    setCity(city)
  }
  const handleSelectedCity = (city) => {
    setselectedCity(city)
  }
  // const handleSelectedCityArray = (city) => {
  //   let arr = JSON.parse(localStorage.getItem('local_cities'))
  //   arr.push(city)
  //   localStorage.setItem('local_cities', JSON.stringify(arr))
  // }

  // const handleDeleteSelectedCityArray = (value) => {
  //   let newArray = JSON.parse(localStorage.getItem('local_cities')).filter((x) => x !== value)
  //   localStorage.setItem('local_cities', JSON.stringify(newArray))
  //   window.location.reload()
  // }

  const handleGeoCity = (geocity) => {
    setGeoLocationCity(geocity)
  }

  //Első inditásnál engedélykérés a geo adatokhoz, ha nem, akkor az alapértelmezést tölti be
  useEffect(() => {
    getGeoLocation()
  }, [])

  const contextValue = {
    active,
    isGeoAllowed,
    geoLocationCity,
    city,
    geoLocationValue,
    API_KEY,
    selectedCity,
    setIsGeoAllowed,
    handleGeoCity,
    handleSelectedCity,
    handleActiveNavbar,
    handleCity,
    // handleSelectedCityArray,
    // handleDeleteSelectedCityArray,
  }
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
