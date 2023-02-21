import { useQuery } from "react-query"

const sheetIDs = {
    'MainInput': '1jiL1gtJ-_Drlksr24kWaiRABOEniO0pg4Vlm05SFqYM',
    '2023PlayerData': '17ECL-ub9zRH1Sl0uKZ9Nrn6Z45xGRwoJgulQ41DDK78',
    '2023TeamData': '1GzPxpnF7GYtqQjIWDaFYHorQmmIrLYCsUBx0FCeDaSE',
    '2022PlayerData': '1dYRA1bT2phaPGH-LzgyiykkjsXoTHzkRe6aKdQe1vq0',
    '2022TeamData': '1qtdxTU_LhU9AF6lUxo5QhXlREbrj00_-4NurVD458f8',
    '2021PlayerData': '1AXH8tG8l1iSZaIo6bmpsFPlhTgtScfytRT7cfqBFAu4',
    '2021TeamData': '16QH55O9RIgx3HVi9mhp18wywt3e-dYvIvNaLixrgP0A',
    '2020PlayerData': '1Wiq54Hz7QbpkzEXhX-5sSgp11GsqmQj_GNdEtdz2RLg',
    '2020TeamData': '1bN_oDgH5fl01saFIFrUXWXtzpRrUuW9HxdivhH_HiQg',
    '2019PlayerData': '',
    '2019TeamData': '',
    '2018PlayerData': '',
    '2018TeamData': '',
    '2017PlayerData': '',
    '2017TeamData': '',
    '2016PlayerData': '',
    '2016TeamData': '',
    '2015PlayerData': '',
    '2015TeamData': ''
}
async function queryFunc({ queryKey }) {
    const [, sheetsKey, pageID] = queryKey
    const data = await fetch('https://opensheet.elk.sh/' + sheetIDs[sheetsKey] + '/' + pageID)
    return data.json()
}


export function useStandings(season) {
    const standings = useQuery(['standings', season + 'TeamData', 'Standings'], queryFunc)
    const teamData = useGSHLTeams(season)
    var output = {
        'data': [],
        'isLoading': standings.isLoading || teamData.isLoading,
        'isError': standings.isError || teamData.isError,
    }
    if (output.isLoading || output.isError || standings.data.error) { return output }
    console.log(standings)
    output.data = standings.data.map(obj => {
        obj.teamInfo = teamData.data.filter(a => a[season] === obj.teamID)[0]
        return obj
    })
    return output
}
export function useSchedule(season) {
    const seasonSchedule = useQuery(['schedule', 'MainInput', 'Schedule'], queryFunc)
    const teamWeeks = useTeamWeeks(2023)
    const playerWeeks = usePlayerWeeks(2023)
    const teamData = useGSHLTeams(season)

    var output = {
        'data': null,
        'isLoading': seasonSchedule.isLoading || teamWeeks.isLoading || playerWeeks.isLoading,
        'isError': seasonSchedule.isError || teamWeeks.isError || playerWeeks.isError
    }

    if (output.isLoading || output.isError) { return output }
    output.data = seasonSchedule.data.filter(obj => obj.Season === season).map(obj => {
        obj.homeTeamInfo = teamData.data.filter(a => a[season] === obj.HomeTeam)[0]
        obj.awayTeamInfo = teamData.data.filter(a => a[season] === obj.AwayTeam)[0]
        obj['homeTeamStats'] = teamWeeks.data ? teamWeeks.data.filter(a => a.WeekNum === obj.WeekNum && a.gshlTeam === obj.HomeTeam)[0] : null
        obj['awayTeamStats'] = teamWeeks.data ? teamWeeks.data.filter(a => a.WeekNum === obj.WeekNum && a.gshlTeam === obj.AwayTeam)[0] : null
        obj['homePlayerStats'] = playerWeeks.data ? playerWeeks.data.filter(a => a.WeekNum === obj.WeekNum && a.gshlTeam === obj.HomeTeam) : null
        obj['awayPlayerStats'] = playerWeeks.data ? playerWeeks.data.filter(a => a.WeekNum === obj.WeekNum && a.gshlTeam === obj.AwayTeam) : null

        return obj
    })

    return output
}
export function useCurrentRosters(season) {
    const currentRosters = useQuery(['currentRosters', season + 'PlayerData', 'CurrentRosters'], queryFunc)
    return {
        'data': currentRosters.data || null,
        'isLoading': currentRosters.isLoading,
        'isError': currentRosters.isError,
    }
}


