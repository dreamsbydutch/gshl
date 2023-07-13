// Main Input Endpoints
export type PlayerContractType = {
	id: number
	PlayerName: string
	Pos: NHLPositions
	Years: 1 | 2 | 3
	AAV: number
	SigningTeam: number
	CurrentTeam: number
	SigningDate: Date
	StartDate: Date
	SignType: 'Draft' | 'RFA' | 'UFA'
	ExpiryType: 'RFA' | 'UFA' | 'Buyout'
	EndDate: Date
	CapHit: number
	CapHitExpiry: Date
	YearsRemaining: number
}
export type ScheduleMatchupType = {
	id: number
	Season: Season
	WeekNum: number
	StartDate: Date
	EndDate: Date
	GameDays: number
	GameType: WeekType
	MatchupNum: number
	HomeRank: number | null
	HomeTeam: number | null
	HomeScore: number | null
	HomeWL: 'W' | 'L' | 'T' | null
	AwayRank: number | null
	AwayTeam: number | null
	AwayScore: number | null
	AwayWL: 'W' | 'L' | 'T' | null
	FirstStar: number | null
	SecondStar: number | null
	ThirdStar: number | null
	MatchupRtg: number | null
}
export type ScheduleWeekType = {
	id: number
	Season: number
	WeekNum: number
	StartDate: Date
	EndDate: Date
	GameDays: number
	WeekType: 'RS' | 'PO'
}
export type TeamInfoType = {
	id: number
	TeamName: string
	OwnerID: number
	LogoURL: string
	Conference: 'SV' | 'HH'
	CapSpace: number[] | undefined
	'2015': number | undefined
	'2016': number | undefined
	'2017': number | undefined
	'2018': number | undefined
	'2019': number | undefined
	'2020': number | undefined
	'2021': number | undefined
	'2022': number | undefined
	'2023': number | undefined
	'2024': number | undefined
	'2025': number | undefined
	'2026': number | undefined
	'2027': number | undefined
}
export type OwnerInfoType = {
	id: number
	FirstName: string
	LastName: string
	Nickname: string
	Email: string
}

// PLAYER DATA TYPES
//--------------------------------------------------------------------------------------
// Player Info and Stats Templates
// Player Data Endpoint Types
//--------------------------------------------------------------------------------------
type PlayerInfoType = {
	id: number
	Season: Season
	WeekType: WeekType
	PlayerName: string
	nhlPos: NHLPosition
	PosGroup: PositionGroup
	nhlTeam: string[] | null
	gshlTeam: number[]
	Age?: number
	GP: number | null
	PPD: number | null
	MG: number | null
	GS: number | null
	Rating: number
	MS: number | null
	BS: number | null
}
type SkaterStatsType = {
	G: number | null
	A: number | null
	P?: number | null
	PM?: number | null
	PIM?: number | null
	PPP: number | null
	SOG: number | null
	HIT: number | null
	BLK: number | null
}
type GoalieStatsType = {
	W: number | null
	L?: number | null
	OTL?: number | null
	GA: number | null
	GAA: number | null
	SV: number | null
	SA?: number | null
	SVP: number | null
	SO?: number | null
	TOI?: number | null
}
export type PlayerDayType = PlayerInfoType &
	(SkaterStatsType | GoalieStatsType) & {
		WeekNum: number
		Date: Date
		Injury: InjuryDesignations
		DailyPos: GSHLPositions
		Opp: string | null
		Score: string | null
		YahooRk: number | null
		FullPos: GSHLPositions
		BestPos: GSHLPositions
	}
export type PlayerWeekType = PlayerInfoType & (SkaterStatsType | GoalieStatsType) & { WeekNum: number; RosterDays: number }
export type PlayerSeasonType =
	| (PlayerInfoType & SkaterStatsType & { RosterDays: number })
	| (PlayerInfoType & GoalieStatsType & { RosterDays: number })
export type PlayerNHLType = Omit<PlayerInfoType, 'WeekType' | 'nhlPos' | 'gshlTeam' | 'PPD' | 'MG' | 'GP' | 'MS' | 'BS'> &
	(SkaterStatsType | GoalieStatsType)
