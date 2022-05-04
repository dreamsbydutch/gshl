import React from 'react'
import { useFetchAllSalaries } from '../../hooks/salaries'

function LeagueOffice() {
  var allSalaries = useFetchAllSalaries()

  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Salary</td>
          <td>Age</td>
          <td>Pos</td>
        </tr>
      </thead>
      <tbody>
        {
          allSalaries.data && allSalaries.data.map(obj => {
            return (
              <tr key={obj.Rank}>
                <td>{obj.Name}</td>
                <td>{obj.Salary}</td>
                <td>{obj.Age}</td>
                <td>{obj.Pos}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default LeagueOffice