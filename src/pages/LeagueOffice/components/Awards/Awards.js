import React, { useState } from 'react'
import PageNavbar from '../../../../components/Navbar/PageNavbar'
import { SeasonListNavData } from '../../../../utils/constants'
import { useAwards, useGSHLTeams } from '../../../../utils/fetchData'
import LoadingSpinner from '../../../../utils/LoadingSpinner/LoadingSpinner'
import './Awards.css'
import AwardTable from './AwardTable/AwardTable'

function Awards() {
  const [seasonID, setSeasonID] = useState('2022')
  var awards = useAwards()
  var teams = useGSHLTeams()

  if (awards.isLoading || teams.isLoading) return <LoadingSpinner />

  return (
    <div className="awards-container">
      <PageNavbar data={SeasonListNavData} setter={setSeasonID} activeKey={seasonID} />
      <AwardTable award="hart" awardData={awards.playerData} teamData={teams.data} seasonID={seasonID} />
      <AwardTable award="norris" awardData={awards.playerData} teamData={teams.data} seasonID={seasonID} />
      <AwardTable award="vezina" awardData={awards.playerData} teamData={teams.data} seasonID={seasonID} />
      <AwardTable award="rocket" awardData={awards.playerData} teamData={teams.data} seasonID={seasonID} />
      <AwardTable award="artRoss" awardData={awards.playerData} teamData={teams.data} seasonID={seasonID} />
      <AwardTable award="connSmythe" awardData={awards.playerData} teamData={teams.data} seasonID={seasonID} />
      <AwardTable award="calder" awardData={awards.playerData} teamData={teams.data} seasonID={seasonID} />
      <AwardTable award="ladyByng" awardData={awards.playerData} teamData={teams.data} seasonID={seasonID} />
    </div>
  )
}

export default Awards