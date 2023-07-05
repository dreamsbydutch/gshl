import React, { useState, useEffect } from 'react'
import { queryFunc, usePlayerSplits } from '../utils/fetchData'
import LoadingSpinner from '../components/LoadingSpinner'
import { useQuery } from 'react-query'
import { SeasonToggleNavbar, SecondaryPageToolbar, TeamsToggle } from '../components/PageNavbar'
import TeamRoster from '../components/CurrentRoster'
import { useTeams } from '../utils/context'
import { seasons } from '../utils/constants'
import { LockerRoomPlayerStatPropsType, LockerRoomTeamStatPropsType, PlayerContractType, PlayerRosterType, PlayerSplitsType, QueryKeyType, TeamTotalsType, TeamWeeksType, Seasons, TeamDraftPickType, TeamInfoType } from '../utils/endpointTypes'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

type salaryCapTotalsType = TeamInfoType & { 'capSpace': number }

export default function LockerRoom() {
  const gshlTeams = useTeams()
  const [type, setType] = useState("Contracts")
  const [teamID, setTeamID] = useState<number | undefined>(undefined)
  const [teamInfo, setTeamInfo] = useState<TeamInfoType | undefined>(undefined)
  const [season, setSeason] = useState<Seasons>(seasons[0].Season)

  const playerSeasonKey: QueryKeyType = [season, 'PlayerData', 'Splits']
  const playerSeasonResponse = useQuery(playerSeasonKey, queryFunc)
  const playerSeasonData: PlayerSplitsType[] = usePlayerSplits()
  const currentRosterKey: QueryKeyType = [season, 'PlayerData', 'CurrentRosters']
  const currentRosterResponse = useQuery(currentRosterKey, queryFunc)
  const currentRosterData: PlayerRosterType[] = currentRosterResponse.data
  const teamWeeksKey: QueryKeyType = [season, 'TeamData', 'Weeks']
  const teamWeeksResponse = useQuery(teamWeeksKey, queryFunc)
  const teamWeeksData: TeamWeeksType[] = teamWeeksResponse.data
  const teamSeasonsKey: QueryKeyType = [season, 'TeamData', 'Seasons']
  const teamSeasonsResponse = useQuery(teamSeasonsKey, queryFunc)
  const teamSeasonsData: TeamTotalsType[] = teamSeasonsResponse.data
  const queryKey: QueryKeyType = [seasons[0].Season, 'MainInput', 'Contracts']
  const contractQuery = useQuery(queryKey, queryFunc)
  const contractData: PlayerContractType[] = contractQuery.data
  const teamContracts = contractData?.filter(obj => obj.CurrentTeam === teamID)
  const data = gshlTeams && gshlTeams.filter(obj => obj[season]).sort((a, b) => a[season] - b[season])
  const teamWeeksProp = teamWeeksData?.filter(obj => obj.gshlTeam === teamID)
  const playerStatprops: LockerRoomPlayerStatPropsType = { teamInfo, season, playerSeasonData, currentRosterData, teamContracts }
  const teamStatprops: LockerRoomTeamStatPropsType = { teamInfo, season, 'teamWeeksData': teamWeeksProp, teamSeasonsData, teamContracts }

  const seasonToolbarProps = {
    'setter': setSeason,
    'activeKey': String(season),
    'position': ['absolute top-4 right-4', 'right-0']
  }

  useEffect(() => {
    setTeamInfo(gshlTeams?.filter(obj => obj['2023'] === teamID)[0])
  }, [gshlTeams, teamID])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [teamID, type]);

  if (!contractData || !gshlTeams) {return <LoadingSpinner />}

  const gshlTeamsCapSpace: salaryCapTotalsType[] | undefined = gshlTeams.map(obj => {
    const temp = { ...obj, 'capSpace': 22500000 - sumObjectByKey(contractData.filter(a => a.CurrentTeam === obj[seasons[0].Season] && +a.YearsRemaining > 0 && a.ExpiryType !== 'Buyout'), 'CapHit') }
    return temp
  })
  console.log(gshlTeamsCapSpace)

  return (
    <div className="my-4 font-varela text-center">

      <TeamsToggle {...{ 'setter': setTeamID, 'activeKey': teamID, 'toolbarKeys': data }} />
      {teamID &&
        <>
          <SecondaryPageToolbar {...{ 'setter': setType, 'activeKey': type, 'toolbarKeys': ["Contracts", "Player Stats", "Team Stats", "History"] }} />
          <div className="font-bold text-2xl flex flex-col items-center justify-center mb-4">
            <img className='max-w-xs w-2/6 h-2/6 mx-auto' src={teamInfo?.LogoURL} alt="Team Logo" />
            {teamInfo?.TeamName}
          </div>
          {type === "Contracts" &&
            <>
              <TeamPlayerContracts {...playerStatprops} />
              <TeamDraftPicks {...playerStatprops} />
              <TeamRoster {...playerStatprops} />
            </>
          }
          {type === "Player Stats" &&
            <>
              {/* <SeasonToggleNavbar {...seasonToolbarProps} /> */}
              <TeamPlayerStats {...playerStatprops} />
              <TeamPOPlayerStats {...playerStatprops} />
              <TeamLTPlayerStats {...playerStatprops} />
            </>
          }
          {type === "Team Stats" &&
            <>
              <TeamStatChart {...teamStatprops} />
            </>
          }
          {type === "History" && <></>

          }
          <div className="mb-14 text-white">.</div>
        </>
      }
      {!teamID &&
        <>
          <div className='mt-8 text-center mx-auto text-xl font-bold'>GSHL Salary Caps</div>
          <div className='table-auto overflow-scroll no-scrollbar'>
            <table className='mx-auto overflow-x-auto border border-black'>
              <thead>
                <tr key="header">
                  <th className='sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Team</th>
                  <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>2023-24</th>
                  <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>2024-25</th>
                  <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>2025-26</th>
                </tr>
              </thead>
              <tbody>
                {gshlTeamsCapSpace?.filter(obj => obj[seasons[0].Season]).sort((a, b) => b.capSpace - a.capSpace).map(team => {
                  console.log(team.capSpace)
                  let formatter = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'USD', minimumSignificantDigits: 1 })
                  return (
                    <tr key={team.id}>
                      <td className='sticky left-0 flex justify-start px-2 py-1 text-sm font-normal text-gray-800 bg-gray-50 whitespace-nowrap'>
                        <div className='place-self-center overflow-hidden'><img src={team.LogoURL} alt="NHL Team Logo" className='h-6 w-6 mx-2 inline-block' />{team.TeamName}</div>
                      </td>
                      <td className='px-2 py-1 text-xs font-normal text-center text-gray-800 whitespace-nowrap'>{formatter.format(22500000 - sumObjectByKey(contractData?.filter(obj => obj.CurrentTeam === team[seasons[0].Season] && +obj.YearsRemaining > 0 && obj.ExpiryType !== 'Buyout'), 'CapHit')).replace("US", "")} ({contractData?.filter(obj => obj.CurrentTeam === team[seasons[0].Season] && +obj.YearsRemaining > 0 && obj.ExpiryType !== 'Buyout').length})</td>
                      <td className='px-2 py-1 text-xs font-normal text-center text-gray-800 whitespace-nowrap'>{formatter.format(25000000 - sumObjectByKey(contractData?.filter(obj => obj.CurrentTeam === team[seasons[0].Season] && +obj.YearsRemaining > 1 && obj.ExpiryType !== 'Buyout'), 'CapHit')).replace("US", "")} ({contractData?.filter(obj => obj.CurrentTeam === team[seasons[0].Season] && +obj.YearsRemaining > 1 && obj.ExpiryType !== 'Buyout').length})</td>
                      <td className='px-2 py-1 text-xs font-normal text-center text-gray-800 whitespace-nowrap'>{formatter.format(25000000 - sumObjectByKey(contractData?.filter(obj => obj.CurrentTeam === team[seasons[0].Season] && +obj.YearsRemaining > 2 && obj.ExpiryType !== 'Buyout'), 'CapHit')).replace("US", "")} ({contractData?.filter(obj => obj.CurrentTeam === team[seasons[0].Season] && +obj.YearsRemaining > 2 && obj.ExpiryType !== 'Buyout').length})</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

        </>
      }
    </div>
  )
}


function TeamPlayerContracts(props: LockerRoomPlayerStatPropsType) {
  const currentTeamContracts = props.teamContracts?.filter(obj => +obj.YearsRemaining > 0 || (+obj.YearsRemaining === 0 && obj.ExpiryType !== "Buyout"))
  let formatter = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'USD', minimumSignificantDigits: 1 })

  if (!currentTeamContracts) { return <LoadingSpinner /> }
  return (
    <>
      <div className='text-center mx-auto text-xl font-bold'>Current Contracts & Buyouts</div>
      <div className='table-auto overflow-scroll no-scrollbar'>
        <table className='mx-auto overflow-x-auto'>
          <thead>
            <tr>
              <th className='sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Name</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Pos</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>2023-24</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>2024-25</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>2025-26</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>2026-27</th>
            </tr>
          </thead>
          <tbody>
            {currentTeamContracts?.sort((a, b) => +b.CapHit - +a.CapHit).map((obj, i) => {
              if (obj === null) { return <tr></tr> }
              return (
                <tr key={i} className={`${obj.ExpiryType === "Buyout" ? 'text-gray-400' : 'text-gray-800'}`}>
                  <td className="sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50">{obj.PlayerName}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.Pos}</td>
                  {+obj.YearsRemaining > 0 ?
                    <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{formatter.format(obj.CapHit).replace("US", "")}</td>
                    : +obj.YearsRemaining === 0 ?
                      <td className={`my-1 mx-2 text-center text-2xs font-bold rounded-xl border-t border-b border-gray-300 ${obj.ExpiryType === "RFA" ? 'text-orange-700 bg-orange-100' : obj.ExpiryType === "UFA" ? 'text-rose-800 bg-rose-100' : ''}`}>{obj.ExpiryType === 'Buyout' ? '' : obj.ExpiryType}</td>
                      : <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300"></td>
                  }
                  {+obj.YearsRemaining > 1 ?
                    <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{formatter.format(obj.CapHit).replace("US", "")}</td>
                    : +obj.YearsRemaining === 1 ?
                      <td className={`my-1 mx-2 text-center text-2xs font-bold rounded-xl border-t border-b border-gray-300 ${obj.ExpiryType === "RFA" ? 'text-orange-700 bg-orange-100' : obj.ExpiryType === "UFA" ? 'text-rose-800 bg-rose-100' : ''}`}>{obj.ExpiryType === 'Buyout' ? '' : obj.ExpiryType}</td>
                      : <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300"></td>
                  }
                  {+obj.YearsRemaining > 2 ?
                    <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{formatter.format(obj.CapHit).replace("US", "")}</td>
                    : +obj.YearsRemaining === 2 ?
                      <td className={`my-1 mx-2 text-center text-2xs font-bold rounded-xl border-t border-b border-gray-300 ${obj.ExpiryType === "RFA" ? 'text-orange-700 bg-orange-100' : obj.ExpiryType === "UFA" ? 'text-rose-800 bg-rose-100' : ''}`}>{obj.ExpiryType === 'Buyout' ? '' : obj.ExpiryType}</td>
                      : <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300"></td>
                  }
                  {+obj.YearsRemaining > 3 ?
                    <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{formatter.format(obj.CapHit).replace("US", "")}</td>
                    : +obj.YearsRemaining === 3 ?
                      <td className={`my-1 mx-2 text-center text-2xs font-bold rounded-xl border-t border-b border-gray-300 ${obj.ExpiryType === "RFA" ? 'text-orange-700 bg-orange-100' : obj.ExpiryType === "UFA" ? 'text-rose-800 bg-rose-100' : ''}`}>{obj.ExpiryType === 'Buyout' ? '' : obj.ExpiryType}</td>
                      : <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300"></td>
                  }
                </tr>
              )
            })}

            <tr key='CapSpace'>
              <td className="sticky left-0 font-bold py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">Cap Space</td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200"></td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">{formatter.format(22500000 - currentTeamContracts?.filter(obj => obj.YearsRemaining > 0).reduce((acc, obj) => acc + +obj.CapHit, 0)).replace("US", "")}</td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">{formatter.format(27500000 - currentTeamContracts?.filter(obj => obj.YearsRemaining > 1).reduce((acc, obj) => acc + +obj.CapHit, 0)).replace("US", "")}</td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">{formatter.format(27500000 - currentTeamContracts?.filter(obj => obj.YearsRemaining > 2).reduce((acc, obj) => acc + +obj.CapHit, 0)).replace("US", "")}</td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">{formatter.format(27500000 - currentTeamContracts?.filter(obj => obj.YearsRemaining > 3).reduce((acc, obj) => acc + +obj.CapHit, 0)).replace("US", "")}</td>
            </tr>
          </tbody>
        </table>
      </div>



    </>
  )
}
function TeamDraftPicks(props: LockerRoomPlayerStatPropsType) {
  const gshlTeams = useTeams()
  const draftPickQueryKey: QueryKeyType = [seasons[0].Season, 'TeamData', 'DraftPicks']
  const draftPickQuery = useQuery(draftPickQueryKey, queryFunc)
  const draftPickData: TeamDraftPickType[] = draftPickQuery.data
  const currentTeamContracts = props.teamContracts?.filter(obj => (+obj.YearsRemaining > 0 || (+obj.YearsRemaining === 0 && obj.ExpiryType !== "Buyout"))).sort((a, b) => b.CapHit - a.CapHit)

  const numberSuffix = (num: number) => {
    num = num < 20 ? num : num % 10
    switch (num) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  const teamDraftPicks = draftPickData?.filter(obj => props.teamInfo && obj.gshlTeam === props.teamInfo[seasons[0].Season])

  if (!teamDraftPicks) { return <LoadingSpinner /> }
  return (
    <>
      <div className='mt-4 mx-auto text-xl font-bold'>Draft Picks</div>
      {teamDraftPicks?.sort((a, b) => a.Pick - b.Pick).map((obj, i) => {
        if (obj === null) { return <tr></tr> }
        let originalTeam = null
        if (obj.OriginalTeam !== obj.gshlTeam) {
          originalTeam = gshlTeams?.filter(x => x[seasons[0].Season] === obj.OriginalTeam)[0]
        }
        if (teamDraftPicks.length - i > currentTeamContracts.length) {
          return (
            <div key={i + 1} className='text-gray-800'>
              <div className="mx-auto w-5/6 py-1 px-2 text-center text-xs border-t border-gray-300">
                {obj.Rd + numberSuffix(+obj.Rd)} Round, {obj.Pick + numberSuffix(+obj.Pick)} Overall{originalTeam ? ` (via ${originalTeam.TeamName})` : ''}
              </div>
            </div>
          )
        }
        return (
          <div key={i + 1} className='text-gray-400'>
            <div className="mx-auto w-5/6 py-1 px-2 text-center text-xs border-t border-gray-300">
              {currentTeamContracts[teamDraftPicks.length - i - 1].PlayerName}, {currentTeamContracts[teamDraftPicks.length - i - 1].Pos} ({obj.Rd + numberSuffix(+obj.Rd)} Round)
            </div>
          </div>
        )

      })}
    </>
  )
}

function TeamPlayerStats(props: LockerRoomPlayerStatPropsType) {
  const teamPlayers = props.playerSeasonData?.filter(obj => props.teamInfo && obj.gshlTeam === props.teamInfo[seasons[0].Season] && obj.WeekType === "RS")
  const currentRoster = props.currentRosterData?.filter(obj => props.teamInfo && obj.gshlTeam === props.teamInfo[seasons[0].Season])
  console.log(props)

  if (!props.teamInfo || !teamPlayers) { return <LoadingSpinner /> }
  return (
    <>
      <div className='mt-8 text-center mx-auto text-xl font-bold'>Regular Season Stats</div>
      <div className='table-auto overflow-scroll'>
        <table className='mx-auto overflow-x-auto'>
          <thead>
            <tr>
              <th className='sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Name</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Pos</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Team</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>G</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>A</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>P</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>PPP</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>SOG</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>HIT</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>BLK</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Rtg</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Days</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>GP</th>
            </tr>
          </thead>
          <tbody>
            {teamPlayers.sort((a, b) => +b.Rating - +a.Rating).filter(obj => obj.nhlPos !== "G").map(obj => {
              return (
                <tr key={obj.id}>
                  <td className={`${currentRoster?.filter(a => a.PlayerName === obj.PlayerName).length > 0 ? 'font-bold' : 'text-gray-500'} sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50`}>{obj.PlayerName}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.nhlPos}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300"><img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${obj?.nhlTeam.split(",").slice(-1)}.png`} alt="NHL Team Logo" className='h-4 w-4 mx-auto' /></td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.G}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.A}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.P}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.PPP}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.SOG}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.HIT}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.BLK}</td>
                  <td className="py-1 px-2 text-center text-xs font-bold border-t border-b border-gray-300 bg-gray-50">{Math.round(obj.Rating * 10) / 10}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.RosterDays}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.GS}</td>
                </tr>
              )
            })}
          </tbody>
          <thead>
            <tr>
              <th className='sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Name</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Pos</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Team</th>
              <th colSpan='2' className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>W</th>
              <th colSpan='2' className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>GAA</th>
              <th colSpan='2' className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>SV%</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'></th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Rtg</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Days</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>GP</th>
            </tr>
          </thead>
          <tbody>
            {teamPlayers.sort((a, b) => +b.Rating - +a.Rating).filter(obj => obj.nhlPos === "G").map(obj => {
              return (
                <tr key={obj.id}>
                  <td className={`${currentRoster?.filter(a => a.PlayerName === obj.PlayerName).length > 0 ? 'font-bold' : ''} sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50`}>{obj.PlayerName}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.nhlPos}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300"><img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${obj?.nhlTeam.split(",").slice(-1)}.png`} alt="NHL Team Logo" className='h-4 w-4 mx-auto' /></td>
                  <td colSpan={2} className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.W}</td>
                  <td colSpan={2} className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.GAA}</td>
                  <td colSpan={2} className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.SVP}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300"></td>
                  <td className="py-1 px-2 text-center text-xs font-bold border-t border-b border-gray-300 bg-gray-50">{Math.round(obj.Rating * 10) / 10}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.RosterDays}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.GS}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
