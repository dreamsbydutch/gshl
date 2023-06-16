import React, { useState } from 'react'
import { queryFunc } from '../utils/fetchData'
import { SeasonToggleNavbar, StandingsToggleNavbar } from '../components/PageNavbar'
import LoadingSpinner from '../components/LoadingSpinner'
import { useQuery } from 'react-query'
import { LosersBracket, PlayoffBracket } from '../components/Playoffs'

export default function Standings() {
  const [standingsType, setStandingsType] = useState('OVR')
  const [seasonID, setSeasonID] = useState('2023')
  return (
    <div className='my-4 mx-2'>
      <SeasonToggleNavbar setter={setSeasonID} activeKey={seasonID} />
      <StandingsToggleNavbar setter={setStandingsType} activeKey={standingsType} />
      {standingsType !== "PO" ?
        <>
          <StandingsContainer {...{ standingsType, seasonID }} />
          <div className="my-4 mx-4 text-gray-500 text-xs">
            <div className="">x - Clinched Playoffs</div>
            <div className="">y - Clinched Conference</div>
            <div className="">z - Clinched President's Trophy</div>
            <div className="">e - Eliminated from Playoffs</div>
            <div className="">l - Clinched Loser's Bracket</div>
          </div>
        </>
        :
        <div className="flex flex-col mb-12">
          <div className="text-2xl text-center py-2 font-bold">GSHL Cup Playoffs</div>
          <PlayoffBracket {...{ seasonID }} />
          <div className="text-2xl text-center pt-12 pb-2 font-bold">Loser's Tournament</div>
          <LosersBracket {...{ seasonID }} />
        </div>
      }
    </div>
  )
}

