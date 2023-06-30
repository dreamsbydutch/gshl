import React from 'react'
import { useQuery } from 'react-query'
import LoadingSpinner from '../components/LoadingSpinner'
import { useWeeks, useTeams } from '../utils/context'
import { formatDate, queryFunc } from '../utils/fetchData'

export default function ThreeStars() {
    const weeks = useWeeks()
    const teams = useTeams()

    let yesterday = new Date()
    yesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday < 5 ? yesterday.getDate() - 2 : yesterday.getDate() - 1)

    const playerDaysData = useQuery([weeks.currentWeek?.Season + 'PlayerData', 'Days'], queryFunc, { enabled: !!weeks.currentWeek })
    const playerWeeksData = useQuery([weeks.currentWeek?.Season + 'PlayerData', 'Weeks'], queryFunc, { enabled: !!weeks.currentWeek })

    const dailyStars = playerDaysData.data?.filter(obj => obj.Date === formatDate(yesterday)).sort((a, b) => b.Rating - a.Rating).slice(0, 3)
    const weeklyStars = playerWeeksData.data?.filter(obj => +obj.WeekNum === +weeks.currentWeek?.WeekNum - 1).sort((a, b) => b.Rating - a.Rating).slice(0, 3)

    if (!weeklyStars || !dailyStars) { return <LoadingSpinner /> }
    return (
        <>
            <div className="bg-gray-100 mx-3 my-4 py-2 rounded-xl shadow-md font-varela">
                <div className="mt-4 mb-2 text-3xl text-center font-bold">GSHL's Three Stars</div>
                <div className="text-lg text-center font-bold border-t border-gray-500 mx-4 pt-2">{`Last Week - Week ${+weeks.currentWeek?.WeekNum - 1}`}</div>
                {weeklyStars[0] &&
                    <div className="w-11/12 mt-2 mx-auto flex flex-col p-1 gap-4 items-center font-varela mb-4">
                        <div className="grid grid-cols-7 m-auto text-center">
                            <div className="text-3xl text-yellow-300 m-auto">
                                {'\u2605'}
                            </div>
                            <img
                                className='my-auto'
                                src={teams?.filter(obj => obj.id === weeklyStars[0].gshlTeam)[0].LogoURL}
                                alt='First Star Team Logo'
                            />
                            <div className="text-lg font-normal col-span-5 m-auto items-center inline-block">
                                {weeklyStars[0].PlayerName}, {weeklyStars[0].nhlPos}
                                <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${weeklyStars[0].nhlTeam}.png`} alt="" className='inline-block h-5 w-5 mx-1.5' />
                                {weeklyStars[0].nhlPos === 'G' ?
                                    <div className='text-2xs mx-2'>{`${weeklyStars[0].W} W / ${weeklyStars[0].GAA} GAA / ${weeklyStars[0].SVP} SV% / ${Math.round(weeklyStars[0].Rating * 100) / 100} Rtg`}</div>
                                    :
                                    <div className='text-2xs mx-2'>{`${weeklyStars[0].G} G / ${weeklyStars[0].A} A / ${weeklyStars[0].P} P / ${weeklyStars[0].PPP} PPP / ${weeklyStars[0].SOG} SOG / ${weeklyStars[0].HIT} HIT / ${weeklyStars[0].BLK} BLK / ${Math.round(weeklyStars[0].Rating * 100) / 100} Rtg`}</div>
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-7 m-auto text-center">
                            <div className="text-2xl text-slate-300 m-auto">
                                {'\u2605'}{'\u2605'}
                            </div>
                            <img
                                className='my-auto'
                                src={teams?.filter(obj => obj.id === weeklyStars[1].gshlTeam)[0].LogoURL}
                                alt='Second Star Team Logo'
                            />
                            <div className="text-lg font-normal col-span-5 m-auto items-center inline-block">
                                {weeklyStars[1].PlayerName}, {weeklyStars[1].nhlPos}
                                <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${weeklyStars[1].nhlTeam}.png`} alt="" className='inline-block h-5 w-5 mx-1.5' />
                                {weeklyStars[1].nhlPos === 'G' ?
                                    <div className='text-2xs mx-2'>{`${weeklyStars[1].W} W / ${weeklyStars[1].GAA} GAA / ${weeklyStars[1].SVP} SV% / ${Math.round(weeklyStars[1].Rating * 100) / 100} Rtg`}</div>
                                    :
                                    <div className='text-2xs mx-2'>{`${weeklyStars[1].G} G / ${weeklyStars[1].A} A / ${weeklyStars[1].P} P / ${weeklyStars[1].PPP} PPP / ${weeklyStars[1].SOG} SOG / ${weeklyStars[1].HIT} HIT / ${weeklyStars[1].BLK} BLK / ${Math.round(weeklyStars[1].Rating * 100) / 100} Rtg`}</div>
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-7 m-auto text-center">
                            <div className="text-xl text-orange-700 my-auto text-center">
                                {'\u2605'}<br></br>{'\u2605'}{'\u2605'}
                            </div>
                            <img
                                className='my-auto'
                                src={teams?.filter(obj => obj.id === weeklyStars[2].gshlTeam)[0].LogoURL}
                                alt='Third Star Team Logo'
                            />
                            <div className="text-lg font-normal col-span-5 m-auto items-center inline-block">
                                {weeklyStars[2].PlayerName}, {weeklyStars[2].nhlPos}
                                <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${weeklyStars[2].nhlTeam}.png`} alt="" className='inline-block h-5 w-5 mx-1.5' />
                                {weeklyStars[2].nhlPos === 'G' ?
                                    <div className='text-2xs mx-2'>{`${weeklyStars[2].W} W / ${weeklyStars[2].GAA} GAA / ${weeklyStars[2].SVP} SV% / ${Math.round(weeklyStars[2].Rating * 100) / 100} Rtg`}</div>
                                    :
                                    <div className='text-2xs mx-2'>{`${weeklyStars[2].G} G / ${weeklyStars[2].A} A / ${weeklyStars[2].P} P / ${weeklyStars[2].PPP} PPP / ${weeklyStars[2].SOG} SOG / ${weeklyStars[2].HIT} HIT / ${weeklyStars[2].BLK} BLK / ${Math.round(weeklyStars[2].Rating * 100) / 100} Rtg`}</div>
                                }
                            </div>
                        </div>
                    </div>
                }
                <div className="text-lg text-center font-bold border-t border-gray-500 mx-4 pt-2">{`Yesterday -  ${yesterday.toLocaleDateString('en-CA', { year: "numeric", month: "long", day: "numeric", })}`}</div>
                {dailyStars[0] &&
                    <div className="w-11/12 mt-2 mx-auto flex flex-col p-1 gap-4 items-center font-varela">
                        <div className="grid grid-cols-7 m-auto text-center">
                            <div className="text-3xl text-yellow-300 m-auto">
                                {'\u2605'}
                            </div>
                            <img
                                className='my-auto'
                                src={teams?.filter(obj => obj.id === dailyStars[0].gshlTeam)[0].LogoURL}
                                alt='First Star Team Logo'
                            />
                            <div className="text-lg font-normal col-span-5 m-auto items-center inline-block">
                                {dailyStars[0].PlayerName}, {dailyStars[0].nhlPos}
                                <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${dailyStars[0].nhlTeam}.png`} alt="" className='inline-block h-5 w-5 mx-1.5' />
                                {dailyStars[0].nhlPos === 'G' ?
                                    <div className='text-2xs mx-2'>{`${dailyStars[0].W} W / ${dailyStars[0].GAA} GAA / ${dailyStars[0].SVP} SV% / ${Math.round(dailyStars[0].Rating * 100) / 100} Rtg`}</div>
                                    :
                                    <div className='text-2xs mx-2'>{`${dailyStars[0].G} G / ${dailyStars[0].A} A / ${dailyStars[0].P} P / ${dailyStars[0].PPP} PPP / ${dailyStars[0].SOG} SOG / ${dailyStars[0].HIT} HIT / ${dailyStars[0].BLK} BLK / ${Math.round(dailyStars[0].Rating * 100) / 100} Rtg`}</div>
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-7 m-auto text-center">
                            <div className="text-2xl text-slate-300 m-auto">
                                {'\u2605'}{'\u2605'}
                            </div>
                            <img
                                className='my-auto'
                                src={teams?.filter(obj => obj.id === dailyStars[1].gshlTeam)[0].LogoURL}
                                alt='Second Star Team Logo'
                            />
                            <div className="text-lg font-normal col-span-5 m-auto items-center inline-block">
                                {dailyStars[1].PlayerName}, {dailyStars[1].nhlPos}
                                <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${dailyStars[1].nhlTeam}.png`} alt="" className='inline-block h-5 w-5 mx-1.5' />
                                {dailyStars[1].nhlPos === 'G' ?
                                    <div className='text-2xs mx-2'>{`${dailyStars[1].W} W / ${dailyStars[1].GAA} GAA / ${dailyStars[1].SVP} SV% / ${Math.round(dailyStars[1].Rating * 100) / 100} Rtg`}</div>
                                    :
                                    <div className='text-2xs mx-2'>{`${dailyStars[1].G} G / ${dailyStars[1].A} A / ${dailyStars[1].P} P / ${dailyStars[1].PPP} PPP / ${dailyStars[1].SOG} SOG / ${dailyStars[1].HIT} HIT / ${dailyStars[1].BLK} BLK / ${Math.round(dailyStars[1].Rating * 100) / 100} Rtg`}</div>
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-7 m-auto text-center">
                            <div className="text-xl text-orange-700 my-auto text-center">
                                {'\u2605'}<br></br>{'\u2605'}{'\u2605'}
                            </div>
                            <img
                                className='my-auto'
                                src={teams?.filter(obj => obj.id === dailyStars[2].gshlTeam)[0].LogoURL}
                                alt='Third Star Team Logo'
                            />
                            <div className="text-lg font-normal col-span-5 m-auto items-center inline-block">
                                {dailyStars[2].PlayerName}, {dailyStars[2].nhlPos}
                                <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${dailyStars[2].nhlTeam}.png`} alt="" className='inline-block h-5 w-5 mx-1.5' />
                                {dailyStars[2].nhlPos === 'G' ?
                                    <div className='text-2xs mx-2'>{`${dailyStars[2].W} W / ${dailyStars[2].GAA} GAA / ${dailyStars[2].SVP} SV% / ${Math.round(dailyStars[2].Rating * 100) / 100} Rtg`}</div>
                                    :
                                    <div className='text-2xs mx-2'>{`${dailyStars[2].G} G / ${dailyStars[2].A} A / ${dailyStars[2].P} P / ${dailyStars[2].PPP} PPP / ${dailyStars[2].SOG} SOG / ${dailyStars[2].HIT} HIT / ${dailyStars[2].BLK} BLK / ${Math.round(dailyStars[2].Rating * 100) / 100} Rtg`}</div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
            {playerDaysData.data?.filter(obj => obj.TOI === "#NUM!").map(obj => {
                return (
                    <div key={obj.id} className="text-xs font-varela ml-4">{obj.Date+" "+obj.PlayerName}</div>
                )
            })}
        </>
    )
}