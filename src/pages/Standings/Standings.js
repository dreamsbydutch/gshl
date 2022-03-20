import React, { useState } from 'react'
import PageNavbar from '../../components/Navbar/PageNavbar'
import StandingsContainer from '../../components/StandingsContainer/StandingsContainer'
import './Standings.css'

function Standings() {
  const [type, setType] = useState("OVR")

  const pageNavData = [
    {
      'text': <img src='https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/League/PresTrophyLogo.png' alt='Presidents Trophy logo' />,
      'onClick': () => setType('OVR'),
      'key': 'OVR'
    },
    {
      'text': <img src='https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/League/JungleCatTrophyLogo.png' alt='Jungle Cat Trophy logo' />,
      'onClick': () => setType('SV'),
      'key': 'SV'
    },
    {
      'text': <img src='https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/League/RandyTrophyLogo.png' alt='Randy Trophy logo' />,
      'onClick': () => setType('HH'),
      'key': 'HH'
    },
    {
      'text': <img src='https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/League/GSHLCupLogo.png' alt='GSHL Cup logo' />,
      'onClick': () => setType('WC'),
      'key': 'WC'
    }
  ]

  return (
    <>
      <div className="standings-page-nav">
        <PageNavbar data={pageNavData} active={type} variant='outline-secondary' />
      </div>
      <div className={'standings-container ' + type + '-bg'}>
        <StandingsContainer type={type} />
      </div>
    </>
  )
}

export default Standings