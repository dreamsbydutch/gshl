import React, { useState } from 'react'
import { LeagueOfficeToggle } from '../components/PageNavbar'
import { useQuery } from 'react-query'
import { queryFunc } from '../utils/fetchData'
import LoadingSpinner from '../components/LoadingSpinner'
import { useTeams } from '../utils/context'

export default function LeagueOffice() {
  const [type, setType] = useState("FreeAgents")
  // const type = "Rulebook"

  return (
    <div className='my-4 mx-2'>
      <LeagueOfficeToggle setter={setType} activeKey={type} />
      {{
        // 'Awards': <Awards />,
        // 'FreeAgency': <FreeAgency />,
        'Rulebook': <Rulebook />,
        // 'HallofFame': <HallofFame />,
        // 'TradeMarket': <TradeMarket />
        'FreeAgents': <FreeAgents />
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
        'At the end of the late signing period every player not under contract becomes a UFA and can be signed by any team for 125% of their posted salary',
        'To bid on a UFA durng the summer you must send in a player name and nubmer of years to Dutch. Bids are processed on the 1st of each month throughout the summer',
        'If multiple teams have bid on the same player when it comes ime to process the player will decide which contract they sign based on a lottery using each team\'s draft lottery points multiplied by the length of the contract bid. Players will favour longer term deals when signing a UFA contract.'
      ],
    ],
    ['Awards',
      [
        ['Counting Stat Awards',
          [],
        ],
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
              if (typeof rule === 'string') { return <div className='py-2 text-base text-center'><span className='font-bold pr-3'>{`${i + 1}.${j + 1}`}</span>{rule}</div> }
              return (
                <div className='py-2'>
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
  const salaryData = useQuery(['2023PlayerData', 'Salaries'], queryFunc)

  if (!salaryData.data) { return <LoadingSpinner /> }
  return (
    <table className="mx-auto">
      <thead>
        <tr className="text-center">
          <th className="px-2">Player Name</th>
          <th className="px-2">Pos</th>
          <th className="px-2">Age</th>
          <th className="px-2">Salary</th>
        </tr>
      </thead>
      <tbody>
        {salaryData.data.filter(obj => obj.currentSalary).map(obj => <PlayerCard player={obj} />)}
      </tbody>
    </table>
  )
}

function PlayerCard({ player }) {
  const [showInfo, setShowInfo] = useState(false)
  return (
    <>
      <tr className="border-t border-dashed border-gray-200 text-center" onClick={() => setShowInfo(!showInfo)}>
        <td className="px-1">{player.playerName}</td>
        <td className="px-1">{player.pos}</td>
        <td className="px-1">{player.age}</td>
        <td className="px-1">{player.currentSalary}</td>
      </tr>
      <tr>
        <td colSpan='4' className={showInfo && 'pb-4'}>
          {
            showInfo &&
            (player.pos === "G" ?
              <GoalieCardStats player={player} /> :
              <PlayerCardStats player={player} />)
          }
        </td>
      </tr>
    </>
  )
}

function PlayerCardStats({ player }) {
  const teamData = useTeams()
  const playerGSHLStats23 = useQuery(['2023PlayerData', 'Totals'], queryFunc)
  const playerGSHLStats22 = useQuery(['2022PlayerData', 'Totals'], queryFunc)
  const playerGSHLStats21 = useQuery(['2021PlayerData', 'Totals'], queryFunc)
  const playerGSHLStats20 = useQuery(['2020PlayerData', 'Totals'], queryFunc)
  const gshlData = [
    playerGSHLStats23.data?.filter(obj => obj.PlayerName === player.playerName && obj.posGroup === player.pos && obj.WeekType === "RS")[0],
    playerGSHLStats22.data?.filter(obj => obj.PlayerName === player.playerName && obj.posGroup === player.pos && obj.WeekType === "RS")[0],
    playerGSHLStats21.data?.filter(obj => obj.PlayerName === player.playerName && obj.posGroup === player.pos && obj.WeekType === "RS")[0],
    playerGSHLStats20.data?.filter(obj => obj.PlayerName === player.playerName && obj.posGroup === player.pos && obj.WeekType === "RS")[0],
  ]
  const playerNHLStats23 = useQuery(['2023PlayerData', 'NHLPlayerStats'], queryFunc)
  const playerNHLStats22 = useQuery(['2022PlayerData', 'NHLPlayerStats'], queryFunc)
  const playerNHLStats21 = useQuery(['2021PlayerData', 'NHLPlayerStats'], queryFunc)
  const playerNHLStats20 = useQuery(['2020PlayerData', 'NHLPlayerStats'], queryFunc)
  const nhlData = [
    playerNHLStats23.data?.filter(obj => obj.Player === player.playerName && obj.Pos === player.pos)[0],
    playerNHLStats22.data?.filter(obj => obj.Player === player.playerName && obj.Pos === player.pos)[0],
    playerNHLStats21.data?.filter(obj => obj.Player === player.playerName && obj.Pos === player.pos)[0],
    playerNHLStats20.data?.filter(obj => obj.Player === player.playerName && obj.Pos === player.pos)[0],
  ]
  if (!nhlData || !gshlData || !teamData) { return <LoadingSpinner /> }
  return (
    <>
      {nhlData.filter(obj => obj && +obj.Season > 0).length > 0 &&
        <>
          <div className="text-center font-bold mt-2">NHL Stats</div>
          <table className="text-center mx-auto">
            <thead>
              <tr className='text-2xs'>
                <th className='px-1.5'>Season</th>
                <th className='px-1.5'>Age</th>
                <th className='px-1.5'>Team</th>
                <th className='px-1.5'>GS</th>
                <th className='px-1.5'>G</th>
                <th className='px-1.5'>A</th>
                <th className='px-1.5'>P</th>
                <th className='px-1.5'>PPP</th>
                <th className='px-1.5'>SOG</th>
                <th className='px-1.5'>HIT</th>
                <th className='px-1.5'>BLK</th>
                <th className='px-1.5'>RTG</th>
              </tr>
            </thead>
            <tbody>
              {nhlData.map(obj => {
                if (!obj) { return <></> }
                return (
                  <tr className='text-xs'>
                    <td className="">{obj.Season}</td>
                    <td className="">{obj.Age}</td>
                    <td className=""><img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${obj.Tm.split(",").slice(-1)}.png`} alt="NHL Team Logo" className='h-4 w-4 mx-auto' /></td>
                    <td className="">{obj.GS}</td>
                    <td className="">{obj.G}</td>
                    <td className="">{obj.A}</td>
                    <td className="">{obj.P}</td>
                    <td className="">{obj.PPP}</td>
                    <td className="">{obj.SOG}</td>
                    <td className="">{obj.HIT}</td>
                    <td className="">{obj.BLK}</td>
                    <td className="">{Math.round(obj.RTG * 100) / 100}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      }
      {gshlData.filter(obj => obj && +obj.Season > 0).length > 0 &&
        <>
          <div className="text-center font-bold mt-2">GSHL Stats</div>
          <table className="text-center mx-auto">
            <thead>
              <tr className='text-2xs'>
                <th className='px-1.5'>Season</th>
                <th className='px-1.5'>Team</th>
                <th className='px-1.5'>Days</th>
                <th className='px-1.5'>GS</th>
                <th className='px-1.5'>G</th>
                <th className='px-1.5'>A</th>
                <th className='px-1.5'>P</th>
                <th className='px-1.5'>PPP</th>
                <th className='px-1.5'>SOG</th>
                <th className='px-1.5'>HIT</th>
                <th className='px-1.5'>BLK</th>
                <th className='px-1.5'>RTG</th>
              </tr>
            </thead>
            <tbody>
              {gshlData.map(obj => {
                if (!obj) { return <></> }
                const team = teamData.filter(a => a.id === obj.gshlTeam?.split(",").slice(-1)[0])[0]
                if (!obj || !team) { return <></> }
                return (
                  <tr className='text-xs'>
                    <td className="">{obj.Season}</td>
                    <td className=""><img src={team.LogoURL} alt="NHL Team Logo" className='h-4 w-4 mx-auto' /></td>
                    <td className="">{obj.RosterDays}</td>
                    <td className="">{obj.GS}</td>
                    <td className="">{obj.G}</td>
                    <td className="">{obj.A}</td>
                    <td className="">{obj.P}</td>
                    <td className="">{obj.PPP}</td>
                    <td className="">{obj.SOG}</td>
                    <td className="">{obj.HIT}</td>
                    <td className="">{obj.BLK}</td>
                    <td className="">{Math.round(obj.Rating * 100) / 100}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      }
    </>
  )

}

function GoalieCardStats({ player }) {
  const teamData = useTeams()
  const goalieGSHLStats23 = useQuery(['2023PlayerData', 'Totals'], queryFunc)
  const goalieGSHLStats22 = useQuery(['2022PlayerData', 'Totals'], queryFunc)
  const goalieGSHLStats21 = useQuery(['2021PlayerData', 'Totals'], queryFunc)
  const goalieGSHLStats20 = useQuery(['2020PlayerData', 'Totals'], queryFunc)
  const gshlData = [
    goalieGSHLStats23.data?.filter(obj => obj.PlayerName === player.playerName && obj.posGroup === player.pos && obj.WeekType === "RS")[0],
    goalieGSHLStats22.data?.filter(obj => obj.PlayerName === player.playerName && obj.posGroup === player.pos && obj.WeekType === "RS")[0],
    goalieGSHLStats21.data?.filter(obj => obj.PlayerName === player.playerName && obj.posGroup === player.pos && obj.WeekType === "RS")[0],
    goalieGSHLStats20.data?.filter(obj => obj.PlayerName === player.playerName && obj.posGroup === player.pos && obj.WeekType === "RS")[0],
  ]
  const goalieNHLStats23 = useQuery(['2023PlayerData', 'NHLGoalieStats'], queryFunc)
  const goalieNHLStats22 = useQuery(['2022PlayerData', 'NHLGoalieStats'], queryFunc)
  const goalieNHLStats21 = useQuery(['2021PlayerData', 'NHLGoalieStats'], queryFunc)
  const goalieNHLStats20 = useQuery(['2020PlayerData', 'NHLGoalieStats'], queryFunc)
  const nhlData = [
    goalieNHLStats23.data?.filter(obj => obj.Player === player.playerName)[0],
    goalieNHLStats22.data?.filter(obj => obj.Player === player.playerName)[0],
    goalieNHLStats21.data?.filter(obj => obj.Player === player.playerName)[0],
    goalieNHLStats20.data?.filter(obj => obj.Player === player.playerName)[0],
  ]
  if (!nhlData || !gshlData || !teamData) { return <LoadingSpinner /> }
  return (
    <>
      {nhlData.filter(obj => obj && +obj.Season > 0).length > 0 &&
        <>
          <div className="text-center font-bold mt-2">NHL Stats</div>
          <table className="text-center mx-auto">
            <thead>
              <tr className='text-2xs'>
                <th className='px-2'>Season</th>
                <th className='px-2'>Age</th>
                <th className='px-2'>Team</th>
                <th className='px-2'>GS</th>
                <th className='px-2'>W</th>
                <th className='px-2'>GAA</th>
                <th className='px-2'>SV%</th>
                <th className='px-2'>RTG</th>
              </tr>
            </thead>
            <tbody>
              {nhlData.map(obj => {
                if (!obj) { return <></> }
                return (
                  <tr className='text-xs'>
                    <td className="">{obj.Season}</td>
                    <td className="">{obj.Age}</td>
                    <td className=""><img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${obj.Tm.split(",").slice(-1)}.png`} alt="NHL Team Logo" className='h-4 w-4 mx-auto' /></td>
                    <td className="">{Math.round(obj.GS)}</td>
                    <td className="">{Math.round(obj.W)}</td>
                    <td className="">{Math.round(obj.GAA * 100) / 100}</td>
                    <td className="">{Math.round(obj.SVP * 1000) / 1000}</td>
                    <td className="">{Math.round(obj.RTG * 100) / 100}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      }
      {gshlData.filter(obj => obj && +obj.Season > 0).length > 0 &&
        <>
          <div className="text-center font-bold mt-2">GSHL Stats</div>
          <table className="text-center mx-auto">
            <thead>
              <tr className='text-2xs'>
                <th className='px-2'>Season</th>
                <th className='px-2'>Team</th>
                <th className='px-2'>Days</th>
                <th className='px-2'>GS</th>
                <th className='px-2'>W</th>
                <th className='px-2'>GAA</th>
                <th className='px-2'>SV%</th>
                <th className='px-2'>RTG</th>
              </tr>
            </thead>
            <tbody>
              {gshlData.map(obj => {
                if (!obj) { return <></> }
                const team = teamData.filter(a => a.id === obj.gshlTeam?.split(",").slice(-1)[0])[0]
                if (!obj || !team) { return <></> }
                return (
                  <tr className='text-xs'>
                    <td className="">{obj.Season}</td>
                    <td className=""><img src={team.LogoURL} alt="NHL Team Logo" className='h-4 w-4 mx-auto' /></td>
                    <td className="">{Math.round(obj.RosterDays)}</td>
                    <td className="">{Math.round(obj.GS)}</td>
                    <td className="">{Math.round(obj.W)}</td>
                    <td className="">{Math.round(obj.GAA * 100) / 100}</td>
                    <td className="">{Math.round(obj.SVP * 1000) / 1000}</td>
                    <td className="">{Math.round(obj.Rating * 100) / 100}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      }
    </>
  )

}