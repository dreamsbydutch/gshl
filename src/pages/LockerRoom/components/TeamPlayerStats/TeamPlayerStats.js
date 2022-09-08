import React from 'react'
import { currentSeason, SeasonListNavData } from '../../../../utils/constants'
import { usePlayerSplits } from '../../../../utils/fetchData'

function TeamPlayerStats(props) {
    const rawSplitStats = usePlayerSplits()
    var stats = rawSplitStats.seasonData && rawSplitStats.seasonData.filter(obj => obj.gshlTeam === props.teamID && obj.Season === currentSeason.key)
  return (
    <>
        <div className='contractTableHeader'>{SeasonListNavData.filter(obj => obj.key === currentSeason.key)[0].content + " Player Stats"}</div>
        <table className='contractTable'>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Pos</td>
                    <td>Rtg</td>
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
                {stats.filter(obj => obj.nhlPos !== "G").sort((a,b) => b.Rating - a.Rating).map(obj => {
                    return (
                        <tr className="contract-slot">
                            <td className="playername">{obj.PlayerName}</td>
                            <td className="position">{obj.nhlPos}</td>
                            <td className="yearone">{obj.Rating}</td>
                            <td className="yeartwo">{obj.G}</td>
                            <td className="yearthree">{obj.A}</td>
                            <td className="yearfour">{obj.P}</td>
                            <td className="yearfour">{obj.PPP}</td>
                            <td className="yearfour">{obj.SOG}</td>
                            <td className="yearfour">{obj.HIT}</td>
                            <td className="yearfour">{obj.BLK}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>
  )
}

export default TeamPlayerStats