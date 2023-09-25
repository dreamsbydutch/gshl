import React, { useState, useEffect } from 'react'
import {
	queryFunc,
	useAllFutureDraftPicks,
	useAllPastDraftPicks,
	useAllPlayerContracts,
	useCurrentRosters,
	useGSHLTeams,
	usePlayerSplits,
} from '../utils/fetchData'
import LoadingSpinner from '../components/LoadingSpinner'
import { SeasonToggleNavbar, SecondaryPageToolbar, TeamsToggle } from '../components/PageNavbar'
// import TeamRoster from '../components/CurrentRoster'
import { useTeams } from '../utils/context'
import { seasons, upcomingSeasons } from '../utils/constants'
import {
	LockerRoomPlayerStatPropsType,
	LockerRoomTeamStatPropsType,
	PlayerContractType,
	QueryKeyType,
	SeasonInfoDataType,
	Season,
	TeamDraftPickType,
	TeamInfoType,
} from '../utils/endpointTypes'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { getCurrentSeason, moneyFormatter } from '../utils/utils'
import { Link, NavLink, useParams } from 'react-router-dom'

export default function LockerRoom() {
	const { teamID } = useParams()
	const [type, setType] = useState('Contracts')
	const [season, setSeason] = useState<SeasonInfoDataType>(seasons.slice(-1)[0])
	const gshlTeams = useGSHLTeams(season)
	console.log(season)
	const [teamInfo, setTeamInfo] = useState<TeamInfoType | undefined>(gshlTeams?.filter(obj => obj.id === Number(teamID))[0] || undefined)
	const playerSplits = usePlayerSplits(undefined, season)
	const rosterData = useCurrentRosters()
	const contractData = useAllPlayerContracts()
	useEffect(() => window.scrollTo(0, 0), [teamInfo, type])
	useEffect(() => setTeamInfo(gshlTeams?.filter(obj => obj.id === Number(teamID))[0]), [gshlTeams, teamID])

	const seasonToolbarProps = {
		setter: setSeason,
		activeKey: season,
		position: ['absolute top-4 right-4', 'right-0'],
	}
	const playerStatProps = {
		teamInfo,
		season,
		playerSeasonData: playerSplits,
		currentRosterData: rosterData,
		teamContracts: contractData.filter(obj => (teamInfo ? teamInfo.id === +obj.CurrentTeam : true)),
	}

	if (!gshlTeams) return <LoadingSpinner />
	return (
		<div className="my-4 text-center">
			<TeamsToggle
				{...{
					setter: setTeamInfo,
					activeKey: teamInfo,
					toolbarKeys: gshlTeams,
					url: '/lockerroom/',
				}}
			/>
			{teamInfo && (
				<>
					<SecondaryPageToolbar
						{...{
							setter: setType,
							activeKey: type,
							toolbarKeys: ['Contracts', 'Player Stats', 'Team Stats', 'History'],
						}}
					/>
					<div className="font-bold text-2xl flex flex-col items-center justify-center mb-4">
						<img className="max-w-xs w-2/6 h-2/6 mx-auto" src={teamInfo?.LogoURL} alt="Team Logo" />
						{teamInfo?.TeamName}
					</div>
					{type === 'Contracts' && (
						<>
							<TeamPlayerContracts {...playerStatProps} />
							<TeamDraftPicks {...playerStatProps} />
							{/* <TeamRoster {...playerStatProps} /> */}
						</>
					)}
					{type === 'Player Stats' && (
						<>
							<SeasonToggleNavbar {...seasonToolbarProps} />
							{/* <TeamPlayerStats {...playerStatProps} /> */}
							{/* <TeamPOPlayerStats {...playerStatProps} /> */}
							{/* <TeamLTPlayerStats {...playerStatProps} /> */}
						</>
					)}
					{type === 'Team Stats' && <>{/* <TeamStatChart {...teamStatprops} /> */}</>}
					{type === 'History' && <></>}
					<div className="mb-14 text-white">.</div>
				</>
			)}
			{!teamInfo && (
				<>
					<CapOverview />
					<TeamPlayerContracts {...playerStatProps} />
				</>
			)}
		</div>
	)
}

