import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { useMatchupByID, usePlayerSeasonTotals, useSchedule, usePlayerDays } from '../utils/fetchData'

export default function MatchupPage(props) {
  const { id } = useParams()
  const matchupData = useMatchupByID(id)
  if (!matchupData.data) { return <LoadingSpinner /> }


  return (
    <>
      <MatchupScroller matchupData={matchupData.data} currentWeek={props.currentWeek} />
      <MatchupHeader matchupData={matchupData.data} />
      <MatchupStats matchupData={matchupData.data} />
      <PlayingToday matchupData={matchupData.data} />
      {matchupData.data.HomeWL === '' && matchupData.data.AwayWL === '' ?
        <WatchList matchupData={matchupData.data} />
        :
        <ThreeStars matchupData={matchupData.data} />
      }
      <MatchupBoxscore matchupData={matchupData.data} />
    </>
  )
}

function MatchupHeader(props) {
  return (
    <div className="flex flex-row justify-center items-center gap-4 mt-8">
      <div className="flex flex-row justify-center items-center gap-2 w-20">
        <img src={props.matchupData.AwayTeamInfo.LogoURL} alt={props.matchupData.AwayTeamInfo.TeamName + "Logo"} />
        <div className={`text-4xl ${props.matchupData.AwayWL === "W" ? 'font-bold text-emerald-800' : props.matchupData.AwayWL === "L" ? 'text-rose-800' : ''}`}>
          {props.matchupData.AwayScore}
        </div>
      </div>
      <div className="symbol">@</div>
      <div className="flex flex-row justify-center items-center gap-2 w-20">
        <div className={`text-4xl ${props.matchupData.HomeWL === "W" ? 'font-bold text-emerald-800' : props.matchupData.HomeWL === "L" ? 'text-rose-800' : ''}`}>
          {props.matchupData.HomeScore}
        </div>
        <img src={props.matchupData.HomeTeamInfo.LogoURL} alt={props.matchupData.HomeTeamInfo.TeamName + "Logo"} />
      </div>
    </div>
  )
}


function MatchupStats(props) {
  return (
    <div className="my-6 font-varela">
      {['G', 'A', 'P', 'PPP', 'SOG', 'HIT', 'BLK', 'W', 'GAA', 'SVP'].map((obj, i) => {
        var home = props?.matchupData?.HomeTeamStats[obj]
        var away = props?.matchupData?.AwayTeamStats[obj]
        return (
          <div className="w-4/6 mx-auto grid gap-2 grid-cols-5 p-0.5 text-sm text-center border-b border-gray-400 border-dotted" key={i}>
            <div className={`col-span-2 ${(away !== "") ? (home === "" || +away > +home) ? 'text-emerald-800 font-bold' : (+away < +home) ? 'text-rose-800' : "" : ""}`}>{away}</div>
            <div className="text-xs font-bold">{obj === 'SVP' ? 'SV%' : obj}</div>
            <div className={`col-span-2 ${(home !== "") ? (away === "" || +home > +away) ? 'text-emerald-800 font-bold' : (+home < +away) ? 'text-rose-800' : "" : ""}`}>{home}</div>
          </div>
        )
      })}
    </div>
  )
}

