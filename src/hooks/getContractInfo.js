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
  return useQuery("useAllContracts", getAllContracts)
}
export function useAllEligiblePlayers() {
  return useQuery("useAllEligiblePlayers", getAllEligiblePlayers);
}
export function useAllSalaries() {
  return useQuery("useAllSalaries", getAllSalaries);
}
