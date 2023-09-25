import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGSHLTeams, useLeagueSchedule } from '../utils/fetchData'
import LoadingSpinner from '../components/LoadingSpinner'
import { useTeams, useWeeks } from '../utils/context'
import { ScheduleMatchupType, ScheduleWeekType, Season, SeasonInfoDataType, TeamInfoType } from '../utils/endpointTypes'
import { getCurrentSeason, rankFormatter } from '../utils/utils'
import { SecondaryPageToolbar, TeamsToggle, WeeksToggle } from '../components/PageNavbar'

export default function Schedule() {
	const { inputType, id } = useParams()
	console.log(inputType, id)
	return <></>
	const weeks = useWeeks()
	const params: ['week' | 'team', Number | undefined] = [inputType ? (inputType as 'week' | 'team') : 'week', weekNum ? +weekNum : weeks?.currentWeek]
	const [schedType, setSchedType] = useState<'week' | 'team'>(params[0])
	const [season, setSeason] = useState<SeasonInfoDataType>(getCurrentSeason())

	return (
		<div className="mt-4 mb-16 text-center">
			<SecondaryPageToolbar
				{...{
					setter: setSchedType,
					activeKey: schedType,
					toolbarKeys: ['week', 'team'],
				}}
			/>
			{schedType === 'week' ? <WeeklySchedule {...{ season, setSeason }} /> : <TeamSchedule {...{ season, setSeason }} />}
		</div>
	)
}

