import axios from 'axios'
import { useQuery } from 'react-query';


const getAllContracts = async () => {
    return await axios.get('https://opensheet.elk.sh/1jiL1gtJ-_Drlksr24kWaiRABOEniO0pg4Vlm05SFqYM/Contracts')
}
const getAllEligiblePlayers = async () => {
    return await axios.get('https://opensheet.elk.sh/1qtdxTU_LhU9AF6lUxo5QhXlREbrj00_-4NurVD458f8/EligiblePlayers')
}
const getAllSalaries = async () => {
    return await axios.get('https://opensheet.elk.sh/159KBWmaW7ystY-O7FIlOrZPvyjJP6rro63BkgkCfp-Q/Salaries')
}
export function useAllContracts() {
  return useQuery("getAllContracts", getAllContracts);
}
export function useAllEligiblePlayers() {
  return useQuery("getAllEligiblePlayers", getAllEligiblePlayers);
}
export function useAllSalaries() {
  return useQuery("getAllSalaries", getAllSalaries);
}


export function useTeamContracts(teamID=null) {
  const contractsObj = useAllContracts()

  if (contractsObj.isLoading) return []
  if (contractsObj.error) return {error: contractsObj.error}


  var teamContracts = []
  var contracts = contractsObj.data.data.filter(obj => obj.CurrentTeam === teamID && new Date(obj.CapHitExpiry) >= new Date())
  contracts.forEach((contract,index) => {
    var name = contract.Player
    var pos = contract.Pos
    var salary = contract.CapHit
    var yearsRem = contract.YearsRemaining
    teamContracts.push({id:index, Player:name, Pos:pos, Salary:salary, YearsRem: yearsRem})
  })

  return teamContracts.sort((a,b) => b.Salary.replace(",","").replace(",","").replace("$","") - a.Salary.replace(",","").replace(",","").replace("$",""))
}
export function useTeamSalaries(teamID=null) {
  const salariesObj = useAllSalaries()
  const eligiblePlayersObj = useAllEligiblePlayers()

  if (salariesObj.isLoading || eligiblePlayersObj.isLoading) return []
  if (salariesObj.error) return {error: salariesObj.error}
  if (eligiblePlayersObj.error) return {error: eligiblePlayersObj.error}

  var teamSalaries = []
  var players = eligiblePlayersObj.data.data.filter(obj => obj.teamID === teamID)
  players.forEach((player,index) => {
    const playerSalary = salariesObj.data.data.filter(obj => obj.Name === player.PlayerName)[0]
    var name = player.PlayerName
    var pos = playerSalary.Pos
    var salary = playerSalary.Salary
    teamSalaries.push({id:index, Player:name, Pos:pos, Salary:salary})
  })

  return teamSalaries
}