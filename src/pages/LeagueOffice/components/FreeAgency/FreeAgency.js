import React from 'react'
import './FreeAgency.css'

function FreeAgency() {



  return (
    <div className='freeagency-container'>
    <div className="salary-table-header">UFA Salaries</div>
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
          {/* {
            allSalaries.data && allSalaries.data.data.map(obj => {
              var salary = obj.PostSeasonSalary.replace("$", "").replace(",", "").replace(",", "")
              salary = salary * 1.25
              salary = "$" + salary.toString().replace(/(.)(?=(\d{3})+$)/g, '$1,')
              return (
                <tr key={obj.Rank}>
                  <td>{obj.PlayerName}</td>
                  <td>{salary}</td>
                  <td>{obj.Age}</td>
                  <td>{obj.Pos}</td>
                </tr>
              )
            })
          } */}
        </tbody>
      </table>
    </div>
  )
}

export default FreeAgency