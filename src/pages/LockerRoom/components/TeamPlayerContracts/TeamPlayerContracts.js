import React from 'react'
import { useContracts } from '../../../../utils/fetchData'

function TeamPlayerContracts(props) {
    const contractData = useContracts()
    var contracts = contractData.data && contractData.data.sort((a, b) => +b.YearsRemaining - +a.YearsRemaining).filter(obj => obj.CurrentTeam === props.teamID && new Date(obj.CapHitExpiry) >= new Date())
    var output = [], capSpace = []
    contracts && contracts.forEach(contract => {
      var date = new Date()
      var arr = [contract.Player, contract.Pos, new Date(contract.CapHitExpiry) >= date ? contract.CapHit : ""]
      date.setFullYear(date.getFullYear() + 1)
      arr.push(new Date(contract.CapHitExpiry) >= date ? contract.CapHit : "")
      date.setFullYear(date.getFullYear() + 1)
      arr.push(new Date(contract.CapHitExpiry) >= date ? contract.CapHit : "")
      date.setFullYear(date.getFullYear() + 1)
      arr.push(new Date(contract.CapHitExpiry) >= date ? contract.CapHit : "")
      arr.push(contract.ExpiryType)
      output.push(arr)
      capSpace.push(arr.slice(2, 6))
    })
    capSpace = contracts && sumArrays(...capSpace.map(obj => {
      return obj.map(item => {
        return +item.replace("$", "").replace(",", "").replace(",", "")
      })
    })).map(obj => {
      return formatter.format(obj)
    })
    return (
        <>
            <div className='contractTableHeader'>Current Contracts & Buyouts</div>
            <table className='contractTable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Pos</th>
                        <th>2022-23</th>
                        <th>2023-24</th>
                        <th>2024-25</th>
                        <th>2025-26</th>
                    </tr>
                </thead>
                <tbody>
                    {output.map((obj,i) => {
                        return (
                            <tr className={"contract-slot " + obj[6]} key={i}>
                                <td className="playername">{obj[0]}</td>
                                <td className="position">{obj[1]}</td>
                                <td className="yearone">{obj[2]===""?obj[6]:formatter.format(obj[2])}</td>
                                <td className="yeartwo">{obj[3]===""&&obj[2]===""?"":obj[3]===""&&obj[2]!==""?obj[6]:formatter.format(obj[3])}</td>
                                <td className="yearthree">{obj[4]===""&&obj[3]===""?"":obj[4]===""&&obj[3]!==""?obj[6]:formatter.format(obj[4])}</td>
                                <td className="yearfour">{obj[5]===""&&obj[4]===""?"":obj[5]===""&&obj[4]!==""?obj[6]:formatter.format(obj[5])}</td>
                            </tr>
                        )
                    })}
                    {/* <tr>
        <td></td>
        <td></td>
        {capSpace.map(obj => {
          return (
            <td>{obj}</td>
          )
        })}
      </tr> */}
                </tbody>
            </table>
        </>
    )
}

export default TeamPlayerContracts


function sumArrays(...arrays) {
    const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
    const result = Array.from({ length: n });
    return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
  }
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });