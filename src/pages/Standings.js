import React, { useState, useEffect } from 'react'
import { queryFunc } from '../utils/fetchData'
import { SeasonToggleNavbar, StandingsToggleNavbar } from '../components/PageNavbar'
import LoadingSpinner from '../components/LoadingSpinner'
import { useQuery } from 'react-query'
import ErrorPage from '../components/ErrorPage'

export default function Standings() {
  
  const [standingsType, setStandingsType] = useState('OVR')
  const [seasonID, setSeasonID] = useState(null)
    
    let date = new Date()
    const hour = date.getHours()
    date = new Date(date.getFullYear(), date.getMonth(), hour < 5 ? date.getDate() - 1 : date.getDate())
    const season = String((date.getMonth() < 8 ? date.getFullYear() : date.getFullYear() + 1))
  
    const weeks = useQuery([['Standings', 'CurrentWeek'], 'MainInput', 'Weeks'], queryFunc)
    const gshlTeamData = useQuery([['Standings', 'GSHLTeams'], 'MainInput', 'GSHLTeams'], queryFunc)
    const standingsData = useQuery([['Standings', 'Standings'], season + 'TeamData', 'Standings'], queryFunc)
    const playoffProbData = useQuery([['Standings', 'PlayoffProb'], season + 'TeamData', 'Probabilities'], queryFunc)
  
    const currentWeek = weeks.data?.filter(obj => (obj.Season === season) && ((new Date(obj.StartDate + ' 00:00:00')) <= date) && ((new Date(obj.EndDate + ' 00:00:00')) >= date))[0]
    const standings = standingsData.data
    const gshlTeams = gshlTeamData.data?.filter(obj => obj[season])
    const playoffProb = playoffProbData.data
  
    useEffect(() => {
      setSeasonID(currentWeek?.Season)
    }, [currentWeek])
    
    
    if (weeks.isLoading || standingsData.isLoading || gshlTeamData.isLoading || playoffProbData.isLoading) { return <LoadingSpinner /> }
    if (weeks.error || standingsData.error || gshlTeamData.error || playoffProbData.error || weeks.data?.error ||  standingsData.data?.error || gshlTeamData.data?.error || playoffProbData.data?.error) { return <ErrorPage /> }
  return (
    <div className='my-4 mx-2'>
      <SeasonToggleNavbar setter={setSeasonID} activeKey={seasonID} />
      <StandingsToggleNavbar setter={setStandingsType} activeKey={standingsType} />
      <StandingsContainer {...{standings, gshlTeams, standingsType, seasonID, playoffProb}} />
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
  switch (props.standingsType) {
    case 'OVR':
      standings = [['', 'bg-gray-100', props.standings.sort((a, b) => a.OvrRk - b.OvrRk)]]
      break
    case 'SV':
      standings = [['', 'bg-sunview-50 bg-opacity-50', props.standings.filter(obj => obj.conf === props.standingsType).sort((a, b) => a.CCRk - b.CCRk)]]
      break
    case 'HH':
      standings = [['', 'bg-hotel-50 bg-opacity-50', props.standings.filter(obj => obj.conf === props.standingsType).sort((a, b) => a.CCRk - b.CCRk)]]
      break
    case 'PO':
      standings = [
        ['Sunview Top 3', 'bg-sunview-50 bg-opacity-50', props.standings.filter(obj => obj.conf === 'SV').sort((a, b) => a.CCRk - b.CCRk).slice(0, 3)],
        ['Hickory Hotel Top 3', 'bg-hotel-50 bg-opacity-50', props.standings.filter(obj => obj.conf === 'HH').sort((a, b) => a.CCRk - b.CCRk).slice(0, 3)],
        ['Wildcard', 'bg-gray-100 [&>*:nth-child(2)]:border-solid [&>*:nth-child(2)]:border-b-2 [&>*:nth-child(2)]:border-gray-800', props.standings.filter(obj => obj.WCRk !== '').sort((a, b) => a.WCRk - b.WCRk).slice(0, 6)],
        ['Loser\'s Tournament', 'bg-brown-100', props.standings.filter(obj => obj.WCRk !== '').sort((a, b) => a.WCRk - b.WCRk).slice(6)],
      ]
      break
    default:
      break
  }

  return (
    <>
      {standings.map((obj,i) => {
        return (
          <div key={i}>
            <div className='font-bold mt-8 text-center text-sm font-varela'>{obj[0]}</div>
            <div className={'mb-4 p-2 rounded-xl shadow-md [&>*:last-child]:border-none ' + obj[1]} >
              {obj[2].map(team => {
                return (<StandingsItem {...{'key':team.teamID,'teamData':team,...props}} />
                )
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}

function StandingsItem(props) {
  let teamInfo = props.gshlTeams.filter(obj => obj[props.seasonID] === props.teamData.teamID)[0]
  let teamProb = props.playoffProb.filter(obj => obj.teamID === props.teamData.teamID)[0]
  if (!teamProb || !teamInfo) { return <></> }
  return (
    <div key={props.teamData.teamID} className="grid grid-cols-12 mx-auto py-1 font-varela text-center items-center border-b border-dotted border-gray-400">
      <div className="col-span-2 p-1"><img className="w-12" src={teamInfo?.LogoURL} alt="Team Logo" /></div>
      <div className="col-span-6 font-bold text-base">
        {+teamProb.OneSeed === 1 ? 'z - ' : +teamProb.OneConf === 1 ? 'y - ' : +teamProb.POPer === 1 ? 'x - ' : +teamProb.LBPer === 1 ? 'l - ' : +teamProb.POPer === 0 ? 'e - ' : ''}
        {props.teamData.teamName}
      </div>
      <div className="col-span-2 text-sm">{props.teamData.W} - {props.teamData.L}</div>
      <div className="col-span-2 text-2xs">{props.teamData.CF} / {props.teamData.CA}</div>
    </div>
  )
}
