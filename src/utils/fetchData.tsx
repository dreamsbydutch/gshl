import { useQueries, useQuery } from "react-query"
import { seasons } from "./constants"
import { 
    PlayerNHLType, 
    QueryKeyType, 
    TeamInfoType, 
    TeamDaysType, 
    Seasons, 
    TeamWeeksType, 
    TeamTotalsType, 
    PlayerDayType, 
    PlayerWeekType, 
    PlayerSeasonType,
    PlayerContractType
 } from "./endpointTypes"

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







//--------------------------------------------------------------------------------------
// PLAYER STATS FETCH FUNCTIONS
//
// Totals / Splits / Weeks / Days
// Fetch a players stats from a single year or all years
// Fetch all players stats from a single year
//--------------------------------------------------------------------------------------
    export function usePlayerTotals(player: { 'PlayerName': string, 'PosGroup': 'F' | 'D' | 'G' }, seasonInput?: Seasons): PlayerSeasonType[] {
        let statQueries: PlayerSeasonType[] = useQueries(
            seasons.filter(season => seasonInput ? season.Season === seasonInput : season).map((season) => {
                const queryKey: QueryKeyType = [season.Season, 'PlayerData', 'Totals']
                return {
                    queryKey,
                    queryFn: queryFunc,
                }
            }),
        ).map((queryResult) => {
            let seasonPlayerData: PlayerSeasonType[] = queryResult.data?.map((player: any) => {
                return {
                    ...player,
                    'nhlTeam': player.nhlTeam.split(","),
                }
            })
            return seasonPlayerData.filter(statline => statline && statline.PlayerName === player.PlayerName && statline.PosGroup === player.PosGroup)[0]
        })
        return statQueries.filter(Boolean)
    }
    export function useAllPlayerTotals(season: Seasons): PlayerSeasonType[] {
        const queryKey: QueryKeyType = [season, 'PlayerData', 'Totals']
        const statQuery = useQuery({
            queryKey,
            queryFn: queryFunc,
        })
        const data: PlayerSeasonType[] = statQuery.data?.filter(Boolean)
        return data
    }

    export function usePlayerSplits(player: { 'PlayerName': string, 'PosGroup': 'F' | 'D' | 'G' }, seasonInput?: Seasons): PlayerSeasonType[] {
        let statQueries: PlayerSeasonType[] = useQueries(
            seasons.filter(season => seasonInput ? season.Season === seasonInput : season).map((season) => {
                const queryKey: QueryKeyType = [season.Season, 'PlayerData', 'Splits']
                return {
                    queryKey,
                    queryFn: queryFunc,
                }
            }),
        ).map((queryResult) => {
            let seasonPlayerData: PlayerSeasonType[] = queryResult.data?.map((player: any) => {
                return {
                    ...player,
                    'nhlTeam': player.nhlTeam.split(","),
                }
            })
            console.log(seasons)
            console.log(queryResult)
            return seasonPlayerData?.filter(statline => statline && statline.PlayerName === player.PlayerName && statline.PosGroup === player.PosGroup)[0]
        })
        return statQueries.filter(Boolean)
    }
    export function useAllPlayerSplits(season: Seasons): PlayerSeasonType[] {
        const queryKey: QueryKeyType = [season, 'PlayerData', 'Splits']
        const statQuery = useQuery({
            queryKey,
            queryFn: queryFunc,
        })
        const data: PlayerSeasonType[] = statQuery.data?.filter(Boolean)
        return data
    }

    export function usePlayerWeeks(player: { 'PlayerName': string, 'PosGroup': 'F' | 'D' | 'G' }, seasonInput?: Seasons): PlayerWeekType[] {
        let statQueries: PlayerWeekType[] = useQueries(
            seasons.filter(season => seasonInput ? season.Season === seasonInput : season).map((season) => {
                const queryKey: QueryKeyType = [season.Season, 'PlayerData', 'Weeks']
                return {
                    queryKey,
                    queryFn: queryFunc,
                }
            }),
        ).map((queryResult) => {
            let seasonPlayerData: PlayerWeekType[] = queryResult.data?.map((player: any) => {
                return {
                    ...player,
                    'nhlTeam': player.nhlTeam.split(","),
                }
            })
            return seasonPlayerData.filter(statline => statline && statline.PlayerName === player.PlayerName && statline.PosGroup === player.PosGroup)[0]
        })
        return statQueries.filter(Boolean)
    }
    export function useAllPlayerWeeks(season: Seasons): PlayerWeekType[] {
        const queryKey: QueryKeyType = [season, 'PlayerData', 'Weeks']
        const statQuery = useQuery({
            queryKey,
            queryFn: queryFunc,
        })
        const data: PlayerWeekType[] = statQuery.data?.filter(Boolean)
        return data
    }

    export function usePlayerDays(player: { 'PlayerName': string, 'PosGroup': 'F' | 'D' | 'G' }, seasonInput?: Seasons): PlayerDayType[] {
        let statQueries: PlayerDayType[] = useQueries(
            seasons.filter(season => seasonInput ? season.Season === seasonInput : season).map((season) => {
                const queryKey: QueryKeyType = [season.Season, 'PlayerData', 'Days']
                return {
                    queryKey,
                    queryFn: queryFunc,
                }
            }),
        ).map((queryResult) => {
            let seasonPlayerData: PlayerDayType[] = queryResult.data?.map((player : any) => {
                return {
                    ...player,
                    'nhlTeam': player.nhlTeam.split(","),
                }
            })
            return seasonPlayerData.filter(statline => statline && statline.PlayerName === player.PlayerName && statline.PosGroup === player.PosGroup)[0]
        })
        return statQueries.filter(Boolean)
    }
    export function useAllPlayerDays(season: Seasons): PlayerDayType[] {
        const queryKey: QueryKeyType = [season, 'PlayerData', 'Days']
        const statQuery = useQuery({
            queryKey,
            queryFn: queryFunc,
        })
        const data: PlayerDayType[] = statQuery.data?.filter(Boolean)
        return data
    }

    export function usePlayerNHLStats(player: { 'PlayerName': string, 'PosGroup': 'F' | 'D' | 'G' }, seasonInput?: Seasons): PlayerNHLType[] {
        let statQueries: PlayerNHLType[] = useQueries(
            [...seasons.filter(season => seasonInput ? season.Season === seasonInput : season).map((season) => {
                const queryKey: QueryKeyType = [season.Season, 'PlayerData', 'NHLPlayerStats']
                return {
                    queryKey,
                    queryFn: queryFunc,
                }
            }),
            ...seasons.filter(season => seasonInput ? season.Season === seasonInput : season).map((season) => {
                const queryKey: QueryKeyType = [season.Season, 'PlayerData', 'NHLGoalieStats']
                return {
                    queryKey,
                    queryFn: queryFunc,
                }
            })]
        ).map((queryResult) => {
            let seasonPlayerData: PlayerNHLType[] = queryResult.data?.map((player: any) => {
                return {
                    ...player,
                    'nhlTeam': player.nhlTeam.split(","),
                }
            })
            return seasonPlayerData.filter(statline => statline && statline.PlayerName === player.PlayerName && statline.PosGroup === player.PosGroup)[0]
        })
        return statQueries.filter(Boolean)
    }
    export function useAllPlayerNHLStats(season: Seasons): PlayerNHLType[] {
        const skaterKey: QueryKeyType = [season, 'PlayerData', 'NHLPlayerStats']
        const goalieKey: QueryKeyType = [season, 'PlayerData', 'NHLGoalieStats']
        let statSkaterQuery = useQuery(skaterKey,queryFunc)
        let statGoalieQuery = useQuery(goalieKey,queryFunc)
        const data: PlayerNHLType[] = [...statSkaterQuery.data?.filter(Boolean),...statGoalieQuery.data?.filter(Boolean)]
        return data
    }
