import React from 'react'
import '../../styles/pages/FetchingError/FetchingError.scss'
export const NotFound = () => {
  return (
    <div className='error_container'>
      <h2 className='error_text'>This page doesn't exists!</h2>
      <button className='try_again_btn' onClick={() => window.location.replace('/bluesky/home')}>
        Go back to homepage
      </button>
    </div>
  )
}
