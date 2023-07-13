import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import LoadingSpinner from './LoadingSpinner'
import { useWeeks } from '../utils/context'
import { seasons } from '../utils/constants'
import { PageToolbarPropsType, SeasonTogglePropsType, SecondaryPageToolbarPropsType, TeamsTogglePropsType } from '../utils/endpointTypes'

export function WeeksToggle(props) {
	const weeks = useWeeks()
	if (!weeks) {
		return <LoadingSpinner />
	}
	return (
		<div className="flex gap-4 justify-center">
			<button
				onClick={() =>
					props.setter(
						+props.activeKey === 1
							? +props.activeKey
							: +props.activeKey <= 22
							? +props.activeKey - 1
							: props.activeKey === 'QF'
							? 22
							: props.activeKey === 'SF'
							? 'QF'
							: props.activeKey === 'F'
							? 'SF'
							: 'F'
					)
				}
				className="px-4 py-1 place-self-center font-oswald text-sm text-gray-700 bg-gray-100 rounded-lg shadow-emboss hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
				{'<<<'}
			</button>

			<Popover className="">
				{({ open }) => (
					<>
						<Popover.Button
							className={`${
								open ? '' : 'text-opacity-90'
							} inline-flex items-center rounded-lg text-gray-700 px-4 py-2 text-xs font-medium bg-gray-100 shadow-emboss hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}>
							<span>
								{props.activeKey === 'LT'
									? 'Losers Tournament'
									: props.activeKey === 'QF'
									? 'Quarterfinals'
									: props.activeKey === 'SF'
									? 'Semifinals'
									: props.activeKey === 'F'
									? 'Finals'
									: 'Week ' + props.activeKey}
							</span>
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
							leaveTo="opacity-0 translate-y-1">
							<Popover.Panel className="absolute right-0 z-10 mt-3 transform px-4 sm:px-0 lg:max-w-3xl">
								<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative flex flex-wrap gap-3 bg-white p-4 whitespace-nowrap">
										{weeks.seasonWeeks?.map(item => (
											<Popover.Button
												key={item.WeekNum}
												onClick={() => props.setter(item.WeekNum)}
												className=" flex-auto items-center rounded-lg px-1.5 py-1 transition duration-150 ease-in-out bg-gray-100 shadow-emboss border hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 focus-visible:ring-opacity-50">
												<div className="ml-1">
													<p className="text-xs font-medium text-gray-800">{'Week ' + item.WeekNum}</p>
												</div>
											</Popover.Button>
										))}
										<Popover.Button
											key={'QF'}
											onClick={() => props.setter('QF')}
											className=" flex-auto items-center rounded-lg px-1.5 py-1 transition duration-150 ease-in-out bg-gray-100 shadow-emboss border hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 focus-visible:ring-opacity-50">
											<div className="ml-1">
												<p className="text-xs font-medium text-gray-800">Quarterfinals</p>
											</div>
										</Popover.Button>
										<Popover.Button
											key={'SF'}
											onClick={() => props.setter('SF')}
											className=" flex-auto items-center rounded-lg px-1.5 py-1 transition duration-150 ease-in-out bg-gray-100 shadow-emboss border hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 focus-visible:ring-opacity-50">
											<div className="ml-1">
												<p className="text-xs font-medium text-gray-800">Semifinals</p>
											</div>
										</Popover.Button>
										<Popover.Button
											key={'F'}
											onClick={() => props.setter('F')}
											className=" flex-auto items-center rounded-lg px-1.5 py-1 transition duration-150 ease-in-out bg-gray-100 shadow-emboss border hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 focus-visible:ring-opacity-50">
											<div className="ml-1">
												<p className="text-xs font-medium text-gray-800">Finals</p>
											</div>
										</Popover.Button>
										<Popover.Button
											key={'LT'}
											onClick={() => props.setter('LT')}
											className=" flex-auto items-center rounded-lg px-1.5 py-1 transition duration-150 ease-in-out bg-gray-100 shadow-emboss border hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 focus-visible:ring-opacity-50">
											<div className="ml-1">
												<p className="text-xs font-medium text-gray-800">Loser's Tournament</p>
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
				onClick={() =>
					props.setter(
						+props.activeKey < 22
							? +props.activeKey + 1
							: +props.activeKey === 22
							? 'QF'
							: props.activeKey === 'QF'
							? 'SF'
							: props.activeKey === 'SF'
							? 'F'
							: 'LT'
					)
				}
				className="px-4 py-1 place-self-center font-oswald text-sm text-gray-700 bg-gray-100 rounded-lg shadow-emboss hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
				{'>>>'}
			</button>
		</div>
	)
}

// UPDATED NAVBARS BELOW
export function SeasonToggleNavbar(props: SeasonTogglePropsType) {
	return (
		<div className={`z-40 ${props.position ? props.position[0] : 'fixed h-10 bg-gray-200 shadow-inv bottom-16 left-0 py-2 px-2'}`}>
			<Popover className="">
				{({ open }) => (
					<>
						<Popover.Button className={`inline-flex items-center rounded-lg bg-gray-300 px-2 py-1 text-2xs font-bold text-gray-900 shadow-emboss`}>
							<ChevronDownIcon
								className={`${open ? '' : 'text-opacity-70'} h-4 w-4 text-gray-700 transition duration-150 ease-in-out`}
								aria-hidden="true"
							/>
							<span className="whitespace-nowrap">{props.activeKey.ListName}</span>
						</Popover.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1">
							<Popover.Panel
								className={`absolute ${props.position ? props.position[1] : 'bottom-12 left-0'} z-10 mt-3 transform px-4 sm:px-0 lg:max-w-3xl`}>
								<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
										{seasons.map(item => (
											<Popover.Button
												key={item.Season}
												onClick={() => props.setter(item)}
												className="-m-4 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
												<div className="ml-1">
													<p className="text-xs font-medium text-gray-800 whitespace-nowrap">{item.ListName}</p>
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
export function PageToolbar(props: PageToolbarPropsType) {
	return (
		<>
			{props.seasonToggleActiveKey && props.seasonToggleSetter && (
				<SeasonToggleNavbar
					{...{
						activeKey: props.seasonToggleActiveKey,
						setter: props.seasonToggleSetter,
					}}
				/>
			)}
			<div
				className={
					props.seasonToggleActiveKey && props.seasonToggleSetter
						? 'h-10 w-9/12 px-2 bg-gray-200 shadow-inv py-1 fixed left-0 right-0 ml-20 bottom-16 z-30'
						: 'h-10 w-full max-w-min px-1 bg-gray-200 shadow-inv py-1 fixed left-0 right-0 bottom-16 mx-auto z-30'
				}>
				<div key="pageToolberContainer" className="h-8 flex gap-1 items-center mx-auto overflow-x-scroll no-scrollbar">
					{props.toolbarKeys.map((toolbarKey, i) => {
						return (
							<>
								{i !== 0 && <span key={'split' + i} className="h-4/6 border-1 border-gray-400" />}
								<div
									key={toolbarKey}
									className={`
                            whitespace-nowrap text-center font-bold py-1 px-3 rounded-lg text-sm
                            ${props.activeKey === toolbarKey ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-700'}
                          `}
									onClick={() => props.setter(toolbarKey)}>
									{toolbarKey}
								</div>
							</>
						)
					})}
				</div>
			</div>
		</>
	)
}
export function SecondaryPageToolbar(props: SecondaryPageToolbarPropsType) {
	return (
		<div className="h-10 w-full max-w-min px-1 bg-gray-200 shadow-inv py-1 fixed left-0 right-0 bottom-24 mb-2 mx-auto z-20">
			<div className="h-8 flex gap-1 items-center mx-auto overflow-x-scroll no-scrollbar">
				{props.toolbarKeys.map((toolbarKey, i) => {
					return (
						<>
							{i !== 0 && <span key={'split' + i} className="h-4/6 border-1 border-gray-400" />}
							<div
								key={toolbarKey}
								className={`
                            whitespace-nowrap text-center font-bold py-1 px-3 rounded-lg text-sm
                            ${props.activeKey === toolbarKey ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-700'}
                          `}
								onClick={() => props.setter(props.activeKey === toolbarKey ? null : toolbarKey)}>
								{toolbarKey}
							</div>
						</>
					)
				})}
			</div>
		</div>
	)
}
export function TeamsToggle(props: TeamsTogglePropsType) {
	props.toolbarKeys?.sort((a, b) => a.TeamName.localeCompare(b.TeamName))
	return (
		<div className="h-10 w-min max-w-full px-2 bg-gray-200 shadow-inv fixed left-0 right-0 mx-auto bottom-16 z-30">
			<div className="h-10 flex gap-0.5 items-center mx-auto overflow-x-scroll no-scrollbar">
				{props.toolbarKeys?.map((toolbarKey, i) => {
					return (
						<>
							{i !== 0 && <span key={'split-' + i} className="h-4/6 border-1 border-gray-400" />}
							<div
								key={toolbarKey[seasons[0].Season]}
								className={`rounded-md
                            ${
															props.activeKey && props.activeKey === toolbarKey
																? toolbarKey.Conference === 'SV'
																	? 'bg-sunview-700'
																	: 'bg-hotel-700'
																: 'bg-gray-200'
														}
                          `}
								onClick={() => props.setter(props.activeKey && toolbarKey === props.activeKey ? null : toolbarKey)}>
								<img className="p-1.5 rounded-lg max-w-max h-10" src={toolbarKey.LogoURL} alt={toolbarKey.TeamName} />
							</div>
						</>
					)
				})}
			</div>
		</div>
	)
}
