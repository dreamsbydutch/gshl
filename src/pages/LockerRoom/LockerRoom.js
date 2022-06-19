import './LockerRoom.css'
import React, { useState } from 'react'
import LoadingSpinner from '../../utils/LoadingSpinner/LoadingSpinner'
import TeamsToolbar from '../../components/TeamSchedule/TeamsToolbar/TeamsToolbar'
import { useAllContracts } from '../../hooks/getContractInfo'

function LockerRoom() {
  const [teamID, setTeamID] = useState(null)
  const allContractData = useAllContracts()
  console.log("allContract", allContractData)
  console.log("teamID",teamID)

  if (allContractData.isLoading) return <LoadingSpinner />
  

  return (
    <>
      <TeamsToolbar variant='outline-secondary' setter={setTeamID} active={teamID} />
      <div className='capSpace'>Cap Space - $0</div>
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
          {/* {teamContractData.contracts.map(obj => {
            return (
              <tr key={obj.id}>
                <td>{obj.Player}</td>
                <td>{obj.Pos}</td>
                <td>{obj.Salary}</td>
                <td>{obj.YearsRem}</td>
              </tr>
            )
          })} */}
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
          {/* {salaryData.isLoading ?
          <LoadingSpinner /> :
          salaryData.sort((a, b) => b.Salary.replace(",", "").replace(",", "").replace("$", "") - a.Salary.replace(",", "").replace(",", "").replace("$", "")).map(obj => {
            return (
              <tr key={obj.id}>
                <td>{obj.Player}</td>
                <td>{obj.Pos}</td>
                <td>{obj.Salary}</td>
              </tr>
            )
          })} */}
        </tbody>
      </table>
    </>
  )
}

export default LockerRoom