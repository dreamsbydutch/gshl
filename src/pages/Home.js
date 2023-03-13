import React from 'react'
import MatchupScroller from '../components/MatchupScroller'
import PowerRankings from '../components/PowerRankings'
import MissedStarts from '../components/MissedStarts'
import ThreeStars from '../components/ThreeStars'

export default function Home() {
  return (
    <>
      <MatchupScroller />
      <MissedStarts />
      <PowerRankings />
      <ThreeStars />
    </>
  )
}
