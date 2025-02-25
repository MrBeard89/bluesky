import React, { useContext } from 'react'
import '../../styles/pages/FetchingError/FetchingError.scss'
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import { AppContext } from '../../context/AppContext'
import { fetchWeather } from '../../hooks/useGetWeather'

export const FetchingError = () => {
  const { API_KEY, city, unit, lang } = useContext(AppContext)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const fetchAgain = async () => {
    navigate('/bluesky/home')
    const data = await queryClient.fetchQuery({
      queryKey: ['weather', city],
      queryFn: () => fetchWeather(API_KEY, city, unit, lang),
    })
    return data
  }

  return (
    <div className='error_container'>
      <h2 className='error_text'>Uoops something went wrong!</h2>
      <button className='try_again_btn' onClick={() => fetchAgain()}>
        Try again
      </button>
    </div>
  )
}
