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
export function useSchedule() {
    var scheduleData = useEndpointQuery('useSchedule', 'MainInput', 'Schedule')
    var gshlTeams = useGSHLTeams()
    var rawteamWeeks = useTeamWeeks()
    var teamStats = rawteamWeeks.seasonData && rawteamWeeks.playoffData && [...rawteamWeeks.seasonData,...rawteamWeeks.playoffData]
    var outputData = scheduleData.data && scheduleData.data.filter(obj => obj.HomeTeam && obj.AwayTeam).map(obj => {
        obj.HomeTeamData = gshlTeams.data && gshlTeams.data.filter(team => team[obj.Season] === obj.HomeTeam)[0]
        obj.AwayTeamData = gshlTeams.data && gshlTeams.data.filter(team => team[obj.Season] === obj.AwayTeam)[0]
        obj.HomeTeamStats = teamStats && teamStats.filter(team => team.gshlTeam === obj.HomeTeam && team.Season === obj.Season && team.Week === obj.WeekNum)[0]
        obj.AwayTeamStats = teamStats && teamStats.filter(team => team.gshlTeam === obj.AwayTeam && team.Season === obj.Season && team.Week === obj.WeekNum)[0]
        return obj
    })
    return { 'data': outputData, 'isLoading': scheduleData.isLoading }
}
export function useContracts() {
    var contractsData = useEndpointQuery('useContracts', 'MainInput', 'Contracts')
    return { 'data': contractsData.data, 'isLoading': contractsData.isLoading }
}