export const StandingsContainer = ({ standingsType, seasonID }) => {

  const gshlTeamData = useQuery(['MainInput', 'GSHLTeams'], queryFunc)
  const standingsData = useQuery([seasonID + 'TeamData', 'Standings'], queryFunc)
  const playoffProbData = useQuery([seasonID + 'TeamData', 'Probabilities'], queryFunc)
  if (gshlTeamData.isLoading || standingsData.isLoading || playoffProbData.isLoading) { return <LoadingSpinner /> }

  const standings = standingsData.data
  const gshlTeams = gshlTeamData.data?.filter(obj => obj[seasonID]).map(obj => { obj.teamID = obj[seasonID]; return obj; })
  const playoffProb = playoffProbData.data
  

  const typeObj = {
    'OVR': [['', 'bg-gray-100', standings?.sort((a, b) => a.OvrRk - b.OvrRk)]],
    'Conf': [
      ['Sunview Conference', 'bg-sunview-50 bg-opacity-50', standings?.filter(obj => obj.conf === "SV").sort((a, b) => a.CCRk - b.CCRk)],
      ['Hickory Hotel Conferene', 'bg-hotel-50 bg-opacity-50', standings?.filter(obj => obj.conf === "HH").sort((a, b) => a.CCRk - b.CCRk)],
    ],
    'WC': [
      ['Sunview Top 3', 'bg-sunview-50 bg-opacity-50', standings?.filter(obj => obj.conf === 'SV').sort((a, b) => a.CCRk - b.CCRk).slice(0, 3)],
      ['Hickory Hotel Top 3', 'bg-hotel-50 bg-opacity-50', standings?.filter(obj => obj.conf === 'HH').sort((a, b) => a.CCRk - b.CCRk).slice(0, 3)],
      ['Wildcard', 'bg-gray-100 [&>*:nth-child(2)]:border-solid [&>*:nth-child(2)]:border-b-2 [&>*:nth-child(2)]:border-gray-800', standings?.filter(obj => obj.WCRk !== '').sort((a, b) => a.WCRk - b.WCRk).slice(0, 6)],
      ['Loser\'s Tournament', 'bg-brown-100', standings?.filter(obj => obj.WCRk !== '').sort((a, b) => a.WCRk - b.WCRk).slice(6)],
    ],
    'LT': [
      ['', 'shadow-none', standings?.filter(obj => obj.LTRk).sort((a, b) => a.LTRk - b.LTRk)],
    ],
  }
  if (!standings || !gshlTeams || !playoffProb) { return <LoadingSpinner /> }
  return (
    <>
      {typeObj[standingsType].map(obj => {
        return (
          <div>
            <div className='font-bold mt-8 text-center text-sm font-varela'>{obj[0]}</div>
            <div className={'mb-4 p-2 rounded-xl shadow-md [&>*:last-child]:border-none ' + obj[1]} >
              {obj[2].map(team => {
                const teamInfo = gshlTeams?.filter(a => a.teamID === team.gshlTeam)[0]
                const teamProb = playoffProb?.filter(a => a.teamID === team.gshlTeam)[0]
                if (!teamInfo || !teamProb) { return <LoadingSpinner /> }
                return (
                  <StandingsItem key={team.teamID} {...{ teamInfo, team, teamProb, standingsType }} />
                )
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}
const StandingsItem = ({ teamInfo, team, teamProb, standingsType }) => {
  const [showInfo, setShowInfo] = useState(false)
  if (standingsType === "LT" && +teamProb.LoserPer !== 1) {
    return (
      <div key={team.teamID} className="grid grid-cols-12 mx-auto py-1 font-varela text-gray-400 text-center items-center border-b border-dotted border-gray-400" onClick={() => setShowInfo(!showInfo)}>
        <div className="col-span-12">TBD</div>
      </div>
    )
  } else if (standingsType === "LT") {
    return (
      <div key={team.teamID} className="grid grid-cols-12 mx-auto py-1 font-varela text-center items-center border-b border-dotted border-gray-400" onClick={() => setShowInfo(!showInfo)}>
        <div className="col-span-2 p-1"><img className="w-12" src={teamInfo?.LogoURL} alt="Team Logo" /></div>
        <div className="col-span-7 font-bold text-base">{team.teamName}</div>
        <div className="col-span-2 text-sm">{team.LTW} - {team.LTL}</div>
        <div className={`col-span-1 text-sm ${team.LTDiff > 0 ? 'text-emerald-800' : team.LTDiff < 0 ? 'text-rose-800' : 'text-gray-500'}`}>{team.LTDiff > 0 ? '+' + team.LTDiff : team.LTDiff < 0 ? team.LTDiff : "-"}</div>
        {showInfo ?
          <>
          <div className='col-span-12 mb-0.5 flex flex-row justify-center flex-wrap'>
            <div className="text-2xs font-bold pr-2">Tiebreak Pts:</div>
            <div className="text-2xs">{team.LTPTS + ' pts'}</div>
          </div>
            <TeamInfo {...{ teamProb, standingsType }} />
          </>
          :
          <></>
        }
      </div>
    )
  } else {
    return (
      <div key={team.teamID} className="grid grid-cols-12 mx-auto py-1 font-varela text-center items-center border-b border-dotted border-gray-400" onClick={() => setShowInfo(!showInfo)}>
        <div className="col-span-2 p-1"><img className="w-12" src={teamInfo?.LogoURL} alt="Team Logo" /></div>
        <div className="col-span-7 font-bold text-base">
          {+teamProb.OneSeed === 1 ? 'z - ' : +teamProb.OneConf === 1 ? 'y - ' : +teamProb.PlayoffsPer === 1 ? 'x - ' : +teamProb.LoserPer === 1 ? 'l - ' : +teamProb.PlayoffsPer === 0 ? 'e - ' : ''}
          {team.teamName}
        </div>
        <div className="col-span-2 text-sm">{team.W} - {team.L}</div>
        <div className={`text-xs ${team.Stk.includes("W") ? 'text-emerald-800' : 'text-rose-800'}`}>{team.Stk}</div>
        {showInfo ?
          <>
            <div className='col-span-12 mb-0.5 flex flex-row justify-center flex-wrap'>
              <div className="text-2xs font-bold pr-2">Tiebreak Pts:</div>
              <div className="text-2xs">{team.PTS + ' pts'}</div>
            </div>
            <TeamInfo {...{ teamProb, standingsType }} />
          </>
          :
          <></>
        }
      </div>
    )
  }
}
const TeamInfo = ({ teamProb, standingsType }) => {
  switch (standingsType) {
    case 'OVR':
      return (
        <div className='col-span-12 mt-1 mb-3 flex flex-row justify-center flex-wrap'>
          {['OneSeed', 'TwoSeed', 'ThreeSeed', 'FourSeed', 'FiveSeed', 'SixSeed', 'SevenSeed', 'EightSeed', 'NineSeed', 'TenSeed', 'ElevenSeed', 'TwelveSeed', 'ThirteenSeed', 'FourteenSeed', 'FifteenSeed', 'SixteenSeed'].map((obj, i) => {
            return (
              <>
                {teamProb[obj] &&
                  <div className="flex flex-col gap-1 px-2 border-r border-gray-500 last:border-none">
                    <div className="text-xs font-bold">{(i + 1) + (i + 1 === 1 ? 'st' : i + 1 === 2 ? 'nd' : i + 1 === 3 ? 'rd' : 'th') + ' Ovr'}</div>
                    <div className="text-xs">{Math.round(teamProb[obj] * 1000) / 10 + '%'}</div>
                  </div>
                }
              </>
            )
          })}
        </div>
      )

    case 'Conf':
      return (
        <div className='col-span-12 mt-1 mb-3 flex flex-row justify-center flex-wrap'>
          {['OneConf', 'TwoConf', 'ThreeConf', 'FourConf', 'FiveConf', 'SixConf', 'SevenConf', 'EightConf'].map((obj, i) => {
            return (
              <>
                {teamProb[obj] &&
                  <div className="flex flex-col gap-1 px-2 border-r border-gray-500 last:border-none">
                    <div className="text-xs font-bold">{(i + 1) + (i + 1 === 1 ? 'st' : i + 1 === 2 ? 'nd' : i + 1 === 3 ? 'rd' : 'th') + ' Conf'}</div>
                    <div className="text-xs">{Math.round(teamProb[obj] * 1000) / 10 + '%'}</div>
                  </div>
                }
              </>
            )
          })}
        </div>
      )

    case 'WC':
      return (
        <div className='col-span-12 mt-1 mb-3 flex flex-row justify-center flex-wrap'>
          {['PlayoffsPer', 'LoserPer', 'SFPer', 'FinalPer', 'CupPer'].map(obj => {
            return (
              <>
                {teamProb[obj] &&
                  <div className="flex flex-col gap-1 px-2 border-r border-gray-500 last:border-none">
                    <div className="text-xs font-bold">{obj.replace('Per', '')}</div>
                    <div className="text-xs">{Math.round(teamProb[obj] * 1000) / 10 + '%'}</div>
                  </div>
                }
              </>
            )
          })}
        </div>
      )

    case 'LT':
      return (
        <div className='col-span-12 mt-1 mb-3 flex flex-row justify-center flex-wrap'>
          {['1stPickPer', '3rdPickPer', '4thPickPer', '8thPickPer'].map(obj => {
            return (
              <>
                {teamProb[obj] &&
                  <div className="flex flex-col gap-1 px-2 border-r border-gray-500 last:border-none">
                    <div className="text-xs font-bold">{obj.replace('Per', '')}</div>
                    <div className="text-xs">{Math.round(teamProb[obj] * 1000) / 10 + '%'}</div>
                  </div>
                }
              </>
            )
          })}
        </div>
      )

    default:
      return (
        <div>
        </div>
      )
  }
}