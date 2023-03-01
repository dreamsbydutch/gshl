import React, { useState, useEffect } from 'react'
import { queryFunc } from '../utils/fetchData'
import LoadingSpinner from '../components/LoadingSpinner'
import { useQuery } from 'react-query'
import ErrorPage from '../components/ErrorPage'
import { TeamsToggle } from '../components/PageNavbar'

export default function LockerRoom() {
  const [teamID, setTeamID] = useState(null)
  const [seasonID, setSeasonID] = useState(null)

  let date = new Date()
  const hour = date.getHours()
  date = new Date(date.getFullYear(), date.getMonth(), hour < 5 ? date.getDate() - 1 : date.getDate())
  const season = String((date.getMonth() < 8 ? date.getFullYear() : date.getFullYear() + 1))

  const weeks = useQuery([['LockerRoom', 'CurrentWeek'], 'MainInput', 'Weeks'], queryFunc)
  const standingsData = useQuery([['LockerRoom', 'Standings'], season + 'TeamData', 'Standings'], queryFunc)
  const gshlTeamData = useQuery([['LockerRoom', 'GSHLTeams'], 'MainInput', 'GSHLTeams'], queryFunc)
  const playoffProbData = useQuery([['LockerRoom', 'PlayoffProb'], season + 'TeamData', 'Probabilities'], queryFunc)

  const currentWeek = weeks.data?.filter(obj => (obj.Season === season) && ((new Date(obj.StartDate + ' 00:00:00')) <= date) && ((new Date(obj.EndDate + ' 00:00:00')) >= date))[0]
  const currentTeam = gshlTeamData.data?.filter(obj => obj[seasonID] === teamID)[0]

  useEffect(() => {
    setSeasonID(currentWeek?.Season)
  }, [currentWeek])



  if (weeks.isLoading || standingsData.isLoading || gshlTeamData.isLoading || playoffProbData.isLoading) { return <LoadingSpinner /> }
  if (weeks.error || standingsData.error || gshlTeamData.error || playoffProbData.error || weeks.data?.error || standingsData.data?.error || gshlTeamData.data?.error || playoffProbData.data?.error) { return <ErrorPage /> }

  return (
    <div className="my-10 font-varela text-center">
      <TeamsToggle setter={setTeamID} season={seasonID} activeKey={teamID} />
      {teamID &&
        <>
          <div className="mx-3 mt-16 font-bold text-4xl flex flex-row items-center justify-center">
            <img className='w-12 h-12 mx-3' src={currentTeam?.LogoURL} alt="Team Logo" />
            {currentTeam?.TeamName}
          </div>
          <TeamPlayerContracts {...{ currentTeam, currentWeek, seasonID }} />
          <TeamRoster {...{ currentTeam, currentWeek, seasonID }} />
          <TeamPlayerStats {...{ currentTeam, currentWeek, seasonID }} />
        </>
      }
    </div>
  )
}