export function usePlayerDays() {
    var stats2022RS = useEndpointQuery('usePlayerDays2022RS', '2022PlayerDay', 'SeasonData')
    var stats2022PO = useEndpointQuery('usePlayerDays2022PO', '2022PlayerDay', 'PlayoffData')
    var stats2021RS = useEndpointQuery('usePlayerDays2021RS', '2021PlayerDay', 'SeasonData')
    var stats2021PO = useEndpointQuery('usePlayerDays2021PO', '2021PlayerDay', 'PlayoffData')
    var stats2020RS = useEndpointQuery('usePlayerDays2020RS', '2020PlayerDay', 'SeasonData')
    var stats2020PO = useEndpointQuery('usePlayerDays2020PO', '2020PlayerDay', 'PlayoffData')

    var isLoadingRS = stats2022RS.isLoading || stats2021RS.isLoading || stats2020RS.isLoading
    var isLoadingPO = stats2022PO.isLoading || stats2021PO.isLoading || stats2020PO.isLoading

    var seasonData = !isLoadingRS && stats2022RS.data && stats2021RS.data && stats2020RS.data && [...stats2022RS.data, ...stats2021RS.data, ...stats2020RS.data]
    var playoffData = !isLoadingPO && stats2022PO.data && stats2021PO.data && stats2020PO.data && [...stats2022PO.data, ...stats2021PO.data, ...stats2020PO.data]

    return { 'seasonData': seasonData, 'playoffData': playoffData, 'isLoading': isLoadingPO || isLoadingRS }
}
export function usePlayerWeeks() {
    var stats2022RS = useEndpointQuery('usePlayerWeeks2022RS', '2022PlayerWeek', 'SeasonData')
    var stats2022PO = useEndpointQuery('usePlayerWeeks2022PO', '2022PlayerWeek', 'PlayoffData')
    var stats2021RS = useEndpointQuery('usePlayerWeeks2021RS', '2021PlayerWeek', 'SeasonData')
    var stats2021PO = useEndpointQuery('usePlayerWeeks2021PO', '2021PlayerWeek', 'PlayoffData')
    var stats2020RS = useEndpointQuery('usePlayerWeeks2020RS', '2020PlayerWeek', 'SeasonData')
    var stats2020PO = useEndpointQuery('usePlayerWeeks2020PO', '2020PlayerWeek', 'PlayoffData')

    var isLoadingRS = stats2022RS.isLoading || stats2021RS.isLoading || stats2020RS.isLoading
    var isLoadingPO = stats2022PO.isLoading || stats2021PO.isLoading || stats2020PO.isLoading

    var seasonData = !isLoadingRS && stats2022RS.data && stats2021RS.data && stats2020RS.data && [...stats2022RS.data, ...stats2021RS.data, ...stats2020RS.data]
    var playoffData = !isLoadingPO && stats2022PO.data && stats2021PO.data && stats2020PO.data && [...stats2022PO.data, ...stats2021PO.data, ...stats2020PO.data]

    return { 'seasonData': seasonData, 'playoffData': playoffData, 'isLoading': isLoadingPO || isLoadingRS }
}
export function usePlayerSplits() {
    var stats2022RS = useEndpointQuery('usePlayerSplits2022RS', '2022PlayerSeason', 'SeasonSplitsData')
    var stats2022PO = useEndpointQuery('usePlayerSplits2022PO', '2022PlayerSeason', 'PlayoffSplitsData')
    var stats2021RS = useEndpointQuery('usePlayerSplits2021RS', '2021PlayerSeason', 'SeasonSplitsData')
    var stats2021PO = useEndpointQuery('usePlayerSplits2021PO', '2021PlayerSeason', 'PlayoffSplitsData')
    var stats2020RS = useEndpointQuery('usePlayerSplits2020RS', '2020PlayerSeason', 'SeasonSplitsData')
    var stats2020PO = useEndpointQuery('usePlayerSplits2020PO', '2020PlayerSeason', 'PlayoffSplitsData')

    var isLoadingRS = stats2022RS.isLoading || stats2021RS.isLoading || stats2020RS.isLoading
    var isLoadingPO = stats2022PO.isLoading || stats2021PO.isLoading || stats2020PO.isLoading

    var seasonData = !isLoadingRS && stats2022RS.data && stats2021RS.data && stats2020RS.data && [...stats2022RS.data, ...stats2021RS.data, ...stats2020RS.data]
    var playoffData = !isLoadingPO && stats2022PO.data && stats2021PO.data && stats2020PO.data && [...stats2022PO.data, ...stats2021PO.data, ...stats2020PO.data]

    return { 'seasonData': seasonData, 'playoffData': playoffData, 'isLoading': isLoadingPO || isLoadingRS }
}
export function usePlayerTotals() {
    var stats2022RS = useEndpointQuery('usePlayerTotals2022RS', '2022PlayerSeason', 'SeasonTotalsData')
    var stats2022PO = useEndpointQuery('usePlayerTotals2022PO', '2022PlayerSeason', 'PlayoffTotalsData')
    var stats2021RS = useEndpointQuery('usePlayerTotals2021RS', '2021PlayerSeason', 'SeasonTotalsData')
    var stats2021PO = useEndpointQuery('usePlayerTotals2021PO', '2021PlayerSeason', 'PlayoffTotalsData')
    var stats2020RS = useEndpointQuery('usePlayerTotals2020RS', '2020PlayerSeason', 'SeasonTotalsData')
    var stats2020PO = useEndpointQuery('usePlayerTotals2020PO', '2020PlayerSeason', 'PlayoffTotalsData')

    var isLoadingRS = stats2022RS.isLoading || stats2021RS.isLoading || stats2020RS.isLoading
    var isLoadingPO = stats2022PO.isLoading || stats2021PO.isLoading || stats2020PO.isLoading

    var seasonData = !isLoadingRS && stats2022RS.data && stats2021RS.data && stats2020RS.data && [...stats2022RS.data, ...stats2021RS.data, ...stats2020RS.data]
    var playoffData = !isLoadingPO && stats2022PO.data && stats2021PO.data && stats2020PO.data && [...stats2022PO.data, ...stats2021PO.data, ...stats2020PO.data]

    return { 'seasonData': seasonData, 'playoffData': playoffData, 'isLoading': isLoadingPO || isLoadingRS }
}