export function useTeamDays(season) {
    const teamDays = useQuery(['teamDays', season + 'TeamData', 'Days'], queryFunc)
    const teamData = useGSHLTeams(season)
    var output = {
        'data': null,
        'isLoading': teamDays.isLoading || teamData.isLoading,
        'isError': teamDays.isError || teamData.isError,
    }
    if (output.isLoading || output.isError) { return output }
    output.data = teamDays.map(obj => {
        obj.teamInfo = teamData.filter(a => a[season] === obj.gshlTeam)[0]
        return obj
    })
    return output
}
export function useTeamWeeks(season) {
    const teamWeeks = useQuery(['teamWeeks', season + 'TeamData', 'Weeks'], queryFunc)
    const teamData = useGSHLTeams(season)
    var output = {
        'data': null,
        'isLoading': teamWeeks.isLoading || teamData.isLoading,
        'isError': teamWeeks.isError || teamData.isError,
    }
    if (output.isLoading || output.isError) { return output }
    output.data = teamWeeks.data.map(obj => {
        obj.teamInfo = teamData.data.filter(a => a[season] === obj.gshlTeam)[0]
        return obj
    })
    return output
}
export function useTeamSeasons(season) {
    const teamSeasons = useQuery(['teamSeasons', season + 'TeamData', 'Seasons'], queryFunc)
    const teamData = useGSHLTeams(season)
    var output = {
        'data': null,
        'isLoading': teamSeasons.isLoading || teamData.isLoading,
        'isError': teamSeasons.isError || teamData.isError,
    }
    if (output.isLoading || output.isError) { return output }
    output.data = teamSeasons.map(obj => {
        obj.teamInfo = teamData.filter(a => a[season] === obj.gshlTeam)[0]
        return obj
    })
    return output
}

export function usePlayerDays(season) {
    const playerDays = useQuery(['playerDays', season + 'PlayerData', 'Days'], queryFunc)
    const teamData = useGSHLTeams(season)
    var output = {
        'data': null,
        'isLoading': playerDays.isLoading || teamData.isLoading,
        'isError': playerDays.isError || teamData.isError,
    }
    if (output.isLoading || output.isError) { return output }
    output.data = playerDays.data.map(obj => {
        obj.teamInfo = teamData.data.filter(a => a[season] === obj.gshlTeam)[0]
        return obj
    })
    return output
}
export function usePlayerWeeks(season) {
    const playerWeeks = useQuery(['playerWeeks', season + 'PlayerData', 'Weeks'], queryFunc)
    const teamData = useGSHLTeams(season)
    var output = {
        'data': null,
        'isLoading': playerWeeks.isLoading || teamData.isLoading,
        'isError': playerWeeks.isError || teamData.isError,
    }
    if (output.isLoading || output.isError) { return output }
    output.data = playerWeeks.data.map(obj => {
        obj.teamInfo = teamData.data.filter(a => a[season] === obj.gshlTeam)[0]
        return obj
    })
    return output
}
export function usePlayerSeasonSplits(season) {
    const playerSeasons = useQuery(['playerSeasons', season + 'PlayerData', 'Splits'], queryFunc)
    const teamData = useGSHLTeams(season)
    var output = {
        'data': null,
        'isLoading': playerSeasons.isLoading || teamData.isLoading,
        'isError': playerSeasons.isError || teamData.isError,
    }
    if (output.isLoading || output.isError) { return output }
    output.data = playerSeasons.data.map(obj => {
        obj.teamInfo = teamData.data.filter(a => a[season] === obj.gshlTeam)[0]
        return obj
    })
    return output
}
export function usePlayerSeasonTotals(season) {
    const playerSeasons = useQuery(['playerSeasons', season + 'PlayerData', 'Totals'], queryFunc)
    const teamData = useGSHLTeams(season)
    var output = {
        'data': null,
        'isLoading': playerSeasons.isLoading || teamData.isLoading,
        'isError': playerSeasons.isError || teamData.isError,
    }
    if (output.isLoading || output.isError) { return output }
    output.data = playerSeasons.data.map(obj => {
        obj.teamInfo = teamData.data.filter(a => a[season] === obj.gshlTeam)[0]
        return obj
    })
    return output
}


