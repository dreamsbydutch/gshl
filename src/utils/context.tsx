import React, { ReactNode, useContext } from "react";
import { useQuery } from "react-query";
import { queryFunc } from "./fetchData";
import { seasons } from "./constants";
import { QueryKeyType, ScheduleWeekType, TeamInfoType } from "./endpointTypes";

interface ProviderProps {
  children: ReactNode
}
type WeekContextType = {
  'season': number,
  'seasonWeeks': ScheduleWeekType[] | null,
  'playoffWeeks': ScheduleWeekType[] | null,
  'currentWeek': ScheduleWeekType | null,
}


const WeeksContext = React.createContext<WeekContextType[] | null>(null)
export const WeeksDataProvider: React.FC<ProviderProps> = ({ children }): JSX.Element => {
  const queryKey: QueryKeyType = [seasons[0].Season, 'MainInput', 'Weeks']
  let date = new Date()
  const hour = date.getHours()
  date = new Date(date.getFullYear(), date.getMonth(), hour < 5 ? date.getDate() - 1 : date.getDate())

  const { data, status } = useQuery(queryKey, queryFunc)
  if (status === 'error') { return <div>Weeks Context Error</div> }
  if (status !== 'success') { return <></> }

  const weeks: WeekContextType[] = seasons.map(season => {
    return {
      'season': season.Season,
      'seasonWeeks': data?.filter((obj: ScheduleWeekType) => (obj.Season === season.Season) && (obj.WeekType === "RS")) || null,
      'playoffWeeks': data?.filter((obj: ScheduleWeekType) => (obj.Season === season.Season) && (obj.WeekType === "PO")) || null,
      'currentWeek': data?.filter((obj: ScheduleWeekType) => (obj.Season === season.Season) && ((obj.StartDate <= date) && (obj.EndDate >= date)))[0] || null,
    }
  })
  return (
    <>
      <WeeksContext.Provider value={weeks}>
        {children}
      </WeeksContext.Provider>
    </>
  )
}
export const useWeeks = () => useContext(WeeksContext)


const TeamsContext = React.createContext<TeamInfoType[] | null>(null)
export const TeamsDataProvider: React.FC<ProviderProps> = ({ children }): JSX.Element => {
  const queryKey: QueryKeyType = [seasons[0].Season, 'MainInput', 'GSHLTeams']
  const { data, status } = useQuery(queryKey, queryFunc)
  if (status === 'error') { return <div>Teams Context Error</div> }
  if (status !== 'success') { return <>fff</> }

  const gshlTeams: TeamInfoType[] = data

  return (
    <TeamsContext.Provider value={gshlTeams}>
      {children}
    </TeamsContext.Provider>
  )
}
export const useTeams = () => useContext(TeamsContext)