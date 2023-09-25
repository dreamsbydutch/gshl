import React, { useState } from 'react'
import { queryFunc, useLeagueStandings } from '../utils/fetchData'
import { PageToolbar, SeasonToggleNavbar } from '../components/PageNavbar'
import LoadingSpinner from '../components/LoadingSpinner'
import { useQuery } from 'react-query'
// import { LosersBracket, PlayoffBracket } from '../components/Playoffs'
import { SeasonInfoDataType, StandingsInfoType, StandingsOption, TeamInfoType } from '../utils/endpointTypes'
import { getCurrentSeason } from '../utils/utils'
import { useTeams } from '../utils/context'

export default function Standings() {
	const [standingsType, setStandingsType] = useState<StandingsOption>('Overall')
	const [season, setSeason] = useState<SeasonInfoDataType>(getCurrentSeason())
	const toolbarProps = {
		setter: setStandingsType,
		activeKey: standingsType,
		seasonToggleSetter: setSeason,
		seasonToggleActiveKey: season,
		toolbarKeys: ['Overall', 'Conference', 'Wildcard', 'Playoffs'],
	}
	return (
		<div className="my-4 mx-2">
			<PageToolbar {...toolbarProps} />
			{standingsType !== 'Playoffs' ? (
				<>
					<StandingsContainer {...{ standingsType, season }} />
					<div className="my-4 mx-4 text-gray-500 text-xs">
						<div className="">x - Clinched Playoffs</div>
						<div className="">y - Clinched Conference</div>
						<div className="">z - Clinched President's Trophy</div>
						<div className="">e - Eliminated from Playoffs</div>
						<div className="">l - Clinched Loser's Bracket</div>
					</div>
				</>
			) : (
				<div className="flex flex-col mb-12">
					<div className="text-2xl text-center py-2 font-bold">GSHL Cup Playoffs</div>
					{/* <PlayoffBracket {...{ season }} /> */}
					<div className="text-2xl text-center pt-12 pb-2 font-bold">Loser's Tournament</div>
					{/* <LosersBracket {...{ season }} /> */}
				</div>
			)}
		</div>
	)
}

