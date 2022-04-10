import { useEffect, useState } from 'react'
import { useFetchTeams } from './teams'
import useFetch from './useFetch'


export function useFetchSchedule(season) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const scheduleURL = 'https://opensheet.elk.sh/1jiL1gtJ-_Drlksr24kWaiRABOEniO0pg4Vlm05SFqYM/6'
  const scheduleData = useFetch(scheduleURL)
  const teamWeeksURL = 'https://opensheet.elk.sh/1u1JcrUuSAszlKock2NLJ8a7fLfnvs0NcSPIv9sTI9V0/1'
  const teamWeeksData = useFetch(teamWeeksURL)
  const teamsData = useFetchTeams(season)

  useEffect(() => {
    if (scheduleData.data && teamsData.data && teamWeeksData.data) {
      setData(scheduleData.data.filter(game => game.Seasonid === season).map(game => {
        var homeTeam = teamsData.data.filter(team => team.id === game.HomeTeam)[0]
        var awayTeam = teamsData.data.filter(team => team.id === game.AwayTeam)[0]
        var homeStats = teamWeeksData.data.filter(week => week.Season === season && week.Week === game.WeekNum && week.gshlTeam === game.HomeTeam)[0]
        var awayStats = teamWeeksData.data.filter(week => week.Season === season && week.Week === game.WeekNum && week.gshlTeam === game.AwayTeam)[0]
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
          'HomeStats': homeStats,
          'AwayTeam': awayTeam,
          'AwayWL': game.AwayWL,
          'AwayScore': game.AwayScore,
          'AwayStats': awayStats
        }
      }))
      setLoading(false)
    }
  }, [scheduleData.data, teamsData.data, teamWeeksData.data, season])

  useEffect(() => {
    if (scheduleData.loading || teamsData.loading || teamWeeksData.loading) {
      setLoading(true)
    }
  }, [scheduleData.loading, teamsData.loading, teamWeeksData.loading])

  useEffect(() => {
    if (scheduleData.error) {
      setError(scheduleData.error)
    } else if (teamsData.error) {
      setError(teamsData.error)
    } else if (teamWeeksData.error) {
      setError(teamWeeksData.error)
    }
  }, [scheduleData.error, teamsData.error, teamWeeksData.error])

  return { data, loading, error }
}