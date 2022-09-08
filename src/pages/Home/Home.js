import React from 'react'
import { currentSeason, currentWeek } from '../../utils/constants'
import { usePlayerDays } from '../../utils/fetchData'
import WeeklySchedule from '../Schedule/WeeklySchedule/WeeklySchedule'

function Home() {
  const x = usePlayerDays()
  console.log(x)
  return (
    <>
      <WeeklySchedule toolbar={false} season={currentSeason.key} weekID={currentWeek} />
    </>
  )
}

export default Home
