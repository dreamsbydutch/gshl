import { useEffect, useState } from 'react'
import { useFetchTeams } from './teams'
import useFetch from './useFetch'


export function useFetchSchedule(season) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const url = 'https://opensheet.elk.sh/12vxesMbhg1fDOy75Vs_AYrGGra_zBQhhyhXC8UJtNJQ/1'
  const scheduleData = useFetch(url)
  const teamsData = useFetchTeams(season)

  useEffect(() => {
    if (scheduleData.data && teamsData.data) {
      setData(scheduleData.data.filter(game => game.Seasonid === season).map(game => {
        var homeTeam = teamsData.data.filter(team => team.id === game.HomeTeam)[0]
        var awayTeam = teamsData.data.filter(team => team.id === game.AwayTeam)[0]
        return {
          'Season': game.Seasonid,
          'WeekNum': game.WeekNum,
          'StartDate': game.StartDate,
          'EndDate': game.EndDate,
          'GameType': game.GameType,
          'GameDays': game.GameDays,
          'HomeTeam': homeTeam,
          'HomeWL': game.HomeWL,
          'HomeScore': game.HomeScore,
          'AwayTeam': awayTeam,
          'AwayWL': game.AwayWL,
          'AwayScore': game.AwayScore
        }
      }))
      setLoading(false)
    }
  }, [scheduleData.data, teamsData.data, season])

  useEffect(() => {if (scheduleData.loading || teamsData.loading) {setLoading(true)}}, [scheduleData.loading, teamsData.loading])

  useEffect(() => {
    if (scheduleData.error) {
      setError(scheduleData.error)
    } else if (teamsData.error) {
      setError(teamsData.error)
    }
  }, [scheduleData.error, teamsData.error])

  return { data, loading, error }
}