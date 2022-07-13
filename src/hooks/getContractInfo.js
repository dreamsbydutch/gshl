import axios from 'axios'
import { useQuery } from 'react-query';
import { inputsSheetID } from '../utils/constants';


const getAllContracts = async () => {
    return await axios.get(inputsSheetID('Contracts'))
}
const getAllSalaryInfo = async () => {
    return await axios.get('https://opensheet.elk.sh/1dYRA1bT2phaPGH-LzgyiykkjsXoTHzkRe6aKdQe1vq0/PlayerSalaries')
}
export function useAllContracts() {
  return useQuery("useAllContracts", getAllContracts)
}
export function useAllSalaryInfo() {
  return useQuery("useAllSalaryInfo", getAllSalaryInfo);
}

export function useTeamContracts(teamID) {
  const contracts = useAllContracts()
  var isLoading = contracts.isLoading
  var data = isLoading ? [] :  contracts.data.data.filter(obj => obj.CurrentTeam === teamID && new Date(obj.CapHitExpiry) >= new Date())
  var error = contracts.error
  return { 
      data: data,
      isLoading: isLoading,
      error: error
  }
}
export function useTeamSalaryInfo(teamID) {
  const salaryInfo = useAllSalaryInfo()
  var isLoading = salaryInfo.isLoading
  var data = isLoading ? [] :  salaryInfo.data.data.filter(obj => obj.gshlTeam === teamID)
  var error = salaryInfo.error
  return { 
      data: data,
      isLoading: isLoading,
      error: error
  }
}