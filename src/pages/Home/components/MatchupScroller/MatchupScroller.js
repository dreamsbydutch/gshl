import React from 'react'
import { useSchedule } from '../../../../utils/fetchData'
import LoadingSpinner from '../../../../utils/LoadingSpinner/LoadingSpinner'
import './MatchupScroller.css'
import { currentSeason, currentWeek } from '../../../../utils/constants'
import ScrollerItem from './ScrollerItem/ScrollerItem'

function MatchupScroller() {
  var scheduleData = useSchedule(currentSeason.key)
  
  if (scheduleData.isLoading) {return <LoadingSpinner />}
  return (
        <div className='matchup-scroller'>
          <div className='matchup-scroller-current'>
            <div className='label'>Week {currentWeek}</div>
            <div className="scroll-cards">
              {scheduleData.data && scheduleData.data.filter(obj => obj.Season === currentSeason.key).filter(obj => obj.WeekNum === currentWeek || obj.GameType === currentWeek).map((obj, i) => <ScrollerItem data={obj} key={i} />)}
            </div>
          </div>
          <div className='matchup-scroller-last'>
            <div className='label'>Week {String(parseInt(currentWeek)-1)}</div>
            <div className="scroll-cards">
              {scheduleData.data && scheduleData.data.filter(obj => obj.Season === currentSeason.key).filter(obj => obj.WeekNum === String(parseInt(currentWeek)-1) || obj.GameType === String(parseInt(currentWeek)-1)).map((obj, i) => <ScrollerItem data={obj} key={i} />)}
            </div>
          </div>
        </div>
  )
}

export default MatchupScroller