export function CapOverview() {
	const gshlTeams = useTeams()?.filter(obj => obj.season === getCurrentSeason().Season)[0]
	const contractData = useAllPlayerContracts()
	if (!gshlTeams || !contractData || !upcomingSeasons) {
		return <LoadingSpinner />
	}
	function TeamCapSpaceRow({ team, contractData }: { team: TeamInfoType; contractData: PlayerContractType[] }) {
		return (
			<tr key={team.id}>
				<td className="sticky left-0 flex justify-start px-2 py-1 text-sm font-normal text-gray-800 bg-gray-50 whitespace-nowrap">
					<Link to={`/lockerroom/${team.id}`}>
						<div className="place-self-center overflow-hidden">
							<img src={team.LogoURL} alt={`${team.TeamName} Team Logo`} className="h-6 w-6 mx-2 inline-block" />
							{team.TeamName}
						</div>
					</Link>
				</td>
				{upcomingSeasons[0].PlayoffEndDate > new Date() && (
					<td className="px-2 py-1 text-xs font-normal text-center text-gray-800 whitespace-nowrap">
						{team.CapSpace && moneyFormatter(team.CapSpace[0])}(
						{contractData?.filter(obj => +obj.CurrentTeam === team.id && +obj.YearsRemaining > 0 && obj.ExpiryType !== 'Buyout').length})
					</td>
				)}
				<td className="px-2 py-1 text-xs font-normal text-center text-gray-800 whitespace-nowrap">
					{team.CapSpace && moneyFormatter(team.CapSpace[1])}(
					{contractData?.filter(obj => +obj.CurrentTeam === team.id && +obj.YearsRemaining > 1 && obj.ExpiryType !== 'Buyout').length})
				</td>
				<td className="px-2 py-1 text-xs font-normal text-center text-gray-800 whitespace-nowrap">
					{team.CapSpace && moneyFormatter(team.CapSpace[2])}(
					{contractData?.filter(obj => +obj.CurrentTeam === team.id && +obj.YearsRemaining > 2 && obj.ExpiryType !== 'Buyout').length})
				</td>
				<td className="px-2 py-1 text-xs font-normal text-center text-gray-800 whitespace-nowrap">
					{team.CapSpace && moneyFormatter(team.CapSpace[3])}(
					{contractData?.filter(obj => +obj.CurrentTeam === team.id && +obj.YearsRemaining > 3 && obj.ExpiryType !== 'Buyout').length})
				</td>
			</tr>
		)
	}
	return (
		<>
			<div className="mt-8 text-center mx-auto text-xl font-bold">GSHL Salary Caps</div>
			<div className="mb-2 table-auto overflow-scroll no-scrollbar">
				<table className="mx-auto overflow-x-auto border border-black">
					<thead>
						<tr key="header">
							<th className="sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Team</th>
							{upcomingSeasons[0].PlayoffEndDate > new Date() && (
								<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">{upcomingSeasons[0].ListName}</th>
							)}
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">{upcomingSeasons[1].ListName}</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">{upcomingSeasons[2].ListName}</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">{upcomingSeasons[3].ListName}</th>
						</tr>
					</thead>
					<tbody>
						{gshlTeams.teams
							?.sort((a, b) => (a.CapSpace && b.CapSpace ? b.CapSpace[0] - a.CapSpace[0] : 0))
							.map(team => (
								<TeamCapSpaceRow {...{ team, contractData }} />
							))}
					</tbody>
				</table>
			</div>
		</>
	)
}

