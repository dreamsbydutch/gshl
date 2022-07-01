import React from 'react'
import './TeamsToolbar.css'
import { useTeams } from '../../hooks/getStandings'
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner'

function TeamsToolbar(props) {
  const teamsData = useTeams('2021-22')
  if (teamsData.isLoading) { return <LoadingSpinner /> }
  const data = [teamsData.data.data.filter(obj => obj.Conference === 'HH' && obj['2021-22']), teamsData.data.data.filter(obj => obj.Conference === 'SV' && obj['2021-22'])]
  return (
    <div className='team-toolbars'>
      {data.map(group => (
        <div className='team-toolbar-container'>
          {group.map((item, i) => (
            <>
              {i !== 0 && <span className='nav-border-line' />}
              <div key={item['2021-22']} onClick={() => props.setter(item['2021-22'])} className={props.active === item['2021-22'] ? 'active team-toolbar-logo' : 'team-toolbar-logo'} >
                <img src={item.LogoURL} alt='Team logo' />
              </div>
            </>
          ))}
        </div>
      ))}
    </div>
  )
}

export default TeamsToolbar