function TeamPOPlayerStats(props: LockerRoomPlayerStatPropsType) {
  const teamPlayers = props.playerSeasonData?.filter(obj => props.teamInfo && obj.gshlTeam === props.teamInfo[seasons[0].Season] && obj.WeekType === "PO")
  const currentRoster = props.currentRosterData?.filter(obj => props.teamInfo && obj.gshlTeam === props.teamInfo[seasons[0].Season])

  if (!props.teamInfo || !teamPlayers) { return <LoadingSpinner /> }
  if (teamPlayers.length === 0) { return <div></div> }
  return (
    <>
      <div className='mt-8 text-center mx-auto text-xl font-bold'>Playoff Stats</div>
      <div className='table-auto overflow-scroll'>
        <table className='mx-auto overflow-x-auto'>
          <thead>
            <tr>
              <th className='sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Name</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Pos</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Team</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>G</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>A</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>P</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>PPP</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>SOG</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>HIT</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>BLK</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Rtg</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Days</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>GP</th>
            </tr>
          </thead>
          <tbody>
            {teamPlayers.sort((a, b) => +b.Rating - +a.Rating).filter(obj => obj.nhlPos !== "G").map(obj => {
              return (
                <tr key={obj.id}>
                  <td className={`${currentRoster?.filter(a => a.PlayerName === obj.PlayerName).length > 0 ? 'font-bold' : 'text-gray-500'} sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50`}>{obj.PlayerName}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.nhlPos}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300"><img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${obj?.nhlTeam.split(",").slice(-1)}.png`} alt="NHL Team Logo" className='h-4 w-4 mx-auto' /></td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.G}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.A}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.P}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.PPP}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.SOG}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.HIT}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.BLK}</td>
                  <td className="py-1 px-2 text-center text-xs font-bold border-t border-b border-gray-300 bg-gray-50">{Math.round(obj.Rating * 10) / 10}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.RosterDays}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.GS}</td>
                </tr>
              )
            })}
          </tbody>
          <thead>
            <tr>
              <th className='sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Name</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Pos</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Team</th>
              <th colSpan={2} className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>W</th>
              <th colSpan={2} className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>GAA</th>
              <th colSpan={2} className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>SV%</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'></th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Rtg</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Days</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>GP</th>
            </tr>
          </thead>
          <tbody>
            {teamPlayers.sort((a, b) => +b.Rating - +a.Rating).filter(obj => obj.nhlPos === "G").map(obj => {
              return (
                <tr key={obj.id}>
                  <td className={`${currentRoster?.filter(a => a.PlayerName === obj.PlayerName).length > 0 ? 'font-bold' : ''} sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50`}>{obj.PlayerName}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.nhlPos}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300"><img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${obj?.nhlTeam.split(",").slice(-1)}.png`} alt="NHL Team Logo" className='h-4 w-4 mx-auto' /></td>
                  <td colSpan={2} className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.W}</td>
                  <td colSpan={2} className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.GAA}</td>
                  <td colSpan={2} className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.SVP}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300"></td>
                  <td className="py-1 px-2 text-center text-xs font-bold border-t border-b border-gray-300 bg-gray-50">{Math.round(obj.Rating * 10) / 10}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.RosterDays}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.GS}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
