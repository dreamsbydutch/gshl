import React, { useState, useEffect } from 'react'
import { queryFunc } from '../utils/fetchData'
import LoadingSpinner from '../components/LoadingSpinner'
import { useQuery } from 'react-query'
import { TeamsToggle } from '../components/PageNavbar'
// import TeamRoster from '../components/CurrentRoster'
import { useTeams } from '../utils/context'

export default function LockerRoom() {
  const gshlTeams = useTeams()
  const [teamID, setTeamID] = useState(null)
  const [teamInfo, setTeamInfo] = useState(null)
  let date = new Date()
  const season = String((date.getMonth() < 8 ? date.getFullYear() : date.getFullYear() + 1))

  useEffect(() => {
    setTeamInfo(gshlTeams?.filter(obj => obj.id === teamID)[0])
  }, [gshlTeams,teamID])
  
  return (
    <div className="my-10 font-varela text-center">
      <TeamsToggle setter={setTeamID} season={season} activeKey={teamID} />
      {teamID &&
        <>
          <div className="mx-3 mt-16 font-bold text-4xl flex flex-row items-center justify-center">
            <img className='w-12 h-12 mx-3' src={teamInfo?.LogoURL} alt="Team Logo" />
            {teamInfo?.TeamName}
          </div>
          <TeamPlayerContracts {...{ teamInfo, season }} />
          {/* <TeamRoster {...{ teamInfo, season }} /> */}
          <TeamPlayerStats {...{ teamInfo, season }} />
          <TeamPOPlayerStats {...{ teamInfo, season }} />
          <TeamLTPlayerStats {...{ teamInfo, season }} />
        </>
      }
    </div>
  )
}


function TeamPlayerContracts({ teamInfo }) {
  const contractData = useQuery(['MainInput', 'Contracts'], queryFunc)

  const teamContracts = contractData.data?.filter(obj => obj.CurrentTeam === teamInfo?.id)
  const currentTeamContracts = teamContracts?.filter(obj => +obj.YearsRemaining > 0 || (+obj.YearsRemaining === 0 && obj.ExpiryType !== "Buyout"))
  let formatter = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'USD', minimumSignificantDigits: 1 })

  // const [playerToAdd, setplayerToAdd] = useState("");
  // const [currentRemoved, setCurrentRemoved] = useState([]);
  // const [currentContracts, setCurrentContracts] = useState([]);
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setCurrentContracts((prevState) => [...prevState, playerToAdd]);
  //   setplayerToAdd("");
  // };
  // const handleRemove = (id) => {
  //   if (currentTeamContracts.filter(a => a.PlayerName === currentContracts[id]['PlayerName'])[0]) {
  //     console.log(1)
  //   }
  //     setCurrentContracts([currentContracts.slice(0, id), null, currentContracts.slice(id + 1)])
  // };

  if (!contractData.data) { return <LoadingSpinner /> }
  return (
    <>
      <div className='mt-8 text-center mx-auto text-xl font-bold'>Current Contracts & Buyouts</div>
      <div className='table-auto overflow-scroll'>
        <table className='mx-auto overflow-x-auto'>
          <thead>
            <tr>
              <th className='sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Name</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Pos</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>2023-24</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>2024-25</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>2025-26</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>2026-27</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'></th>
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
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">{formatter.format(22500000 - teamContracts?.filter(obj => obj.YearsRemaining > 0).reduce((acc, obj) => acc + +obj.CapHit, 0)).replace("US", "")}</td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">{formatter.format(25000000 - teamContracts?.filter(obj => obj.YearsRemaining > 1).reduce((acc, obj) => acc + +obj.CapHit, 0)).replace("US", "")}</td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">{formatter.format(25000000 - teamContracts?.filter(obj => obj.YearsRemaining > 2).reduce((acc, obj) => acc + +obj.CapHit, 0)).replace("US", "")}</td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">{formatter.format(25000000 - teamContracts?.filter(obj => obj.YearsRemaining > 3).reduce((acc, obj) => acc + +obj.CapHit, 0)).replace("US", "")}</td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200"></td>
            </tr>
          </tbody>
        </table>
      </div>



    </>
  )
}

function TeamPlayerStats({ teamInfo, season }) {
  const playerSeasonData = useQuery([season + 'PlayerData', 'Splits'], queryFunc)
  const currentRosterData = useQuery([season + 'PlayerData', 'CurrentRosters'], queryFunc)
  const teamPlayers = playerSeasonData.data?.filter(obj => obj.gshlTeam === teamInfo?.id && obj.WeekType === "RS")
  const currentRoster = currentRosterData.data?.filter(obj => obj.gshlTeam === teamInfo?.id)

  if (!teamInfo || !teamPlayers) { return <LoadingSpinner /> }
  return (
    <>
      <div className='mt-8 text-center mx-auto text-xl font-bold'>Season Stats</div>
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
function TeamPOPlayerStats({ teamInfo, season }) {
  const playerSeasonData = useQuery([season + 'PlayerData', 'Splits'], queryFunc)
  const currentRosterData = useQuery([season + 'PlayerData', 'CurrentRosters'], queryFunc)
  const teamPlayers = playerSeasonData.data?.filter(obj => obj.gshlTeam === teamInfo?.id && obj.WeekType === "PO")
  const currentRoster = currentRosterData.data?.filter(obj => obj.gshlTeam === teamInfo?.id)

  if (!teamInfo || !teamPlayers) { return <LoadingSpinner /> }
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
function TeamLTPlayerStats({ teamInfo, season }) {
  const playerSeasonData = useQuery([season + 'PlayerData', 'Splits'], queryFunc)
  const currentRosterData = useQuery([season + 'PlayerData', 'CurrentRosters'], queryFunc)
  const teamPlayers = playerSeasonData.data?.filter(obj => obj.gshlTeam === teamInfo?.id && obj.WeekType === "LT")
  const currentRoster = currentRosterData.data?.filter(obj => obj.gshlTeam === teamInfo?.id)

  if (!teamInfo || !teamPlayers) { return <LoadingSpinner /> }
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
