import { useQuery } from "react-query";
import axios from "axios";

const getTeamDailyStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1yLgWMesQ1rmDNMNo9y0y8XpBLmI6RjzNbEUxGgcZJYQ/SeasonData');
}
const getTeamWeeklyStats = async () => {
  return await axios.get('https://opensheet.elk.sh/18LNAjUjX7RZBhwA0EJkj2hnUHACQbh0_8cqCFRwlnjc/SeasonData');
}
const getTeamSeasonStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1LP-KsyXZLScHE7saOuo2CpjAjVtJLFBsQNVxgA7B6dM/SeasonData');
}
const getPlayerDailyStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1II89ZpKEZOsrruTiRsvC2NvhUoRN8hoEhPEB3VPFMEQ/SeasonData');
}
const getPlayerWeeklyStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1VjZfEoaeW2vkNW_o6D4qPkE9ZO7y38qSAFgQocpQasY/SeasonData');
}
const getPlayerSplitsStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1-iT8GHikwEANBKVUa_ZzYTOCEWPHqGpuGf9364GVt8A/SeasonSplitsData');
}
const getPlayerTotalsStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1-iT8GHikwEANBKVUa_ZzYTOCEWPHqGpuGf9364GVt8A/SeasonTotalsData');
}
export function useTeamDailyStats2019() {
  return useQuery("getTeamDailyStats", getTeamDailyStats);
}
export function useTeamWeeklyStats2019() {
  return useQuery("getTeamWeeklyStats", getTeamWeeklyStats);
}
export function useTeamSeasonStats2019() {
  return useQuery("getTeamSeasonStats", getTeamSeasonStats);
}
export function usePlayerDailyStats2019() {
  return useQuery("getPlayerDailyStats", getPlayerDailyStats);
}
export function usePlayerWeeklyStats2019() {
  return useQuery("getPlayerWeeklyStats", getPlayerWeeklyStats);
}
export function usePlayerSplitsStats2019() {
  return useQuery("getPlayerSplitsStats", getPlayerSplitsStats);
}
export function usePlayerTotalsStats2019() {
  return useQuery("getPlayerTotalsStats", getPlayerTotalsStats);
}



const getStandings = async () => {
  return await axios.get('https://opensheet.elk.sh/1M373q0r5Iy2NLUHPCPFSff2MCjEEenH9wSTTL60cQlk/Standings');
}
export function useStandings2019() {
  return useQuery("getStandings", getStandings);
}



const getHartTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1rDKGRIxQ6N_UdYBcnVEhHJZI7HzkX4mqcBO3KAHTxqc/Hart');
}
const getVezinaTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1rDKGRIxQ6N_UdYBcnVEhHJZI7HzkX4mqcBO3KAHTxqc/Vezina');
}
const getNorrisTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1rDKGRIxQ6N_UdYBcnVEhHJZI7HzkX4mqcBO3KAHTxqc/Norris');
}
const getRocketTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1rDKGRIxQ6N_UdYBcnVEhHJZI7HzkX4mqcBO3KAHTxqc/Rocket');
}
const getArtRossTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1rDKGRIxQ6N_UdYBcnVEhHJZI7HzkX4mqcBO3KAHTxqc/ArtRoss');
}
const getConnSmytheTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1rDKGRIxQ6N_UdYBcnVEhHJZI7HzkX4mqcBO3KAHTxqc/ConnSmythe');
}
const getCalderTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1rDKGRIxQ6N_UdYBcnVEhHJZI7HzkX4mqcBO3KAHTxqc/Calder');
}
const getLadyByngTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1rDKGRIxQ6N_UdYBcnVEhHJZI7HzkX4mqcBO3KAHTxqc/LadyByng');
}
const getCoachOfYearTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1rDKGRIxQ6N_UdYBcnVEhHJZI7HzkX4mqcBO3KAHTxqc/CoachOfYear');
}
const getGMOfYearTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1rDKGRIxQ6N_UdYBcnVEhHJZI7HzkX4mqcBO3KAHTxqc/GMOfYear');
}
export function useHartTrophy2019() {
  return useQuery("getHartTrophy", getHartTrophy);
}
export function useVezinaTrophy2019() {
  return useQuery("getVezinaTrophy", getVezinaTrophy);
}
export function useNorrisTrophy2019() {
  return useQuery("getNorrisTrophy", getNorrisTrophy);
}
export function useRocketTrophy2019() {
  return useQuery("getRocketTrophy", getRocketTrophy);
}
export function useArtRossTrophy2019() {
  return useQuery("getArtRossTrophy", getArtRossTrophy);
}
export function useConnSmytheTrophy2019() {
  return useQuery("getConnSmytheTrophy", getConnSmytheTrophy);
}
export function useCalderTrophy2019() {
  return useQuery("getCalderTrophy", getCalderTrophy);
}
export function useLadyByngTrophy2019() {
  return useQuery("getLadyByngTrophy", getLadyByngTrophy);
}
export function useCoachOfYearTrophy2019() {
  return useQuery("getCoachOfYearTrophy", getCoachOfYearTrophy);
}
export function useGMOfYearTrophy2019() {
  return useQuery("getGMOfYearTrophy", getGMOfYearTrophy);
}