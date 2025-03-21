import React, { useContext } from 'react'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'

import '../../styles/pages/Settings/Settings.scss'

export const Settings = ({ localLang, toggleLang, localUnit, toggleUnit }) => {
  const [checkedLang, setCheckedLang] = React.useState(localLang === 'hu' ? false : true)
  const [checkedUnit, setCheckedUnit] = React.useState(localUnit === 'metric' ? false : true)

  //Language change
  const handleChangeLang = (event) => {
    setCheckedLang(event.target.checked)

    toggleLang()
  }

  //Unit change
  const handleChangeUnit = (event) => {
    setCheckedUnit(event.target.checked)

    toggleUnit()
  }

  //Custom switch
  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
  ))(({ theme }) => ({
    width: 150,
    height: 30,
    padding: 1,
    '& .MuiSwitch-switchBase': {
      padding: 2,
      margin: 2,
      transitionDuration: '400ms',
      '&.Mui-checked': {
        transform: 'translateX(120px)',
        color: '#d5dbe1',
        '& + .MuiSwitch-track': {
          backgroundColor: '#2e3d56',
          opacity: 1,
          border: 0,
          ...theme.applyStyles('dark', {
            backgroundColor: '#2ECA45',
          }),
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.grey[100],
        ...theme.applyStyles('dark', {
          color: theme.palette.grey[600],
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.7,
        ...theme.applyStyles('dark', {
          opacity: 0.3,
        }),
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: '#E9E9EA',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
      ...theme.applyStyles('dark', {
        backgroundColor: '#39393D',
      }),
    },
  }))

  return (
    <div className='settings_wrapper'>
      <div className='settings_title_wrapper'>
        <h2 className='settings_title'>{localLang === 'hu' ? 'Beállítások' : 'Settings'}</h2>
      </div>
      <div className='settings_container'>
        {/* Language */}
        <div className='settings_container_option'>
          <p className='settings_text'>{localLang === 'hu' ? 'Magyar' : 'Hun.'}</p>

          <IOSSwitch
            className='settings_container_switch'
            checked={checkedLang}
            onChange={handleChangeLang}
            inputProps={{ 'aria-label': 'controlled' }}
          />

          <p className='settings_text'>{localLang === 'hu' ? 'Angol' : 'Eng.'}</p>
        </div>
        {/* Unit Celsius or Fahrenheit */}
        <div className='settings_container_option'>
          <p className='settings_text'>{localLang === 'hu' ? 'Celsius' : 'Celsius'}</p>

          <IOSSwitch
            className='settings_container_switch'
            checked={checkedUnit}
            onChange={handleChangeUnit}
            inputProps={{ 'aria-label': 'controlled' }}
          />

          <p className='settings_text'>{localLang === 'hu' ? 'Fahren.' : 'Fahren.'}</p>
        </div>

        {/* Teaser container */}
        <div className='teaser_container'>
          <p className='teaser_text'>
            {localLang === 'hu'
              ? 'További beállítások és funkciók hamarosan ...'
              : 'More options and features coming soon ...'}
          </p>
        </div>

        <div className='settings_footer'>
          <p className='footer_api_text'>
            {localLang === 'hu'
              ? 'Létrejött az openweathermap.org apival'
              : 'Powered by openweathermap.org api'}
          </p>
          <p className='footer_name'>
            {localLang === 'hu'
              ? 'Programozta és a designt készitette: Kovács Norbert'
              : 'Programmed and designed by: Norbert Kovács'}
          </p>
        </div>
      </div>
    </div>
  )
}
