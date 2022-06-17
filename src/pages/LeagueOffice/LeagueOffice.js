import React from 'react'
import { useAllSalaries } from '../../hooks/salaries'

function LeagueOffice() {
  var allSalaries = useAllSalaries()

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
          allSalaries.data && allSalaries.data.data.map(obj => {
            var salary = obj.Salary.replace("$","").replace(",","").replace(",","")
            salary = salary * 1.25
            salary = "$" + salary.toString().replace(/(.)(?=(\d{3})+$)/g,'$1,')

            return (
              <tr key={obj.Rank}>
                <td>{obj.Name}</td>
                <td>{salary}</td>
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