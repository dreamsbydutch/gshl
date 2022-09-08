import './LockerRoom.css'
import React, { useState } from 'react'
import TeamsToolbar from '../../components/Navbar/TeamsToolbar'
import { currentSeason } from '../../utils/constants'
// import TeamPlayerContracts from './components/TeamPlayerContracts/TeamPlayerContracts'
// import TeamPlayerStats from './components/TeamPlayerStats/TeamPlayerStats'

function LockerRoom() {
  const [teamID, setTeamID] = useState(null)
  return (
    <>
      <TeamsToolbar setActiveTeam={setTeamID} activeTeam={teamID} season={currentSeason.key} />
      {/* <TeamPlayerContracts teamID={teamID} /> */}
      {/* <TeamPlayerStats teamID={teamID} /> */}
    </>
  )
}

export default LockerRoom