export function useUsers() {
    const users = useQuery(['Users', 'MainInput', 'Users'], queryFunc)
    return {
        'data': users.data || null,
        'isLoading': users.isLoading,
        'isError': users.isError,
    }
}
export function useGSHLTeams(season) {
    const gshlTeams = useQuery(['GSHLTeams', 'MainInput', 'GSHLTeams'], queryFunc)
    const users = useUsers()
    var output = {
        'data': null,
        'isLoading': gshlTeams.isLoading || users.isLoading,
        'isError': gshlTeams.isError || users.isError,
    }
    if (output.isLoading || output.isError) { return output }
    output.data = gshlTeams.data.filter(obj => obj[season]).map(obj => {
        obj.owner = users.data.filter(a => a.id === obj.OwnerID)[0]
        return obj
    })
    return output
}
export function useNHLTeams() {
    const nhlTeams = useQuery(['NHLTeams', 'MainInput', 'NHLTeams'], queryFunc)
    return {
        'data': nhlTeams.data || null,
        'isLoading': nhlTeams.isLoading,
        'isError': nhlTeams.isError,
    }
}
export function usePositions() {
    const positions = useQuery(['Positions', 'MainInput', 'Positions'], queryFunc)
    return {
        'data': positions.data || null,
        'isLoading': positions.isLoading,
        'isError': positions.isError,
    }
}
export function useWeeks(season) {
    const weeks = useQuery(['seasonWeeks', 'MainInput', 'Weeks'], queryFunc)
    return {
        'data': (weeks.data && weeks.data.filter(obj => obj.Season === String(season))) || null,
        'isLoading': weeks.isLoading,
        'isError': weeks.isError,
    }
}
export function useMatchupByID(matchupID) {
    const matchups = useQuery(['schedule', 'MainInput', 'Schedule'], queryFunc)
    const matchup = matchups.data?.filter(obj => obj.id === matchupID)[0]
    const teamWeeks = useQuery(['teamWeeks', matchup?.Season + 'TeamData', 'Weeks'], queryFunc,{enabled:!!matchup})
    const playerWeeks = useQuery(['playerWeeks', matchup?.Season + 'PlayerData', 'Weeks'], queryFunc,{enabled:!!matchup})
    const gshlTeams = useQuery(['GSHLTeams', 'MainInput', 'GSHLTeams'], queryFunc,{enabled:!!matchup})
    const users = useQuery(['Users', 'MainInput', 'Users'], queryFunc,{enabled:!!matchup})

    var output = {
        'data': null,
        'isLoading': matchups.isLoading || teamWeeks.isLoading || playerWeeks.isLoading || gshlTeams.isLoading || users.isLoading,
        'isError': matchups.isError || teamWeeks.isError || playerWeeks.isError || gshlTeams.isError || users.isError,
    }

    if (output.isLoading || output.isError) { return output }
    matchup['HomeTeamStats'] = teamWeeks.data?.filter(obj => obj.gshlTeam === matchup['HomeTeam'] && obj.WeekNum === matchup['WeekNum'])[0]
    matchup['HomeTeamPlayers'] = playerWeeks.data?.filter(obj => obj.gshlTeam === matchup['HomeTeam'] && obj.WeekNum === matchup['WeekNum'])
    matchup['HomeTeamInfo'] = gshlTeams.data?.filter(obj => obj[matchup['Season']] === matchup['HomeTeam'])[0]
    matchup['HomeTeamOwner'] = users.data?.filter(obj => obj.id === matchup['HomeTeamInfo'][matchup['Season']])[0]
    matchup['AwayTeamStats'] = teamWeeks.data?.filter(obj => obj.gshlTeam === matchup['AwayTeam'] && obj.WeekNum === matchup['WeekNum'])[0]
    matchup['AwayTeamPlayers'] = playerWeeks.data?.filter(obj => obj.gshlTeam === matchup['AwayTeam'] && obj.WeekNum === matchup['WeekNum'])
    matchup['AwayTeamInfo'] = gshlTeams.data?.filter(obj => obj[matchup['Season']] === matchup['AwayTeam'])[0]
    matchup['AwayTeamOwner'] = users.data?.filter(obj => obj.id === matchup['AwayTeamInfo'][matchup['Season']])[0]

    output.data = matchup
    return output
}
export function useContracts() {
    const contracts = useQuery(['Contracts', 'MainInput', 'Contracts'], queryFunc)
    return {
        'data': contracts.data || null,
        'isLoading': contracts.isLoading,
        'isError': contracts.isError,
    }
}
export function useCurrentWeek() {
    var date = new Date()
    var hour = date.getHours()
    date = new Date(date.getFullYear(),date.getMonth(),hour < 5 ? date.getDate()-1 : date.getDate())
    const weeks = useWeeks(date.getFullYear())
    var output = {}
    if (weeks.isLoading || weeks.isError) { return output }
    output = weeks.data.filter(obj => ((new Date(obj.StartDate+' 00:00:00')) <= date) && ((new Date(obj.EndDate+' 00:00:00')) >= date))[0]

    return output
}