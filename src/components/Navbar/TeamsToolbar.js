// import React from 'react'
// import './TeamsToolbar.css'
// import { useGSHLTeams } from '../../utils/fetchData'
// import LoadingSpinner from '../LoadingSpinner'

// function TeamsToolbar(props) {
//   const teamsData = useGSHLTeams()
//   if (teamsData.isLoading) { return <LoadingSpinner /> }
//   const data = teamsData.data.filter(obj => obj[props.season]).sort((a, b) => ('' + b.Conference).localeCompare(a.Conference)).map(obj => {
//     return { 'key': obj.id, 'content': <img src={obj.LogoURL} alt={obj.TeamName} />, 'classes': [obj.Conference] }
//   })
//   return (
//     <div className='teams-toolbar-container'>
//       {/* <PageNavbar data={data} setter={props.setActiveTeam} activeKey={props.activeTeam} /> */}
//     </div>
//   )
// }


// export default TeamsToolbar