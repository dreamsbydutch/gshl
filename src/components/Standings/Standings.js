import React, { useEffect, useState } from 'react'
import { useStandingsFetch } from '../../hooks/useFetch'
import './Standings.css'
import StandingsItem from './StandingsItem/StandingsItem'


// Standings Component
// props - type(SV/HH/WC/OV) - classes(Class Names)

function Standings(props) {
    const {data,loading,error} = useStandingsFetch()
    const [stdgData, setStdgData] = useState([])

    const classes = [
      "stdg-container",
      props.type
    ]
    if (props.classes) {classes.push(...props.classes)}

    useEffect(() => {
      if (!loading && data) {
        if (props.type === "SV") {
          setStdgData(data.filter(x => x.Conf === "SV"))
        } else if (props.type === "HH") {
          setStdgData(data.filter(x => x.Conf === "HH"))
        } else {
          setStdgData(data)
        }
      }
    }, [loading,data,props.type])

    
  return (
    <>
    {loading && <h1>Loading...</h1>}
    {error && <h1>Error</h1>}
    {data && 
      <div className={classes.join(" ")}>
        {stdgData
          .sort((a,b) => b.CF - a.CF)
          .sort((a,b) => b.W - a.W)
          .map(team => (
            <StandingsItem key={team.teamID} team={team} />
          ))}
      </div>
    }
    </>
  )
}

export default Standings