function ThreeStars(props) {
  let firstStar = [...props.matchupData.HomeTeamPlayers, ...props.matchupData.AwayTeamPlayers].filter(obj => obj.id === props.matchupData.FirstStar)[0]
  let secondStar = [...props.matchupData.HomeTeamPlayers, ...props.matchupData.AwayTeamPlayers].filter(obj => obj.id === props.matchupData.SecondStar)[0]
  let thirdStar = [...props.matchupData.HomeTeamPlayers, ...props.matchupData.AwayTeamPlayers].filter(obj => obj.id === props.matchupData.ThirdStar)[0]
  return (
    <div>
      <div className="mt-8 text-lg text-center font-bold">Three Stars</div>
      {props.matchupData.FirstStar &&
        <div className="w-11/12 mt-2 mx-auto flex flex-col p-1 gap-4 items-center font-varela">
          <div className="grid grid-cols-7 m-auto w-11/12 text-center">
            <div className="text-3xl text-yellow-300 m-auto">
              {'\u2605'}
            </div>
            <img
              className='my-auto'
              src={props.matchupData.AwayTeam === firstStar.gshlTeam ? props.matchupData.AwayTeamInfo.LogoURL : props.matchupData.HomeTeamInfo.LogoURL}
              alt='First Star Team Logo'
            />
            <div className="text-lg font-normal col-span-5 m-auto items-center inline-block">
              {firstStar.PlayerName}, {firstStar.nhlPos}
              <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${firstStar.nhlTeam}.png`} alt="" className='inline-block h-5 w-5 mx-1.5' />
              {firstStar.nhlPos === 'G' ?
                <div className='text-2xs mx-1'>{`${firstStar.W} W / ${firstStar.GAA} GAA / ${firstStar.SVP} SV% / ${Math.round(firstStar.Rating * 100) / 100} Rtg`}</div>
                :
                <div className='text-2xs mx-1'>{`${firstStar.G} G / ${firstStar.A} A / ${firstStar.P} P / ${firstStar.PPP} PPP / ${firstStar.SOG} SOG / ${firstStar.HIT} HIT / ${firstStar.BLK} BLK / ${Math.round(firstStar.Rating * 100) / 100} Rtg`}</div>
              }
            </div>
          </div>
          <div className="grid grid-cols-7 m-auto w-11/12 text-center">
            <div className="text-2xl text-slate-300 m-auto">
              {'\u2605'}{'\u2605'}
            </div>
            <img
              className='my-auto'
              src={props.matchupData.AwayTeam === secondStar.gshlTeam ? props.matchupData.AwayTeamInfo.LogoURL : props.matchupData.HomeTeamInfo.LogoURL}
              alt='Second Star Team Logo'
            />
            <div className="text-lg font-normal col-span-5 m-auto items-center inline-block">
              {secondStar.PlayerName}, {secondStar.nhlPos}
              <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${secondStar.nhlTeam}.png`} alt="" className='inline-block h-5 w-5 mx-1.5' />
              {secondStar.nhlPos === 'G' ?
                <div className='text-2xs mx-1'>{`${secondStar.W} W / ${secondStar.GAA} GAA / ${secondStar.SVP} SV% / ${Math.round(secondStar.Rating * 100) / 100} Rtg`}</div>
                :
                <div className='text-2xs mx-1'>{`${secondStar.G} G / ${secondStar.A} A / ${secondStar.P} P / ${secondStar.PPP} PPP / ${secondStar.SOG} SOG / ${secondStar.HIT} HIT / ${secondStar.BLK} BLK / ${Math.round(secondStar.Rating * 100) / 100} Rtg`}</div>
              }
            </div>
          </div>
          <div className="grid grid-cols-7 m-auto w-11/12 text-center">
            <div className="text-xl text-orange-700 my-auto text-center">
              {'\u2605'}<br></br>{'\u2605'}{'\u2605'}
            </div>
            <img
              className='my-auto'
              src={props.matchupData.AwayTeam === thirdStar.gshlTeam ? props.matchupData.AwayTeamInfo.LogoURL : props.matchupData.HomeTeamInfo.LogoURL}
              alt='Third Star Team Logo'
            />
            <div className="text-lg font-normal col-span-5 m-auto items-center inline-block">
              {thirdStar.PlayerName}, {thirdStar.nhlPos}
              <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${thirdStar.nhlTeam}.png`} alt="" className='inline-block h-5 w-5 mx-1.5' />
              {thirdStar.nhlPos === 'G' ?
                <div className='text-2xs mx-1'>{`${thirdStar.W} W / ${thirdStar.GAA} GAA / ${thirdStar.SVP} SV% / ${Math.round(thirdStar.Rating * 100) / 100} Rtg`}</div>
                :
                <div className='text-2xs mx-1'>{`${thirdStar.G} G / ${thirdStar.A} A / ${thirdStar.P} P / ${thirdStar.PPP} PPP / ${thirdStar.SOG} SOG / ${thirdStar.HIT} HIT / ${thirdStar.BLK} BLK / ${Math.round(thirdStar.Rating * 100) / 100} Rtg`}</div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}
function WatchList(props) {
  const seasonStats = usePlayerSeasonTotals(props.matchupData.Season)
  let firstStar = [...props.matchupData.HomeTeamPlayers, ...props.matchupData.AwayTeamPlayers].filter(obj => obj.id === props.matchupData.FirstStar)[0]
  let secondStar = [...props.matchupData.HomeTeamPlayers, ...props.matchupData.AwayTeamPlayers].filter(obj => obj.id === props.matchupData.SecondStar)[0]
  let thirdStar = [...props.matchupData.HomeTeamPlayers, ...props.matchupData.AwayTeamPlayers].filter(obj => obj.id === props.matchupData.ThirdStar)[0]
  firstStar = seasonStats.data?.filter(obj => obj.PlayerName === firstStar.PlayerName && obj.nhlPos === firstStar.nhlPos)[0]
  secondStar = seasonStats.data?.filter(obj => obj.PlayerName === secondStar.PlayerName && obj.nhlPos === secondStar.nhlPos)[0]
  thirdStar = seasonStats.data?.filter(obj => obj.PlayerName === thirdStar.PlayerName && obj.nhlPos === thirdStar.nhlPos)[0]
  if (!firstStar || !secondStar || !thirdStar) { return <LoadingSpinner /> }
  return (
    <div>
      <div className="mt-8 text-lg text-center font-bold">Players to Watch</div>
      {props.matchupData.FirstStar &&
        <div className="w-11/12 mt-2 mx-auto flex flex-col p-1 gap-4 items-center text-center font-varela">
          <div className="grid grid-cols-6 m-auto w-11/12 text-center">
            <img
              className='my-auto'
              src={props.matchupData.AwayTeam === firstStar.gshlTeam ? props.matchupData.AwayTeamInfo.LogoURL : props.matchupData.HomeTeamInfo.LogoURL}
              alt='First Star Team Logo'
            />
            <div className="text-lg font-normal col-span-5 m-auto items-center inline-block">
              {firstStar.PlayerName}, {firstStar.nhlPos}
              <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${firstStar.nhlTeam}.png`} alt="" className='inline-block h-5 w-5 mx-1.5' />
              {firstStar.nhlPos === 'G' ?
                <div className='text-2xs mx-1'>{`${firstStar.W} W / ${firstStar.GAA} GAA / ${firstStar.SVP} SV% / ${Math.round(firstStar.Rating * 100) / 100} Rtg`}</div>
                :
                <div className='text-2xs mx-1'>{`${firstStar.G} G / ${firstStar.A} A / ${firstStar.P} P / ${firstStar.PPP} PPP / ${firstStar.SOG} SOG / ${firstStar.HIT} HIT / ${firstStar.BLK} BLK / ${Math.round(firstStar.Rating * 100) / 100} Rtg`}</div>
              }
            </div>
          </div>
          <div className="grid grid-cols-6 m-auto w-11/12 text-center">
            <img
              className='my-auto'
              src={props.matchupData.AwayTeam === secondStar.gshlTeam ? props.matchupData.AwayTeamInfo.LogoURL : props.matchupData.HomeTeamInfo.LogoURL}
              alt='Second Star Team Logo'
            />
            <div className="text-lg font-normal col-span-5 m-auto inline-block items-center">
              {secondStar.PlayerName}, {secondStar.nhlPos}
              <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${secondStar.nhlTeam}.png`} alt="" className='inline-block h-5 w-5 ml-1.5' />
              {secondStar.nhlPos === 'G' ?
                <div className='text-2xs mx-1'>{`${secondStar.W} W / ${secondStar.GAA} GAA / ${secondStar.SVP} SV% / ${Math.round(secondStar.Rating * 100) / 100} Rtg`}</div>
                :
                <div className='text-2xs mx-1'>{`${secondStar.G} G / ${secondStar.A} A / ${secondStar.P} P / ${secondStar.PPP} PPP / ${secondStar.SOG} SOG / ${secondStar.HIT} HIT / ${secondStar.BLK} BLK / ${Math.round(secondStar.Rating * 100) / 100} Rtg`}</div>
              }
            </div>
          </div>
          <div className="grid grid-cols-6 m-auto w-11/12 text-center">
            <img
              className='my-auto'
              src={props.matchupData.AwayTeam === thirdStar.gshlTeam ? props.matchupData.AwayTeamInfo.LogoURL : props.matchupData.HomeTeamInfo.LogoURL}
              alt='Third Star Team Logo'
            />
            <div className="text-lg font-normal col-span-5 m-auto inline-block items-center">
              {thirdStar.PlayerName}, {thirdStar.nhlPos}
              <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${thirdStar.nhlTeam}.png`} alt="" className='inline-block h-5 w-5 ml-1.5' />
              {thirdStar.nhlPos === 'G' ?
                <div className='text-2xs mx-1'>{`${thirdStar.W} W / ${thirdStar.GAA} GAA / ${thirdStar.SVP} SV% / ${Math.round(thirdStar.Rating * 100) / 100} Rtg`}</div>
                :
                <div className='text-2xs mx-1'>{`${thirdStar.G} G / ${thirdStar.A} A / ${thirdStar.P} P / ${thirdStar.PPP} PPP / ${thirdStar.SOG} SOG / ${thirdStar.HIT} HIT / ${thirdStar.BLK} BLK / ${Math.round(thirdStar.Rating * 100) / 100} Rtg`}</div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}
