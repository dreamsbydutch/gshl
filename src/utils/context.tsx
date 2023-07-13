import React, { ReactNode, useContext } from 'react'
import { useQuery } from 'react-query'
import { queryFunc, usePlayerContracts } from './fetchData'
import { seasons } from './constants'
import { QueryKeyType, ScheduleWeekType, TeamInfoType } from './endpointTypes'
import LoadingSpinner from '../components/LoadingSpinner'
import { getCurrentSeason, getTeamCapSpace } from './utils'

interface ProviderProps {
	children: ReactNode
}
type WeekContextType = {
	season: number
	seasonWeeks: ScheduleWeekType[] | null
	playoffWeeks: ScheduleWeekType[] | null
	currentWeek: ScheduleWeekType | null
}

const WeeksContext = React.createContext<WeekContextType[] | null>(null)
export const WeeksDataProvider: React.FC<ProviderProps> = ({ children }): JSX.Element => {
	const queryKey: QueryKeyType = [getCurrentSeason(), 'MainInput', 'Weeks']
	let date = new Date()
	const hour = date.getHours()
	date = new Date(date.getFullYear(), date.getMonth(), hour < 5 ? date.getDate() - 1 : date.getDate())

	const { data, status } = useQuery(queryKey, queryFunc)
	if (status === 'error') {
		return <div>Weeks Context Error</div>
	}
	if (status !== 'success') {
		return <></>
	}

	const weeks: WeekContextType[] = seasons.map(season => {
		return {
			season: season.Season,
			seasonWeeks: data?.filter((obj: ScheduleWeekType) => obj.Season === season.Season && obj.WeekType === 'RS') || null,
			playoffWeeks: data?.filter((obj: ScheduleWeekType) => obj.Season === season.Season && obj.WeekType === 'PO') || null,
			currentWeek: data?.filter((obj: ScheduleWeekType) => obj.Season === season.Season && obj.StartDate <= date && obj.EndDate >= date)[0] || null,
		}
	})
	return (
		<>
			<WeeksContext.Provider value={weeks}>{children}</WeeksContext.Provider>
		</>
	)
}
export const useWeeks = () => useContext(WeeksContext)

const TeamsContext = React.createContext<{ currentTeams: TeamInfoType[]; pastTeams: TeamInfoType[] } | undefined>(undefined)
export const TeamsDataProvider: React.FC<ProviderProps> = ({ children }): JSX.Element => {
	const queryKey: QueryKeyType = [getCurrentSeason(), 'MainInput', 'GSHLTeams']
	const contractData = usePlayerContracts()
	const { data, status } = useQuery(queryKey, queryFunc)
	if (status === 'error') {
		return <div>Teams Context Error</div>
	}
	if (status !== 'success' || !contractData) {
		return <LoadingSpinner />
	}

	const gshlTeams: TeamInfoType[] = data.map((obj: TeamInfoType) => {
		obj.CapSpace = getTeamCapSpace(contractData.filter(contract => contract.CurrentTeam === obj[getCurrentSeason().Season]))
		return obj
	})

	const output = {
		currentTeams: gshlTeams.filter(obj => obj[getCurrentSeason().Season]),
		pastTeams: gshlTeams.filter(obj => !obj[getCurrentSeason().Season]),
	}
	return <TeamsContext.Provider value={output}>{children}</TeamsContext.Provider>
}
export const useTeams = () => useContext(TeamsContext)
