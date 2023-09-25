import { seasons, upcomingSeasons } from './constants'
import { PlayerContractType } from './endpointTypes'

export function formatDate(date: Date) {
	return date.toISOString().slice(0, 10)
}
export function rankFormatter(number: number) {
	// Check if the number ends in 11, 12, or 13 (special cases)
	if (number % 100 >= 11 && number % 100 <= 13) {
		return number + 'th'
	}

	// Determine the postfix based on the last digit
	switch (number % 10) {
		case 1:
			return number + 'st'
		case 2:
			return number + 'nd'
		case 3:
			return number + 'rd'
		default:
			return number + 'th'
	}
}
export function moneyFormatter(number: number) {
	const formatter = new Intl.NumberFormat(navigator.language, {
		style: 'currency',
		currency: 'USD',
		minimumSignificantDigits: 1,
	})
	return formatter.format(number).replace('US', '')
}

export function getCurrentSeason() {
	return seasons.filter(season => season.SeasonStartDate < new Date()).slice(-1)[0]
}
export function getTeamCapSpace(contracts: PlayerContractType[]) {
	return [
		22500000 -
			contracts
				.filter(contract => contract.CapHitExpiry > upcomingSeasons[0].SeasonEndDate)
				.map(a => +a.CapHit)
				.reduce((a, b) => a + b, 0),
		25000000 -
			contracts
				.filter(contract => contract.CapHitExpiry > upcomingSeasons[1].SeasonEndDate)
				.map(obj => +obj.CapHit)
				.reduce((a, b) => a + b, 0),
		25000000 -
			contracts
				.filter(contract => contract.CapHitExpiry > upcomingSeasons[2].SeasonEndDate)
				.map(obj => +obj.CapHit)
				.reduce((a, b) => a + b, 0),
		25000000 -
			contracts
				.filter(contract => contract.CapHitExpiry > upcomingSeasons[3].SeasonEndDate)
				.map(obj => +obj.CapHit)
				.reduce((a, b) => a + b, 0),
	]
}
