import React, { ReactNode, useContext } from 'react'
import { useQuery } from 'react-query'
import { queryFunc, usePlayerContracts } from './fetchData'
import { seasons } from './constants'
import { QueryKeyType, RawTeamInfoType, ScheduleWeekType, Season, SeasonInfoDataType, TeamInfoType } from './endpointTypes'
import LoadingSpinner from '../components/LoadingSpinner'
import { getCurrentSeason, getTeamCapSpace } from './utils'
import { formatScheduleWeek, formatTeamInfo } from './formattingFunc'

interface ProviderProps {
	children: ReactNode
}

// Weeks Context Provider

type WeekContextType =
	| {
			seasonWeeks: ScheduleWeekType[]
			playoffWeeks: ScheduleWeekType[]
			allWeeks: ScheduleWeekType[]
			currentWeek: ScheduleWeekType
	  }
	| undefined

const WeeksContext = React.createContext<WeekContextType>(undefined)
export const WeeksDataProvider: React.FC<ProviderProps> = ({ children }): JSX.Element => {
	const queryKey: QueryKeyType = [getCurrentSeason(), 'MainInput', 'Weeks']
	let date = new Date()
	const hour = date.getHours()
	date = new Date(date.getFullYear(), date.getMonth(), hour < 5 ? date.getDate() - 1 : date.getDate())

	let { data, status }: { data: ScheduleWeekType[] | undefined; status: 'idle' | 'error' | 'success' | 'loading' } = useQuery(queryKey, queryFunc)
	data = data?.map(obj => formatScheduleWeek(obj))
	if (status === 'error') {
		return <div>Weeks Context Error</div>
	}
	if (status !== 'success') {
		return <></>
	}
	if (!data) {
		return <></>
	}
	const weeks: WeekContextType = {
		seasonWeeks: data.filter(obj => obj.WeekType === 'RS'),
		playoffWeeks: data.filter(obj => obj.WeekType === 'PO'),
		allWeeks: data,
		currentWeek:
			data.filter(obj => obj.StartDate <= date && obj.EndDate >= date)[0] ||
			data.filter(obj => obj.Season === getCurrentSeason().Season).slice(-1)[0],
	}
	return (
		<>
			<WeeksContext.Provider value={weeks}>{children}</WeeksContext.Provider>
		</>
	)
}
export const useWeeks = () => useContext(WeeksContext)

// Teams Context Provider

const TeamsContext = React.createContext<{ season: Season; teams: TeamInfoType[] }[] | undefined>(undefined)
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

	const gshlTeams: RawTeamInfoType[] = data.map((obj: any) => formatTeamInfo(obj))

	const output: { season: Season; teams: TeamInfoType[] }[] = seasons.map(season => {
		return {
			season: season.Season,
			teams: [...gshlTeams]
				.filter(obj => obj[season.Season])
				.map(obj => {
					return {
						id: obj.id as number,
						TeamName: obj.TeamName,
						OwnerID: +obj.OwnerID,
						LogoURL: obj.LogoURL,
						Conference: obj.Conference,
						CapSpace: getTeamCapSpace(contractData.filter(contract => +contract.CurrentTeam === +obj.id)),
					}
				}),
		}
	})
	return <TeamsContext.Provider value={output}>{children}</TeamsContext.Provider>
}
export const useTeams = () => useContext(TeamsContext)
