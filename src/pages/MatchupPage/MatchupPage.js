import React from 'react'
import { useParams } from 'react-router-dom'
import { useMatchup } from '../../utils/fetchData'
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner'
import MatchupHeader from './components/MatchupHeader/MatchupHeader'
import MatchupStats from './components/MatchupStats/MatchupStats'
import MatchupBoxscore from './components/MatchupBoxscore/MatchupBoxscore'
import './MatchupPage.css'

function MatchupPage() {
  const { id } = useParams()
  const matchupData = useMatchup(id)

  if (matchupData.isLoading || !matchupData.data) { return <LoadingSpinner /> }

  return (
    <>
      <MatchupHeader />
      <MatchupStats matchupData={matchupData.data} />
      <MatchupBoxscore />
    </>
  )
}

export default MatchupPage