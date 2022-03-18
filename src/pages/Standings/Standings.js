import React, { useState } from 'react'
import StandingsContainer from '../../components/StandingsContainer/StandingsContainer'
import './Standings.css'

function Standings() {
  const [type, setType] = useState("OVR")
  return (
    <>
      <div className='standings-nav toggle-container'>
        <div onClick={() => {setType("OVR")}} className={'toggle-btn' + (type==='OVR'?' active' : '')}>
          <img src='https://dreamsbydutch.github.io/GSHLicon.png' alt='OVR Logo' />
        </div>
        <div onClick={() => {setType("WC")}} className={'toggle-btn' + (type==='WC'?' active' : '')} >
          <img src='https://dreamsbydutch.github.io/GSHLicon.png' alt='WC Logo' />
        </div>
        <div onClick={() => {setType("HH")}} className={'toggle-btn' + (type==='HH'?' active' : '')} >
          <img src='https://dreamsbydutch.github.io/GSHL/Images/Logos/Hotel.png' alt='HH Logo' />
        </div>
        <div onClick={() => {setType("SV")}} className={'toggle-btn' + (type==='SV'?' active' : '')} >
          <img src='https://dreamsbydutch.github.io/GSHL/Images/Logos/Sunview.png' alt='SV Logo' />
        </div>
      </div>
      <div className={'standings-container '+type+'-bg'}>
        <StandingsContainer type={type} />    
      </div>
    </>
  )
}

export default Standings