function PlayingToday(props) {
  const playerDays = usePlayerDays(props.matchupData.Season)
  if (!playerDays.data) { return <LoadingSpinner /> }
  let date = new Date()
  date = date.getFullYear() + '-' + (+date.getMonth() < 9 ? '0' + ((+date.getMonth()) + 1) : ((+date.getMonth()) + 1)) + '-' + date.getDate()
  let playerData = [playerDays.data?.filter(obj => obj.Date === date && obj.gshlTeam === props.matchupData.AwayTeam && obj.Opp), playerDays.data?.filter(obj => obj.Date === date && obj.gshlTeam === props.matchupData.HomeTeam && obj.Opp)]
  return (
    <div className='mb-8'>
      <div className="mt-2 text-base text-center font-bold">Playing Today</div>
      <div className="grid grid-cols-2 gap-2 w-11/12 mx-auto text-2xs font-medium text-center items-start">
        {playerData.map(teamPlayerData => {
          return (
            <div className="">
              {teamPlayerData.filter(player => player.dailyPos !== 'BN' && player.dailyPos !== 'IR+' && player.dailyPos !== 'IR').map(player => {
                return (
                  <div className='flex flex-col border-b border-gray-300'>
                    <div className="inline-block text-xs">
                      {player.PlayerName}
                      <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${player.nhlTeam}.png`} alt="" className='inline-block h-4 w-4 mx-1' />
                    </div>
                    <div className="inline-block">
                      {player.Opp[0] === '@' ? '@' : 'v'}
                      <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${player.Opp[0] === '@' ? player.Opp.slice(1) : player.Opp}.png`} alt="" className='inline-block h-4 w-4 mx-1' />
                      {(player.Score.includes('AM') || player.Score.includes('PM')) ? addHoursToTime(player.Score, 3) : player.Score}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MatchupBoxscore(props) {
  const [boxscoreTeam, setBoxscoreTeam] = useState('Home')
  let teamStats = props.matchupData && props.matchupData[boxscoreTeam + "TeamPlayers"]
  return (
    <div className='mb-16 font-varela'>
      <div className="mt-12 mb-4 mx-1">
        <div className='flex flex-wrap gap-3 items-center justify-center list-none'>
          <div key='Week' className={`min-w-min text-center font-bold py-1 px-3 rounded-md shadow-emboss text-xs sm:text-sm ${boxscoreTeam === 'Away' ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-700'}`} onClick={() => setBoxscoreTeam('Away')}>
            {props.matchupData.AwayTeamInfo.TeamName}
          </div>
          <div key='Team' className={`min-w-min text-center font-bold py-1 px-3 rounded-md shadow-emboss text-xs sm:text-sm ${boxscoreTeam === 'Home' ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-700'}`} onClick={() => setBoxscoreTeam('Home')}>
            {props.matchupData.HomeTeamInfo.TeamName}
          </div>
        </div>
      </div>
      <div className="table-auto overflow-scroll">
        <table className='mx-auto overflow-x-auto'>
          <thead>
            <tr key="Header">
              <th className="sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200" key="Player">Player</th>
              <th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200" key="Pos">Pos</th>
              <th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200" key="Team">Team</th>
              <th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200" key="GS">GS</th>
              {['G', 'A', 'P', 'PPP', 'SOG', 'HIT', 'BLK'].map(obj => <th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200" key={obj}>{obj}</th>)}
              <th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200" key="Rating">Rating</th>
            </tr>
          </thead>
          <tbody>
            {teamStats.filter(obj => obj.nhlPos !== "G").sort((a, b) => b.Rating - a.Rating).map(player => {
              return (
                <tr key={player.id}>
                  <td className="sticky left-0 whitespace-nowrap py-1 px-2 text-center text-xs border-t border-b border-gray-300 bg-gray-50" key="Player">{player.PlayerName}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300" key="Pos">{player.nhlPos}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300" key="Team"><img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${player.nhlTeam}.png`} alt="" className='h-4 w-4' /></td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300" key="GS">{player.GS}</td>
                  {['G', 'A', 'P', 'PPP', 'SOG', 'HIT', 'BLK'].map(obj => <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300" key={obj}>{player[obj]}</td>)}
                  <td className="py-1 px-2 text-center text-xs font-bold bg-gray-50 border-t border-b border-gray-300" key="Rating">{Math.round(player.Rating * 100) / 100}</td>
                </tr>
              )
            })}
          </tbody>
          <thead>
            <tr key="Header">
              <th className="sticky left-0 p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200" key="Player">Player</th>
              <th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200" key="Pos">Pos</th>
              <th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200" key="Team">Team</th>
              <th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200" key="GS">GS</th>
              <th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200" key="Space"></th>
              {['W', 'GAA', 'SVP'].map(obj => <><th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200" key={obj}>{obj}</th><td className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200" key="Space"></td></>)}
              <th className="p-1 text-2xs font-normal text-center bg-gray-800 text-gray-200" key="Rating">Rating</th>
            </tr>
          </thead>
          <tbody>
            {teamStats.filter(obj => obj.nhlPos === "G").sort((a, b) => b.Rating - a.Rating).map(player => {
              return (
                <tr key={player.id}>
                  <td className="sticky left-0 py-1 px-2 text-center text-xs border-t border-b border-gray-300 bg-gray-50" key="Player">{player.PlayerName}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300" key="Pos">{player.nhlPos}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300" key="Team"><img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${player.nhlTeam}.png`} alt="" className='h-4 w-4' /></td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300" key="GS">{player.GS}</td>
                  <td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300" key="Space"></td>
                  {['W', 'GAA', 'SVP'].map(obj => <><td className="py-1 px-2 col-span-2 text-center text-xs border-t border-b border-gray-300" key={obj}>{player[obj]}</td><td className="py-1 px-2 text-center text-xs border-t border-b border-gray-300" key="Space"></td></>)}
                  <td className="py-1 px-2 text-center text-xs font-bold bg-gray-50 border-t border-b border-gray-300" key="Rating">{Math.round(player.Rating * 100) / 100}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}


function MatchupScroller(props) {
  const schedule = useSchedule(props.matchupData.Season)
  return (
    <>
      <div className='mt-4 font-oswald text-left px-4 font-bold text-base'>Week {props.matchupData?.WeekNum}</div>
      <div className='flex flex-row overflow-auto whitespace-nowrap mt-1 flex-nowrap'>
        <div className='shrink-0'>
          <div className="flex flex-row hover:text-grey-800">
            {schedule.data &&
              schedule.data
                .filter(obj => obj.Season === props.matchupData.Season)
                .filter(obj => obj.WeekNum === props.matchupData.WeekNum)
                .sort((a, b) => a.MatchupNum - b.MatchupNum)
                .map((obj, i) => <ScrollerItem data={obj} key={i} currentMatchup={props.matchupData} />)}
          </div>
        </div>
      </div>
    </>
  )
}
function ScrollerItem(props) {
  let conf = props.data.GameType + props.data.awayTeamInfo?.Conference + props.data.homeTeamInfo?.Conference, bgClass = ''

  switch (conf) {
    case 'CCSVSV':
      bgClass = 'bg-sunview-50 bg-opacity-50'
      break
    case 'CCHHHH':
      bgClass = 'bg-hotel-50 bg-opacity-50'
      break
    case 'NCSVHH':
      bgClass = 'bg-gradient-to-b from-sunview-50 to-hotel-50 bg-opacity-10'
      break
    case 'NCHHSV':
      bgClass = 'bg-gradient-to-b from-hotel-50 to-sunview-50 bg-opacity-10'
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
  return (
    <div className={`flex flex-col m-2 px-1 items-center ${props.data.id === props.currentMatchup.id ? (bgClass) : 'bg-gray-100'} shadow-emboss rounded-2xl shrink-0`}>
      <Link to={"/matchup/" + props.data.id}>
        <div className={`flex p-1 ${props.data.AwayWL === "W" ? 'font-bold text-emerald-800' : (props.data.AwayWL === "L" ? 'text-rose-800' : '')}`}>
          {props.data.AwayRank <= 8 ? <div className='mx-auto px-1 text-xs xs:text-sm items-start font-bold'>#{props.data.AwayRank}</div> : <div className="pl-5"></div>}
          <img className='w-8 my-1 mx-1' src={props.data.awayTeamStats ? props.data.awayTeamStats.teamInfo.LogoURL : ''} alt='Away Team Logo' />
          <div className='mx-auto px-1 text-sm xs:text-base my-auto'>{props.data.AwayScore}</div>
        </div>
        <div className={`flex p-1 ${props.data.HomeWL === "W" ? 'font-bold text-emerald-800' : (props.data.HomeWL === "L" ? 'text-rose-800' : '')}`}>
          {props.data.HomeRank <= 8 ? <div className='mx-auto px-1 text-xs xs:text-sm items-start font-bold'>#{props.data.HomeRank}</div> : <div className="pl-5"></div>}
          <img className='w-8 my-1 mx-1' src={props.data.homeTeamStats && props.data.homeTeamStats.teamInfo.LogoURL} alt='Home Team Logo' />
          <div className='mx-auto px-1 text-sm xs:text-base my-auto'>{props.data.HomeScore}</div>
        </div>
      </Link>
    </div>
  )
}


function addHoursToTime(timeString, hoursToAdd) {
  // Convert time string to a Date object
  let dateObj = new Date("January 1, 2022 " + timeString);

  // Add hours to the Date object
  dateObj.setHours(dateObj.getHours() + hoursToAdd);

  // Format the Date object back into a string
  let formattedTime = dateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

  return formattedTime;
}