//







//--------------------------------------------------------------------------------------
// PLAYER INFO FETCH FUNCTIONS
//
// Contracts / Salaries
//--------------------------------------------------------------------------------------
    export function usePlayerContracts(): PlayerContractType[] {
        const contractKey: QueryKeyType = [seasons[0].Season,'MainInput','Contracts']
        const contractQuery = useQuery(contractKey,queryFunc)
        const data: PlayerContractType[] = contractQuery.data?.map((contract:PlayerContractType) => {
            contract.CapHitExpiry = contract.CapHitExpiry ? new Date(contract.CapHitExpiry) : new Date()
            return contract
        }).filter((contract: PlayerContractType) => contract.CapHitExpiry > new Date())
        return data
    }    
    export function useAllPlayerContracts(): PlayerContractType[] {
        const contractKey: QueryKeyType = [seasons[0].Season,'MainInput','Contracts']
        const contractQuery = useQuery(contractKey,queryFunc)
        const data: PlayerContractType[] = contractQuery.data
        return data
    }
//






//--------------------------------------------------------------------------------------
// TEAM STATS FETCH FUNCTIONS
//
// Totals / Weeks / Days
// Fetch a players stats from a single year or all years
// Fetch all players stats from a single year
//--------------------------------------------------------------------------------------
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