function WeeklySchedule({ season, setSeason }: { season: SeasonInfoDataType; setSeason: React.Dispatch<React.SetStateAction<SeasonInfoDataType>> }) {
	const weeks = useWeeks()
	const [week, setWeek] = useState<ScheduleWeekType | undefined>(weeks?.currentWeek || undefined)

	const scheduleData = useLeagueSchedule(season, week)
	console.log(scheduleData)

	if (!scheduleData || !weeks) return <LoadingSpinner />
	return (
		<>
			<WeeksToggle
				{...{
					setter: setWeek,
					activeKey: week,
					toolbarKeys: weeks?.allWeeks.filter(obj => obj.Season === season.Season),
					seasonToggleActiveKey: season,
					seasonToggleSetter: setSeason,
				}}
			/>
			<div className="mt-10"></div>
			<div className="grid grid-cols-7 items-center text-center font-bold mt-4 mb-2">
				<div className="text-xs col-span-3">Away Team</div>
				<div className="text-xs">Score</div>
				<div className="text-xs col-span-3">Home Team</div>
			</div>
			{scheduleData.map((matchup, i) => (
				<WeekScheduleItem {...{ matchup, season, week }} i={i} />
			))}
		</>
	)
}
function WeekScheduleItem({
	matchup,
	season,
	week,
	i,
}: {
	matchup: ScheduleMatchupType
	season: SeasonInfoDataType
	week: ScheduleWeekType | undefined
	i: number
}) {
	const gshlTeams = useTeams()?.filter(obj => obj.season === season.Season)[0]
	const homeTeam = gshlTeams?.teams.filter(obj => obj.id && matchup.HomeTeam && obj.id === +matchup.HomeTeam)[0]
	const awayTeam = gshlTeams?.teams.filter(obj => obj.id && matchup.AwayTeam && obj.id === +matchup.AwayTeam)[0]

	let conf = matchup.GameType + awayTeam?.Conference + homeTeam?.Conference,
		bgClass = ''

	switch (conf) {
		case 'CCSVSV':
			bgClass = 'bg-sunview-50 bg-opacity-50'
			break
		case 'CCHHHH':
			bgClass = 'bg-hotel-50 bg-opacity-50'
			break
		case 'NCSVHH':
			bgClass = 'bg-gradient-to-r from-sunview-50 to-hotel-50 bg-opacity-10'
			break
		case 'NCHHSV':
			bgClass = 'bg-gradient-to-r from-hotel-50 to-sunview-50 bg-opacity-10'
			break
		case 'QFSVSV':
		case 'QFHHHH':
		case 'QFHHSV':
		case 'QFSVHH':
			bgClass = 'bg-orange-200 bg-opacity-30'
			break
		case 'SFSVSV':
		case 'SFHHHH':
		case 'SFHHSV':
		case 'SFSVHH':
			bgClass = 'bg-slate-200 bg-opacity-30'
			break
		case 'FSVSV':
		case 'FHHHH':
		case 'FHHSV':
		case 'FSVHH':
			bgClass = 'bg-yellow-200 bg-opacity-30'
			break
		case 'LTSVSV':
		case 'LTHHHH':
		case 'LTHHSV':
		case 'LTSVHH':
			bgClass = 'bg-brown-200 bg-opacity-40'
			break
		default:
			bgClass = 'bg-gray-100'
			break
	}

	if (!gshlTeams || !homeTeam || !awayTeam) {
		return <></>
	}
	return (
		<>
			{!week && (
				<div className={'text-xs ml-6 text-left mt-1'}>
					<span className={'font-bold text-base'}>{rankFormatter(i + 1)}</span> - {Math.round(Number(matchup.MatchupRtg) * 10) / 10}
				</div>
			)}
			<Link className={`grid grid-cols-7 mb-3 py-2 mx-2 items-center shadow-md rounded-xl ${bgClass}`} to={'/matchup/' + matchup.id}>
				<div className={'col-span-3 flex flex-col whitespace-nowrap text-center p-2 gap-2 items-center justify-center ' + matchup.HomeWL}>
					{matchup.AwayRank && +matchup.AwayRank <= 8 && matchup.AwayRank ? (
						<div className="flex flex-row">
							<span className="text-sm xs:text-base text-black font-bold font-oswald pr-1">{'#' + matchup.AwayRank}</span>
							<img className="w-12 xs:w-16" src={awayTeam?.LogoURL} alt="Away Team Logo" />
						</div>
					) : (
						<img className="w-12 xs:w-16" src={awayTeam?.LogoURL} alt="Away Team Logo" />
					)}
					<div className={'text-base xs:text-lg font-oswald'}>{awayTeam?.TeamName}</div>
				</div>
				<div className="text-2xl xs:text-xl font-oswald text-center">
					{matchup.HomeScore || matchup.AwayScore ? (
						<>
							<span className={matchup.AwayWL === 'W' ? 'text-emerald-700 font-bold' : matchup.AwayWL === 'L' ? 'text-rose-800' : ''}>
								{matchup.AwayScore}
							</span>
							{' - '}
							<span className={matchup.HomeWL === 'W' ? 'text-emerald-700 font-bold' : matchup.HomeWL === 'L' ? 'text-rose-800' : ''}>
								{matchup.HomeScore}
							</span>
						</>
					) : (
						'@'
					)}
				</div>
				<div className={'col-span-3 flex flex-col whitespace-nowrap text-center p-2 gap-2 items-center justify-center ' + matchup.HomeWL}>
					{matchup.HomeRank && +matchup.HomeRank <= 8 && matchup.HomeRank ? (
						<div className="flex flex-row">
							<span className="text-sm xs:text-base text-black font-bold font-oswald pr-1">{'#' + matchup.HomeRank}</span>
							<img className="w-12 xs:w-16" src={homeTeam.LogoURL} alt="Home Team Logo" />
						</div>
					) : (
						<img className="w-12 xs:w-16" src={homeTeam.LogoURL} alt="Home Team Logo" />
					)}
					<div className={'text-base xs:text-lg font-oswald'}>{homeTeam.TeamName}</div>
				</div>
				{!week && <div className={'col-span-7 font-oswald mx-auto text-xs xs:text-2xs'}>Week {matchup.WeekNum}</div>}
			</Link>
		</>
	)
}