function TeamPlayerContracts(props: LockerRoomPlayerStatPropsType) {
	const currentTeamContracts = props.teamContracts?.filter(obj => +obj.YearsRemaining > 0)

	console.log(currentTeamContracts)
	if (!currentTeamContracts) {
		return <LoadingSpinner />
	}
	return (
		<>
			<div className="mt-4 text-center mx-auto text-xl font-bold">Current Contracts & Buyouts</div>
			<div className="mb-8 table-auto overflow-scroll no-scrollbar">
				<PlayerContractTable {...{ contracts: currentTeamContracts, team: props.teamInfo }} />
			</div>
		</>
	)
}
function TeamDraftPicks(props: LockerRoomPlayerStatPropsType) {
	const gshlTeams = useGSHLTeams(seasons.slice(-1)[0])
	const draftPickData: TeamDraftPickType[] = useAllFutureDraftPicks(props.teamInfo || undefined)
	const currentTeamContracts = props.teamContracts
		?.filter(obj => +obj.YearsRemaining > 0 && obj.ExpiryType !== 'Buyout')
		.sort((a, b) => b.CapHit - a.CapHit)
	const numberSuffix = (num: number) => {
		num = num < 20 ? num : num % 10
		switch (num) {
			case 1:
				return 'st'
			case 2:
				return 'nd'
			case 3:
				return 'rd'
			default:
				return 'th'
		}
	}
	const teamDraftPicks = draftPickData?.filter(obj => props.teamInfo && +obj.gshlTeam === +props.teamInfo.id)
	if (!teamDraftPicks) return <LoadingSpinner />

	return (
		<>
			<div className="mt-4 mx-auto text-xl font-bold">Draft Picks</div>
			{teamDraftPicks
				.sort((a, b) => a.Pick - b.Pick)
				.map((obj, i) => {
					if (obj === null) {
						return <tr></tr>
					}
					let originalTeam: TeamInfoType | undefined = undefined
					if (obj.OriginalTeam !== obj.gshlTeam && gshlTeams) {
						originalTeam = gshlTeams.filter(x => x.id === +obj.OriginalTeam)[0]
					}
					console.log(obj)
					if (teamDraftPicks.length - i > currentTeamContracts.length) {
						return (
							<div key={i + 1} className="text-gray-800">
								<div className="mx-auto w-5/6 py-1 px-2 text-center text-xs border-t border-gray-300">
									{obj.Rd + numberSuffix(+obj.Rd)} Round, {obj.Pick + numberSuffix(+obj.Pick)} Overall
									{originalTeam ? ` (via ${originalTeam.TeamName})` : ''}
								</div>
							</div>
						)
					}
					return (
						<div key={i + 1} className="text-gray-400">
							<div className="mx-auto w-5/6 py-1 px-2 text-center text-xs border-t border-gray-300">
								{currentTeamContracts[teamDraftPicks.length - i - 1].PlayerName}, {currentTeamContracts[teamDraftPicks.length - i - 1].Pos} (
								{obj.Rd + numberSuffix(+obj.Rd)} Round)
							</div>
						</div>
					)
				})}
		</>
	)
}

