import React from 'react'
// import WeeklySchedule from '../../components/WeeklySchedule/WeeklySchedule'
import { useAllPlayerDailyStats } from '../../hooks/getStats/getStats'

function Home() {
  const stats = useAllPlayerDailyStats()
  console.log(!stats.isLoading && stats.data.filter(obj => obj.Rating))
  return (
    <>
      <div className="cup-logo-img-home">
        <img src='https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/League/GSHLCupLogo.png' alt='GSHL Cup logo' />
      </div>
      {/* <WeeklySchedule toolbar={false}/> */}
    </>
  )
}

export default Home
