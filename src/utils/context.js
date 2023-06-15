import React, { useContext } from "react";
import { useQuery } from "react-query";
import { queryFunc } from "./fetchData";

const WeeksContext = React.createContext();

export const WeeksDataProvider = ({ children }) => {

    let date = new Date()
    const hour = date.getHours()
    date = new Date(date.getFullYear(), date.getMonth(), hour < 5 ? date.getDate() - 1 : date.getDate())
    const season = String((date.getMonth() < 8 ? date.getFullYear() : date.getFullYear() + 1))
  
    const weeksData = useQuery(['MainInput', 'Weeks'], queryFunc)
  
    const weeks = {
        'seasonWeeks':  weeksData.data?.filter(obj => (obj.Season === season) && (obj.WeekType === "RS")),
        'playoffWeeks': weeksData.data?.filter(obj => (obj.Season === season) && (obj.WeekType === "PO")),
        'currentWeek': weeksData.data?.filter(obj => (obj.Season === season) && ((new Date(obj.StartDate + ' 00:00:00')) <= date) && ((new Date(obj.EndDate + ' 00:00:00')) >= date))[0],
    }

  return (
    <WeeksContext.Provider value={weeks}>
      {children}
    </WeeksContext.Provider>
  )
}
export const useWeeks = () => useContext(WeeksContext);



const TeamsContext = React.createContext();

export const TeamsDataProvider = ({ children }) => {
    let date = new Date()
    const season = String((date.getMonth() < 8 ? date.getFullYear() : date.getFullYear() + 1))
  
    const gshlTeamsData = useQuery(['MainInput', 'GSHLTeams'], queryFunc)
  
    const gshlTeams = gshlTeamsData.data?.map(obj => {
        obj.id = obj[season]
        return obj
    })

  return (
    <TeamsContext.Provider value={gshlTeams}>
      {children}
    </TeamsContext.Provider>
  )
}
export const useTeams = () => useContext(TeamsContext);