function TeamPlayerStatsTable(props: LockerRoomPlayerStatPropsType) {
	if (!props.teamInfo) return <></>
	const teamPlayers = props.playerSeasonData?.filter(obj => props.teamInfo && obj.gshlTeam.includes(props.teamInfo.id) && obj.WeekType === 'RS')
	const currentRoster = props.currentRosterData?.filter(obj => props.teamInfo && obj.gshlTeam.includes(props.teamInfo.id))
	console.log(props)

	if (!props.teamInfo || !teamPlayers) return <LoadingSpinner />

	return (
		<>
			<div className="mt-8 text-center mx-auto text-xl font-bold">Regular Season Stats</div>
			<div className="table-auto overflow-scroll">
				<table className="mx-auto overflow-x-auto">
					<thead>
						<tr>
							<th className="sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Name</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Pos</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Team</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">G</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">A</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">P</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">PPP</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">SOG</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">HIT</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">BLK</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Rtg</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Days</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">GP</th>
						</tr>
					</thead>
					<tbody>
						{teamPlayers
							.sort((a, b) => +b.Rating - +a.Rating)
							.filter(obj => obj.nhlPos !== 'G')
							.map(obj => {
								return (
									<tr key={obj.id}>
										<td
											className={`${
												currentRoster?.filter(a => a.PlayerName === obj.PlayerName).length > 0 ? 'font-bold' : 'text-gray-500'
											} sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50`}>
											{obj.PlayerName}
										</td>
										<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.nhlPos}</td>
										<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">
											<img
												src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${obj?.nhlTeam?.slice(-1)}.png`}
												alt="NHL Team Logo"
												className="h-4 w-4 mx-auto"
											/>
										</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.G}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.A}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.P}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.PPP}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.SOG}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.HIT}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.BLK}</td>
										<td className="py-1 px-2 text-center text-xs font-bold border-t border-b border-gray-300 bg-gray-50">
											{Math.round(obj.Rating * 10) / 10}
										</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.RosterDays}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.GS}</td>
									</tr>
								)
							})}
					</tbody>
					<thead>
						<tr>
							<th className="sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Name</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Pos</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Team</th>
							<th colSpan={2} className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">
								W
							</th>
							<th colSpan={2} className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">
								GAA
							</th>
							<th colSpan={2} className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">
								SV%
							</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200"></th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Rtg</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Days</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">GP</th>
						</tr>
					</thead>
					<tbody>
						{teamPlayers
							.sort((a, b) => +b.Rating - +a.Rating)
							.filter(obj => obj.nhlPos === 'G')
							.map(obj => {
								return (
									<tr key={obj.id}>
										<td
											className={`${
												currentRoster?.filter(a => a.PlayerName === obj.PlayerName).length > 0 ? 'font-bold' : ''
											} sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50`}>
											{obj.PlayerName}
										</td>
										<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.nhlPos}</td>
										<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">
											<img
												src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${obj?.nhlTeam?.slice(-1)}.png`}
												alt="NHL Team Logo"
												className="h-4 w-4 mx-auto"
											/>
										</td>
										<td colSpan={2} className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">
											{obj.W}
										</td>
										<td colSpan={2} className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">
											{obj.GAA}
										</td>
										<td colSpan={2} className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">
											{obj.SVP}
										</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300"></td>
										<td className="py-1 px-2 text-center text-xs font-bold border-t border-b border-gray-300 bg-gray-50">
											{Math.round(obj.Rating * 10) / 10}
										</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.RosterDays}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.GS}</td>
									</tr>
								)
							})}
					</tbody>
				</table>
			</div>
		</>
	)
}
function TeamPOPlayerStats(props: LockerRoomPlayerStatPropsType) {
	const teamPlayers = props.playerSeasonData?.filter(obj => props.teamInfo && obj.gshlTeam.includes(props.teamInfo.id) && obj.WeekType === 'PO')
	const currentRoster = props.currentRosterData?.filter(obj => props.teamInfo && obj.gshlTeam.includes(props.teamInfo.id))

	if (!props.teamInfo || !teamPlayers) {
		return <LoadingSpinner />
	}
	if (teamPlayers.length === 0) {
		return <div></div>
	}
	return (
		<>
			<div className="mt-8 text-center mx-auto text-xl font-bold">Playoff Stats</div>
			<div className="table-auto overflow-scroll">
				<table className="mx-auto overflow-x-auto">
					<thead>
						<tr>
							<th className="sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Name</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Pos</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Team</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">G</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">A</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">P</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">PPP</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">SOG</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">HIT</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">BLK</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Rtg</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Days</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">GP</th>
						</tr>
					</thead>
					<tbody>
						{teamPlayers
							.sort((a, b) => +b.Rating - +a.Rating)
							.filter(obj => obj.nhlPos !== 'G')
							.map(obj => {
								return (
									<tr key={obj.id}>
										<td
											className={`${
												currentRoster?.filter(a => a.PlayerName === obj.PlayerName).length > 0 ? 'font-bold' : 'text-gray-500'
											} sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50`}>
											{obj.PlayerName}
										</td>
										<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.nhlPos}</td>
										<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">
											<img
												src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${obj?.nhlTeam?.slice(-1)}.png`}
												alt="NHL Team Logo"
												className="h-4 w-4 mx-auto"
											/>
										</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.G}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.A}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.P}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.PPP}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.SOG}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.HIT}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.BLK}</td>
										<td className="py-1 px-2 text-center text-xs font-bold border-t border-b border-gray-300 bg-gray-50">
											{Math.round(obj.Rating * 10) / 10}
										</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.RosterDays}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.GS}</td>
									</tr>
								)
							})}
					</tbody>
					<thead>
						<tr>
							<th className="sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Name</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Pos</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Team</th>
							<th colSpan={2} className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">
								W
							</th>
							<th colSpan={2} className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">
								GAA
							</th>
							<th colSpan={2} className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">
								SV%
							</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200"></th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Rtg</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Days</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">GP</th>
						</tr>
					</thead>
					<tbody>
						{teamPlayers
							.sort((a, b) => +b.Rating - +a.Rating)
							.filter(obj => obj.nhlPos === 'G')
							.map(obj => {
								return (
									<tr key={obj.id}>
										<td
											className={`${
												currentRoster?.filter(a => a.PlayerName === obj.PlayerName).length > 0 ? 'font-bold' : ''
											} sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50`}>
											{obj.PlayerName}
										</td>
										<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.nhlPos}</td>
										<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">
											<img
												src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${obj?.nhlTeam?.slice(-1)}.png`}
												alt="NHL Team Logo"
												className="h-4 w-4 mx-auto"
											/>
										</td>
										<td colSpan={2} className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">
											{obj.W}
										</td>
										<td colSpan={2} className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">
											{obj.GAA}
										</td>
										<td colSpan={2} className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">
											{obj.SVP}
										</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300"></td>
										<td className="py-1 px-2 text-center text-xs font-bold border-t border-b border-gray-300 bg-gray-50">
											{Math.round(obj.Rating * 10) / 10}
										</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.RosterDays}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.GS}</td>
									</tr>
								)
							})}
					</tbody>
				</table>
			</div>
		</>
	)
}
function TeamLTPlayerStats(props: LockerRoomPlayerStatPropsType) {
	const teamPlayers = props.playerSeasonData?.filter(obj => props.teamInfo && obj.gshlTeam.includes(props.teamInfo.id) && obj.WeekType === 'LT')
	const currentRoster = props.currentRosterData?.filter(obj => props.teamInfo && obj.gshlTeam.includes(props.teamInfo.id))

	if (!props.teamInfo || !teamPlayers) {
		return <LoadingSpinner />
	}
	if (teamPlayers.length === 0) {
		return <div></div>
	}
	return (
		<>
			<div className="mt-8 text-center mx-auto text-xl font-bold">Loser's Tournament Stats</div>
			<div className="table-auto overflow-scroll">
				<table className="mx-auto overflow-x-auto">
					<thead>
						<tr>
							<th className="sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Name</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Pos</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Team</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">G</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">A</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">P</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">PPP</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">SOG</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">HIT</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">BLK</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Rtg</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Days</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">GP</th>
						</tr>
					</thead>
					<tbody>
						{teamPlayers
							.sort((a, b) => +b.Rating - +a.Rating)
							.filter(obj => obj.nhlPos !== 'G')
							.map(obj => {
								return (
									<tr key={obj.id}>
										<td
											className={`${
												currentRoster?.filter(a => a.PlayerName === obj.PlayerName).length > 0 ? 'font-bold' : 'text-gray-500'
											} sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50`}>
											{obj.PlayerName}
										</td>
										<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.nhlPos}</td>
										<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">
											<img
												src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${obj?.nhlTeam?.slice(-1)}.png`}
												alt="NHL Team Logo"
												className="h-4 w-4 mx-auto"
											/>
										</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.G}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.A}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.P}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.PPP}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.SOG}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.HIT}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.BLK}</td>
										<td className="py-1 px-2 text-center text-xs font-bold border-t border-b border-gray-300 bg-gray-50">
											{Math.round(obj.Rating * 10) / 10}
										</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.RosterDays}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.GS}</td>
									</tr>
								)
							})}
					</tbody>
					<thead>
						<tr>
							<th className="sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Name</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Pos</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Team</th>
							<th colSpan={2} className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">
								W
							</th>
							<th colSpan={2} className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">
								GAA
							</th>
							<th colSpan={2} className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">
								SV%
							</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200"></th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Rtg</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Days</th>
							<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">GP</th>
						</tr>
					</thead>
					<tbody>
						{teamPlayers
							.sort((a, b) => +b.Rating - +a.Rating)
							.filter(obj => obj.nhlPos === 'G')
							.map(obj => {
								return (
									<tr key={obj.id}>
										<td
											className={`${
												currentRoster?.filter(a => a.PlayerName === obj.PlayerName).length > 0 ? 'font-bold' : ''
											} sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50`}>
											{obj.PlayerName}
										</td>
										<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{obj.nhlPos}</td>
										<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">
											<img
												src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${obj?.nhlTeam?.slice(-1)}.png`}
												alt="NHL Team Logo"
												className="h-4 w-4 mx-auto"
											/>
										</td>
										<td colSpan={2} className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">
											{obj.W}
										</td>
										<td colSpan={2} className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">
											{obj.GAA}
										</td>
										<td colSpan={2} className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">
											{obj.SVP}
										</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300"></td>
										<td className="py-1 px-2 text-center text-xs font-bold border-t border-b border-gray-300 bg-gray-50">
											{Math.round(obj.Rating * 10) / 10}
										</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.RosterDays}</td>
										<td className="py-1 px-1.5 text-center text-xs border-t border-b border-gray-300">{obj.GS}</td>
									</tr>
								)
							})}
					</tbody>
				</table>
			</div>
		</>
	)
}

