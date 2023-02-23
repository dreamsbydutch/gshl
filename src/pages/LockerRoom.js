import React, { useState, useEffect } from 'react'
import { useLockerRoom } from '../utils/fetchData'
import { TeamsToggle } from '../components/PageNavbar'

export default function LockerRoom(props) {
  const lockerRoomInfo = useLockerRoom(2023)
  const [teamID, setTeamID] = useState(null)
  const [seasonID, setSeasonID] = useState(null)
  const [teamInfo, setTeamInfo] = useState(null)
  useEffect(() => {
    setSeasonID(props.currentWeek.Season)
    setTeamInfo(lockerRoomInfo.data?.filter(obj => obj[seasonID] === teamID)[0])
  }, [props.currentWeek.Season, lockerRoomInfo, seasonID, teamID])
  return (
    <div className="my-10 font-varela">
      <TeamsToggle setter={setTeamID} season={seasonID} activeKey={teamID} />
      <div className="mt-16 font-bold text-3xl text-center">{teamInfo?.TeamName}</div>
      {teamID &&
        <>
          <TeamPlayerContracts data={teamInfo} />
          <TeamRoster data={teamInfo} />
          <TeamPlayerStats data={teamInfo} />
        </>
      }
    </div>
  )
}


function TeamPlayerContracts(props) {
  let formatter = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'CAD', minimumSignificantDigits: 1 })
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
            {props.data?.contracts.filter(obj => obj.YearsRemaining > 0).sort((a, b) => +b.CapHit - +a.CapHit).map((obj, i) => {
              return (
                <tr key={i} className={`${obj.ExpiryType === "Buyout" ? 'text-gray-400' : 'text-gray-800'}`}>
                  <td className="sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50">{obj.Player}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.Pos}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{formatter.format(obj.CapHit)}</td>
                  {+obj.YearsRemaining > 1 ?
                    <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{formatter.format(obj.CapHit)}</td>
                    : +obj.YearsRemaining === 1 ?
                      <td className={`my-1 mx-2 text-center text-2xs font-bold rounded-xl border-t border-b border-gray-300 ${obj.ExpiryType === "RFA" ? 'text-orange-700 bg-orange-100' : obj.ExpiryType === "UFA" ? 'text-rose-800 bg-rose-100' : ''}`}>{obj.ExpiryType === 'Buyout' ? '' : obj.ExpiryType}</td>
                      : <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300"></td>
                  }
                  {+obj.YearsRemaining > 2 ?
                    <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{formatter.format(obj.CapHit)}</td>
                    : +obj.YearsRemaining === 2 ?
                      <td className={`my-1 mx-2 text-center text-2xs font-bold rounded-xl border-t border-b border-gray-300 ${obj.ExpiryType === "RFA" ? 'text-orange-700 bg-orange-100' : obj.ExpiryType === "UFA" ? 'text-rose-800 bg-rose-100' : ''}`}>{obj.ExpiryType === 'Buyout' ? '' : obj.ExpiryType}</td>
                      : <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300"></td>
                  }
                  {+obj.YearsRemaining > 3 ?
                    <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{formatter.format(obj.CapHit)}</td>
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
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">{formatter.format(22500000 - props.data?.contracts.filter(obj => obj.YearsRemaining > 0).reduce((acc, obj) => acc + +obj.CapHit, 0))}</td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">{formatter.format(22500000 - props.data?.contracts.filter(obj => obj.YearsRemaining > 1).reduce((acc, obj) => acc + +obj.CapHit, 0))}</td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">{formatter.format(27500000 - props.data?.contracts.filter(obj => obj.YearsRemaining > 2).reduce((acc, obj) => acc + +obj.CapHit, 0))}</td>
              <td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">{formatter.format(27500000 - props.data?.contracts.filter(obj => obj.YearsRemaining > 3).reduce((acc, obj) => acc + +obj.CapHit, 0))}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

function TeamRoster(props) {
  return (
    <>
      <div className='mt-12 text-center mx-auto text-xl font-bold'>Current Roster</div>
      <div className="flex flex-col max-w-md mx-auto border rounded-xl bg-gray-50">
        <div className="grid grid-cols-3 items-center py-2">
          <div className="grid grid-cols-2 text-center px-2">
            <div className="col-span-2 text-sm">{props.data?.roster.filter(obj => obj.LineupPos === "LW")[0]['PlayerName']}</div>
            <div className="text-2xs">{props.data?.roster.filter(obj => obj.LineupPos === "LW")[0]['nhlPos']}</div>
            <div className={`text-2xs rounded-lg px-2 max-w-fit place-self-center ${props.data?.roster.filter(obj => obj.LineupPos === "LW")[0]['Rank'] < 76 ? 'bg-emerald-200' : props.data?.roster.filter(obj => obj.LineupPos === "LW")[0]['Rank'] < 151 ? 'bg-yellow-200' : props.data?.roster.filter(obj => obj.LineupPos === "LW")[0]['Rank'] < 226 ? 'bg-orange-200' : 'bg-rose-200'}`}>{Math.round(+(props.data?.roster.filter(obj => obj.LineupPos === "LW")[0]['Rating']) * 100) / 100}</div>
          </div>
          <div className="grid grid-cols-2 text-center px-2">
            <div className="col-span-2 text-sm">{props.data?.roster.filter(obj => obj.LineupPos === "C")[0]['PlayerName']}</div>
            <div className="text-2xs">{props.data?.roster.filter(obj => obj.LineupPos === "C")[0]['nhlPos']}</div>
            <div className={`text-2xs rounded-lg px-2 max-w-fit place-self-center ${props.data?.roster.filter(obj => obj.LineupPos === "C")[0]['Rank'] < 76 ? 'bg-emerald-200' : props.data?.roster.filter(obj => obj.LineupPos === "C")[0]['Rank'] < 151 ? 'bg-yellow-200' : props.data?.roster.filter(obj => obj.LineupPos === "C")[0]['Rank'] < 226 ? 'bg-orange-200' : 'bg-rose-200'}`}>{Math.round(+(props.data?.roster.filter(obj => obj.LineupPos === "C")[0]['Rating']) * 100) / 100}</div>
          </div>
          <div className="grid grid-cols-2 text-center px-2">
            <div className="col-span-2 text-sm">{props.data?.roster.filter(obj => obj.LineupPos === "RW")[0]['PlayerName']}</div>
            <div className="text-2xs">{props.data?.roster.filter(obj => obj.LineupPos === "RW")[0]['nhlPos']}</div>
            <div className={`text-2xs rounded-lg px-2 max-w-fit place-self-center ${props.data?.roster.filter(obj => obj.LineupPos === "RW")[0]['Rank'] < 76 ? 'bg-emerald-200' : props.data?.roster.filter(obj => obj.LineupPos === "RW")[0]['Rank'] < 151 ? 'bg-yellow-200' : props.data?.roster.filter(obj => obj.LineupPos === "RW")[0]['Rank'] < 226 ? 'bg-orange-200' : 'bg-rose-200'}`}>{Math.round(+(props.data?.roster.filter(obj => obj.LineupPos === "RW")[0]['Rating']) * 100) / 100}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 items-center py-2">
          <div className="grid grid-cols-2 text-center px-2">
            <div className="col-span-2 text-sm">{props.data?.roster.filter(obj => obj.LineupPos === "LW")[1]['PlayerName']}</div>
            <div className="text-2xs">{props.data?.roster.filter(obj => obj.LineupPos === "LW")[1]['nhlPos']}</div>
            <div className={`text-2xs rounded-lg px-2 max-w-fit place-self-center ${props.data?.roster.filter(obj => obj.LineupPos === "LW")[1]['Rank'] < 76 ? 'bg-emerald-200' : props.data?.roster.filter(obj => obj.LineupPos === "LW")[1]['Rank'] < 151 ? 'bg-yellow-200' : props.data?.roster.filter(obj => obj.LineupPos === "LW")[1]['Rank'] < 226 ? 'bg-orange-200' : 'bg-rose-200'}`}>{Math.round(+(props.data?.roster.filter(obj => obj.LineupPos === "LW")[1]['Rating']) * 100) / 100}</div>
          </div>
          <div className="grid grid-cols-2 text-center px-2">
            <div className="col-span-2 text-sm">{props.data?.roster.filter(obj => obj.LineupPos === "C")[1]['PlayerName']}</div>
            <div className="text-2xs">{props.data?.roster.filter(obj => obj.LineupPos === "C")[1]['nhlPos']}</div>
            <div className={`text-2xs rounded-lg px-2 max-w-fit place-self-center ${props.data?.roster.filter(obj => obj.LineupPos === "C")[1]['Rank'] < 76 ? 'bg-emerald-200' : props.data?.roster.filter(obj => obj.LineupPos === "C")[1]['Rank'] < 151 ? 'bg-yellow-200' : props.data?.roster.filter(obj => obj.LineupPos === "C")[1]['Rank'] < 226 ? 'bg-orange-200' : 'bg-rose-200'}`}>{Math.round(+(props.data?.roster.filter(obj => obj.LineupPos === "C")[1]['Rating']) * 100) / 100}</div>
          </div>
          <div className="grid grid-cols-2 text-center px-2">
            <div className="col-span-2 text-sm">{props.data?.roster.filter(obj => obj.LineupPos === "RW")[1]['PlayerName']}</div>
            <div className="text-2xs">{props.data?.roster.filter(obj => obj.LineupPos === "RW")[1]['nhlPos']}</div>
            <div className={`text-2xs rounded-lg px-2 max-w-fit place-self-center ${props.data?.roster.filter(obj => obj.LineupPos === "RW")[1]['Rank'] < 76 ? 'bg-emerald-200' : props.data?.roster.filter(obj => obj.LineupPos === "RW")[1]['Rank'] < 151 ? 'bg-yellow-200' : props.data?.roster.filter(obj => obj.LineupPos === "RW")[1]['Rank'] < 226 ? 'bg-orange-200' : 'bg-rose-200'}`}>{Math.round(+(props.data?.roster.filter(obj => obj.LineupPos === "RW")[1]['Rating']) * 100) / 100}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 items-center py-2 border-b">
          <div></div>
          <div className="grid grid-cols-2 text-center px-2">
            <div className="col-span-2 text-sm">{props.data?.roster.filter(obj => obj.LineupPos === "Util")[0]['PlayerName']}</div>
            <div className="text-2xs">{props.data?.roster.filter(obj => obj.LineupPos === "Util")[0]['nhlPos']}</div>
            <div className={`text-2xs rounded-lg px-2 max-w-fit place-self-center ${props.data?.roster.filter(obj => obj.LineupPos === "Util")[0]['Rank'] < 76 ? 'bg-emerald-200' : props.data?.roster.filter(obj => obj.LineupPos === "Util")[0]['Rank'] < 151 ? 'bg-yellow-200' : props.data?.roster.filter(obj => obj.LineupPos === "Util")[0]['Rank'] < 226 ? 'bg-orange-200' : 'bg-rose-200'}`}>{Math.round(+(props.data?.roster.filter(obj => obj.LineupPos === "Util")[0]['Rating']) * 100) / 100}</div>
          </div>
          <div></div>
        </div>
        <div className="grid grid-cols-2 items-center my-2">
          <div className="grid grid-cols-2 text-center px-2">
            <div className="col-span-2 text-sm">{props.data?.roster.filter(obj => obj.LineupPos === "D")[0]['PlayerName']}</div>
            <div className="text-2xs">{props.data?.roster.filter(obj => obj.LineupPos === "D")[0]['nhlPos']}</div>
            <div className={`text-2xs rounded-lg px-2 max-w-fit place-self-center ${props.data?.roster.filter(obj => obj.LineupPos === "D")[0]['Rank'] < 76 ? 'bg-emerald-200' : props.data?.roster.filter(obj => obj.LineupPos === "D")[0]['Rank'] < 151 ? 'bg-yellow-200' : props.data?.roster.filter(obj => obj.LineupPos === "D")[0]['Rank'] < 226 ? 'bg-orange-200' : 'bg-rose-200'}`}>{Math.round(+(props.data?.roster.filter(obj => obj.LineupPos === "D")[0]['Rating']) * 100) / 100}</div>
          </div>
          <div className="grid grid-cols-2 text-center px-2">
            <div className="col-span-2 text-sm">{props.data?.roster.filter(obj => obj.LineupPos === "D")[1]['PlayerName']}</div>
            <div className="text-2xs">{props.data?.roster.filter(obj => obj.LineupPos === "D")[1]['nhlPos']}</div>
            <div className={`text-2xs rounded-lg px-2 max-w-fit place-self-center ${props.data?.roster.filter(obj => obj.LineupPos === "D")[1]['Rank'] < 76 ? 'bg-emerald-200' : props.data?.roster.filter(obj => obj.LineupPos === "D")[1]['Rank'] < 151 ? 'bg-yellow-200' : props.data?.roster.filter(obj => obj.LineupPos === "D")[1]['Rank'] < 226 ? 'bg-orange-200' : 'bg-rose-200'}`}>{Math.round(+(props.data?.roster.filter(obj => obj.LineupPos === "D")[1]['Rating']) * 100) / 100}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 items-center py-2 border-b">
          <div></div>
          <div className="grid grid-cols-2 text-center px-2">
            <div className="col-span-2 text-sm">{props.data?.roster.filter(obj => obj.LineupPos === "D")[2]['PlayerName']}</div>
            <div className="text-2xs">{props.data?.roster.filter(obj => obj.LineupPos === "D")[2]['nhlPos']}</div>
            <div className={`text-2xs rounded-lg px-2 max-w-fit place-self-center ${props.data?.roster.filter(obj => obj.LineupPos === "D")[2]['Rank'] < 76 ? 'bg-emerald-200' : props.data?.roster.filter(obj => obj.LineupPos === "D")[2]['Rank'] < 151 ? 'bg-yellow-200' : props.data?.roster.filter(obj => obj.LineupPos === "D")[2]['Rank'] < 226 ? 'bg-orange-200' : 'bg-rose-200'}`}>{Math.round(+(props.data?.roster.filter(obj => obj.LineupPos === "D")[2]['Rating']) * 100) / 100}</div>
          </div>
          <div></div>
        </div>
        <div className="grid grid-cols-3 items-center my-2">
          <div></div>
          <div className="grid grid-cols-2 text-center px-2">
            <div className="col-span-2 text-sm">{props.data?.roster.filter(obj => obj.LineupPos === "G")[0]['PlayerName']}</div>
            <div className="text-2xs">{props.data?.roster.filter(obj => obj.LineupPos === "G")[0]['nhlPos']}</div>
            <div className={`text-2xs rounded-lg px-2 max-w-fit place-self-center ${props.data?.roster.filter(obj => obj.LineupPos === "G")[0]['Rank'] < 76 ? 'bg-emerald-200' : props.data?.roster.filter(obj => obj.LineupPos === "G")[0]['Rank'] < 151 ? 'bg-yellow-200' : props.data?.roster.filter(obj => obj.LineupPos === "G")[0]['Rank'] < 226 ? 'bg-orange-200' : 'bg-rose-200'}`}>{Math.round(+(props.data?.roster.filter(obj => obj.LineupPos === "G")[0]['Rating']) * 100) / 100}</div>
          </div>
          <div></div>
        </div>
      </div>
      <div className="flex flex-col max-w-md mx-auto border rounded-xl bg-brown-50 mt-2">
        <div className="grid grid-cols-2 items-center my-2 mx-2">
          {props.data?.roster.filter(obj => obj.LineupPos === "BN").map(obj => {
            return (
              <div className="grid grid-cols-2 text-center px-2 my-2">
                <div className="col-span-2 text-sm">{obj['PlayerName']}</div>
                <div className="text-2xs">{obj['nhlPos']}</div>
                <div className={`text-2xs rounded-lg px-2 max-w-fit place-self-center ${obj['Rank'] < 76 ? 'bg-emerald-200' : obj['Rank'] < 151 ? 'bg-yellow-200' : obj['Rank'] < 226 ? 'bg-orange-200' : 'bg-rose-200'}`}>{Math.round(+(obj['Rating']) * 100) / 100}</div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

function TeamPlayerStats(props) {
  return (
    <>
      <div className='mt-8 text-center mx-auto text-xl font-bold'>Team Player Stats</div>
      <div className='table-auto overflow-scroll'>
        <table className='mx-auto overflow-x-auto'>
          <thead>
            <tr>
              <th className='sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Name</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Pos</th>
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
            {props.data?.playerStats.sort((a, b) => +b.Rating - +a.Rating).filter(obj => obj.nhlPos !== "G").map(obj => {
              return (
                <tr key={obj.id}>
                  <td className="sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50">{obj.PlayerName}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.nhlPos}</td>
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
              <th colspan='2' className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>W</th>
              <th colspan='2' className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>GAA</th>
              <th colspan='2' className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>SV%</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'></th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Rtg</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>Days</th>
              <th className='p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200'>GP</th>
            </tr>
          </thead>
          <tbody>
            {props.data?.playerStats.sort((a, b) => +b.Rating - +a.Rating).filter(obj => obj.nhlPos === "G").map(obj => {
              return (
                <tr key={obj.id}>
                  <td className="sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50">{obj.PlayerName}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.nhlPos}</td>
                  <td colspan='2' className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.W}</td>
                  <td colspan='2' className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.GAA}</td>
                  <td colspan='2' className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.SVP}</td>
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