function TeamLTPlayerStats(props: LockerRoomPlayerStatPropsType) {
  const teamPlayers = props.playerSeasonData?.filter(obj => props.teamInfo && obj.gshlTeam === props.teamInfo[seasons[0].Season] && obj.WeekType === "LT")
  const currentRoster = props.currentRosterData?.filter(obj => props.teamInfo && obj.gshlTeam === props.teamInfo[seasons[0].Season])

  if (!props.teamInfo || !teamPlayers) { return <LoadingSpinner /> }
  if (teamPlayers.length === 0) { return <div></div> }
  return (
    <>
      <div className='mt-8 text-center mx-auto text-xl font-bold'>Loser's Tournament Stats</div>
      <div className='table-auto overflow-scroll'>
        <table className='mx-auto overflow-x-auto'>
          <thead>
            <tr>
              <th className='sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Name</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Pos</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Team</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>G</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>A</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>P</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>PPP</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>SOG</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>HIT</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>BLK</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Rtg</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Days</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>GP</th>
            </tr>
          </thead>
          <tbody>
            {teamPlayers.sort((a, b) => +b.Rating - +a.Rating).filter(obj => obj.nhlPos !== "G").map(obj => {
              return (
                <tr key={obj.id}>
                  <td className={`${currentRoster?.filter(a => a.PlayerName === obj.PlayerName).length > 0 ? 'font-bold' : 'text-gray-500'} sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50`}>{obj.PlayerName}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.nhlPos}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300"><img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${obj?.nhlTeam.split(",").slice(-1)}.png`} alt="NHL Team Logo" className='h-4 w-4 mx-auto' /></td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.G}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.A}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.P}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.PPP}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.SOG}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.HIT}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.BLK}</td>
                  <td className="py-1 px-2 text-center text-xs font-bold border-t border-b border-gray-300 bg-gray-50">{Math.round(obj.Rating * 10) / 10}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.RosterDays}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.GS}</td>
                </tr>
              )
            })}
          </tbody>
          <thead>
            <tr>
              <th className='sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Name</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Pos</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Team</th>
              <th colSpan='2' className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>W</th>
              <th colSpan='2' className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>GAA</th>
              <th colSpan='2' className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>SV%</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'></th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Rtg</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Days</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>GP</th>
            </tr>
          </thead>
          <tbody>
            {teamPlayers.sort((a, b) => +b.Rating - +a.Rating).filter(obj => obj.nhlPos === "G").map(obj => {
              return (
                <tr key={obj.id}>
                  <td className={`${currentRoster?.filter(a => a.PlayerName === obj.PlayerName).length > 0 ? 'font-bold' : ''} sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50`}>{obj.PlayerName}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.nhlPos}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300"><img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${obj?.nhlTeam.split(",").slice(-1)}.png`} alt="NHL Team Logo" className='h-4 w-4 mx-auto' /></td>
                  <td colSpan='2' className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.W}</td>
                  <td colSpan='2' className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.GAA}</td>
                  <td colSpan='2' className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.SVP}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300"></td>
                  <td className="py-1 px-2 text-center text-xs font-bold border-t border-b border-gray-300 bg-gray-50">{Math.round(obj.Rating * 10) / 10}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.RosterDays}</td>
                  <td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.GS}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

function TeamStatChart(props: LockerRoomTeamStatPropsType) {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const chartOptions = {
    scales: {
      y: {
        max: 140,
        min: -100,
        ticks: {
          stepSize: 20
        }
      },
      x: {
        max: 25,
        min: 0,
        ticks: {
          stepSize: 1
        }
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Weekly Team Ratings',
      },
    },
  };

  const labels = (new Array(25).fill(1)).map((obj, i) => i + 1)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: props.teamWeeksData?.map(obj => obj.YTDRtg),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <Line options={chartOptions} data={chartData} />
  )
}












function sumObjectByKey(array:any, key:string) {
  let sum = 0
  array?.forEach(obj => sum += +obj[key])
  return sum
}