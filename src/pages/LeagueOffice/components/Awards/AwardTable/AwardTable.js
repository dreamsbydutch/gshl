import React, { useState } from 'react'
import { awardInfo } from '../../../../../utils/constants'

function AwardTable(props) {
    const [showInfo, setShowInfo] = useState(false)
    var award = awardInfo.filter(obj => obj.key === props.award)[0]
    return (
        <div className="award-container" onClick={() => setShowInfo(!showInfo)}>
            <h1 className='award-title'>{award['name'] + " Finalists"}</h1>
            <table className="award-table" style={showInfo ? { } : { display: 'none' }}>
                <thead>
                    <tr>
                        <td colSpan={2}>Player</td>
                        <td>Pos</td>
                        <td>Team</td>
                        <td>Days</td>
                        <td>GP</td>
                        <td>{award['mainStat']}</td>
                    </tr>
                </thead>
                <tbody>
                    {props.awardData.filter(obj => obj.Trophy === award['key'] && obj.Season === props.seasonID).slice(0,5).map(obj => {
                        var playerTeams = obj["GSHL Team"].includes(",") ? obj["GSHL Team"].split(",") : [obj["GSHL Team"]]
                        return (
                            <tr className="award-listing" key={obj.Rank}>
                                <td colSpan={2}>{obj['Player Name']}</td>
                                <td>{obj['NHL Pos']}</td>
                                <td>
                                    {playerTeams.map(plyrTm => <img src={props.teamData.filter(team => team[props.seasonID] === plyrTm)[0]["LogoURL"]} alt={obj['Player Name']} />)}
                                </td>
                                <td>{obj['Roster Days']}</td>
                                <td>{obj['GP']}</td>
                                <td>{Math.round(obj[award['mainStat']]*10)/10}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AwardTable