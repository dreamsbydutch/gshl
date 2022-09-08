import React, { useState } from 'react'
import { useGSHLTeams, useSchedule } from '../../../utils/fetchData'
import TeamsToolbar from '../../../components/Navbar/TeamsToolbar'
import LoadingSpinner from '../../../utils/LoadingSpinner/LoadingSpinner'
import ScheduleItem from './ScheduleItem/ScheduleItem'
import './TeamSchedule.css'

function TeamSchedule(props) {
  const [teamID, setTeamID] = useState(null)
  var teamData = useGSHLTeams()
  var scheduleData = useSchedule()
  if (scheduleData.isLoading || teamData.isLoading) { return <LoadingSpinner /> }

  return (
    <>
      <TeamsToolbar setActiveTeam={setTeamID} activeTeam={teamID} season={props.season} />
        <div className='team-schedule-header-row'>
          <div className='week'>Week</div>
          <div className='opponent'>Opponent</div>
          <div className='score'>Score</div>
        </div>
        {scheduleData.data && teamID && scheduleData.data.filter(obj => obj.Season === props.season).filter(obj => obj.HomeTeam === teamData.data.filter(obj => obj.id === teamID)[0][props.season] || obj.AwayTeam === teamData.data.filter(obj => obj.id === teamID)[0][props.season]).map(obj => <ScheduleItem data={obj} key={obj.WeekNum} teamID={teamID} />)}
    </>
  )
}

export default TeamSchedule