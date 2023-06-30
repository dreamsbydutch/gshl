import React, { useState } from 'react'
import { PageToolbar, SecondaryPageToolbar } from '../components/PageNavbar'
import { useQuery } from 'react-query'
import { queryFunc, usePlayerTotals, usePlayerNHLStats } from '../utils/fetchData'
import LoadingSpinner from '../components/LoadingSpinner'
import { useTeams } from '../utils/context'
import { PlayerNHLType, PlayerSalariesType, PlayerTotalsType, QueryKeyType } from '../utils/endpointTypes'
import { seasons } from '../utils/constants'

export default function LeagueOffice() {
  const [type, setType] = useState("Free Agents")

  const toolbarProps = {
    'activeKey': type,
    'setter': setType,
    'toolbarKeys': ["Free Agents", "Rulebook"]
  }

  return (
    <div className='my-4 mx-2'>
      <PageToolbar {...toolbarProps} />
      {{
        // 'Awards': <Awards />,
        // 'FreeAgency': <FreeAgency />,
        'Rulebook': <Rulebook />,
        // 'HallofFame': <HallofFame />,
        // 'TradeMarket': <TradeMarket />
        'Free Agents': <FreeAgents />
      }[type]}
    </div>
  )
}




function Rulebook() {
  const rulebook = [
    ['Rosters',
      ['Each roster consists of 2 Centers, 2 Left Wingers, 2 Right Wingers, 3 Defensemen, 1 Utility Skater, 1 Goalie, and 4 Bench Spots',
        ['A maximum of two healthy goalies is allowed on a roster at any point in time',
          ['Violators of this rule will have one of their goalies dropped at random by the commissioner'],
        ],
        'Teams have 1 IR slot and 1 IR+ slot for injury relief',
      ],
    ],
    ['Scoring/Categories',
      [
        ['Scoring is done by stat categories, each worth one point. There are 7 skater categories and 3 goalie categories for a total of 10 stat categories',
          ['The 7 skater categories are Goals, Assists, Points, Powerplay Points, Shots, Hits, and Blocks',
            'The 3 goalie categories will be Wins, Goals Against Average, and Save Percentage'],
        ],
        'An additional half-point is awarded to the home team in every matchup. This is called the "home-ice advantage" and is a tiebreaker for all matchups',
        'Teams must have a minimum of 2 goalie starts during a matchup. If a team does not meet this minimum, then they will concede all 3 goalie categories',
      ],
    ],
    ['Waivers/Trades',
      [
        'Any player dropped from a roster will remain on waivers for 2 days until they are processed. During this time teams can place waiver claims on the player',
        'Waivers will be processed using Yahoo\'s continuous rolling list system',
        'If a player is not claimed they will become a free agent',
        'Trades can be made at anytime except for the final 2.5 weeks of the season and the playoffs and ',
        'Trades are not subject to any league or commissioner approval and are processed immediately',
        'Any trades with suspected foul play or collusion will be investigated immediately and violaters will be punished at commissioners discretion',
        ['Players under contract are allowed to be traded. Their contract will travel with them to their new team fully intact',
          ['If a team trades for a contract that violates the salary cap, they will be penalized 100 lottery points',
            'If a team trades away a contract that violates the salary cap, they will also be penalized 50 lottery points (Both teams are responsible for communicating contract status)'],
        ],
      ],
    ],
    ['Schedule/Tiebreakers',
      [
        'The GSHL season will be the length of the NHL regular season minus 3 playoff weeks. 21 or 22 weeks depending on the year.',
        'Each team plays a home-and-home with every team in their conference for a 14 game conference schedule',
        'The rest of the schedule is made up of non-conference games that rotate home and away yearly',
        'Tiebreakers are now done using a 3 point system, Win = 3 pts, Home-ice win = 2 pts, Home-ice loss = 1 pt, Loss = 0 pts',
        [
          'Tiebreakers are decided in the following order',
          ['Total Points',
            'Head-to-Head Points',
            'Head-to-Head Category Differential',
            'Overall Category Differential',
            'Conference Points',
            'Conference Category Differential',
            'Coin Flip'
          ],
        ],
      ],
    ],
    ['Playoffs/Payouts',
      [
        ['The top 3 teams in each conference qualify for the playoffs along with the best two remaining teams as wildcards',
          ['If the two wildcard teams are from different conferences then each conference will play 1 v 4 and 2 v 3',
            'If the two wildcard teams are from the same conference then the first wildcard will play the President\'s Trophy winner and the second wildcard will play the other 1 seed']
        ],
        'Second round playoff matchups will be considered Conference Championship games',
        'The GSHL Cup Final will match up the two conference champions',
        'When a team is eliminated from the playoffs their roster is locked immediately and there are no consolation games',
        'The yearly buy-in for each team is $50. Yearly Payouts are $600 for the GSHL Cup champion, $150 for the GSHL Cup runner up, and the final $50 go to admin fees (engraving, etc.)'
      ],
    ],
    ['Draft',
      [
        'The GSHL Draft will be held on the last Friday night prior to the start of the NHL regular season',
        'The GSHL Draft is 15 rounds long and follows a snake draft format',
        'Players under contract at the start of the draft will be slotted in to a teams draft class from their 15th pick and up',
      ],
    ],
    ['Draft Lottery/Loser\'s Tournament',
      [
        'The draft order is decided by a combination of a loser\'s tournament and a draft points system',
        [
          'The Loser\'s Tournament includes the bottom 4 teams in the standings at the end of the regular season',
          [
            'Four teams will platy a 3-week round robin during the three playoff weeks',
            'Rosters will be frozen on the final day of the regular season and lineups wll be auto set',
            '1st Place earns the #1 Pick in the draft, 2nd place gets the 3rd Pick, 3rd place gets the 5th pick, and the loser gets the Adam Brophy Trophy and the 8th pick'
          ],
        ],
        [
          'Draft points are given out using the following system',
          [
            'Each team gets a base number of ponts based on their regular season finish',
            'Teams lose 2 points for every missed start throughout the season',
            'First round losers receive 150 points each',
            'Conference final losers receive 100 points each',
            'GSHL final loser receives 50 points',
            'First Team All-GSHL players earn 15 points each for their team',
            'Second Team All-GSHL players earn 5 points each for their team',
            'Playoff All-GSHL players earn 10 points each for their team',
            'Counting Stat Awards earn a team 20 points',
            'Performance Awards earn a team 30 points',
            'Nominated Awards earn a team 50 points',
            'The Commissioner has the ability to award a positive or negative draft point adjustment to each owner'
          ],
        ],
        'The lottery for the second and fourth picks will include the 9th to 12th teams in the standings',
        'Teams that lost in the first round of the playoffs will be added for the sixth and seventh pick lotteries',
        'Teams that lost in the conference finals will be added for the ninth and tenth pick lotteries',
        'Teams that lost in the conference finals will be added for the eleventh and twelvth pick lotteries',
        'All remaining teams will be involved in the lotteries for picks 13 through 16',
      ],
    ],
    ['Salary Cap System',
      [
        'The Salary Cap only applies to your players under contract each year or \'keepers\'. ',
        'The Salary Cap has a hard limit of $22,500,000, this limit will increase to $27,500,000 next season',
        'There is a 3-year maximum on all contracts. Contract can be 1, 2, or 3 years long',
        'Teams can sign as many contracts as they want as long as they do not exceed the Salary Cap',
        'There is no retention, proration, or exceptions allowed with salaries or the salary cap',
        ['Buyouts are when a player under contract is dropped by the team. That players salary is cut in half for the same number of years',
          ['A player bought out during the final year of their contract will carry a 50% cap hit for the following year. You must keep contract players until the very end of their final year'],
        ],
        'Every player to play in the NHL in the past 2 years is assigned a salary between $10,000,000 and $1,000,000 at the start of each signing period',
        'A players salary will not change for the length of the contract',
        ['There will be two signing periods every year and a summer free agency period',
          ['The early signing period will start on December 15th and finish at the end of the calendar year',
            'The late signing period will start at the end of the NHL regular season and finish at the end of the NHL playoffs. (GSHL Cup to Stanley Cup)',
            'The free agency period will start when the Stanley Cup is awarded and finish when the GSHL Draft starts']
        ],
        'Contracts turn over at the end of the NHL regular season',
        ['Contracts can be signed at any point during a signing period',
          ['To sign a contract you can just text Dutch with the player name and number of years',
            'Or you can put a little effort in and announce it yourself. ChatGPT now makes this very simple'],
        ],
        'Players can only play under 2 consecutive contracts. Players coming off of their second consecutive contract must go back in to the draft pool',
        'Players coming off of their first contract are considered RFAs and can be signed by their team during the early or late signing period for 115% of their updated salary',
        'Players are only eligible to be signed to a contract if they have been on a GSHL roster for over 2/3 of the season or on that GSHL roster for over 1/3 of the season',
        'At the end of the late signing period, every player that is not under contract becomes a UFA',
        'UFAs can be signed by any team for a 125% premium through a lottery process',
        'UFA contract offers can be submitted at any time. UFA signings are processed on the 1st of each month throughout the summer',
        'If multiple teams have bid on a player, they will decide based on the results of a lottery using each team\'s draft lottery points multiplied by the length of the contract bid. Players will favour longer term deals when signing a UFA contract.',
        'UFA bids can be placed privately or publicly by an owner'
      ],
    ],
    ['Awards',
      [
        // ['Counting Stat Awards',
        //   [],
        // ],
      ],
    ],
  ]
  return (
    <div className='pt-4 w-5/6 m-auto'>
      <div className='font-extrabold text-4xl pt-2 pb-4 text-center'>Rulebook</div>
      {rulebook.map((section, i) => {
        return (
          <>
            <div className='text-center font-extrabold text-2xl py-3'>{section[0]}</div>
            {section[1].map((rule, j) => {
              if (typeof rule === 'string') { return <div key={i + '.' + j} className='py-2 text-base text-center'><span className='font-bold pr-3'>{`${i + 1}.${j + 1}`}</span>{rule}</div> }
              return (
                <div key={i + '.' + j} className='py-2'>
                  <div className='text-base text-center'><span className='font-bold pr-3'>{`${i + 1}.${j + 1}`}</span>{rule[0]}</div>
                  <div className='pt-1'>
                    {rule[1].map((subrule, k) => {
                      return (
                        <div className='text-sm text-center py-1'><span className='text-xs font-bold pr-2'>{`${i + 1}.${j + 1}.${k + 1}`}</span>{subrule}</div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </>
        )
      })}
    </div>
  )
}



function FreeAgents() {
  const [positionGroupFilter, setPositionGroupFilter] = useState<'F' | 'D' | 'G' | null>(null)
  const queryKey: QueryKeyType = [seasons[0].Season, 'PlayerData', 'Salaries']
  const { data, status } = useQuery(queryKey, queryFunc)
  if (status === "error") { return <div>Salary Fetch Error</div> }
  if (status !== "success") { return <LoadingSpinner /> }

  let salaryData: PlayerSalariesType[] = data
  return (
    <>
      <SecondaryPageToolbar {...{'activeKey':positionGroupFilter,'setter':setPositionGroupFilter,'toolbarKeys':['F','D','G']}} />
      <div key="header" className="grid grid-flow-row grid-cols-10 text-center max-w-xl mx-auto font-bold mb-2">
        <div className="col-span-5 text-sm font-varela place-self-center">Player Name</div>
        <div className="col-span-1 text-xs font-varela place-self-center">Pos</div>
        <div className="col-span-1 text-xs font-varela place-self-center">Age</div>
        <div className="col-span-3 text-sm font-varela place-self-center">Salary</div>
      </div>
      {positionGroupFilter ?
      salaryData.filter(obj => obj.CurrentSalary && obj.PosGroup === positionGroupFilter).map(obj => <PlayerCard player={obj} />)
      :
      salaryData.filter(obj => obj.CurrentSalary).map(obj => <PlayerCard player={obj} />)}
    </>
  )
}
function PlayerCard({ player }: { player: PlayerSalariesType }) {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="border-b border-dashed border-gray-200 max-w-xl mx-auto" onClick={() => setShowInfo(!showInfo)}>
      <div className='grid grid-flow-row grid-cols-10 text-center py-1 text-gray-800'>
        <div className="font-varela place-self-center text-sm col-span-5">{player.PlayerName}</div>
        <div className="font-varela place-self-center text-xs col-span-1">{player.PosGroup}</div>
        <div className="font-varela place-self-center text-xs col-span-1">{player.Age}</div>
        <div className="font-varela place-self-center text-sm col-span-3">{player.CurrentSalary}</div>
      </div>
      {showInfo && <PlayerCardStats player={{ 'PlayerName': player.PlayerName, 'PosGroup': player.PosGroup }} />}
    </div>
  )
}
function PlayerCardStats({ player }: { player: { PlayerName: string, PosGroup: 'F' | 'D' | 'G' } }) {
  const teamData = useTeams()
  const statsObj = {
    'GSHL': usePlayerTotals({ 'PlayerName': player.PlayerName, 'PosGroup': player.PosGroup }),
    'NHL': usePlayerNHLStats({ 'PlayerName': player.PlayerName, 'PosGroup': player.PosGroup }),
  }

  const SkaterHeader = ({ type }: { type: 'NHL' | 'GSHL' }) => {
    return (
      <div key={'head'} className='mx-auto grid grid-cols-skaterStatTable mb-1'>
        <div className='font-varela font-bold text-2xs text-center place-self-center'>Season</div>
        <div className='font-varela font-bold text-2xs text-center place-self-center'>{type === "NHL" ? 'Age' : 'Team'}</div>
        <div className='font-varela font-bold text-2xs text-center place-self-center'>{type === "NHL" ? 'Team' : 'Days'}</div>
        <div className='font-varela font-bold text-2xs text-center place-self-center'>GS</div>
        <div className='font-varela font-bold text-2xs text-center place-self-center'>G</div>
        <div className='font-varela font-bold text-2xs text-center place-self-center'>A</div>
        <div className='font-varela font-bold text-2xs text-center place-self-center'>P</div>
        <div className='font-varela font-bold text-2xs text-center place-self-center'>PPP</div>
        <div className='font-varela font-bold text-2xs text-center place-self-center'>SOG</div>
        <div className='font-varela font-bold text-2xs text-center place-self-center'>HIT</div>
        <div className='font-varela font-bold text-2xs text-center place-self-center'>BLK</div>
        <div className='font-varela font-bold text-2xs text-center place-self-center'>RTG</div>
      </div>
    )
  }
  const SkaterNHLStats = ({ statItem }: { statItem: PlayerNHLType }) => {
    let gshlTotalsTeams = statsObj.GSHL.filter(a => a && a.Season === statItem.Season)[0]
    let teams = statItem.nhlTeam === "TOT" && gshlTotalsTeams ? gshlTotalsTeams.nhlTeam || [statItem.nhlTeam] : [statItem.nhlTeam]
    return (
      <div className='mx-auto grid grid-cols-skaterStatTable py-1 border-t border-dotted border-gray-500' key={statItem.PlayerName + statItem.PosGroup + statItem.Season}>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.Season}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.Age}</div>
        <div className="font-varela text-2xs text-center place-self-center">{teams.map(x => <img key={x} src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${x}.png`} alt="NHL Team Logo" className='h-4 w-4 mx-auto inline-block' />)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.GS && Math.round(statItem.GS)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.G && Math.round(statItem.G)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.A && Math.round(statItem.A)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.P && Math.round(statItem.P)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.PPP && Math.round(statItem.PPP)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.SOG && Math.round(statItem.SOG)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.HIT && Math.round(statItem.HIT)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.BLK && Math.round(statItem.BLK)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{Math.round(+statItem.Rating * 100) / 100}</div>
      </div>
    )
  }
  const SkaterGSHLStats = ({ statItem }: { statItem: PlayerTotalsType }) => {
    return (
      <div className='mx-auto grid grid-cols-skaterStatTable py-1 border-t border-dotted border-gray-500' key={statItem.PlayerName + statItem.PosGroup + statItem.Season}>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.Season}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.gshlTeam.map(x => <img src={teamData?.filter(a => a[statItem.Season] === x)[0].LogoURL} alt="GSHL Team Logo" className='h-4 w-4 mx-auto inline-block' />)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.RosterDays}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.GS && Math.round(statItem.GS)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.G && Math.round(statItem.G)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.A && Math.round(statItem.A)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.P && Math.round(statItem.P)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.PPP && Math.round(statItem.PPP)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.SOG && Math.round(statItem.SOG)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.HIT && Math.round(statItem.HIT)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.BLK && Math.round(statItem.BLK)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{Math.round(statItem.Rating * 100) / 100}</div>
      </div>
    )
  }
  const GoalieHeader = ({ type }: { type: 'NHL' | 'GSHL' }) => {
    return (
      <div key={'head'} className='mx-auto grid grid-cols-goalieStatTable'>
        <div className='font-varela font-bold text-xs text-center place-self-center'>Season</div>
        <div className='font-varela font-bold text-xs text-center place-self-center'>{type === "NHL" ? 'Age' : 'Team'}</div>
        <div className='font-varela font-bold text-xs text-center place-self-center'>{type === "NHL" ? 'Team' : 'Days'}</div>
        <div className='font-varela font-bold text-xs text-center place-self-center'>GS</div>
        <div className='font-varela font-bold text-xs text-center place-self-center'>W</div>
        <div className='font-varela font-bold text-xs text-center place-self-center'>GAA</div>
        <div className='font-varela font-bold text-xs text-center place-self-center'>SV%</div>
        <div className='font-varela font-bold text-xs text-center place-self-center'>RTG</div>
      </div>
    )
  }
  const GoalieNHLStats = ({ statItem }: { statItem: PlayerNHLType }) => {
    let gshlTotalsTeams = statsObj.GSHL.filter(a => a && a.Season === statItem.Season)[0]
    let teams = statItem.nhlTeam === "TOT" && gshlTotalsTeams ? gshlTotalsTeams.nhlTeam || [statItem.nhlTeam] : [statItem.nhlTeam]
    return (
      <div className='mx-auto grid grid-cols-goalieStatTable py-1 border-t border-dotted border-gray-500' key={statItem.PlayerName + statItem.PosGroup + statItem.Season}>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.Season}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.Age}</div>
        <div className="font-varela text-2xs text-center place-self-center">{teams.map(x => <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${x}.png`} alt="NHL Team Logo" className='h-4 w-4 mx-auto inline-block' />)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.GS && Math.round(statItem.GS)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.W && Math.round(statItem.W)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.GAA && Math.round(statItem.GAA * 100) / 100}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.SVP && Math.round(statItem.SVP * 1000) / 1000}</div>
        <div className="font-varela text-2xs text-center place-self-center">{Math.round(+statItem.Rating * 100) / 100}</div>
      </div>
    )
  }
  const GoalieGSHLStats = ({ statItem }: { statItem: PlayerTotalsType }) => {
    return (
      <div className='mx-auto grid grid-cols-goalieStatTable py-1 border-t border-dotted border-gray-500' key={statItem.PlayerName + statItem.PosGroup + statItem.Season}>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.Season}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.gshlTeam.map(x => <img src={teamData?.filter(a => a[statItem.Season] === x)[0].LogoURL} alt="GSHL Team Logo" className='h-4 w-4 mx-auto inline-block' />)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.RosterDays}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.GS && Math.round(statItem.GS)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.W && Math.round(statItem.W)}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.GAA && Math.round(statItem.GAA * 100) / 100}</div>
        <div className="font-varela text-2xs text-center place-self-center">{statItem.SVP && Math.round(statItem.SVP * 1000) / 1000}</div>
        <div className="font-varela text-2xs text-center place-self-center">{Math.round(statItem.Rating * 100) / 100}</div>
      </div>
    )
  }
  return (
    <div className='w-11/12 mx-auto mb-6'>
      <div className="text-center font-bold mt-2">NHL Stats</div>
      <div className="mx-auto overflow-x-scroll no-scrollbar">
        {player.PosGroup === "G" ? <GoalieHeader type={'NHL'} /> : <SkaterHeader type={'NHL'} />}
        {statsObj.NHL.map(obj => obj ? player.PosGroup === "G" ? <GoalieNHLStats statItem={obj} /> : <SkaterNHLStats statItem={obj} /> : <LoadingSpinner />)}
      </div>
      <div className="text-center font-bold mt-2">GSHL Stats</div>
      <div className="mx-auto overflow-x-scroll no-scrollbar">
        {player.PosGroup === "G" ? <GoalieHeader type={'GSHL'} /> : <SkaterHeader type={'GSHL'} />}
        {statsObj.GSHL.map(obj => obj ? player.PosGroup === "G" ? <GoalieGSHLStats statItem={obj} /> : <SkaterGSHLStats statItem={obj} /> : <></>)}
      </div>
    </div>
  )
}
