import { useQuery } from "react-query";
import axios from "axios";

const getTeamDailyStats = async () => {
  return await axios.get('https://opensheet.elk.sh/16Y-RJUNj1f1SfMT4CzKyQrN4Bd0gfMvYkToxQzlsByA/SeasonData');
}
const getTeamWeeklyStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1u1JcrUuSAszlKock2NLJ8a7fLfnvs0NcSPIv9sTI9V0/SeasonData');
}
const getTeamSeasonStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1tEgaRhJRCUuVwcJiEylAPLpB0kgNDgMnvhPokUftgfs/SeasonData');
}
const getPlayerDailyStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1yKeZesCMO4RxvRMiXu6HA0z_lREFNy5zPxEv22nyh00/SeasonData');
}
const getPlayerWeeklyStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1gyl5QkH2ZGKB4bUQ7WHC0Hcs36a7f2I0NHzg2G8xDdQ/SeasonData');
}
const getPlayerSplitsStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1GmvqIithq3PYbRqggXlsw-4nJa8kKsxWfD4NGmZUrh4/SeasonSplitsData');
}
const getPlayerTotalsStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1GmvqIithq3PYbRqggXlsw-4nJa8kKsxWfD4NGmZUrh4/SeasonTotalsData');
}
export function useTeamDailyStats2021() {
  return useQuery("getTeamDailyStats2021", getTeamDailyStats);
}
export function useTeamWeeklyStats2021() {
  return useQuery("getTeamWeeklyStats2021", getTeamWeeklyStats);
}
export function useTeamSeasonStats2021() {
  return useQuery("getTeamSeasonStats2021", getTeamSeasonStats);
}
export function usePlayerDailyStats2021() {
  return useQuery("getPlayerDailyStats2021", getPlayerDailyStats);
}
export function usePlayerWeeklyStats2021() {
  return useQuery("getPlayerWeeklyStats2021", getPlayerWeeklyStats);
}
export function usePlayerSplitsStats2021() {
  return useQuery("getPlayerSplitsStats2021", getPlayerSplitsStats);
}
export function usePlayerTotalsStats2021() {
  return useQuery("getPlayerTotalsStats2021", getPlayerTotalsStats);
}



const getStandings = async () => {
  return await axios.get('https://opensheet.elk.sh/1qtdxTU_LhU9AF6lUxo5QhXlREbrj00_-4NurVD458f8/Standings');
}
export function useStandings2021() {
  return useQuery("getStandings2021", getStandings);
}



const getHartTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1Ay6YUhuFNyN1RNLUk1bugMuvTGk28YY8SPYmiMfdgO4/Hart');
}
const getVezinaTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1Ay6YUhuFNyN1RNLUk1bugMuvTGk28YY8SPYmiMfdgO4/Vezina');
}
const getNorrisTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1Ay6YUhuFNyN1RNLUk1bugMuvTGk28YY8SPYmiMfdgO4/Norris');
}
const getRocketTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1Ay6YUhuFNyN1RNLUk1bugMuvTGk28YY8SPYmiMfdgO4/Rocket');
}
const getArtRossTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1Ay6YUhuFNyN1RNLUk1bugMuvTGk28YY8SPYmiMfdgO4/ArtRoss');
}
const getConnSmytheTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1Ay6YUhuFNyN1RNLUk1bugMuvTGk28YY8SPYmiMfdgO4/ConnSmythe');
}
const getCalderTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1Ay6YUhuFNyN1RNLUk1bugMuvTGk28YY8SPYmiMfdgO4/Calder');
}
const getLadyByngTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1Ay6YUhuFNyN1RNLUk1bugMuvTGk28YY8SPYmiMfdgO4/LadyByng');
}
const getCoachOfYearTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1Ay6YUhuFNyN1RNLUk1bugMuvTGk28YY8SPYmiMfdgO4/CoachOfYear');
}
const getGMOfYearTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/1Ay6YUhuFNyN1RNLUk1bugMuvTGk28YY8SPYmiMfdgO4/GMOfYear');
}
export function useHartTrophy2021() {
  return useQuery("getHartTrophy2021", getHartTrophy);
}
export function useVezinaTrophy2021() {
  return useQuery("getVezinaTrophy2021", getVezinaTrophy);
}
export function useNorrisTrophy2021() {
  return useQuery("getNorrisTrophy2021", getNorrisTrophy);
}
export function useRocketTrophy2021() {
  return useQuery("getRocketTrophy2021", getRocketTrophy);
}
export function useArtRossTrophy2021() {
  return useQuery("getArtRossTrophy2021", getArtRossTrophy);
}
export function useConnSmytheTrophy2021() {
  return useQuery("getConnSmytheTrophy2021", getConnSmytheTrophy);
}
export function useCalderTrophy2021() {
  return useQuery("getCalderTrophy2021", getCalderTrophy);
}
export function useLadyByngTrophy2021() {
  return useQuery("getLadyByngTrophy2021", getLadyByngTrophy);
}
export function useCoachOfYearTrophy2021() {
  return useQuery("getCoachOfYearTrophy2021", getCoachOfYearTrophy);
}
export function useGMOfYearTrophy2021() {
  return useQuery("getGMOfYearTrophy2021", getGMOfYearTrophy);
}