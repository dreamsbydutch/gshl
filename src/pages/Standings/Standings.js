import React, { useState } from 'react'
import PageNavbar from '../../components/Navbar/PageNavbar'
import StandingsContainer from '../../components/StandingsContainer/StandingsContainer'
import './Standings.css'

function Standings() {
  const [type, setType] = useState("OVR")

  const pageNavData = [
    {
      'text': <img src='https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/League/GSHL.png' alt='Presidents Trophy logo' />,
      'onClick': () => setType('OVR'),
      'key': 'OVR'
    },
    {
      'text': <img src='https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/League/GSHL.png' alt='Wildcard logo' />,
      'onClick': () => setType('WC'),
      'key': 'WC'
    },
    {
      'text': <img src='https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/League/Hotel.png' alt='Hickory Hotel logo' />,
      'onClick': () => setType('HH'),
      'key': 'HH'
    },
    {
      'text': <img src='https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/League/Sunview.png' alt='Sunview logo' />,
      'onClick': () => setType('SV'),
      'key': 'SV'
    }
  ]

  return (
    <>
      <PageNavbar data={pageNavData} active={type} variant='outline-secondary' />
      <div className={'standings-container '+type+'-bg'}>
        <StandingsContainer type={type} />    
      </div>
    </>
  )
}

export default Standings