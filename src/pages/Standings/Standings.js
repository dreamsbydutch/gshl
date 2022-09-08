import React, { useState } from 'react'
import PageNavbar from '../../components/Navbar/PageNavbar'
import { currentSeason, SeasonListNavData, standingsNavData } from '../../utils/constants'
import { useStandings } from '../../utils/fetchData'
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner'
import StandingsContainer from './StandingsContainer/StandingsContainer'
import './Standings.css'

function Standings() {
  const [standingsType, setStandingsType] = useState("OVR")
  const [seasonID, setSeasonID] = useState(currentSeason.key)
  var standingsData = useStandings();
  if (standingsData.isLoading) { return <LoadingSpinner /> }
  const pageNavData = standingsNavData

  return (
    <>
      <PageNavbar data={pageNavData} setter={setStandingsType} activeKey={standingsType} />
      <PageNavbar data={SeasonListNavData} setter={setSeasonID} activeKey={seasonID} />
      <StandingsContainer type={standingsType} season={seasonID} />
    </>
  )
}

export default Standings