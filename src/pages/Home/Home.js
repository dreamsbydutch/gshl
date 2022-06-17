import React from 'react'
import WeeklySchedule from '../../components/WeeklySchedule/WeeklySchedule'
import { useAllPlayerTotalStats } from '../../hooks/getStats'

function Home() {
  const stats = useAllPlayerTotalStats()
  console.log(stats)
  return (
    <>
      <div className="cup-logo-img-home"><img src='https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/League/GSHLCupLogo.png' alt='GSHL Cup logo' /></div>
      <WeeklySchedule toolbar={false}/>
    </>
  )
}

export default Home