function TeamSchedule({ season, setSeason }: { season: SeasonInfoDataType; setSeason: React.Dispatch<React.SetStateAction<SeasonInfoDataType>> }) {
	const gshlTeams = useGSHLTeams(season)
	const [team, setTeam] = useState<TeamInfoType | undefined>(undefined)
	const [scheduleData, setScheduleData] = useState<ScheduleMatchupType[] | undefined>(undefined)
	const rawSchedData = useLeagueSchedule(season, undefined, undefined)?.sort((a, b) => a.WeekNum - b.WeekNum)

	useEffect(() => {
		setScheduleData(rawSchedData?.filter(obj => obj.HomeTeam === team?.id || obj.AwayTeam === team?.id))
	}, [team])

	if (!scheduleData || !gshlTeams) return <LoadingSpinner />
	return (
		<>
			<TeamsToggle
				{...{
					activeKey: team,
					setter: setTeam,
					toolbarKeys: gshlTeams,
					seasonToggleActiveKey: season,
					seasonToggleSetter: setSeason,
				}}
			/>
			<div className="my-10">
				{team && (
					<>
						<div className="text-xl text-center font-bold font-varela mt-10">
							{gshlTeams?.filter((obj: TeamInfoType) => obj.id === team.id)[0]['TeamName'] + ' Schedule'}
						</div>
						<div className="grid grid-cols-9 items-center text-center font-bold mt-2 mb-2">
							<div className="text-xs">Week</div>
							<div className="text-xs col-span-6">Opponent</div>
							<div className="text-xs col-span-2">Score</div>
						</div>
						{scheduleData
							.filter(obj => obj.Season === season.Season && (obj.HomeTeam === team.id || obj.AwayTeam === team.id))
							.map(matchup => (
								<TeamScheduleItem {...{ matchup, team }} season={season} gshlTeams={gshlTeams} />
							))}
					</>
				)}
			</div>
		</>
	)
}
function TeamScheduleItem({
	matchup,
	team,
	season,
	gshlTeams,
}: {
	matchup: ScheduleMatchupType
	team: TeamInfoType
	season: SeasonInfoDataType
	gshlTeams: TeamInfoType[]
}) {
	const opponent =
		matchup.AwayTeam === team.id ? gshlTeams.filter(obj => obj.id === matchup.HomeTeam)[0] : gshlTeams.filter(obj => obj.id === matchup.AwayTeam)[0]
	let output = []
	switch (matchup.GameType) {
		case 'QF':
			output = ['QF', 'text-orange-800 bg-orange-100']
			break
		case 'SF':
			output = ['SF', 'text-slate-700 bg-slate-100']
			break
		case 'F':
			output = ['F', 'text-yellow-800 bg-yellow-100']
			break
		case 'LT':
			output = ['LT', 'text-brown-800 bg-brown-100']
			break
		default:
			output = [matchup.WeekNum, opponent.Conference === 'HH' ? 'text-hotel-800' : 'text-sunview-800']
			break
	}
	if (!opponent) {
		return <></>
	}
	return (
		<Link to={'/matchup/' + matchup.id}>
			<div className={`grid grid-cols-9 py-2 border-b ${output[1]}`}>
				<div className="place-self-center font-varela">{output[0]}</div>
				<div className="col-span-6 text-base place-self-center font-varela">
					{matchup.AwayTeam === team.id ? '@ ' + opponent.TeamName : 'v ' + opponent.TeamName}
				</div>
				{(matchup.HomeScore || matchup.AwayScore) && (
					<div
						className={`text-sm col-span-2 my-auto text-center font-varela ${
							(matchup.HomeTeam === team.id ? matchup.HomeWL : matchup.AwayWL) === 'W'
								? 'text-emerald-700 font-semibold'
								: (matchup.HomeTeam === team.id ? matchup.HomeWL : matchup.AwayWL) === 'L'
								? 'text-rose-800'
								: 'text-gray-500'
						}`}>
						<span className="pr-2">{matchup.HomeTeam === team.id ? matchup.HomeWL : matchup.AwayWL}</span>
						<span>
							{matchup.HomeTeam === team.id ? matchup.HomeScore + ' - ' + matchup.AwayScore : matchup.AwayScore + ' - ' + matchup.HomeScore}
						</span>
					</div>
				)}
			</div>
		</Link>
	)
}
