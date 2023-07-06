import { useQueries, useQuery } from "react-query"
import { seasons } from "./constants"
import { PlayerTotalsType, PlayerNHLType, QueryKeyType, PlayerSplitsType, PlayerWeeksType, PlayerDraftHistoryType, TeamInfoType, TeamDaysType, Seasons, TeamWeeksType, TeamTotalsType, PlayerDaysSkaterType, PlayerDaysGoalieType } from "./endpointTypes"

export async function queryFunc({ queryKey }: { queryKey: QueryKeyType }) {
    const [season, statType, pageID] = queryKey
    if (statType === 'MainInput') {
        console.log('fetching: MainInput/' + pageID)
        const data = await fetch('https://opensheet.elk.sh/1jiL1gtJ-_Drlksr24kWaiRABOEniO0pg4Vlm05SFqYM/' + pageID)
        return data.json()
    }
    const seasonData = seasons.filter(seasonData => seasonData.Season === season)[0]
    console.log('fetching: ' + season + '/' + statType + '/' + pageID)
    const data = await fetch('https://opensheet.elk.sh/' + seasonData[statType] + '/' + pageID)
    return data.json()
}



export function usePlayerNHLStats(player: { 'PlayerName': string, 'PosGroup': 'F' | 'D' | 'G' }) {
    let statQueries: (PlayerNHLType | null)[] = useQueries(
        seasons.map((season) => {
            const queryKey: QueryKeyType = [season.Season, 'PlayerData', player.PosGroup === "G" ? 'NHLGoalieStats' : 'NHLPlayerStats']
            return {
                queryKey,
                queryFn: queryFunc,
            }
        }),
    ).map((queryResult) => {
        if (!queryResult.data) { return null }
        let seasonPlayerData: PlayerNHLType[] = queryResult.data.map(player => {
            return {
                ...player,
                'PM': player['+/-'],
                'GP': player.GS,
            }
        })
        return seasonPlayerData.filter(statline => statline.PlayerName === player.PlayerName && statline.PosGroup === player.PosGroup)[0]
    })
    return statQueries.filter(Boolean)
}
export function usePlayerTotals(player?: { 'PlayerName': string, 'PosGroup': 'F' | 'D' | 'G' }) {
    let statQueries: (PlayerTotalsType[] | PlayerTotalsType | null)[] = useQueries(
        seasons.map((season) => {
            const queryKey: QueryKeyType = [season.Season, 'PlayerData', 'Totals']
            return {
                queryKey,
                queryFn: queryFunc,
            }
        }),
    ).map((queryResult) => {
        if (!queryResult.data) { return null }
        let seasonPlayerData: PlayerTotalsType[] = queryResult.data.map(player => {
            return {
                ...player,
                'gshlTeam': player.gshlTeam.split(","),
                'nhlTeam': player.nhlTeam.split(","),
            }
        })
        if (!player) { return seasonPlayerData }
        return seasonPlayerData.filter(statline => statline.PlayerName === player.PlayerName && statline.PosGroup === player.PosGroup)[0]
    })
    return statQueries.filter(Boolean)
}
export function usePlayerSplits(player?: { 'PlayerName': string, 'PosGroup': 'F' | 'D' | 'G' }) {
    let statQueries: (PlayerSplitsType[] | PlayerSplitsType | null)[] = useQueries(
        seasons.map((season) => {
            const queryKey: QueryKeyType = [season.Season, 'PlayerData', 'Splits']
            return {
                queryKey,
                queryFn: queryFunc,
            }
        }),
    ).map((queryResult) => {
        if (!queryResult.data) { return null }
        let seasonPlayerData: PlayerSplitsType[] = queryResult.data.map(player => {
            return {
                ...player,
                'nhlTeam': player.nhlTeam.split(","),
            }
        })
        if (!player) { return seasonPlayerData }
        return seasonPlayerData.filter(statline => statline.PlayerName === player.PlayerName && statline.PosGroup === player.PosGroup)[0]
    })
    return statQueries.filter(Boolean)
}
export function usePlayerWeeks(player?: { 'PlayerName': string, 'PosGroup': 'F' | 'D' | 'G' }) {
    let statQueries: (PlayerWeeksType[] | PlayerWeeksType | null)[] = useQueries(
        seasons.map((season) => {
            const queryKey: QueryKeyType = [season.Season, 'PlayerData', 'Weeks']
            return {
                queryKey,
                queryFn: queryFunc,
            }
        }),
    ).map((queryResult) => {
        if (!queryResult.data) { return null }
        let seasonPlayerData: PlayerWeeksType[] = queryResult.data.map(player => {
            return {
                ...player,
                'nhlTeam': player.nhlTeam.split(","),
            }
        })
        if (!player) { return seasonPlayerData }
        return seasonPlayerData.filter(statline => statline.PlayerName === player.PlayerName && statline.PosGroup === player.PosGroup)[0]
    })
    return statQueries.filter(Boolean)
}
export function usePlayerDays(player: { 'PlayerName': string, 'PosGroup': 'F' | 'D' | 'G' }, seasonInput?: Seasons): (PlayerDaysSkaterType | PlayerDaysGoalieType)[] {
    let statQueries: (PlayerDaysSkaterType | PlayerDaysGoalieType)[] = useQueries(
        seasons.filter(season => seasonInput ? season.Season === seasonInput : season).map((season) => {
            const queryKey: QueryKeyType = [season.Season, 'PlayerData', 'Days']
            return {
                queryKey,
                queryFn: queryFunc,
            }
        }),
    ).map((queryResult) => {
        let seasonPlayerData: (PlayerDaysSkaterType | PlayerDaysGoalieType)[] = queryResult.data?.map((player : any) => {
            return {
                ...player,
                'nhlTeam': player.nhlTeam.split(","),
            }
        })
        return seasonPlayerData.filter(statline => statline && statline.PlayerName === player.PlayerName && statline.PosGroup === player.PosGroup)[0]
    })
    return statQueries
}
export function useAllPlayerDays(season: Seasons): (PlayerDaysSkaterType | PlayerDaysGoalieType)[] | null {
    const queryKey: QueryKeyType = [season, 'PlayerData', 'Days']
    const statQuery = useQuery({
        queryKey,
        queryFn: queryFunc,
    })
    const data: (PlayerDaysSkaterType|PlayerDaysGoalieType)[] = statQuery.data?.filter(Boolean)
    return data
}
export function usePlayerDraftHistory(player: { 'PlayerName': string, 'PosGroup': 'F' | 'D' | 'G' }) {
    let statQueries: (PlayerDraftHistoryType | null)[] = useQueries(
        seasons.map((season) => {
            const queryKey: QueryKeyType = [season.Season, 'PlayerData', 'DraftHistory']
            return {
                queryKey,
                queryFn: queryFunc,
            }
        }),
    ).map((queryResult) => {
        if (!queryResult.data) { return null }
        let seasonDraftHistory: PlayerDraftHistoryType[] = queryResult.data
        return seasonDraftHistory.filter(statline => statline.PlayerName === player.PlayerName)[0]
    })
    return statQueries.filter(Boolean)
}
export function usePlayerAllStars(player: { 'PlayerName': string, 'PosGroup': 'F' | 'D' | 'G' }) {
    let statQueries: (PlayerDaysType | null)[] = useQueries(
        seasons.map((season) => {
            const queryKey: QueryKeyType = [season.Season, 'PlayerData', 'Days']
            return {
                queryKey,
                queryFn: queryFunc,
            }
        }),
    ).map((queryResult) => {
        if (!queryResult.data) { return null }
        let seasonPlayerData: PlayerDaysType[] = queryResult.data.map(player => {
            return {
                ...player,
                'nhlTeam': player.nhlTeam.split(","),
            }
        })
        return seasonPlayerData.filter(statline => statline.PlayerName === player.PlayerName && statline.PosGroup === player.PosGroup)[0]
    })
    return statQueries.filter(Boolean)
}

export function useTeamDays(team: TeamInfoType, season: Seasons) {
    const queryKey: QueryKeyType = [season, 'TeamData', 'Days']
    const queryRes = useQuery(queryKey,queryFunc)
    let statQuery: (TeamDaysType | null)[] = queryRes.data
    return statQuery.filter(teamDay => teamDay?.gshlTeam === team[season])
}
export function useTeamWeeks(team: TeamInfoType, season: Seasons) {
    const queryKey: QueryKeyType = [season, 'TeamData', 'Weeks']
    const queryRes = useQuery(queryKey,queryFunc)
    let statQuery: (TeamWeeksType | null)[] = queryRes.data
    return statQuery.filter(teamWeek => teamWeek?.gshlTeam === team[season])
}
export function useTeamTotals(team: TeamInfoType, season: Seasons) {
    const queryKey: QueryKeyType = [season, 'TeamData', 'Seasons']
    const queryRes = useQuery(queryKey,queryFunc)
    let statQuery: (TeamTotalsType | null)[] = queryRes.data
    return statQuery.filter(teamTotal => teamTotal?.gshlTeam === team[season])
}