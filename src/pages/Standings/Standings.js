import React, { useState } from 'react'
import PageNavbar from '../../components/Navbar/PageNavbar'
import StandingsContainer from '../../components/StandingsContainer/StandingsContainer'
import './Standings.css'

function Standings() {
  const [type, setType] = useState("OVR")

  const pageNavData = [
    {
      'text': 'President\'s Trophy',
      'onClick': () => setType('OVR')
    },
    {
      'text': 'Wildcard',
      'onClick': () => setType('WC')
    },
    {
      'text': <img src='https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/League/Sunview.png' alt='SV logo' />,
      'onClick': () => setType('HH')
    },
    {
      'text': 'Sunview Conf',
      'onClick': () => setType('SV')
    }
  ]

  return (
    <>
      <PageNavbar data={pageNavData} active={type} />
      <div className={'standings-container '+type+'-bg'}>
        <StandingsContainer type={type} />    
      </div>
    </>
  )
}

export default Standings