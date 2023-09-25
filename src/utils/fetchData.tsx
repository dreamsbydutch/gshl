import { useQueries, useQuery } from 'react-query'
import { seasons } from './constants'
import {
	PlayerNHLType,
	QueryKeyType,
	TeamInfoType,
	TeamDaysType,
	TeamWeeksType,
	TeamTotalsType,
	PlayerDayType,
	PlayerWeekType,
	PlayerSeasonType,
	PlayerContractType,
	PlayerCurrentRosterType,
	SeasonInfoDataType,
	PlayerDraftPickType,
	TeamDraftPickType,
	ScheduleMatchupType,
	ScheduleWeekType,
	StandingsInfoType,
} from './endpointTypes'
import { getCurrentSeason } from './utils'
import { formatPlayerDay, formatPlayerSeason, formatPlayerWeek, formatScheduleMatchup, formatStandingsInfo } from './formattingFunc'
import { useTeams } from './context'

export async function queryFunc({ queryKey }: { queryKey: QueryKeyType }) {
	const [season, statType, pageID] = queryKey
	if (statType === 'MainInput') {
		console.log('fetching: MainInput/' + pageID)
		const data = await fetch('https://opensheet.elk.sh/1jiL1gtJ-_Drlksr24kWaiRABOEniO0pg4Vlm05SFqYM/' + pageID)
		return data.json()
	}
	console.log('fetching: ' + season.Season + '/' + statType + '/' + pageID)
	const data = await fetch('https://opensheet.elk.sh/' + season[statType] + '/' + pageID)
	return data.json()
}
function useQueryPlayerData(
	statType: 'Totals' | 'Splits' | 'Weeks' | 'Days',
	player?: { PlayerName: string; PosGroup: 'F' | 'D' | 'G' },
	seasonInput?: SeasonInfoDataType
): unknown {
	let statQueries = useQueries(
		seasons
			.filter(season => (seasonInput ? season === seasonInput : season))
			.map(season => {
				const queryKey: QueryKeyType = [season, 'PlayerData', statType]
				return {
					queryKey,
					queryFn: queryFunc,
				}
			})
	).map(queryResult => {
		if (player)
			return queryResult.data.filter(
				(statline: any) => statline && statline.PlayerName === player.PlayerName && statline.PosGroup === player.PosGroup
			)[0]
		return queryResult.data
	})
	return statQueries.filter(Boolean)
}

// PLAYER STATS FETCH FUNCTIONS
//--------------------------------------------------------------------------------------
// Totals / Splits / Weeks / Days
// Fetch a players stats from a single year or all years
// Fetch all players stats from a single year
//--------------------------------------------------------------------------------------
export function usePlayerTotals(player?: { PlayerName: string; PosGroup: 'F' | 'D' | 'G' }, seasonInput?: SeasonInfoDataType) {
	let playerData: PlayerSeasonType[] = useQueryPlayerData('Totals', player, seasonInput) as PlayerSeasonType[]
	return playerData.map((player: PlayerSeasonType) => formatPlayerSeason(player))
}
export function usePlayerSplits(player?: { PlayerName: string; PosGroup: 'F' | 'D' | 'G' }, seasonInput?: SeasonInfoDataType) {
	let playerData: PlayerSeasonType[] = useQueryPlayerData('Splits', player, seasonInput) as PlayerSeasonType[]
	return playerData.map((player: PlayerSeasonType) => formatPlayerSeason(player))
}
export function usePlayerWeeks(player?: { PlayerName: string; PosGroup: 'F' | 'D' | 'G' }, seasonInput?: SeasonInfoDataType) {
	let playerData: PlayerWeekType[] = useQueryPlayerData('Weeks', player, seasonInput) as PlayerWeekType[]
	return playerData.map((player: PlayerWeekType) => formatPlayerWeek(player))
}
export function usePlayerDays(player?: { PlayerName: string; PosGroup: 'F' | 'D' | 'G' }, seasonInput?: SeasonInfoDataType) {
	let playerData: PlayerDayType[] = useQueryPlayerData('Weeks', player, seasonInput) as PlayerDayType[]
	return playerData.map((player: PlayerDayType) => formatPlayerDay(player))
}

