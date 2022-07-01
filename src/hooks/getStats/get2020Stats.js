import { useQuery } from "react-query";
import axios from "axios";

const getTeamDailyStats = async () => {
  return await axios.get('https://opensheet.elk.sh/15jdmocgoVbCFC-gYJFAmrKMCY3dYUMPRoma9iyLF_og/SeasonData');
}
const getTeamWeeklyStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1vr5bbbKFHwcbBLmQlef4A4LSIl_5MCNzO6E_O198D8c/SeasonData');
}
const getTeamSeasonStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1MRHBYLvDJE4zisT1MzPn6n78xXDNH_iAf4fg5tsFte4/SeasonData');
}
const getPlayerDailyStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1a-71X6eaupAFVmiDly8PWzz42DZXszp9GEK8RgXxWL8/SeasonData');
}
const getPlayerWeeklyStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1DSaFKjelWICZ-ESuAT3L_RmAfUvpZhe4I8CeQTAcu2g/SeasonData');
}
const getPlayerSplitsStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1Jusx8UKgXqA8rJ5q_pbt_rf7b3727awbfnpt1Mid13c/SeasonSplitsData');
}
const getPlayerTotalsStats = async () => {
  return await axios.get('https://opensheet.elk.sh/1Jusx8UKgXqA8rJ5q_pbt_rf7b3727awbfnpt1Mid13c/SeasonTotalsData');
}
export function useTeamDailyStats2020() {
  return useQuery("getTeamDailyStats2020", getTeamDailyStats);
}
export function useTeamWeeklyStats2020() {
  return useQuery("getTeamWeeklyStats2020", getTeamWeeklyStats);
}
export function useTeamSeasonStats2020() {
  return useQuery("getTeamSeasonStats2020", getTeamSeasonStats);
}
export function usePlayerDailyStats2020() {
  return useQuery("getPlayerDailyStats2020", getPlayerDailyStats);
}
export function usePlayerWeeklyStats2020() {
  return useQuery("getPlayerWeeklyStats2020", getPlayerWeeklyStats);
}
export function usePlayerSplitsStats2020() {
  return useQuery("getPlayerSplitsStats2020", getPlayerSplitsStats);
}
export function usePlayerTotalsStats2020() {
  return useQuery("getPlayerTotalsStats2020", getPlayerTotalsStats);
}



const getStandings = async () => {
  return await axios.get('https://opensheet.elk.sh/16tgCTD0KaciZuJKYtgRqR5tNawC8rXchs6INUjP77JI/Standings');
}
export function useStandings2020() {
  return useQuery("getStandings2020", getStandings);
}



const getHartTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/15QQfWzTS4h7IFR1EadAe8wp604doRHVrDpbVV7O5a20/Hart');
}
const getVezinaTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/15QQfWzTS4h7IFR1EadAe8wp604doRHVrDpbVV7O5a20/Vezina');
}
const getNorrisTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/15QQfWzTS4h7IFR1EadAe8wp604doRHVrDpbVV7O5a20/Norris');
}
const getRocketTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/15QQfWzTS4h7IFR1EadAe8wp604doRHVrDpbVV7O5a20/Rocket');
}
const getArtRossTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/15QQfWzTS4h7IFR1EadAe8wp604doRHVrDpbVV7O5a20/ArtRoss');
}
const getConnSmytheTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/15QQfWzTS4h7IFR1EadAe8wp604doRHVrDpbVV7O5a20/ConnSmythe');
}
const getCalderTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/15QQfWzTS4h7IFR1EadAe8wp604doRHVrDpbVV7O5a20/Calder');
}
const getLadyByngTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/15QQfWzTS4h7IFR1EadAe8wp604doRHVrDpbVV7O5a20/LadyByng');
}
const getCoachOfYearTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/15QQfWzTS4h7IFR1EadAe8wp604doRHVrDpbVV7O5a20/CoachOfYear');
}
const getGMOfYearTrophy = async () => {
  return await axios.get('https://opensheet.elk.sh/15QQfWzTS4h7IFR1EadAe8wp604doRHVrDpbVV7O5a20/GMOfYear');
}
export function useHartTrophy2020() {
  return useQuery("getHartTrophy2020", getHartTrophy);
}
export function useVezinaTrophy2020() {
  return useQuery("getVezinaTrophy2020", getVezinaTrophy);
}
export function useNorrisTrophy2020() {
  return useQuery("getNorrisTrophy2020", getNorrisTrophy);
}
export function useRocketTrophy2020() {
  return useQuery("getRocketTrophy2020", getRocketTrophy);
}
export function useArtRossTrophy2020() {
  return useQuery("getArtRossTrophy2020", getArtRossTrophy);
}
export function useConnSmytheTrophy2020() {
  return useQuery("getConnSmytheTrophy2020", getConnSmytheTrophy);
}
export function useCalderTrophy2020() {
  return useQuery("getCalderTrophy2020", getCalderTrophy);
}
export function useLadyByngTrophy2020() {
  return useQuery("getLadyByngTrophy2020", getLadyByngTrophy);
}
export function useCoachOfYearTrophy2020() {
  return useQuery("getCoachOfYearTrophy2020", getCoachOfYearTrophy);
}
export function useGMOfYearTrophy2020() {
  return useQuery("getGMOfYearTrophy2020", getGMOfYearTrophy);
}