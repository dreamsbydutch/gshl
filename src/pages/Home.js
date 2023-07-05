import React from 'react'
import MatchupScroller from '../components/MatchupScroller'
import PowerRankings from '../components/PowerRankings'
import MissedStarts from '../components/MissedStarts'
import ThreeStars from '../components/ThreeStars'
import { LosersBracket, PlayoffBracket } from '../components/Playoffs'

export default function Home() {
  return (
     (new Date() <= new Date('2023-03-20')) ?
    <>
      <MatchupScroller />
      <MissedStarts />
      <PowerRankings />
      <ThreeStars />
    </>
    :    
        <div className="flex flex-col mb-12">
          <div className="text-2xl text-center py-2 font-bold">GSHL Cup Playoffs</div>
          <PlayoffBracket {...{ 'seasonID': '2023' }} />
          <div className="text-2xl text-center pt-12 pb-2 font-bold">Loser's Tournament</div>
          <LosersBracket {...{ 'seasonID': '2023' }} />
        </div>
  )
}
