import React from 'react'
import { useQuery } from 'react-query'
import { queryFunc } from '../utils/fetchData'
import LoadingSpinner from '../components/LoadingSpinner'

export default function TeamRoster({ teamInfo, season }) {
    const showSalaries = true
    const salaryData = useQuery([season + 'PlayerData', 'Salaries'], queryFunc)
    const rosterData = useQuery([season + 'PlayerData', 'CurrentRosters'], queryFunc)
    const contractData = useQuery(['MainInput', 'Contracts'], queryFunc)
    const expiringContracts = contractData.data?.filter(obj => obj.CurrentTeam === teamInfo?.id && +obj.YearsRemaining === 0)
    const currentRoster = rosterData.data?.filter(obj => obj.gshlTeam === teamInfo?.id).sort((a, b) => a.Rank - b.Rank)
    const salaries = salaryData.data
    console.log(expiringContracts)

    const teamLineup = currentRoster?.filter(obj => obj.LineupPos === "Util")[0]?.nhlPos !== "D" ? [[
        [currentRoster?.filter(obj => obj.LineupPos === "LW")[0], currentRoster?.filter(obj => obj.LineupPos === "C")[0], currentRoster?.filter(obj => obj.LineupPos === "RW")[0]],
        [currentRoster?.filter(obj => obj.LineupPos === "LW")[1], currentRoster?.filter(obj => obj.LineupPos === "C")[1], currentRoster?.filter(obj => obj.LineupPos === "RW")[1]],
        [null, null, currentRoster?.filter(obj => obj.LineupPos === "Util")[0], null, null],], [
        [null, currentRoster?.filter(obj => obj.LineupPos === "D")[0], currentRoster?.filter(obj => obj.LineupPos === "D")[1], null],
        [null, null, currentRoster?.filter(obj => obj.LineupPos === "D")[2], null, null],], [
        [null, null, currentRoster?.filter(obj => obj.LineupPos === "G")[0], null, null],
    ]] : [[
        [currentRoster?.filter(obj => obj.LineupPos === "LW")[0], currentRoster?.filter(obj => obj.LineupPos === "C")[0], currentRoster?.filter(obj => obj.LineupPos === "RW")[0]],
        [currentRoster?.filter(obj => obj.LineupPos === "LW")[1], currentRoster?.filter(obj => obj.LineupPos === "C")[1], currentRoster?.filter(obj => obj.LineupPos === "RW")[1]],], [
        [null, currentRoster?.filter(obj => obj.LineupPos === "D")[0], currentRoster?.filter(obj => obj.LineupPos === "D")[1], null],
        [null, currentRoster?.filter(obj => obj.LineupPos === "D")[2], currentRoster?.filter(obj => obj.LineupPos === "Util")[0], null],], [
        [null, null, currentRoster?.filter(obj => obj.LineupPos === "G")[0], null, null],
    ]]


    if (!salaries || !currentRoster || !teamInfo) { return <LoadingSpinner /> }
    return (
        <>
            <div className='mt-12 text-center mx-auto text-xl font-bold'>Current Roster</div>
            <div className="flex flex-col max-w-md mx-auto border rounded-xl bg-gray-50">
                {teamLineup.map(x => {
                    return (
                        <>
                            {x.map((obj, i) => {
                                return (
                                    <div key={i} className="grid grid-cols-6 items-center py-2">
                                        {obj.map((a, j) => {
                                            if (!a) { return <div></div> }
                                            let contract = expiringContracts.filter(b => b.Player === a?.PlayerName)[0]
                                            console.log(contract)
                                            return (
                                                <div key={j} className="grid grid-cols-2 col-span-2 text-center px-2">
                                                    <div className="col-span-3 text-sm">{a?.PlayerName}</div>
                                                    <div className="text-2xs">{a?.nhlPos}</div>
                                                    <div><img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${a?.nhlTeam.split(",").slice(-1)}.png`} alt="NHL Team Logo" className='h-4 w-4 mx-auto' /></div>
                                                    <div className={`text-2xs rounded-lg px-2 max-w-fit place-self-center ${a?.Rank < 76 ? 'bg-emerald-200' : a?.Rank < 151 ? 'bg-yellow-200' : a?.Rank < 226 ? 'bg-orange-200' : 'bg-rose-200'}`}>{Math.round(+(a?.Rating) * 100) / 100}</div>
                                                    <div className={`text-2xs my-1 col-span-3 rounded-xl ${contract?.ExpiryType === "RFA" ? 'text-orange-700' :''}`}>{showSalaries && a.ContractEligible === "TRUE" && salaries?.filter(b => b.PlayerName === a?.PlayerName)[0]?.currentSalary}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })
                            }
                            <span className='border-b'></span>
                        </>
                    )
                })}
            </div>
            <div className="flex flex-col max-w-md mx-auto border rounded-xl bg-brown-50 mt-2">
                <div className="grid grid-cols-2 items-center my-2 mx-2">
                    {currentRoster?.filter(obj => obj.LineupPos === "BN").map((obj, i) => {
                        return (
                            <div key={i} className="grid grid-cols-2 text-center px-2 my-2">
                                <div className="col-span-3 text-sm">{obj?.PlayerName}</div>
                                <div className="text-2xs">{obj?.nhlPos}</div>
                                <div><img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${obj?.nhlTeam.split(",").slice(-1)}.png`} alt="NHL Team Logo" className='h-4 w-4 mx-auto' /></div>
                                <div className={`text-2xs rounded-lg px-2 max-w-fit place-self-center ${obj?.Rank < 76 ? 'bg-emerald-200' : obj?.Rank < 151 ? 'bg-yellow-200' : obj?.Rank < 226 ? 'bg-orange-200' : 'bg-rose-200'}`}>{Math.round(+(obj?.Rating) * 100) / 100}</div>
                                <div className="text-2xs my-1 col-span-3">{showSalaries && obj.ContractEligible === "TRUE" && salaries?.filter(a => a.PlayerName === obj?.PlayerName)[0]?.currentSalary}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}