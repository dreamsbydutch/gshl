import { usePlayerDailyStats2019, usePlayerSplitsStats2019, usePlayerTotalsStats2019, usePlayerWeeklyStats2019, useTeamDailyStats2019, useTeamSeasonStats2019, useTeamWeeklyStats2019 } from "./get2019Stats";
import { usePlayerDailyStats2020, usePlayerSplitsStats2020, usePlayerTotalsStats2020, usePlayerWeeklyStats2020, useTeamDailyStats2020, useTeamSeasonStats2020, useTeamWeeklyStats2020 } from "./get2020Stats";
import { usePlayerDailyStats2021, usePlayerSplitsStats2021, usePlayerTotalsStats2021, usePlayerWeeklyStats2021, useTeamDailyStats2021, useTeamSeasonStats2021, useTeamWeeklyStats2021 } from "./get2021Stats";


export function useAllPlayerTotalStats () {
    const stats2021 = usePlayerTotalsStats2021()
    const stats2020 = usePlayerTotalsStats2020()
    const stats2019 = usePlayerTotalsStats2019()
    if (stats2021.isLoading || stats2020.isLoading || stats2019.isLoading ) return null
    if (stats2021.error || stats2020.error || stats2019.error ) return null
    return [...stats2021.data.data,...stats2020.data.data,...stats2019.data.data]
}
export function useAllPlayerSplitStats () {
    const stats2021 = usePlayerSplitsStats2021()
    const stats2020 = usePlayerSplitsStats2020()
    const stats2019 = usePlayerSplitsStats2019()
    if (stats2021.isLoading || stats2020.isLoading || stats2019.isLoading ) return null
    if (stats2021.error || stats2020.error || stats2019.error ) return null
    return [...stats2021.data.data,...stats2020.data.data,...stats2019.data.data]
}
export function useAllPlayerWeeklyStats () {
    const stats2021 = usePlayerWeeklyStats2021()
    const stats2020 = usePlayerWeeklyStats2020()
    const stats2019 = usePlayerWeeklyStats2019()
    if (stats2021.isLoading || stats2020.isLoading || stats2019.isLoading ) return null
    if (stats2021.error || stats2020.error || stats2019.error ) return null
    return [...stats2021.data.data,...stats2020.data.data,...stats2019.data.data]
}
export function useAllPlayerDailyStats () {
    const stats2021 = usePlayerDailyStats2021()
    const stats2020 = usePlayerDailyStats2020()
    const stats2019 = usePlayerDailyStats2019()
    if (stats2021.isLoading || stats2020.isLoading || stats2019.isLoading ) return null
    if (stats2021.error || stats2020.error || stats2019.error ) return null
    return [...stats2021.data.data,...stats2020.data.data,...stats2019.data.data]
}
export function useAllTeamSeasonStats () {
    const stats2021 = useTeamSeasonStats2021()
    const stats2020 = useTeamSeasonStats2020()
    const stats2019 = useTeamSeasonStats2019()
    if (stats2021.isLoading || stats2020.isLoading || stats2019.isLoading ) return null
    if (stats2021.error || stats2020.error || stats2019.error ) return null
    return [...stats2021.data.data,...stats2020.data.data,...stats2019.data.data]
}
export function useAllTeamWeeklyStats () {
    const stats2021 = useTeamWeeklyStats2021()
    const stats2020 = useTeamWeeklyStats2020()
    const stats2019 = useTeamWeeklyStats2019()
    if (stats2021.isLoading || stats2020.isLoading || stats2019.isLoading ) return null
    if (stats2021.error || stats2020.error || stats2019.error ) return null
    return [...stats2021.data.data,...stats2020.data.data,...stats2019.data.data]
}
export function useAllTeamDailyStats () {
    const stats2021 = useTeamDailyStats2021()
    const stats2020 = useTeamDailyStats2020()
    const stats2019 = useTeamDailyStats2019()
    if (stats2021.isLoading || stats2020.isLoading || stats2019.isLoading ) return null
    if (stats2021.error || stats2020.error || stats2019.error ) return null
    return [...stats2021.data.data,...stats2020.data.data,...stats2019.data.data]
}