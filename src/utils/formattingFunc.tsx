import { seasons } from './constants'
import {
	PlayerDayType,
	PlayerSeasonType,
	PlayerWeekType,
	ScheduleMatchupType,
	ScheduleWeekType,
	StandingsInfoType,
	TeamInfoType,
} from './endpointTypes'

function formatNumbersInsideInputs(inputObj: any) {
	for (const key in inputObj) {
		if (!isNaN(Number(inputObj[key]))) {
			inputObj[key] = +inputObj[key]
		} else if (inputObj[key] === '') {
			inputObj[key] = null
		}
	}
	return inputObj
}

export function formatScheduleMatchup(matchup: any): ScheduleMatchupType {
	matchup = formatNumbersInsideInputs(matchup)
	matchup.StartDate = new Date(matchup.StartDate)
	matchup.EndDate = new Date(matchup.EndDate)
	return matchup
}
export function formatScheduleWeek(matchup: any): ScheduleWeekType {
	matchup = formatNumbersInsideInputs(matchup)
	matchup.StartDate = new Date(matchup.StartDate)
	matchup.EndDate = new Date(matchup.EndDate)
	return matchup
}
export function formatTeamInfo(team: any): TeamInfoType {
	return formatNumbersInsideInputs(team)
}
export function formatStandingsInfo(team: any): StandingsInfoType {
	return formatNumbersInsideInputs(team)
}
export function formatPlayerDay(player: any): PlayerDayType {
	player.nhlTeam = String(player.nhlTeam).split(',')
	player.gshlTeam = String(player.gshlTeam).split(',')
	player = formatNumbersInsideInputs(player)
	player.Date = new Date(player.Date)
	return player
}
export function formatPlayerWeek(player: any): PlayerWeekType {
	player.nhlTeam = String(player.nhlTeam).split(',')
	player.gshlTeam = String(player.gshlTeam).split(',')
	return formatNumbersInsideInputs(player)
}
export function formatPlayerSeason(player: any): PlayerSeasonType {
	player.nhlTeam = String(player.nhlTeam).split(',')
	player.gshlTeam = String(player.gshlTeam).split(',')
	return formatNumbersInsideInputs(player)
}