export type PlayerSalaryType = Omit<PlayerInfoType, 'WeekType' | 'nhlTeam' | 'PPD' | 'MG' | 'GP' | 'GS' | 'MS' | 'BS'> & {
	ProjectedSalary: number
	CurrentSalary: number | null
	EarlySalary: number | null
	LateSalary: number | null
	Status: 'Contract' | 'Draft'
	Savings: number | null
	'2015': number | null
	'2016': number | null
	'2017': number | null
	'2018': number | null
	'2019': number | null
	'2020': number | null
	'2021': number | null
	'2022': number | null
	'2023': number | null
	'2024': number | null
	'2025': number | null
	'2026': number | null
}
export type PlayerCurrentRosterType = Omit<PlayerInfoType, 'WeekType' | 'Age' | 'Rating' | 'PPD' | 'MG' | 'GP' | 'GS' | 'MS' | 'BS'> & {
	Rank: number
	ContractEligible: Boolean
	LineupPos: GSHLPositions
}
export type PlayerDraftPickType = {
	Season: Season
	Rd: number
	Pick: number
	PlayerName: string
	gshlTeam: number
	SplitRtg: number
	TotalRtg: number
	SplitRatio: number
	CalderRtg: number
	PickRtg: number
}
export type PlayerAllStarsType = PlayerSeasonType & { LineupPos: string }

//--------------------------------------------------------------------------------------
// TEAM DATA TYPES
//--------------------------------------------------------------------------------------

export type TeamDaysType = {
	id: number
	Season: Season
	WeekNum: number
	WeekType: WeekType
	Date: Date
	gshlTeam: number
	GP: number
	GPg: number
	PPD: number
	MG: number
	MGg: number
	GS: number
	GSg: number
	G: number
	A: number
	P: number
	PPP: number
	SOG: number
	HIT: number
	BLK: number
	W: number
	GA: number
	GAA: number | null
	SV: number
	SA: number
	SVP: number | null
	TOI: number
	MS: number
	BS: number
	Rating: number
}
export type TeamWeeksType = {
	id: number
	Season: Season
	WeekNum: number
	WeekType: WeekType
	gshlTeam: number
	GP: number
	GPg: number
	PPD: number
	MG: number
	MGg: number
	GS: number
	GSg: number
	G: number
	A: number
	P: number
	PPP: number
	SOG: number
	HIT: number
	BLK: number
	W: number
	GA: number
	GAA: number
	SV: number
	SA: number
	SVP: number
	TOI: number
	MS: number
	BS: number
	Rating: number
	YTDRtg: number
	PwrRtg: number
	PwrRk: number
}
export type TeamTotalsType = {
	id: number
	Season: Season
	WeekType: WeekType
	gshlTeam: number
	GP: number
	GPg: number
	PPD: number
	MG: number
	MGg: number
	GS: number
	GSg: number
	G: number
	A: number
	P: number
	PPP: number
	SOG: number
	HIT: number
	BLK: number
	W: number
	GA: number
	GAA: number
	SV: number
	SA: number
	SVP: number
	TOI: number
	MS: number
	BS: number
	Rating: number
	Players: number | null
	Norris: number | null
	Vezina: number | null
	Calder: number | null
	JackAdams: number | null
	GMOY: number | null
}
export type TeamStandingsType = {
	Season: number
	gshlTeam: number
	TeamName: string
	Owner: number
	LogoURL: string
	Conf: 'SV' | 'HH'
	W: number
	HW: number
	HL: number
	L: number
	PTS: number
	CF: number
	CA: number
	Diff: number
	CCW: number
	CCHW: number
	CCHL: number
	CCL: number
	CCPTS: number
	CCCF: number
	CCCA: number
	CCDiff: number
	POW: number
	POHW: number
	POHL: number
	POL: number
	POPTS: number
	POCF: number
	POCA: number
	PODiff: number
	LTW: number
	LTHW: number
	LTHL: number
	LTL: number
	LTPTS: number
	LTCF: number
	LTCA: number
	LTDiff: number
	Stk: string
	Rtg: number
	Rk: number
	PrevRtg: number
	PrevRk: number
	RtgCh: number
	RkCh: number
	POFinish: string
	POPer: number | null
	OvrRk: number
	WCRk: number | null
	LTRk: number | null
	CCRk: number
	DraftPtsAdj: number | null
}
export type TeamAwardWinnersType = TeamTotalsType & {
	Award: string
}
export type TeamAwardNomineesType = TeamAwardWinnersType & {
	Prob: string
}
export type TeamDraftPickType = {
	Season: Season
	Rd: number
	Pick: number
	gshlTeam: number
	OriginalTeam: number
}
export type TeamDraftOrderType = TeamStandingsType & {
	Slot: number
}

