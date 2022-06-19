import axios from 'axios'
import { useQuery } from 'react-query';


const getStandings = async () => {
    return await axios.get('https://opensheet.elk.sh/')
}
export function useStandings() {
  return useQuery("useStandings", getStandings)
}



const getSchedule = async () => {
    return await axios.get('https://opensheet.elk.sh/1jiL1gtJ-_Drlksr24kWaiRABOEniO0pg4Vlm05SFqYM/Schedule')
}
export function useSchedule() {
  return useQuery("useSchedule", getSchedule)
}