export const StandingsContainer = ({ standingsType, season }: { standingsType: StandingsOption; season: SeasonInfoDataType }) => {
	const gshlTeams = useTeams()?.filter(obj => obj.season === season.Season)[0].teams
	const standingsData = useLeagueStandings(season)
	if (!standingsData) return <LoadingSpinner />
	const typeObj = {
		Overall: [{ title: '', classes: 'bg-gray-100', data: standingsData.sort((a, b) => a.OvrRk - b.OvrRk) }],
		Conference: [
			{
				title: 'Sunview Conference',
				classes: 'bg-sunview-50 bg-opacity-50',
				data: standingsData.filter(obj => obj.Conf === 'SV').sort((a, b) => a.CCRk - b.CCRk),
			},
			{
				title: 'Hickory Hotel Conferene',
				classes: 'bg-hotel-50 bg-opacity-50',
				data: standingsData.filter(obj => obj.Conf === 'HH').sort((a, b) => a.CCRk - b.CCRk),
			},
		],
		Wildcard: [
			{
				title: 'Sunview Top 3',
				classes: 'bg-sunview-50 bg-opacity-50',
				data: standingsData
					.filter(obj => obj.Conf === 'SV')
					.sort((a, b) => a.CCRk - b.CCRk)
					.slice(0, 3),
			},
			{
				title: 'Hickory Hotel Top 3',
				classes: 'bg-hotel-50 bg-opacity-50',
				data: standingsData
					.filter(obj => obj.Conf === 'HH')
					.sort((a, b) => a.CCRk - b.CCRk)
					.slice(0, 3),
			},
			{
				title: 'Wildcard',
				classes: 'bg-gray-100 [&>*:nth-child(2)]:border-solid [&>*:nth-child(2)]:border-b-2 [&>*:nth-child(2)]:border-gray-800',
				data: standingsData
					.filter(obj => obj.WCRk)
					.sort((a, b) => Number(a.WCRk) - Number(b.WCRk))
					.slice(0, 6),
			},
			{
				title: "Loser's Tournament",
				classes: 'bg-brown-100',
				data: standingsData
					.filter(obj => obj.WCRk)
					.sort((a, b) => Number(a.WCRk) - Number(b.WCRk))
					.slice(6),
			},
		],
		Playoffs: [{ title: '', classes: 'bg-gray-100', data: standingsData.sort((a, b) => a.OvrRk - b.OvrRk) }],
		LosersTourney: [{ title: '', classes: 'bg-brown-100', data: standingsData.sort((a, b) => Number(a.LTRk) - Number(b.LTRk)) }],
	}
	return (
		<>
			{typeObj[standingsType]?.map(obj => {
				return (
					<div>
						<div className="font-bold mt-8 text-center text-sm font-varela">{obj.title}</div>
						<div className={'mb-4 p-2 rounded-xl shadow-md [&>*:last-child]:border-none ' + obj.classes}>
							{obj?.data &&
								obj?.data.map(team => {
									// const teamProb = playoffProb?.filter(a => a.id === team.gshlTeam)[0]
									return <StandingsItem key={team.gshlTeam} {...{ team, standingsType }} />
								})}
						</div>
					</div>
				)
			})}
		</>
	)
}
const StandingsItem = ({ team, standingsType }: { team: StandingsInfoType; standingsType: StandingsOption }) => {
	const [showInfo, setShowInfo] = useState(false)
	// if (standingsType === 'LT' && +teamProb.LoserPer !== 1) {
	// 	return (
	// 		<div
	// 			key={team.teamID}
	// 			className="grid grid-cols-12 mx-auto py-1 font-varela text-gray-400 text-center items-center border-b border-dotted border-gray-400"
	// 			onClick={() => setShowInfo(!showInfo)}>
	// 			<div className="col-span-12">TBD</div>
	// 		</div>
	// 	)
	// } else if (standingsType === 'LT') {
	if (standingsType === 'LosersTourney') {
		const LTDiff = team.LTCF - team.LTCA
		return (
			<div
				key={team.gshlTeam}
				className="grid grid-cols-12 mx-auto py-1 font-varela text-center items-center border-b border-dotted border-gray-400"
				onClick={() => setShowInfo(!showInfo)}>
				<div className="col-span-2 p-1">
					<img className="w-12" src={String(team.LogoURL)} alt="Team Logo" />
				</div>
				<div className="col-span-7 font-bold text-base">{team.TeamName}</div>
				<div className="col-span-2 text-sm">
					{team.LTW} - {team.LTL}
				</div>
				<div className={`col-span-1 text-sm ${LTDiff > 0 ? 'text-emerald-800' : LTDiff < 0 ? 'text-rose-800' : 'text-gray-500'}`}>
					{LTDiff > 0 ? '+' + LTDiff : LTDiff < 0 ? LTDiff : '-'}
				</div>
				{showInfo ? (
					<>
						<div className="col-span-12 mb-0.5 flex flex-row justify-center flex-wrap">
							<div className="text-2xs font-bold pr-2">Tiebreak Pts:</div>
							<div className="text-2xs">{team.LTPTS + ' pts'}</div>
						</div>
						<TeamInfo {...{ standingsType }} />
						{/* <TeamInfo {...{ teamProb, standingsType }} /> */}
					</>
				) : (
					<></>
				)}
			</div>
		)
	} else {
		return (
			<div
				key={team.gshlTeam}
				className="grid grid-cols-12 mx-auto py-1 font-varela text-center items-center border-b border-dotted border-gray-400"
				onClick={() => setShowInfo(!showInfo)}>
				<div className="col-span-2 p-1">
					<img className="w-12" src={String(team.LogoURL)} alt="Team Logo" />
				</div>
				<div className="col-span-7 font-bold text-base">
					{/* {+teamProb.OneSeed === 1
						? 'z - '
						: +teamProb.OneConf === 1
						? 'y - '
						: +teamProb.PlayoffsPer === 1
						? 'x - '
						: +teamProb.LoserPer === 1
						? 'l - '
						: +teamProb.PlayoffsPer === 0
						? 'e - '
						: ''} */}
					{team.TeamName}
				</div>
				<div className="col-span-2 text-sm">
					{team.W} - {team.L}
				</div>
				<div className={`text-xs ${team.Stk.includes('W') ? 'text-emerald-800' : 'text-rose-800'}`}>{team.Stk}</div>
				{showInfo ? (
					<>
						<div className="col-span-12 mb-0.5 flex flex-row justify-center flex-wrap">
							<div className="text-2xs font-bold pr-2">Tiebreak Pts:</div>
							<div className="text-2xs">{team.PTS + ' pts'}</div>
						</div>
						{/* <TeamInfo {...{ standingsType }} /> */}
						{/* <TeamInfo {...{ teamProb, standingsType }} /> */}
					</>
				) : (
					<></>
				)}
			</div>
		)
	}
}
const TeamInfo = ({ standingsType }: { standingsType: StandingsOption }) => {
	switch (standingsType) {
		case 'Overall':
			return (
				<div className="col-span-12 mt-1 mb-3 flex flex-row justify-center flex-wrap">
					{[
						'OneSeed',
						'TwoSeed',
						'ThreeSeed',
						'FourSeed',
						'FiveSeed',
						'SixSeed',
						'SevenSeed',
						'EightSeed',
						'NineSeed',
						'TenSeed',
						'ElevenSeed',
						'TwelveSeed',
						'ThirteenSeed',
						'FourteenSeed',
						'FifteenSeed',
						'SixteenSeed',
					].map((obj, i) => {
						return (
							<>
								{teamProb[obj] && (
									<div className="flex flex-col gap-1 px-2 border-r border-gray-500 last:border-none">
										<div className="text-xs font-bold">{i + 1 + (i + 1 === 1 ? 'st' : i + 1 === 2 ? 'nd' : i + 1 === 3 ? 'rd' : 'th') + ' Ovr'}</div>
										<div className="text-xs">{Math.round(teamProb[obj] * 1000) / 10 + '%'}</div>
									</div>
								)}
							</>
						)
					})}
				</div>
			)

		case 'Conference':
			return (
				<div className="col-span-12 mt-1 mb-3 flex flex-row justify-center flex-wrap">
					{['OneConf', 'TwoConf', 'ThreeConf', 'FourConf', 'FiveConf', 'SixConf', 'SevenConf', 'EightConf'].map((obj, i) => {
						return (
							<>
								{teamProb[obj] && (
									<div className="flex flex-col gap-1 px-2 border-r border-gray-500 last:border-none">
										<div className="text-xs font-bold">{i + 1 + (i + 1 === 1 ? 'st' : i + 1 === 2 ? 'nd' : i + 1 === 3 ? 'rd' : 'th') + ' Conf'}</div>
										<div className="text-xs">{Math.round(teamProb[obj] * 1000) / 10 + '%'}</div>
									</div>
								)}
							</>
						)
					})}
				</div>
			)

		case 'WC':
			return (
				<div className="col-span-12 mt-1 mb-3 flex flex-row justify-center flex-wrap">
					{['PlayoffsPer', 'LoserPer', 'SFPer', 'FinalPer', 'CupPer'].map(obj => {
						return (
							<>
								{teamProb[obj] && (
									<div className="flex flex-col gap-1 px-2 border-r border-gray-500 last:border-none">
										<div className="text-xs font-bold">{obj.replace('Per', '')}</div>
										<div className="text-xs">{Math.round(teamProb[obj] * 1000) / 10 + '%'}</div>
									</div>
								)}
							</>
						)
					})}
				</div>
			)

		case 'LT':
			return (
				<div className="col-span-12 mt-1 mb-3 flex flex-row justify-center flex-wrap">
					{['1stPickPer', '3rdPickPer', '4thPickPer', '8thPickPer'].map(obj => {
						return (
							<>
								{teamProb[obj] && (
									<div className="flex flex-col gap-1 px-2 border-r border-gray-500 last:border-none">
										<div className="text-xs font-bold">{obj.replace('Per', '')}</div>
										<div className="text-xs">{Math.round(teamProb[obj] * 1000) / 10 + '%'}</div>
									</div>
								)}
							</>
						)
					})}
				</div>
			)

		default:
			return <div></div>
	}
}
