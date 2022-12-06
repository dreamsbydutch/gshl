import { currentSeason } from "./constants";
import { useEndpointQuery } from "./fetch";

export function useUsers() {
    var scheduleData = useEndpointQuery('useUsers', 'MainInput', 'Users')
    return { 'data': scheduleData.data, 'isLoading': scheduleData.isLoading }
}
export function useGSHLTeams() {
    var gshlTeamsData = useEndpointQuery('useGSHLTeams', 'MainInput', 'GSHLTeams')
    return { 'data': gshlTeamsData.data, 'isLoading': gshlTeamsData.isLoading }
}
export function useNHLTeams() {
    var nhlTeamsData = useEndpointQuery('useNHLTeams', 'MainInput', 'NHLTeams')
    return { 'data': nhlTeamsData.data, 'isLoading': nhlTeamsData.isLoading }
}
export function usePositions() {
    var positionsData = useEndpointQuery('usePositions', 'MainInput', 'Positions')
    return { 'data': positionsData.data, 'isLoading': positionsData.isLoading }
}
export function useWeeks() {
    var weeksData = useEndpointQuery('useWeeks', 'MainInput', 'Weeks')
    return { 'data': weeksData.data, 'isLoading': weeksData.isLoading }
}
export function useSchedule(season) {
    var scheduleData = useEndpointQuery('useSchedule', 'MainInput', 'Schedule')
    var gshlTeams = useGSHLTeams()
    var rawteamWeeks = useTeamWeeks(season)
    var teamStats = rawteamWeeks.seasonData && rawteamWeeks.playoffData && [...rawteamWeeks.seasonData,...rawteamWeeks.playoffData]
    var outputData = scheduleData.data && scheduleData.data.filter(obj => obj.HomeTeam && obj.AwayTeam && obj.Season === season).map(obj => {
        obj.HomeTeamData = gshlTeams.data && gshlTeams.data.filter(team => team[obj.Season] === obj.HomeTeam)[0]
        obj.AwayTeamData = gshlTeams.data && gshlTeams.data.filter(team => team[obj.Season] === obj.AwayTeam)[0]
        obj.HomeTeamStats = teamStats && teamStats.filter(team => team.gshlTeam === obj.HomeTeam && team.Season === obj.Season && team.Week === obj.WeekNum)[0]
        obj.AwayTeamStats = teamStats && teamStats.filter(team => team.gshlTeam === obj.AwayTeam && team.Season === obj.Season && team.Week === obj.WeekNum)[0]
        return obj
    })
    return { 'data': outputData, 'isLoading': scheduleData.isLoading }
}
export function useMatchup(id) {
    var gshlTeams = useGSHLTeams()
    var scheduleData = useEndpointQuery('useSchedule', 'MainInput', 'Schedule')
    var matchupData = scheduleData.data && scheduleData.data.filter(obj => obj.id === id)[0]
    var rawteamWeeks = useTeamWeeks((matchupData && matchupData.Season) || currentSeason.key)
    var rawplayerWeeks = usePlayerWeeks((matchupData && matchupData.Season) || currentSeason.key)
    if (scheduleData.isLoading || rawteamWeeks.isLoading || rawplayerWeeks.isLoading) {return {'data': null, 'isLoading': true}}
    var teamStats = rawteamWeeks.seasonData && rawteamWeeks.playoffData && [...rawteamWeeks.seasonData,...rawteamWeeks.playoffData]
    var playerStats = rawplayerWeeks.seasonData && rawplayerWeeks.playoffData && [...rawplayerWeeks.seasonData,...rawplayerWeeks.playoffData]
    matchupData.HomeTeamData = gshlTeams.data && gshlTeams.data.filter(team => team[matchupData.Season] === matchupData.HomeTeam)[0]
    matchupData.AwayTeamData = gshlTeams.data && gshlTeams.data.filter(team => team[matchupData.Season] === matchupData.AwayTeam)[0]
    matchupData.HomeTeamStats = teamStats && teamStats.filter(team => team.gshlTeam === matchupData.HomeTeam && team.Season === matchupData.Season && team.Week === matchupData.WeekNum)[0]
    matchupData.AwayTeamStats = teamStats && teamStats.filter(team => team.gshlTeam === matchupData.AwayTeam && team.Season === matchupData.Season && team.Week === matchupData.WeekNum)[0]
    matchupData.HomePlayerStats = playerStats && playerStats.filter(player => player.gshlTeam === matchupData.HomeTeam && player.Season === matchupData.Season && player.Week === matchupData.WeekNum).sort((a, b) => b.Rating - a.Rating)
    matchupData.AwayPlayerStats = playerStats && playerStats.filter(player => player.gshlTeam === matchupData.AwayTeam && player.Season === matchupData.Season && player.Week === matchupData.WeekNum).sort((a, b) => b.Rating - a.Rating)
    matchupData.firstStar = playerStats && playerStats.filter(player => player.id === matchupData.FirstStar && player.Season === matchupData.Season && player.Week === matchupData.WeekNum)[0]
    matchupData.secondStar = playerStats && playerStats.filter(player => player.id === matchupData.SecondStar && player.Season === matchupData.Season && player.Week === matchupData.WeekNum)[0]
    matchupData.thirdStar = playerStats && playerStats.filter(player => player.id === matchupData.ThirdStar && player.Season === matchupData.Season && player.Week === matchupData.WeekNum)[0]
    return { 'data': matchupData, 'isLoading': matchupData.isLoading }
}
export function useContracts() {
    var contractsData = useEndpointQuery('useContracts', 'MainInput', 'Contracts')
    return { 'data': contractsData.data, 'isLoading': contractsData.isLoading }
}



