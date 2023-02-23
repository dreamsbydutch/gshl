import React, { useState, useEffect } from 'react'
import { useStandings } from '../utils/fetchData'
import { SeasonToggleNavbar, StandingsToggleNavbar } from '../components/PageNavbar'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Standings(props) {
  const [standingsType, setStandingsType] = useState('OVR')
  const [seasonID, setSeasonID] = useState(null)
  const standingsData = useStandings(seasonID)
  useEffect(() => {
    setSeasonID(props.currentWeek.Season)
  }, [props.currentWeek.Season])
  if (standingsData.isLoading) { return <LoadingSpinner /> }
  if (standingsData.isError) { return <div>Error</div> }
  const data = {
    'standings': standingsData.data,
    'currentWeek': props.currentWeek,
  }


  return (
    <div className='my-4 mx-2'>
      <SeasonToggleNavbar setter={setSeasonID} activeKey={seasonID} />
      <StandingsToggleNavbar setter={setStandingsType} activeKey={standingsType} />
      <StandingsContainer data={data} type={standingsType} season={seasonID} />
      <div className="my-4 mx-4 text-gray-500 text-xs">
        <div className="">x - Clinched Playoffs</div>
        <div className="">y - Clinched Conference</div>
        <div className="">z - Clinched President's Trophy</div>
        <div className="">e - Eliminated from Playoffs</div>
        <div className="">l - Clinched Loser's Bracket</div>
      </div>
    </div>
  )
}


function StandingsContainer(props) {
  let standings = []
  switch (props.type) {
    case 'OVR':
      standings = [['', 'bg-gray-100', props.data.standings.sort((a, b) => a.OvrRk - b.OvrRk)]]
      break
    case 'SV':
      standings = [['', 'bg-sunview-50 bg-opacity-50', props.data.standings.filter(obj => obj.conf === props.type).sort((a, b) => a.CCRk - b.CCRk)]]
      break
    case 'HH':
      standings = [['', 'bg-hotel-50 bg-opacity-50', props.data.standings.filter(obj => obj.conf === props.type).sort((a, b) => a.CCRk - b.CCRk)]]
      break
    case 'PO':
      standings = [
        ['Sunview Top 3', 'bg-sunview-50 bg-opacity-50', props.data.standings.filter(obj => obj.conf === 'SV').sort((a, b) => a.CCRk - b.CCRk).slice(0, 3)],
        ['Hickory Hotel Top 3', 'bg-hotel-50 bg-opacity-50', props.data.standings.filter(obj => obj.conf === 'HH').sort((a, b) => a.CCRk - b.CCRk).slice(0, 3)],
        ['Wildcard', 'bg-gray-100 [&>*:nth-child(2)]:border-solid [&>*:nth-child(2)]:border-b-2 [&>*:nth-child(2)]:border-gray-800', props.data.standings.filter(obj => obj.WCRk !== '').sort((a, b) => a.WCRk - b.WCRk).slice(0, 6)],
        ['Loser\'s Tournament', 'bg-brown-100', props.data.standings.filter(obj => obj.WCRk !== '').sort((a, b) => a.WCRk - b.WCRk).slice(6)],
      ]
      break
    default:
      break
  }

  return (
    <>
      {standings.map(obj => {
        return (
          <>
            <div className='font-bold mt-8 text-center text-sm font-varela'>{obj[0]}</div>
            <div className={'mb-4 p-2 rounded-xl shadow-md [&>*:last-child]:border-none ' + obj[1]} >
              {obj[2].map(team => {
                return (<StandingsItem data={team} key={team.teamID} />
                )
              })}
            </div>
          </>
        )
      })}
    </>
  )
}

function StandingsItem(props) {
  return (
    <div className="grid grid-cols-12 mx-auto py-1 font-varela text-center items-center border-b border-dotted border-gray-400">
      <div className="col-span-2 p-1"><img className="w-12" src={props.data.teamInfo?.LogoURL} alt="Team Logo" /></div>
      <div className="col-span-6 font-bold text-base">
        {+props.data.playoffProb?.OneSeed === 1 ? 'z - ' : +props.data.playoffProb?.OneConf === 1 ? 'y - ' : +props.data.playoffProb?.POPer === 1 ? 'x - ' : +props.data.playoffProb?.LBPer === 1 ? 'l - ' : +props.data.playoffProb?.POPer === 0 ? 'e - ' : ''}
        {props.data.teamName}
      </div>
      <div className="col-span-2 text-sm">{props.data.W} - {props.data.L}</div>
      <div className="col-span-2 text-2xs">{props.data.CF} / {props.data.CA}</div>
    </div>
  )
}
