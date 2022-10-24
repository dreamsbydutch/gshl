import React, { useState } from 'react'
import { useGSHLTeams, useSchedule, useWeeks } from '../../../utils/fetchData'
import PageNavbar from '../../../components/Navbar/PageNavbar'
import LoadingSpinner from '../../../utils/LoadingSpinner/LoadingSpinner'
import ScheduleItem from './ScheduleItem/ScheduleItem'
import './WeeklySchedule.css'
import { currentSeason, currentWeek } from '../../../utils/constants'

function WeeklySchedule(props) {
  const [weekID, setWeekID] = useState(currentWeek)
  var teamData = useGSHLTeams()
  var scheduleData = useSchedule(currentSeason.key)
  var weeksData = useWeeks()
  if (scheduleData.isLoading || weeksData.isLoading || teamData.isLoading) { return <LoadingSpinner /> }
  var toolbarData = weeksData.data && weeksData.data.filter(obj => obj.Season === props.season).map(obj => {
    return {
      'content': obj.WeekType === "RS" ? obj.WeekNum : obj.WeekType,
      'key': obj.WeekNum
    }
  })
  return (
        <>
        {weeksData.data && props.toolbar && <PageNavbar data={toolbarData} setter={setWeekID} activeKey={weekID} />}
          <div className='weekly-schedule-header-row'>
            <div className='team'>Away Team</div>
            <div className='score'>Score</div>
            <div className='team'>Home Team</div>
          </div>
          {scheduleData.data && scheduleData.data.filter(obj => obj.Season === props.season).filter(obj => obj.WeekNum === weekID || obj.GameType === weekID).map((obj, i) => <ScheduleItem data={obj} key={obj.id} />)}
        </>
  )
}

export default WeeklySchedule