export function usePlayerDays(season) {
    return useEndpointQuery('usePlayerDays'+season, season+'PlayerDay', 'Data')
}
export function usePlayerWeeks(season) {
    return useEndpointQuery('usePlayerWeeks'+season, season+'PlayerWeek', 'Data')
}
export function usePlayerSplits(season) {
    return useEndpointQuery('usePlayerSplits'+season, season+'PlayerSeason', 'SplitsData')
}
export function usePlayerTotals(season) {
    return useEndpointQuery('usePlayerTotals'+season, season+'PlayerSeason', 'TotalsData')
}



export function useTeamDays(season) {
    return useEndpointQuery('useTeamDays'+season, season+'TeamDay', 'Data')
}
export function useTeamWeeks(season) {
    return useEndpointQuery('useTeamWeeks'+season, season+'TeamWeek', 'Data')
}
export function useTeamSeasons(season) {
    return useEndpointQuery('useTeamSeasons'+season, season+'TeamSeason', 'Data')
}



export function useDraftResults(season) {
    var draftResults = useEndpointQuery('useDraftResults'+season, season+'PlayerInfo', 'DraftResults')
    return { 'data': !draftResults.isLoading && draftResults.data, 'isLoading': draftResults.isLoading }
}
export function useNHLPlayerStats(season) {
    var playerStats = useEndpointQuery('useNHLPlayerStats'+season, season+'PlayerInfo', 'NHLPlayerStats')
    return { 'data': !playerStats.isLoading && playerStats.data, 'isLoading': playerStats.isLoading }
}
export function useNHLGoalieStats(season) {
    var goalieStats = useEndpointQuery('useNHLGoalieStats'+season, season+'PlayerInfo', 'NHLGoalieStats')
    return { 'data': !goalieStats.isLoading && goalieStats.data, 'isLoading': goalieStats.isLoading }
}
export function usePlayerSalaries(season) {
    var salaries = useEndpointQuery('usePlayerSalaries'+season, season+'PlayerInfo', 'PlayerSalaries')
    return { 'data': !salaries.isLoading && salaries.data, 'isLoading': salaries.isLoading }
}


export function useAwards(season) {
    var playerAwards = useEndpointQuery('usePlayerAwards'+season, season+'PlayerInfo', 'Awards')
    var teamAwards = useEndpointQuery('useTeamAwards'+season, season+'TeamInfo', 'Awards')
    return { 'playerData': !playerAwards.isLoading && playerAwards.data, 'teamData': !teamAwards.isLoading && teamAwards.data, 'isLoading': playerAwards.isLoading || teamAwards.isLoading }
}


export function useStandings(season) {
    var standings = useEndpointQuery('useStandings'+season, season+'TeamInfo', 'Standings')
    return { 'data': !standings.isLoading && standings.data, 'isLoading': standings.isLoading }
}
export function useTeamInfo(season) {
    var teamInfo = useEndpointQuery('useTeamInfo'+season, season+'TeamInfo', 'Teams')
    return { 'data': !teamInfo.isLoading && teamInfo.data, 'isLoading': teamInfo.isLoading }
}