function TeamStatChart(props: LockerRoomTeamStatPropsType) {
	ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

	const chartOptions = {
		scales: {
			y: {
				max: 16,
				min: 1,
				reverse: true,
				ticks: {
					stepSize: 4,
				},
			},
			x: {
				max: 25,
				min: 0,
				ticks: {
					stepSize: 1,
				},
			},
		},
		responsive: true,
		plugins: {
			legend: {
				display: false,
				position: 'bottom' as const,
			},
			title: {
				display: true,
				text: 'Weekly Power Rankings',
			},
		},
	}

	const labels = new Array(22).fill(1).map((obj, i) => `Week ${i + 1}`)

	const chartData = {
		labels,
		datasets: [
			{
				label: 'Power Ranking',
				data: props.teamWeeksData?.map(obj => obj.PwrRk).slice(0, 22),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	}
	return <Line options={chartOptions} data={chartData} />
}

function PlayerContractTable(props: { contracts: PlayerContractType[]; team: TeamInfoType | undefined }) {
	const gshlTeams = useTeams()?.filter(obj => obj.season === getCurrentSeason().Season)[0]

	const PlayerContractRow = (props: { player: PlayerContractType; team: TeamInfoType | undefined }) => (
		<tr key={props.player.id} className={`${props.player.ExpiryType === 'Buyout' ? 'text-gray-400' : 'text-gray-800'}`}>
			<td className="sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 whitespace-nowrap bg-gray-50">
				{props.player.PlayerName}
			</td>
			<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{props.player.Pos}</td>
			{props.team == undefined && (
				<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">
					<img
						src={gshlTeams?.teams.filter(team => props.player.CurrentTeam === team.id)[0]?.LogoURL || ''}
						alt={gshlTeams?.teams.filter(team => props.player.CurrentTeam === team.id)[0]?.TeamName || ''}
						className="h-4 w-4 mx-auto"
					/>
				</td>
			)}
			{upcomingSeasons[0].PlayoffEndDate > new Date() && +props.player.YearsRemaining > 0 ? (
				<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{moneyFormatter(props.player.CapHit)}</td>
			) : +props.player.YearsRemaining === 0 ? (
				<td
					className={`my-1 mx-2 text-center text-2xs font-bold rounded-xl border-t border-b border-gray-300 ${
						props.player.ExpiryType === 'RFA' ? 'text-orange-700 bg-orange-100' : props.player.ExpiryType === 'UFA' ? 'text-rose-800 bg-rose-100' : ''
					}`}>
					{props.player.ExpiryType === 'Buyout' ? '' : props.player.ExpiryType}
				</td>
			) : (
				<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300"></td>
			)}
			{+props.player.YearsRemaining > 1 ? (
				<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{moneyFormatter(props.player.CapHit)}</td>
			) : +props.player.YearsRemaining === 1 ? (
				<td
					className={`my-1 mx-2 text-center text-2xs font-bold rounded-xl border-t border-b border-gray-300 ${
						props.player.ExpiryType === 'RFA' ? 'text-orange-700 bg-orange-100' : props.player.ExpiryType === 'UFA' ? 'text-rose-800 bg-rose-100' : ''
					}`}>
					{props.player.ExpiryType === 'Buyout' ? '' : props.player.ExpiryType}
				</td>
			) : (
				<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300"></td>
			)}
			{+props.player.YearsRemaining > 2 ? (
				<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{moneyFormatter(props.player.CapHit)}</td>
			) : +props.player.YearsRemaining === 2 ? (
				<td
					className={`my-1 mx-2 text-center text-2xs font-bold rounded-xl border-t border-b border-gray-300 ${
						props.player.ExpiryType === 'RFA' ? 'text-orange-700 bg-orange-100' : props.player.ExpiryType === 'UFA' ? 'text-rose-800 bg-rose-100' : ''
					}`}>
					{props.player.ExpiryType === 'Buyout' ? '' : props.player.ExpiryType}
				</td>
			) : (
				<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300"></td>
			)}
			{+props.player.YearsRemaining > 3 ? (
				<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300">{moneyFormatter(props.player.CapHit)}</td>
			) : +props.player.YearsRemaining === 3 ? (
				<td
					className={`my-1 mx-2 text-center text-2xs font-bold rounded-xl border-t border-b border-gray-300 ${
						props.player.ExpiryType === 'RFA' ? 'text-orange-700 bg-orange-100' : props.player.ExpiryType === 'UFA' ? 'text-rose-800 bg-rose-100' : ''
					}`}>
					{props.player.ExpiryType === 'Buyout' ? '' : props.player.ExpiryType}
				</td>
			) : (
				<td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300"></td>
			)}
		</tr>
	)
	return (
		<table className="mx-auto my-1 overflow-x-auto">
			<thead>
				<tr key="contractTableHead">
					<th className="sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Name</th>
					<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Pos</th>
					{!props.team && <th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">Team</th>}
					{upcomingSeasons[0].PlayoffEndDate > new Date() && (
						<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">{upcomingSeasons[0].ListName}</th>
					)}
					<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">{upcomingSeasons[1].ListName}</th>
					<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">{upcomingSeasons[2].ListName}</th>
					<th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200">{upcomingSeasons[3].ListName}</th>
				</tr>
			</thead>
			<tbody>
				{props.contracts
					?.sort((a, b) => +b.CapHit - +a.CapHit)
					.map(obj => (obj ? <PlayerContractRow {...{ player: obj, team: props.team }} /> : <tr></tr>))}
				{props.team && (
					<tr key={`${props.team.TeamName}CapSpace`}>
						<td className="sticky left-0 font-bold py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">Cap Space</td>
						<td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200"></td>
						<td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">
							{moneyFormatter(22500000 - props.contracts?.filter(obj => obj.YearsRemaining > 0).reduce((acc, obj) => acc + +obj.CapHit, 0))}
						</td>
						<td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">
							{moneyFormatter(25000000 - props.contracts?.filter(obj => obj.YearsRemaining > 1).reduce((acc, obj) => acc + +obj.CapHit, 0))}
						</td>
						<td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">
							{moneyFormatter(25000000 - props.contracts?.filter(obj => obj.YearsRemaining > 2).reduce((acc, obj) => acc + +obj.CapHit, 0))}
						</td>
						<td className="py-1 px-2 text-center text-xs border-t border-gray-800 bg-gray-200">
							{moneyFormatter(25000000 - props.contracts?.filter(obj => obj.YearsRemaining > 3).reduce((acc, obj) => acc + +obj.CapHit, 0))}
						</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}
