import './LockerRoom.css'
import React, { useState } from 'react'
// import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import TeamsToolbar from '../../components/TeamSchedule/TeamsToolbar/TeamsToolbar'
import { useTeamContracts, useTeamSalaries } from '../../hooks/salaries'

function LockerRoom() {
  const [teamID, setTeamID] = useState(1)
  const contractData = useTeamContracts(teamID)
  const salaryData = useTeamSalaries(teamID)
  
  var capSpace = 22500000
  contractData.forEach(obj => {
    capSpace -= +obj.Salary.replace(",","").replace(",","").replace("$","")
  })


  return (
    <>
      <TeamsToolbar variant='outline-secondary' setter={setTeamID} active={teamID} />
      <div className='capSpace'>Cap Space - ${capSpace.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
      <div className='contractTableHeader'>Current Contracts & Buyouts</div>
      <table className='contractTable'>
        <thead>
          <tr>
            <td>Name</td>
            <td>Pos</td>
            <td>Salary</td>
            <td>Years</td>
          </tr>
        </thead>
        <tbody>
          {contractData.map(obj => {
            return (
              <tr key={obj.id}>
                <td>{obj.Player}</td>
                <td>{obj.Pos}</td>
                <td>{obj.Salary}</td>
                <td>{obj.YearsRem}</td>
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
          {salaryData.sort((a, b) => b.Salary.replace(",", "").replace(",", "").replace("$", "") - a.Salary.replace(",", "").replace(",", "").replace("$", "")).map(obj => {
            return (
              <tr key={obj.id}>
                <td>{obj.Player}</td>
                <td>{obj.Pos}</td>
                <td>{obj.Salary}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default LockerRoom