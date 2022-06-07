import './LockerRoom.css'
import React, { useState } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import TeamsToolbar from '../../components/TeamSchedule/TeamsToolbar/TeamsToolbar'
import { useFetchTeamContracts, useFetchTeamSalaries } from '../../hooks/salaries'
import ErrorPage from '../ErrorPage/ErrorPage'

function LockerRoom() {
  const [teamID, setTeamID] = useState(1)
  var salaryData = useFetchTeamSalaries(teamID)
  var contractData = useFetchTeamContracts(teamID)

  if (salaryData.loading || contractData.loading) { return <LoadingSpinner /> }
  if (salaryData.error || contractData.error) { return <ErrorPage /> }

  return (
    <>
      <TeamsToolbar variant='outline-secondary' setter={setTeamID} active={teamID} />
      <div className='capSpace'>Cap Space - {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(22500000 - contractData.data.reduce((a,b) => a + +b.CapHit.replace(",", "").replace(",", "").replace("$", ""), 0))}</div>
      <div className='contractTableHeader'>Current Contracts</div>
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
          {contractData.data.filter(obj => obj.EndDate > new Date()).map(obj => {
            return (
              <tr key={obj.id}>
                <td>{obj.Player}</td>
                <td>{obj.Pos}</td>
                <td>{obj.CapHit}</td>
                <td>{obj.EndDate - new Date()}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='salariesTableHeader'>Current Player Salaries</div>
      <table className='salariesTable'>
        <thead>
          <tr>
            <td>Name</td>
            <td>Pos</td>
            <td>Salary</td>
          </tr>
        </thead>
        <tbody>
          {salaryData.data.sort((a, b) => b.CapHit.replace(",", "").replace(",", "").replace("$", "") - a.CapHit.replace(",", "").replace(",", "").replace("$", "")).map(obj => {
            return (
              <tr key={obj.id}>
                <td>{obj.PlayerName}</td>
                <td>{obj.nhlPos}</td>
                <td>{obj.CapHit}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default LockerRoom