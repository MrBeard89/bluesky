import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import '../../styles/components/LoadingSpinner/LoadingSpinner.scss'

export const LoadingSpinner = () => {
  return (
    <div className='spinner_container'>
      <AiOutlineLoading className='spinner' />
    </div>
  )
}