function TeamPlayerContracts(props) {
  const contractData = useQuery(['Contracts', 'MainInput', 'Contracts'], queryFunc)

  const teamContracts = contractData.data?.filter(obj => obj.CurrentTeam === props.currentTeam[props.seasonID])
  const currentTeamContracts = teamContracts?.filter(obj => obj.YearsRemaining > 0)
  let formatter = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'USD', minimumSignificantDigits: 1 })

  if (contractData.isLoading) { return <LoadingSpinner /> }
  if (contractData.error || contractData.data?.error) { return <ErrorPage /> }
  return (
    <>
      <div className='mt-8 text-center mx-auto text-xl font-bold'>Current Contracts & Buyouts</div>
      <div className='table-auto overflow-scroll'>
        <table className='mx-auto overflow-x-auto'>
          <thead>
            <tr>
              <th className='sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Name</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Pos</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>2022-23</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>2023-24</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>2024-25</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>2025-26</th>
            </tr>
          </thead>
          <tbody>
            {currentTeamContracts.sort((a, b) => +b.CapHit - +a.CapHit).map((obj, i) => {
              return (
                <tr key={i} className={`${obj.ExpiryType === "Buyout" ? 'text-gray-400' : 'text-gray-800'}`}>
                  <td className="sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50">{obj.Player}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.Pos}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{formatter.format(obj.CapHit).replace("US", "")}</td>
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
            <tr>
              <td className="sticky left-0 font-bold py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">Cap Space</td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200"></td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">{formatter.format(22500000 - teamContracts?.filter(obj => obj.YearsRemaining > 0).reduce((acc, obj) => acc + +obj.CapHit, 0)).replace("US", "")}</td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">{formatter.format(22500000 - teamContracts?.filter(obj => obj.YearsRemaining > 1).reduce((acc, obj) => acc + +obj.CapHit, 0)).replace("US", "")}</td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">{formatter.format(27500000 - teamContracts?.filter(obj => obj.YearsRemaining > 2).reduce((acc, obj) => acc + +obj.CapHit, 0)).replace("US", "")}</td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">{formatter.format(27500000 - teamContracts?.filter(obj => obj.YearsRemaining > 3).reduce((acc, obj) => acc + +obj.CapHit, 0)).replace("US", "")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

function TeamRoster(props) {
  const showSalaries = false

  const rosterData = useQuery([['LockerRoom', 'TeamRoster', 'currentRosters'], props.seasonID + 'PlayerData', 'CurrentRosters'], queryFunc)
  const salaryData = useQuery([['LockerRoom', 'TeamRoster', 'Salaries'], props.seasonID + 'PlayerData', 'Salaries'], queryFunc)
  const currentRoster = rosterData.data?.filter(obj => obj.gshlTeam === props.currentTeam[props.seasonID]).sort((a, b) => a.Rank - b.Rank)
  const teamLineup = currentRoster?.filter(obj => obj.LineupPos === "Util")[0]?.nhlPos !== "D" ? [[
    [currentRoster?.filter(obj => obj.LineupPos === "LW")[0], currentRoster?.filter(obj => obj.LineupPos === "C")[0], currentRoster?.filter(obj => obj.LineupPos === "RW")[0]],
    [currentRoster?.filter(obj => obj.LineupPos === "LW")[1], currentRoster?.filter(obj => obj.LineupPos === "C")[1], currentRoster?.filter(obj => obj.LineupPos === "RW")[1]],
    [null, null, currentRoster?.filter(obj => obj.LineupPos === "Util")[0], null, null],], [
    [null, currentRoster?.filter(obj => obj.LineupPos === "D")[0], currentRoster?.filter(obj => obj.LineupPos === "D")[1], null],
    [null, null, currentRoster?.filter(obj => obj.LineupPos === "D")[2], null, null],], [
    [null, null, currentRoster?.filter(obj => obj.LineupPos === "G")[0], null, null],
  ]] : [[
    [currentRoster?.filter(obj => obj.LineupPos === "LW")[0], currentRoster?.filter(obj => obj.LineupPos === "C")[0], currentRoster?.filter(obj => obj.LineupPos === "RW")[0]],
    [currentRoster?.filter(obj => obj.LineupPos === "LW")[1], currentRoster?.filter(obj => obj.LineupPos === "C")[1], currentRoster?.filter(obj => obj.LineupPos === "RW")[1]],], [
    [null, currentRoster?.filter(obj => obj.LineupPos === "D")[0], currentRoster?.filter(obj => obj.LineupPos === "D")[1], null],
    [null, currentRoster?.filter(obj => obj.LineupPos === "D")[2], currentRoster?.filter(obj => obj.LineupPos === "Util")[0], null],], [
    [null, null, currentRoster?.filter(obj => obj.LineupPos === "G")[0], null, null],
  ]]

  if (rosterData.isLoading || salaryData.isLoading) { return <LoadingSpinner /> }
  if (rosterData.isError || rosterData.error || !rosterData.data || salaryData.isError || salaryData.error || !salaryData.data) { return <ErrorPage /> }
  return (
    <>
      <div className='mt-12 text-center mx-auto text-xl font-bold'>Current Roster</div>
      <div className="flex flex-col max-w-md mx-auto border rounded-xl bg-gray-50">
        {teamLineup.map(x => {
          return (
            <>
            {x.map(obj => {
                return (
                  <div className="grid grid-cols-6 items-center py-2">
                    {obj.map(a => {
                      if (!a) { return <div></div> }
                      return (
                        <div className="grid grid-cols-2 col-span-2 text-center px-2">
                          <div className="col-span-3 text-sm">{a?.PlayerName}</div>
                          <div className="text-2xs">{a?.nhlPos}</div>
                          <div><img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${a?.nhlTeam.split(",").slice(-1)}.png`} alt="NHL Team Logo" className='h-4 w-4 mx-auto' /></div>
                          <div className={`text-2xs rounded-lg px-2 max-w-fit place-self-center ${a?.Rank < 76 ? 'bg-emerald-200' : a?.Rank < 151 ? 'bg-yellow-200' : a?.Rank < 226 ? 'bg-orange-200' : 'bg-rose-200'}`}>{Math.round(+(a?.Rating) * 100) / 100}</div>
                          <div className="text-2xs my-1 col-span-3">{showSalaries && a.ContractEligible === "TRUE" && salaryData.data?.filter(b => b.PlayerName === a?.PlayerName)[0]?.currentSalary}</div>
                        </div>
                      )
                    })}
                  </div>
                )
              })
            }
            <span className='border-b'></span>
            </>
          )
        })}
      </div>
      <div className="flex flex-col max-w-md mx-auto border rounded-xl bg-brown-50 mt-2">
        <div className="grid grid-cols-2 items-center my-2 mx-2">
          {currentRoster?.filter(obj => obj.LineupPos === "BN").map((obj, i) => {
            return (
              <div key={i} className="grid grid-cols-2 text-center px-2 my-2">
                <div className="col-span-3 text-sm">{obj?.PlayerName}</div>
                <div className="text-2xs">{obj?.nhlPos}</div>
                <div><img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${obj?.nhlTeam.split(",").slice(-1)}.png`} alt="NHL Team Logo" className='h-4 w-4 mx-auto' /></div>
                <div className={`text-2xs rounded-lg px-2 max-w-fit place-self-center ${obj?.Rank < 76 ? 'bg-emerald-200' : obj?.Rank < 151 ? 'bg-yellow-200' : obj?.Rank < 226 ? 'bg-orange-200' : 'bg-rose-200'}`}>{Math.round(+(obj?.Rating) * 100) / 100}</div>
                <div className="text-2xs my-1 col-span-3">{showSalaries && obj.ContractEligible === "TRUE" && salaryData.data?.filter(a => a.PlayerName === obj?.PlayerName)[0]?.currentSalary}</div>
              </div>
            )
          }
          )
          }
        </div>
      </div>
    </>
  )
}

function TeamPlayerStats(props) {
  const playerSeasonData = useQuery([['Locker Room', 'Team Player Stats', 'Player Season Totals'], props.seasonID + 'PlayerData', 'Splits'], queryFunc)
  const teamPlayers = playerSeasonData.data?.filter(obj => obj.gshlTeam === props.currentTeam[props.seasonID])

  if (playerSeasonData.isLoading) { return <LoadingSpinner /> }
  if (playerSeasonData.isError || playerSeasonData.error || !playerSeasonData.data) { return <ErrorPage /> }
  return (
    <>
      <div className='mt-8 text-center mx-auto text-xl font-bold'>Team Player Stats</div>
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
                  <td className="sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50">{obj.PlayerName}</td>
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
                  <td className="sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50">{obj.PlayerName}</td>
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