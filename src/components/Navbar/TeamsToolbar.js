import React from 'react'
import './TeamsToolbar.css'
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner'
import PageNavbar from './PageNavbar'
import { useGSHLTeams } from '../../utils/fetchData'

function TeamsToolbar(props) {
  const teamsData = useGSHLTeams()
  if (teamsData.isLoading) { return <LoadingSpinner /> }
  const data = teamsData.data.filter(obj => obj[props.season]).sort((a, b) => ('' + b.Conference).localeCompare(a.Conference)).map(obj => {
    return { 'key': obj.id, 'content': <img src={obj.LogoURL} alt={obj.TeamName} />, 'classes': [obj.Conference] }
  })
  return (
    <div className='teams-toolbar-container'>
      <PageNavbar data={data} setter={props.setActiveTeam} activeKey={props.activeTeam} />
    </div>
  )
}

export default TeamsToolbar