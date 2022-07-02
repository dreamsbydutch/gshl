import './LockerRoom.css'
import React, { useState } from 'react'
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner'
import { useTeamContracts, useTeamSalaryInfo } from '../../hooks/getContractInfo'
import TeamsToolbar from '../../components/Navbar/TeamsToolbar'
import { useAllPlayerSplitStats } from '../../hooks/getStats/getStats'

function LockerRoom() {
  const [teamID, setTeamID] = useState(null)
  const teamContractData = useTeamContracts(teamID)
  const teamSalaryInfo = useTeamSalaryInfo(teamID)
  const playerStats = useAllPlayerSplitStats(teamID)

  if (teamContractData.isLoading) return <LoadingSpinner />

  return (
    <>
      <TeamsToolbar setter={setTeamID} active={teamID} />
      <div className='capSpace'>Cap Space - ${getCapSpace(teamContractData.data).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(".00", "")}</div>
      <div className='contractTableHeader'>Current Contracts & Buyouts</div>
      <table className='contractTable'>
        <thead>
          <tr>
            <td>Name</td>
            <td>Pos</td>
            <td>2022-23</td>
            <td>2023-24</td>
            <td>2024-25</td>
            <td>2025-26</td>
          </tr>
        </thead>
        <tbody>
          {teamContractData.data.sort((a,b) => b.CapHit.replace("$","").replace(",","").replace(",","") - a.CapHit.replace("$","").replace(",","").replace(",","")).sort((a, b) => new Date(b.EndDate) - new Date(a.EndDate)).map((obj, i) => {
            var yearOne, yearTwo, yearThree, yearFour, classList = []
            if (obj.YearsRemaining > 0) { yearOne = obj.CapHit } else if (+obj.YearsRemaining === 0) { yearOne = obj.ExpiryType } else { yearOne = "" }
            if (obj.YearsRemaining > 1) { yearTwo = obj.CapHit } else if (+obj.YearsRemaining === 1) { yearTwo = obj.ExpiryType } else { yearTwo = "" }
            if (obj.YearsRemaining > 2) { yearThree = obj.CapHit } else if (+obj.YearsRemaining === 2) { yearThree = obj.ExpiryType } else { yearThree = "" }
            if (obj.YearsRemaining > 3) { yearFour = obj.CapHit } else if (+obj.YearsRemaining === 3) { yearFour = obj.ExpiryType } else { yearFour = "" }
            if (new Date(obj.EndDate) < new Date()) { classList.push("buyout") }
            return (
              <tr key={i} className={classList && classList.join(' ')}>
                <td>{obj.Player}</td>
                <td>{obj.Pos}</td>
                <td>{yearOne}</td>
                <td>{yearTwo}</td>
                <td>{yearThree}</td>
                <td>{yearFour}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='salariesTableHeader'>Current Roster Salaries</div>
      <table className='salariesTable'>
        <thead>
          <tr>
            <td>Name</td>
            <td>Pos</td>
            <td>Salary</td>
          </tr>
        </thead>
        <tbody>
          {teamSalaryInfo.isLoading ?
          <LoadingSpinner /> :
          teamSalaryInfo.data.sort((a, b) => b.Salary.replace(",", "").replace(",", "").replace("$", "") - a.Salary.replace(",", "").replace(",", "").replace("$", "")).map(obj => {
            return (
              <tr key={obj.Rank}>
                <td>{obj.PlayerName}</td>
                <td>{obj.nhlPos}</td>
                <td>{obj.Salary}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='statsTableHeader'>2021-22 Skater Stats</div>
      <table className='statsTable'>
        <thead>
          <tr>
            <td>Name</td>
            <td>Pos</td>
            <td>GP</td>
            <td>G</td>
            <td>A</td>
            <td>P</td>
            <td>PPP</td>
            <td>SOG</td>
            <td>HIT</td>
            <td>BLK</td>
          </tr>
        </thead>
        <tbody>
          {playerStats.isLoading ?
            <LoadingSpinner /> :
            playerStats.data.filter(obj => obj.Season === '2021-22' && obj.gshlTeam === teamID && obj.nhlPos !== "G").sort((a, b) => b.Rating - a.Rating).map(obj => {
              return (
                <tr key={obj.id}>
                  <td>{obj.PlayerName}</td>
                  <td>{obj.nhlPos}</td>
                  <td>{obj.GS}</td>
                  <td>{obj.G}</td>
                  <td>{obj.A}</td>
                  <td>{obj.P}</td>
                  <td>{obj.PPP}</td>
                  <td>{obj.SOG}</td>
                  <td>{obj.HIT}</td>
                  <td>{obj.BLK}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <div className='statsTableHeader'>2021-22 Goalie Stats</div>
      <table className='statsTable'>
        <thead>
          <tr>
            <td>Name</td>
            <td>Pos</td>
            <td>GP</td>
            <td>W</td>
            <td>GAA</td>
            <td>SV%</td>
          </tr>
        </thead>
        <tbody>
          {playerStats.isLoading ?
            <LoadingSpinner /> :
            playerStats.data.filter(obj => obj.Season === '2021-22' && obj.gshlTeam === teamID && obj.nhlPos === "G").sort((a, b) => b.Rating - a.Rating).sort((a, b) => b.RosterDays - a.RosterDays).map(obj => {
              return (
                <tr key={obj.id}>
                  <td>{obj.PlayerName}</td>
                  <td>{obj.nhlPos}</td>
                  <td>{obj.GS}</td>
                  <td>{obj.W}</td>
                  <td>{obj.GAA}</td>
                  <td>{obj.SVP}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )
}

export default LockerRoom




function getCapSpace(contracts) {
  var capSpace = 22500000
  contracts.forEach(obj => capSpace = capSpace - +obj.CapHit.replace(",", "").replace(",", "").replace("$", ""))
  return capSpace
}