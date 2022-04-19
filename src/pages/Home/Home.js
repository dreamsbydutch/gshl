import React from 'react'
import WeeklySchedule from '../../components/WeeklySchedule/WeeklySchedule'

function Home() {
  return (
    <>
      <img src='https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/League/GSHLCupLogo.png' alt='GSHL Cup logo' />
      <WeeklySchedule toolbar={false}/>
    </>
  )
}

export default Home
