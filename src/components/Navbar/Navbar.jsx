import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router'
import { AppContext } from '../../context/AppContext'
//Navbar icons
import { FaCloudSunRain } from 'react-icons/fa'
import { FaList } from 'react-icons/fa'
import { VscSettings } from 'react-icons/vsc'

import '../../styles/components/Navbar/Navbar.scss'

export const Navbar = () => {
  const { handleActiveNavbar } = useContext(AppContext)

  let location = useLocation()
  let activeNav = location.pathname.toString()
  activeNav === '/bluesky/' ? (activeNav = '/bluesky/home') : activeNav

  //Decoder api fetch
  //Próbáltam itt meghivni , hogy ne legyen ütközés a másik hook hivással szemben, de sajnos
  //vagy az automata GEo hivás működik, vagy a Cities componensből hívás
  //
  // const {
  //   data: decoderData,
  //   error: decoderErrorData,
  //   isLoading: decoderLoading,
  //   isSuccess: decoderSuccess,
  //   isError: decoderError,
  // } = useDecoderApi(geoLocationValue, API_KEY)

  // decoderSuccess ? handleCity(decoderData[0]?.name) : ''

  return (
    <div className='navbar_container'>
      <div className='navbar_link_container'>
        <Link
          to={'/bluesky/home'}
          className={`navbar_link ${activeNav == '/bluesky/home' ? 'active_link' : ''}`}
          onClick={() => handleActiveNavbar('home')}
        >
          <FaCloudSunRain
            className={`navbar_link_icon ${activeNav == '/bluesky/home' ? 'active_link' : ''}`}
          />
        </Link>
        <Link
          to={'/bluesky/cities'}
          className={`navbar_link ${activeNav == '/bluesky/cities' ? 'active_link' : ''}`}
          onClick={() => handleActiveNavbar('home')}
        >
          <FaList
            className={`navbar_link_icon ${activeNav == '/bluesky/cities' ? 'active_link' : ''}`}
          />
        </Link>
        <Link
          to={'/bluesky/settings'}
          className={`navbar_link ${activeNav == '/bluesky/settings' ? 'active_link' : ''}`}
          onClick={() => handleActiveNavbar('home')}
        >
          <VscSettings
            className={`navbar_link_icon ${activeNav == '/bluesky/settings' ? 'active_link' : ''}`}
          />
        </Link>
      </div>
    </div>
  )
}