export function useTeamDays() {
    var stats2022RS = useEndpointQuery('useTeamDays2022RS', '2022TeamDay', 'SeasonData')
    var stats2022PO = useEndpointQuery('useTeamDays2022PO', '2022TeamDay', 'PlayoffData')
    var stats2021RS = useEndpointQuery('useTeamDays2021RS', '2021TeamDay', 'SeasonData')
    var stats2021PO = useEndpointQuery('useTeamDays2021PO', '2021TeamDay', 'PlayoffData')
    var stats2020RS = useEndpointQuery('useTeamDays2020RS', '2020TeamDay', 'SeasonData')
    var stats2020PO = useEndpointQuery('useTeamDays2020PO', '2020TeamDay', 'PlayoffData')

    var isLoadingRS = stats2022RS.isLoading || stats2021RS.isLoading || stats2020RS.isLoading
    var isLoadingPO = stats2022PO.isLoading || stats2021PO.isLoading || stats2020PO.isLoading

    var seasonData = !isLoadingRS && stats2022RS.data && stats2021RS.data && stats2020RS.data && [...stats2022RS.data, ...stats2021RS.data, ...stats2020RS.data]
    var playoffData = !isLoadingPO && stats2022PO.data && stats2021PO.data && stats2020PO.data && [...stats2022PO.data, ...stats2021PO.data, ...stats2020PO.data]

    return { 'seasonData': seasonData, 'playoffData': playoffData, 'isLoading': isLoadingPO || isLoadingRS }
}
export function useTeamWeeks() {
    var stats2022RS = useEndpointQuery('useTeamWeeks2022RS', '2022TeamWeek', 'SeasonData')
    var stats2022PO = useEndpointQuery('useTeamWeeks2022PO', '2022TeamWeek', 'PlayoffData')
    var stats2021RS = useEndpointQuery('useTeamWeeks2021RS', '2021TeamWeek', 'SeasonData')
    var stats2021PO = useEndpointQuery('useTeamWeeks2021PO', '2021TeamWeek', 'PlayoffData')
    var stats2020RS = useEndpointQuery('useTeamWeeks2020RS', '2020TeamWeek', 'SeasonData')
    var stats2020PO = useEndpointQuery('useTeamWeeks2020PO', '2020TeamWeek', 'PlayoffData')

    var isLoadingRS = stats2022RS.isLoading || stats2021RS.isLoading || stats2020RS.isLoading
    var isLoadingPO = stats2022PO.isLoading || stats2021PO.isLoading || stats2020PO.isLoading

    var seasonData = !isLoadingRS && stats2022RS.data && stats2021RS.data && stats2020RS.data && [...stats2022RS.data, ...stats2021RS.data, ...stats2020RS.data]
    var playoffData = !isLoadingPO && stats2022PO.data && stats2021PO.data && stats2020PO.data && [...stats2022PO.data, ...stats2021PO.data, ...stats2020PO.data]

    return { 'seasonData': seasonData, 'playoffData': playoffData, 'isLoading': isLoadingPO || isLoadingRS }
}
export function useTeamSeasons() {
    var stats2022RS = useEndpointQuery('useTeamSeasons2022RS', '2022TeamSeason', 'SeasonData')
    var stats2022PO = useEndpointQuery('useTeamSeasons2022PO', '2022TeamSeason', 'PlayoffData')
    var stats2021RS = useEndpointQuery('useTeamSeasons2021RS', '2021TeamSeason', 'SeasonData')
    var stats2021PO = useEndpointQuery('useTeamSeasons2021PO', '2021TeamSeason', 'PlayoffData')
    var stats2020RS = useEndpointQuery('useTeamSeasons2020RS', '2020TeamSeason', 'SeasonData')
    var stats2020PO = useEndpointQuery('useTeamSeasons2020PO', '2020TeamSeason', 'PlayoffData')

    var isLoadingRS = stats2022RS.isLoading || stats2021RS.isLoading || stats2020RS.isLoading
    var isLoadingPO = stats2022PO.isLoading || stats2021PO.isLoading || stats2020PO.isLoading

    var seasonData = !isLoadingRS && stats2022RS.data && stats2021RS.data && stats2020RS.data && [...stats2022RS.data, ...stats2021RS.data, ...stats2020RS.data]
    var playoffData = !isLoadingPO && stats2022PO.data && stats2021PO.data && stats2020PO.data && [...stats2022PO.data, ...stats2021PO.data, ...stats2020PO.data]

    return { 'seasonData': seasonData, 'playoffData': playoffData, 'isLoading': isLoadingPO || isLoadingRS }
}



