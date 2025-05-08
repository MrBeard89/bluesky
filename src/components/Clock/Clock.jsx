import React, { useEffect, useState } from 'react'
import '../../styles/components/Clock/Clock.scss'

export const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000) // update every 1000 milliseconds (1 second)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <div className='clock_container'>
      <div className='inner_container'>
        <div className='actual_clock'>{formatTime(currentTime)}</div>
      </div>
    </div>
  )
}