export function usePlayerNHLStats(player: { PlayerName: string; PosGroup: 'F' | 'D' | 'G' }, seasonInput?: SeasonInfoDataType): PlayerNHLType[] {
	let statQueries: PlayerNHLType[] = useQueries([
		...seasons
			.filter(season => (seasonInput ? season === seasonInput : season))
			.map(season => {
				const queryKey: QueryKeyType = [season, 'PlayerData', 'NHLPlayerStats']
				return {
					queryKey,
					queryFn: queryFunc,
				}
			}),
		...seasons
			.filter(season => (seasonInput ? season === seasonInput : season))
			.map(season => {
				const queryKey: QueryKeyType = [season, 'PlayerData', 'NHLGoalieStats']
				return {
					queryKey,
					queryFn: queryFunc,
				}
			}),
	]).map(queryResult => {
		let seasonPlayerData: PlayerNHLType[] = queryResult.data?.map((player: any) => {
			return {
				...player,
				nhlTeam: player.nhlTeam.split(','),
			}
		})
		return seasonPlayerData.filter(statline => statline && statline.PlayerName === player.PlayerName && statline.PosGroup === player.PosGroup)[0]
	})
	return statQueries.filter(Boolean)
}
export function useAllPlayerNHLStats(season: SeasonInfoDataType): PlayerNHLType[] {
	const skaterKey: QueryKeyType = [season, 'PlayerData', 'NHLPlayerStats']
	const goalieKey: QueryKeyType = [season, 'PlayerData', 'NHLGoalieStats']
	let statSkaterQuery = useQuery(skaterKey, queryFunc)
	let statGoalieQuery = useQuery(goalieKey, queryFunc)
	const data: PlayerNHLType[] = [...statSkaterQuery.data?.filter(Boolean), ...statGoalieQuery.data?.filter(Boolean)]
	return data
}

// PLAYER INFO FETCH FUNCTIONS
//--------------------------------------------------------------------------------------
// Contracts / Salaries / Current Rosters
//--------------------------------------------------------------------------------------
export function usePlayerContracts(): PlayerContractType[] {
	const contractKey: QueryKeyType = [getCurrentSeason(), 'MainInput', 'Contracts']
	const contractQuery = useQuery(contractKey, queryFunc)
	const data: PlayerContractType[] = contractQuery.data
		?.map((contract: PlayerContractType) => {
			contract.CapHitExpiry = contract.CapHitExpiry ? new Date(contract.CapHitExpiry) : new Date()
			return contract
		})
		.filter((contract: PlayerContractType) => contract.CapHitExpiry > new Date())
	return data
}
export function useAllPlayerContracts(): PlayerContractType[] {
	const contractKey: QueryKeyType = [getCurrentSeason(), 'MainInput', 'Contracts']
	const contractQuery = useQuery(contractKey, queryFunc)
	const data: PlayerContractType[] = contractQuery.data
	return data
}
export function useCurrentRosters(): PlayerCurrentRosterType[] {
	const rosterKey: QueryKeyType = [getCurrentSeason(), 'PlayerData', 'CurrentRosters']
	const rosterQuery = useQuery(rosterKey, queryFunc)
	const data: PlayerCurrentRosterType[] = rosterQuery.data
	return data
}
export function useAllPastDraftPicks(team?: TeamInfoType): PlayerDraftPickType[] {
	let statQueries: PlayerDraftPickType[] = useQueries(
		seasons
			.filter(season => season.SeasonStartDate < new Date())
			.map(season => {
				const queryKey: QueryKeyType = [season, 'PlayerData', 'DraftHistory']
				return {
					queryKey,
					queryFn: queryFunc,
				}
			})
	)
		.map(queryResult => {
			let seasonPlayerData: PlayerDraftPickType[] = queryResult.data
			if (team) return seasonPlayerData.filter(player => player.gshlTeam === team[player.Season])
			return seasonPlayerData
		})
		.flat()
	return statQueries.filter(Boolean)
}
export function useAllFutureDraftPicks(team?: TeamInfoType): TeamDraftPickType[] {
	let statQueries: TeamDraftPickType[] = useQueries(
		seasons
			.filter(season => season === getCurrentSeason())
			.map(season => {
				if (!season.TeamData) return { data: null }
				const queryKey: QueryKeyType = [season, 'TeamData', 'DraftPicks']
				return {
					queryKey,
					queryFn: queryFunc,
				}
			})
	)
		.map(queryResult => {
			let seasonTeamData: TeamDraftPickType[] = queryResult.data
			if (team) return seasonTeamData
			return seasonTeamData
		})
		.flat()
	return statQueries.filter(Boolean)
}