export function useDraftResults() {
    var draftResults2022 = useEndpointQuery('useDraftResults2022', '2022PlayerInfo', 'DraftResults')
    var draftResults2021 = useEndpointQuery('useDraftResults2021', '2021PlayerInfo', 'DraftResults')
    var draftResults2020 = useEndpointQuery('useDraftResults2020', '2020PlayerInfo', 'DraftResults')

    var isLoading = draftResults2022.isLoading || draftResults2021.isLoading || draftResults2020.isLoading

    var draftResultsData = !isLoading && draftResults2022.data && draftResults2021.data && draftResults2020.data && [...draftResults2022.data, ...draftResults2021.data, ...draftResults2020.data]

    return { 'data': draftResultsData, 'isLoading': isLoading }
}
export function useNHLPlayerStats() {
    var playerStats2022 = useEndpointQuery('useNHLPlayerStats2022', '2022PlayerInfo', 'NHLPlayerStats')
    var playerStats2021 = useEndpointQuery('useNHLPlayerStats2021', '2021PlayerInfo', 'NHLPlayerStats')
    var playerStats2020 = useEndpointQuery('useNHLPlayerStats2020', '2020PlayerInfo', 'NHLPlayerStats')

    var isLoading = playerStats2022.isLoading || playerStats2021.isLoading || playerStats2020.isLoading

    var playerStatsData = !isLoading && playerStats2022.data && playerStats2021.data && playerStats2020.data && [...playerStats2022.data, ...playerStats2021.data, ...playerStats2020.data]

    return { 'data': playerStatsData, 'isLoading': isLoading }
}
export function useNHLGoalieStats() {
    var goalieStats2022 = useEndpointQuery('useNHLGoalieStats2022', '2022PlayerInfo', 'NHLGoalieStats')
    var goalieStats2021 = useEndpointQuery('useNHLGoalieStats2021', '2021PlayerInfo', 'NHLGoalieStats')
    var goalieStats2020 = useEndpointQuery('useNHLGoalieStats2020', '2020PlayerInfo', 'NHLGoalieStats')

    var isLoading = goalieStats2022.isLoading || goalieStats2021.isLoading || goalieStats2020.isLoading

    var goalieStatsData = !isLoading && goalieStats2022.data && goalieStats2021.data && goalieStats2020.data && [...goalieStats2022.data, ...goalieStats2021.data, ...goalieStats2020.data]

    return { 'data': goalieStatsData, 'isLoading': isLoading }
}
export function usePlayerSalaries() {
    var salaries2022 = useEndpointQuery('usePlayerSalaries2022', '2022PlayerInfo', 'PlayerSalaries')
    var salaries2021 = useEndpointQuery('usePlayerSalaries2021', '2021PlayerInfo', 'PlayerSalaries')
    var salaries2020 = useEndpointQuery('usePlayerSalaries2020', '2020PlayerInfo', 'PlayerSalaries')

    var isLoading = salaries2022.isLoading || salaries2021.isLoading || salaries2020.isLoading

    var salariesData = !isLoading && salaries2022.data && salaries2021.data && salaries2020.data && [...salaries2022.data, ...salaries2021.data, ...salaries2020.data]

    return { 'data': salariesData, 'isLoading': isLoading }
}


export function useAwards() {
    var playerAwards2022 = useEndpointQuery('usePlayerAwards2022', '2022PlayerInfo', 'Awards')
    var teamAwards2022 = useEndpointQuery('useTeamAwards2022', '2022TeamInfo', 'Awards')
    var playerAwards2021 = useEndpointQuery('usePlayerAwards2021', '2021PlayerInfo', 'Awards')
    var teamAwards2021 = useEndpointQuery('useTeamAwards2021', '2021TeamInfo', 'Awards')
    var playerAwards2020 = useEndpointQuery('usePlayerAwards2020', '2020PlayerInfo', 'Awards')
    var teamAwards2020 = useEndpointQuery('useTeamAwards2020', '2020TeamInfo', 'Awards')

    var isLoadingPlayer = playerAwards2022.isLoading || playerAwards2021.isLoading || playerAwards2020.isLoading
    var isLoadingTeam = teamAwards2022.isLoading || teamAwards2021.isLoading || teamAwards2020.isLoading

    var playerData = !isLoadingPlayer && playerAwards2022.data && playerAwards2021.data && playerAwards2020.data && [...playerAwards2022.data, ...playerAwards2021.data, ...playerAwards2020.data]
    var teamData = !isLoadingTeam && teamAwards2022.data && teamAwards2021.data && teamAwards2020.data && [...teamAwards2022.data, ...teamAwards2021.data, ...teamAwards2020.data]

    return { 'playerData': playerData, 'teamData': teamData, 'isLoading': isLoadingPlayer || isLoadingTeam }
}


export function useStandings() {
    var standings2022 = useEndpointQuery('useStandings2022', '2022TeamInfo', 'Standings')
    var standings2021 = useEndpointQuery('useStandings2021', '2021TeamInfo', 'Standings')
    var standings2020 = useEndpointQuery('useStandings2020', '2020TeamInfo', 'Standings')

    var isLoading = standings2022.isLoading || standings2021.isLoading || standings2020.isLoading

    var standingsData = !isLoading && standings2022.data && standings2021.data && standings2020.data && [...standings2022.data, ...standings2021.data, ...standings2020.data]

    return { 'data': standingsData, 'isLoading': isLoading }
}
export function useTeamInfo() {
    var teamInfo2022 = useEndpointQuery('useTeamInfo2022', '2022TeamInfo', 'Teams')
    var teamInfo2021 = useEndpointQuery('useTeamInfo2021', '2021TeamInfo', 'Teams')
    var teamInfo2020 = useEndpointQuery('useTeamInfo2020', '2020TeamInfo', 'Teams')

    var isLoading = teamInfo2022.isLoading || teamInfo2021.isLoading || teamInfo2020.isLoading

    var teamInfoData = !isLoading && teamInfo2022.data && teamInfo2021.data && teamInfo2020.data && [...teamInfo2022.data, ...teamInfo2021.data, ...teamInfo2020.data]

    return { 'data': teamInfoData, 'isLoading': isLoading }
}