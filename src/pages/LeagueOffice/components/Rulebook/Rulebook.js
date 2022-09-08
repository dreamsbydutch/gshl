import React from 'react'
import './Rulebook.css'

function Rulebook() {
  return (
    <div className="rulebook-container">
      <div className="rulebook-subheader">Rosters</div>
      <div className="rulebook-rules"><b>1.1 - </b>Each team roster consists of 2 Centers, 2 Left Wingers, 2 Right Wingers, 3 Defensemen, 1 Utility Skater, 1 Goalie, and 4 Bench Spots.</div>
      <div className="rulebook-rules"><b>1.2 - </b>A maximum of two healthy goalies is allowed on a roster at any point in time.</div>
      <div className="rulebook-subrules">(i)   Violators of this rule will have one of their goalies dropped at random by the commissioner.</div>
      <div className="rulebook-rules"><b>1.3 - </b>Teams will have 1 IR slot and 1 IR+ slot for injured players.</div>
      <div className="rulebook-subheader">Scoring/Categories</div>
      <div className="rulebook-rules"><b>2.1 - </b>Scoring will be done by stat categories, each worth one point. There are 7 skater categories and 3 goalie categories for a total of 10 stat categories.</div>
      <div className="rulebook-subrules">(i)   The 7 skater categories are Goals, Assists, Points, Powerplay Points, Shots, Hits, and Blocks.</div>
      <div className="rulebook-subrules">(i)   The 3 goalie categories are Wins, Goals Against Average, and Save Percentage.</div>
      <div className="rulebook-rules"><b>2.2 - </b>There is an additional half-point category that will be awarded to the home team in each matchup to break any ties. This is called the "home-ice advantage".</div>
      <div className="rulebook-rules"><b>2.3 - </b>Teams must have a minimum of 2 goalie starts during each matchup. If a team does not meet this minimum, then they concede all 3 goalie cateogries.</div>
      <div className="rulebook-subheader">Waivers/Trades</div>
      <div className="rulebook-rules"><b>3.1 - </b>Any player dropped from a roster will remain on waivers for 2 days until they are processed. During this time teams can place waiver claims on the player.</div>
      <div className="rulebook-rules"><b>3.2 - </b>Waivers will be processed using Yahoo's continuous rolling list system.</div>
      <div className="rulebook-rules"><b>3.3 - </b>If a player is not claimed they will become a free agent.</div>
      <div className="rulebook-rules"><b>3.4 - </b>Trades can be made at any time and are not subject to any league or commissioner approval.</div>
      <div className="rulebook-subrules">(i)   Any trades with suspected foul play or collusion will be investigated immediately and violaters will be punished at commissioners discretion</div>
      <div className="rulebook-rules"><b>3.5 - </b>Players under contract are allowed to be traded. Their contract will travel with them to their new team in full. Salary can not be retained in any transactions.</div>
      <div className="rulebook-subrules">(i)   If a team receives a contract via trade that puts them over the salary cap they will be fined 100 lottery points and the trade will be reversed immediately</div>
      <div className="rulebook-subrules">(ii)   The team trading away a contract that leads to an illegal trade wll also be fned 50 lottery points.</div>
      <div className="rulebook-subrules">(iii)   The commissioner reserves the right to adjust to above punishments if circumstances require.</div>
      <div className="rulebook-subheader">Schedule/Tiebreakers</div>
      <div className="rulebook-rules"><b>4.1 - </b>The GSHL season will be the length of the NHL regular season minus 3 playoff weeks. (Usually 21 weeks, sometimes 22)</div>
      <div className="rulebook-rules"><b>4.2 - </b>Each team will play a home-and-home with every team in their conference for a 14 game conference schedule. The rest of the schedule will be non-conference games.</div>
      <div className="rulebook-subrules">(i)   Crossover non-conference games will rotate the home team every other year.</div>
      <div className="rulebook-subrules">(ii)   If the non-conference schedule is only 7 games, one crossover matchup will be skipped based on an 8-year rotation.</div>
      <div className="rulebook-rules"><b>4.3 - </b>If teams in the same conference are tied in the standings, the tiebreaker will be as follows. (If there are more than two teams tied, once a team is eliminated, the process restarts)</div>
      <div className="rulebook-subrules">(i)   Head-to-Head record between the teams</div>
      <div className="rulebook-subrules">(ii)   Head-to-Head Category Differential</div>
      <div className="rulebook-subrules">(iii)   Conference Record</div>
      <div className="rulebook-subrules">(iv)   Record vs 1st in conference, then 2nd in conference, etc.</div>
      <div className="rulebook-subrules">(v)   Overall Category Differential</div>
      <div className="rulebook-subrules">(vi)   Higher GM Ranking</div>
      <div className="rulebook-rules"><b>4.4 - </b>If teams in different conferences are tied in the standings, the tiebreaker will be as follows. (If there are more than two teams tied, once a team is eliminated, the process restarts)</div>
      <div className="rulebook-subrules">(i)   Head-to-Head record between the teams</div>
      <div className="rulebook-subrules">(ii)   Head-to-Head Category Differential</div>
      <div className="rulebook-subrules">(ii)   Non-Conference records</div>
      <div className="rulebook-subrules">(iii)   Overall Category Differential</div>
      <div className="rulebook-subrules">(iv)   Higher GM Ranking</div>
      <div className="rulebook-subheader">Playoffs/Payouts</div>
      <div className="rulebook-rules"><b>5.1 - </b>The top 3 teams in each conference qualify for the playoffs along with the best two remaining teams as wildcards.</div>
      <div className="rulebook-subrules">(i)   If both wildcard teams are from different conferences, there is no crossover and each conference plays 1st v 4th and 2nd v 3rd</div>
      <div className="rulebook-subrules">(ii)   If both wildcard teams are from the same conference, the #1 wildcard team will play the lower ranked conference winner and the #2 wildcard team will play the President's Trophy winner while 2nd v 3rd play in each conference.</div>
      <div className="rulebook-rules"><b>5.2 - </b>Second round playoff matchups are the Conference Championship games.</div>
      <div className="rulebook-rules"><b>5.3 - </b>The GSHL Cup Final will match up the two conference champions.</div>
      <div className="rulebook-rules"><b>5.4 - </b>When a team is eliminated from the playoffs their roster is locked immediately and there are no consolation games.</div>
      <div className="rulebook-rules"><b>5.4 - </b>The bottom 4 teams in the final GSHL standings will participate in the toilet bowl tournament. The toilet bowl tournament will determine the #1 pick in the draft.</div>
      <div className="rulebook-subrules">(i)   The toilet bowl tournament will be played throught all three playoff rounds and feature a rotisserie style scoring system.</div>
      <div className="rulebook-subrules">(ii)   At the end of the playoffs, each team wll receive points based on their finish in each category. 1st=6pts, 2nd=4pts, 3rd=2pts, 4th=1pt.</div>
      <div className="rulebook-subrules">(iii)   The team/teams with the lowest number of missed starts will receive a 2pt bonus.</div>
      <div className="rulebook-subrules">(iv)   Lineups will be set on Yahoo and the tournament will be tracked on this app.</div>
      <div className="rulebook-rules"><b>5.5 - </b>The yearly buy-in for each team is $50. Yearly Payouts are $600 for the GSHL Cup champion, $150 for the GSHL Cup runner up, and the final $50 go to admin fees (engraving).</div>
      <div className="rulebook-subheader">Draft/Draft Lottery</div>
      <div className="rulebook-rules"><b>6.1 - </b>The GSHL Draft is held within 2 weeks of the start of every NHL season.</div>
      <div className="rulebook-rules"><b>6.2 - </b>The Draft is 15 rounds long and follows a snake draft format.</div>
      <div className="rulebook-subrules">(i)   Players under contract will use up a team's draft picks starting from the bottom of the draft.</div>
      <div className="rulebook-rules"><b>6.3 - </b>The draft order will be decided by a toilet bowl tournament and a draft lottery. The lottery odds are created using a points system.</div>
      <div className="rulebook-subrules">(i)   The toilet bowl tournament will determine picks 1, 3, 4, and 9</div>
      <div className="rulebook-subrules">(ii)   The remaining picks will be determined by a lottery. Teams will be added in to the lottery at different points based on the regular season finish.</div>
      <div className="rulebook-subrules">(iii)   Teams ranked 9-12 are eligible for the 2nd overall pick lottery. First round playff losers are eligible for pick 5. Conference final losers are eligible for pick 8. GSHL final runner up is eligible for pick 11. GSHL Champion is eligible for pick 13.</div>
      <div className="rulebook-subrules">(iv)   Lottery points will be awarded based on standings, missed starts, awards, and general activity/engagement.</div>
      <div className="rulebook-subheader">Salary Cap/Salaries</div>
      <div className="rulebook-rules"><b>7.1 - </b>There is a hard salary cap of $22,500,000. This cap may not be exceeded at any time. (Salary cap will be going up to $27,500,000 following the 2023-24 season)</div>
      <div className="rulebook-rules"><b>7.2 - </b>Each player is assgned a salary ranging between $10,000,000 and $1,000,000. Salaries are released at the start of each signing period.</div>
      <div className="rulebook-rules"><b>7.3 - </b>There are two signing periods and one free agency period every year.</div>
      <div className="rulebook-subrules">(i)   The mid-season signing period will start on December 15th and stop on December 31st.</div>
      <div className="rulebook-subrules">(ii)   The post-season signing period will start at the end of the GSHL playoffs and stop at the end of the NHL playoffs.</div>
      <div className="rulebook-subrules">(iii)   The free agency period will run from the day after the Stanley Cup is awarded until the day of the GSHL draft.</div>
      <div className="rulebook-rules"><b>7.5 - </b>Once a player is signed their salary remains the same for the length of the contract.</div>
      <div className="rulebook-subheader">Contracts/Signings</div>
      <div className="rulebook-rules"><b>8.1 - </b>There is a 3-year maximum on all contracts. Contracts can only be 1, 2, or 3 years in length.</div>
      <div className="rulebook-rules"><b>8.2 - </b>To be eligible for a contract during a signing period, a player must be on the team's roster through the last regular season day and have been on that team's roster for 40% of the season or any GSHL roster for 70% of the season.</div>
      <div className="rulebook-rules"><b>8.3 - </b>Contracts can be signed at any point during a signing period by messaging the commissioner or announcing in the group.</div>
      <div className="rulebook-subrules">(i)   Your message must include the player you are signing and the number of years you are signing him for.</div>
      <div className="rulebook-subrules">(ii)   If a team attempts to sign a contract that would put them over the cap, the contract will not be allowed and the team will lose 100 draft lottery points.</div>
      <div className="rulebook-rules"><b>8.4 - </b>Contracts signed during the mid-season signing period begin at the end of the season. Contracts signed during the post-season signing period or free agency period start immediately.</div>
      <div className="rulebook-rules"><b>8.5 - </b>Contract years will rollover at the beginning of the post-season signing period.</div>
      <div className="rulebook-rules"><b>8.6 - </b>Players that are in the final year of their first contract can be resigned during the either signing period for 115% of their posted salary. These players are considered RFAs</div>
      <div className="rulebook-rules"><b>8.7 - </b>If a player under contract retires or leaves the NHL for a European pro league, their contract will be voided immediately with no penalty.</div>
      <div className="rulebook-subrules">(i)   If a player goes on LTIR for longer than half the remaining length of their contract the team will be given the opportunity to buy them out with no cap penalty.</div>
      <div className="rulebook-rules"><b>8.8 - </b>Contracts can only be terminated with a buyout. If a player under contract is dropped from their team's roster this will immediately be considered a buyout.</div>
      <div className="rulebook-subrules">(i)   Buyouts incur a cap hit of half the player's salary for the remaining length of the contract (minimum two years).</div>
      <div className="rulebook-subrules">(ii)   Players must be dropped to waivers once they are bought out. They can not remain on the team or be picked up by that them for the remainder of the buyout.</div>
      <div className="rulebook-subheader">Free Agency</div>
      <div className="rulebook-rules"><b>9.1 - </b>The moment that the Stanley Cup is awarded to its winner, every player that does not have a contract will become a free agent.</div>
      <div className="rulebook-rules"><b>9.2 - </b>Players that have finished their second consecutive contract can not be signed as a free agent and must enter the draft.</div>
      <div className="rulebook-rules"><b>9.3 - </b>At the start of free agency every player will be given a new salary equal to 125% of their posted salary.</div>
      <div className="rulebook-rules"><b>9.4 - </b>Teams can send in a free agent proposal at any time prior to the draft. Proposals will be processed on the first of every month.</div>
      <div className="rulebook-subrules">(i)   If there is only one proposal for a player, then the player will sign that contract.</div>
      <div className="rulebook-subrules">(ii)   If there is more than one proposal for a player, then there will be a lottery to determine which contract the player will sign.</div>
      <div className="rulebook-rules"><b>9.5 - </b>The free agent lottery will use the current draft lottery points of all the teams that made a proposal to determine the odds of the free agent lottery</div>
      <div className="bottom"></div>
    </div>
  )
}

export default Rulebook