// TEAM STATS FETCH FUNCTIONS
//--------------------------------------------------------------------------------------
// Totals / Weeks / Days
// Fetch a teams stats from a single year or all years
// Fetch all players stats from a single year
//--------------------------------------------------------------------------------------
export function usePlayerDraftHistory(player: { PlayerName: string; PosGroup: 'F' | 'D' | 'G' }) {
	let statQueries: (PlayerDraftPickType | null)[] = useQueries(
		seasons.map(season => {
			const queryKey: QueryKeyType = [season, 'PlayerData', 'DraftHistory']
			return {
				queryKey,
				queryFn: queryFunc,
			}
		})
	).map(queryResult => {
		if (!queryResult.data) {
			return null
		}
		let seasonDraftHistory: PlayerDraftPickType[] = queryResult.data
		return seasonDraftHistory.filter(statline => statline.PlayerName === player.PlayerName)[0]
	})
	return statQueries.filter(Boolean)
}
export function usePlayerAllStars(player: { PlayerName: string; PosGroup: 'F' | 'D' | 'G' }) {
	let statQueries: (PlayerDayType | null)[] = useQueries(
		seasons.map(season => {
			const queryKey: QueryKeyType = [season, 'PlayerData', 'Days']
			return {
				queryKey,
				queryFn: queryFunc,
			}
		})
	).map(queryResult => {
		if (!queryResult.data) {
			return null
		}
		let seasonPlayerData: PlayerDayType[] = queryResult.data.map((player: any) => {
			return {
				...player,
				nhlTeam: player.nhlTeam.split(','),
			}
		})
		return seasonPlayerData.filter(statline => statline.PlayerName === player.PlayerName && statline.PosGroup === player.PosGroup)[0]
	})
	return statQueries.filter(Boolean)
}

export function useTeamDays(team: TeamInfoType, season: SeasonInfoDataType) {
	const queryKey: QueryKeyType = [season, 'TeamData', 'Days']
	const queryRes = useQuery(queryKey, queryFunc)
	let statQuery: (TeamDaysType | null)[] = queryRes.data
	return statQuery.filter(teamDay => teamDay?.gshlTeam === team[season.Season])
}
export function useTeamWeeks(team: TeamInfoType, season: SeasonInfoDataType) {
	const queryKey: QueryKeyType = [season, 'TeamData', 'Weeks']
	const queryRes = useQuery(queryKey, queryFunc)
	let statQuery: (TeamWeeksType | null)[] = queryRes.data
	return statQuery.filter(teamWeek => teamWeek?.gshlTeam === team[season.Season])
}
export function useTeamTotals(team: TeamInfoType, season: SeasonInfoDataType) {
	const queryKey: QueryKeyType = [season, 'TeamData', 'Seasons']
	const queryRes = useQuery(queryKey, queryFunc)
	let statQuery: (TeamTotalsType | null)[] = queryRes.data
	return statQuery.filter(teamTotal => teamTotal?.gshlTeam === team[season.Season])
}

// LEAGUE INFO FETCH FUNCTIONS
//--------------------------------------------------------------------------------------
// Users / GSHLTeams / Weeks / Schedule / Contracts / Rulebook
// Fetch a players stats from a single year or all years
// Fetch all players stats from a single year
//--------------------------------------------------------------------------------------
export function useLeagueSchedule(season?: SeasonInfoDataType, week?: ScheduleWeekType, team?: TeamInfoType) {
	const queryKey: QueryKeyType = [seasons[-1], 'MainInput', 'Schedule']
	let queryRes = useQuery(queryKey, queryFunc)
	if (queryRes.isError) {
		console.log(queryRes.error)
		return undefined
	}
	if (!queryRes.isSuccess) {
		return undefined
	}

	let scheduleData: ScheduleMatchupType[] = queryRes.data.map((matchup: any) => formatScheduleMatchup(matchup))
	if (season) {
		scheduleData = scheduleData.filter(matchup => matchup.Season === season.Season)
	}
	if (week) {
		scheduleData = scheduleData.filter(matchup => matchup.WeekNum === week.WeekNum)
	}
	if (team) {
		scheduleData = scheduleData.filter(matchup => matchup.AwayTeam === team[matchup.Season] || matchup.HomeTeam === team[matchup.Season])
	}
	return scheduleData.sort((a, b) => (b.MatchupRtg || 0) - (a.MatchupRtg || 0))
}
export function useLeagueStandings(season: SeasonInfoDataType) {
	const queryKey: QueryKeyType = [season, 'TeamData', 'Standings']
	let queryRes = useQuery(queryKey, queryFunc)
	if (queryRes.isError || queryRes.data?.hasOwnProperty('error')) {
		console.log(queryRes.error)
		return undefined
	}
	if (!queryRes.isSuccess) {
		return undefined
	}

	let standingsData: StandingsInfoType[] = queryRes.data
	return standingsData.map(obj => formatStandingsInfo(obj))
}
export function useGSHLTeams(season: SeasonInfoDataType) {
	const data = useTeams()?.filter(obj => obj.season === season.Season)[0]
	return data?.teams
}
