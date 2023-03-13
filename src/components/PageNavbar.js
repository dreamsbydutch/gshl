import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import LoadingSpinner from './LoadingSpinner'
import { useTeams, useWeeks } from '../utils/context'

export function StandingsToggleNavbar(props) {
  return (
    <div className="my-3 mx-1">
      <div className='flex flex-wrap gap-3 items-center justify-center list-none'>
        <div key='OVR' className={`min-w-min text-center font-bold py-1 px-3 rounded-md shadow-emboss text-xs sm:text-sm ${props.activeKey === 'OVR' ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-700'}`} onClick={() => props.setter('OVR')}>
          Overall
        </div>
        <div key='Conf' className={`min-w-min text-center font-bold py-1 px-3 rounded-md shadow-emboss text-xs sm:text-sm ${props.activeKey === 'Conf' ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-700'}`} onClick={() => props.setter('Conf')}>
          Conference
        </div>
        <div key='WC' className={`min-w-min text-center font-bold py-1 px-3 rounded-md shadow-emboss text-xs sm:text-sm ${props.activeKey === 'WC' ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-700'}`} onClick={() => props.setter('WC')}>
          Wildcard
        </div>
        <div key='PO' className={`min-w-min text-center font-bold py-1 px-3 rounded-md shadow-emboss text-xs sm:text-sm ${props.activeKey === 'PO' ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-700'}`} onClick={() => props.setter('PO')}>
          Playoffs
        </div>
      </div>
    </div>
  )
}
export function ScheduleToggleNavbar(props) {
  return (
    <div className="my-3 mx-1">
      <div className='flex flex-wrap gap-3 items-center justify-center list-none'>
        <div key='Week' className={`min-w-min text-center font-bold py-1 px-3 rounded-md shadow-emboss text-xs sm:text-sm ${props.activeKey === 'Week' ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-700'}`} onClick={() => props.setter('Week')}>
          Weekly Schedule
        </div>
        <div key='Team' className={`min-w-min text-center font-bold py-1 px-3 rounded-md shadow-emboss text-xs sm:text-sm ${props.activeKey === 'Team' ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-700'}`} onClick={() => props.setter('Team')}>
          Team Schedule
        </div>
      </div>
    </div>
  )
}
export function SeasonToggleNavbar(props) {

  const seasons = [
    { key: '2023', name: '2022-23', },
    { key: '2022', name: '2021-22', },
    { key: '2021', name: '2020-21', },
    { key: '2020', name: '2019-20', },
    { key: '2019', name: '2018-19', },
    { key: '2018', name: '2017-18', },
    { key: '2017', name: '2016-17', },
    { key: '2016', name: '2015-16', },
    { key: '2015', name: '2014-15', },
  ]

  return (
    <div className="flex justify-end">
      <Popover className="">
        {({ open }) => (
          <>
            <Popover.Button
              className={`${open ? '' : 'text-opacity-90'} inline-flex items-center rounded-lg bg-gray-700 px-2 py-1 text-2xs font-medium text-white shadow-emboss hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'} h-4 w-4 text-white transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
              <span>{(parseInt(props.activeKey) - 1) + '-' + String(props.activeKey).slice(2)}</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-10 mt-3 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                    {seasons.map((item) => (
                      <Popover.Button
                        key={item.key}
                        onClick={() => props.setter(item.key)}
                        className="-m-4 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="ml-1">
                          <p className="text-xs font-medium text-gray-800">
                            {item.name}
                          </p>
                        </div>
                      </Popover.Button>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
export function WeeksToggle(props) {
  const weeks = useWeeks()
  if (!weeks) { return <LoadingSpinner /> }
  return (
    <div className="flex gap-4 justify-center">

      <button
        onClick={() => props.setter(+props.activeKey === 1 ? +props.activeKey : +props.activeKey <= 22 ? +props.activeKey - 1 : props.activeKey === "QF" ? 22 : props.activeKey === "SF" ? "QF" : props.activeKey === "F" ? "SF" : "F")}
        className='px-4 py-1 place-self-center font-oswald text-sm text-gray-700 bg-gray-100 rounded-lg shadow-emboss hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
      >
        {'<<<'}
      </button>

      <Popover className="">
        {({ open }) => (
          <>
            <Popover.Button
              className={`${open ? '' : 'text-opacity-90'} inline-flex items-center rounded-lg text-gray-700 px-4 py-2 text-xs font-medium bg-gray-100 shadow-emboss hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>{props.activeKey === 'LT' ? 'Losers Tournament' : props.activeKey === 'QF' ? 'Quarterfinals' : props.activeKey === 'SF' ? 'Semifinals' : props.activeKey === 'F' ? 'Finals' : 'Week ' + props.activeKey}</span>
              <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'} h-4 w-4 text-gray-700 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-10 mt-3 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative flex flex-wrap gap-3 bg-white p-4 whitespace-nowrap">
                    {weeks.seasonWeeks?.map((item) => (
                      <Popover.Button
                        key={item.WeekNum}
                        onClick={() => props.setter(item.WeekNum)}
                        className=" flex-auto items-center rounded-lg px-1.5 py-1 transition duration-150 ease-in-out bg-gray-100 shadow-emboss border hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 focus-visible:ring-opacity-50"
                      >
                        <div className="ml-1">
                          <p className="text-xs font-medium text-gray-800">
                            {'Week ' + item.WeekNum}
                          </p>
                        </div>
                      </Popover.Button>
                    ))}
                    <Popover.Button
                      key={"QF"}
                      onClick={() => props.setter("QF")}
                      className=" flex-auto items-center rounded-lg px-1.5 py-1 transition duration-150 ease-in-out bg-gray-100 shadow-emboss border hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 focus-visible:ring-opacity-50"
                    >
                      <div className="ml-1">
                        <p className="text-xs font-medium text-gray-800">
                          Quarterfinals
                        </p>
                      </div>
                    </Popover.Button>
                    <Popover.Button
                      key={"SF"}
                      onClick={() => props.setter("SF")}
                      className=" flex-auto items-center rounded-lg px-1.5 py-1 transition duration-150 ease-in-out bg-gray-100 shadow-emboss border hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 focus-visible:ring-opacity-50"
                    >
                      <div className="ml-1">
                        <p className="text-xs font-medium text-gray-800">
                          Semifinals
                        </p>
                      </div>
                    </Popover.Button>
                    <Popover.Button
                      key={"F"}
                      onClick={() => props.setter("F")}
                      className=" flex-auto items-center rounded-lg px-1.5 py-1 transition duration-150 ease-in-out bg-gray-100 shadow-emboss border hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 focus-visible:ring-opacity-50"
                    >
                      <div className="ml-1">
                        <p className="text-xs font-medium text-gray-800">
                          Finals
                        </p>
                      </div>
                    </Popover.Button>
                    <Popover.Button
                      key={"LT"}
                      onClick={() => props.setter("LT")}
                      className=" flex-auto items-center rounded-lg px-1.5 py-1 transition duration-150 ease-in-out bg-gray-100 shadow-emboss border hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 focus-visible:ring-opacity-50"
                    >
                      <div className="ml-1">
                        <p className="text-xs font-medium text-gray-800">
                          Loser's Tournament
                        </p>
                      </div>
                    </Popover.Button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>

      <button
        onClick={() => props.setter(+props.activeKey < 22 ? +props.activeKey + 1 : +props.activeKey === 22 ? "QF" : props.activeKey === "QF" ? "SF" : props.activeKey === "SF" ? "F" : "LT")}
        className='px-4 py-1 place-self-center font-oswald text-sm text-gray-700 bg-gray-100 rounded-lg shadow-emboss hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
      >
        {'>>>'}
      </button>

    </div>
  )
}
export function TeamsToggle(props) {
  const teamData = useTeams()
  return (
    <>
      <div className="flex flex-nowrap max-w-lg my-3 mx-auto">
        {teamData?.filter(obj => obj.Conference === "SV").map(obj => {
          return (
            <div key={obj.id} className="mx-auto" onClick={() => props.setter(obj.id)}>
              <img className=' w-10 xs:w-12 flex-auto p-0.5 rounded-lg shadow-emboss bg-sunview-50 bg-opacity-50' src={obj.LogoURL} alt={obj.TeamName} />
            </div>
          )
        })}
      </div>
      <div className="flex flex-nowrap max-w-lg my-3 mx-auto">
        {teamData?.filter(obj => obj.Conference === "HH").map(obj => {
          return (
            <div key={obj.id} className="mx-auto" onClick={() => props.setter(obj.id)}>
              <img className='w-10 xs:w-12 flex-auto p-0.5 rounded-lg shadow-emboss bg-hotel-50 bg-opacity-50' src={obj.LogoURL} alt={obj.TeamName} />
            </div>
          )
        })}
      </div>
    </>
  )
}