// Utility Types
export type SeasonInfoDataType = {
	Season: Season
	ListName: string
	CurrentNHLGamesPlayed: number
	SeasonStartDate: Date
	SeasonEndDate: Date
	SeasonDays: number
	SeasonLength: number
	PlayoffStartDate: Date
	PlayoffEndDate: Date
	PlayoffDays: number
	EarlySigningStartDate: Date
	EarlySigningEndDate: Date
	LateSigningStartDate: Date
	LateSigningEndDate: Date
	Positions: [string[], number[]]
	Categories: string[]
	PlayerData: string
	TeamData: string
}

export type TeamsTogglePropsType = {
	activeKey: TeamInfoType | undefined
	setter: Function
	toolbarKeys: TeamInfoType[] | null
}
export type PageToolbarPropsType = {
	activeKey: string
	setter: Function
	seasonToggleActiveKey?: string
	seasonToggleSetter?: Function
	toolbarKeys: string[]
}
export type SecondaryPageToolbarPropsType = {
	activeKey: string | null
	setter: Function
	toolbarKeys: string[]
}
export type SeasonTogglePropsType = {
	activeKey: SeasonInfoDataType
	setter: Function
	position?: string[]
}
export type LockerRoomPlayerStatPropsType = {
	teamInfo: TeamInfoType | undefined
	season: SeasonInfoDataType
	playerSeasonData: PlayerSeasonType[]
	currentRosterData: PlayerCurrentRosterType[]
	teamContracts: PlayerContractType[]
}
export type LockerRoomTeamStatPropsType = {
	teamInfo: TeamInfoType | undefined
	season: Season
	teamWeeksData: TeamWeeksType[]
	teamSeasonsData: TeamTotalsType[]
	teamContracts: PlayerContractType[]
}

// BASIC LEAGUE FORMAT TYPES
//--------------------------------------------------------------------------------------
//
//--------------------------------------------------------------------------------------
export type QueryKeyType =
	| [
			SeasonInfoDataType,
			'PlayerData',
			'Days' | 'Weeks' | 'Splits' | 'Totals' | 'NHLPlayerStats' | 'NHLGoalieStats' | 'Salaries' | 'CurrentRosters' | 'DraftHistory' | 'AllStars'
	  ]
	| [
			SeasonInfoDataType,
			'TeamData',
			'Days' | 'Weeks' | 'Seasons' | 'Standings' | 'AwardWinners' | 'DraftPicks' | 'NHLStandings' | 'Probabilities' | 'DraftOrder' | 'AwardNominees'
	  ]
	| [SeasonInfoDataType, 'MainInput', 'Users' | 'GSHLTeams' | 'Weeks' | 'Schedule' | 'Contracts' | 'Rulebook']
export type Season = 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026 | 2027
type WeekType = 'RS' | 'NC' | 'CC' | 'PO' | 'QF' | 'SF' | 'F' | 'LT'
type NHLPosition = 'C' | 'C,LW' | 'C,RW' | 'C,LW,RW' | 'LW' | 'LW,RW' | 'RW' | 'D' | 'G'
type GSHLPosition = 'C' | 'LW' | 'RW' | 'D' | 'G' | 'Util' | 'BN' | 'IR+' | 'IR'
type InjuryDesignation = 'DTD' | 'O' | 'IR' | 'IR-LT' | 'IR-NR' | 'COVID-19' | 'SUSP' | 'NA' | null
type PositionGroup = 'F' | 'D' | 'G'
