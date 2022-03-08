import React, { useEffect, useState } from 'react'
import { useStandingsFetch } from '../../hooks/useFetch'
import './Standings.css'
import StandingsItem from './StandingsItem/StandingsItem'

function Standings() {
    const {data,loading,error} = useStandingsFetch()
    const [sunviewData, setSunviewData] = useState([])
    const [hhotelData, setHHotelData] = useState([])

    useEffect(() => {
      if (!loading && data) {
        setHHotelData(data.filter(x => x.Conf === "HH"))
        setSunviewData(data.filter(x => x.Conf === "SV"))
      }
    }, [loading,data])

    
  return (
    <>
    {loading && <h1>Loading...</h1>}
    {error && <h1>Error</h1>}
    {data && 
      <div className="stdg-container sunview-bg">
        {sunviewData
          .sort((a,b) => b.CF - a.CF)
          .sort((a,b) => b.W - a.W)
          .map(team => (
            <StandingsItem key={team.teamID} team={team} />
          ))}
      </div>
    }
    <div>--------------------------------</div>
    {data && 
      <div className="stdg-container hhotel-bg">
        {hhotelData
          .sort((a,b) => b.CF - a.CF)
          .sort((a,b) => b.W - a.W)
          .map(team =>
            <StandingsItem key={team.teamID} team={team} />
          )}
      </div>
    }
    </>
  )
}

export default Standings