import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { seasons } from '../utils/constants'
import {
	PageToolbarPropsType,
	SeasonTogglePropsType,
	SecondaryPageToolbarPropsType,
	TeamsTogglePropsType,
	WeeksTogglePropsType,
} from '../utils/endpointTypes'
import { Link } from 'react-router-dom'

export function WeeksToggle(props: WeeksTogglePropsType) {
	props.toolbarKeys?.sort((a, b) => a.WeekNum - b.WeekNum)
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
						? 'h-10 w-full pl-2 pr-16 bg-gray-200 shadow-inv fixed left-16 bottom-16 z-30'
						: 'h-10 w-min max-w-full px-2 bg-gray-200 shadow-inv fixed left-0 right-0 mx-auto bottom-16 z-30'
				}>
				<div className="h-10 flex gap-0.5 items-center mx-auto overflow-x-scroll no-scrollbar">
					{props.toolbarKeys?.map((toolbarKey, i) => {
						if (props.activeKey && props.activeKey === toolbarKey) {
							if (toolbarKey.WeekType === 'PO') {
								return (
									<>
										{i !== 0 && <span key={'split-' + i} className="h-4/6 border-1 border-gray-400" />}
										<div key={toolbarKey.WeekNum} className={`rounded-md px-2 py-1 bg-amber-800 text-amber-200`} onClick={() => props.setter(null)}>
											{toolbarKey.WeekNum}
										</div>
									</>
								)
							} else {
								return (
									<>
										{i !== 0 && <span key={'split-' + i} className="h-4/6 border-1 border-gray-400" />}
										<div key={toolbarKey.WeekNum} className={`rounded-md px-2 py-1 bg-gray-800 text-gray-200`} onClick={() => props.setter(null)}>
											{toolbarKey.WeekNum}
										</div>
									</>
								)
							}
						} else {
							if (toolbarKey.WeekType === 'PO') {
								return (
									<>
										{i !== 0 && <span key={'split-' + i} className="h-4/6 border-1 border-gray-400" />}
										<div
											key={toolbarKey.WeekNum}
											className={`rounded-md px-2 py-1 bg-amber-200 text-amber-700`}
											onClick={() => props.setter(toolbarKey)}>
											{toolbarKey.WeekNum}
										</div>
									</>
								)
							} else {
								return (
									<>
										{i !== 0 && <span key={'split-' + i} className="h-4/6 border-1 border-gray-400" />}
										<div key={toolbarKey.WeekNum} className={`rounded-md px-2 py-1 bg-gray-200`} onClick={() => props.setter(toolbarKey)}>
											{toolbarKey.WeekNum}
										</div>
									</>
								)
							}
						}
						return (
							<>
								{i !== 0 && <span key={'split-' + i} className="h-4/6 border-1 border-gray-400" />}
								<div
									key={toolbarKey.WeekNum}
									className={`rounded-md px-2 py-1 text- ${
										toolbarKey.WeekType === 'PO' && (!props.activeKey || props.activeKey !== toolbarKey) && 'text-amber-700'
									}
                            ${
															props.activeKey && props.activeKey === toolbarKey
																? toolbarKey.WeekType === 'PO'
																	? 'bg-amber-800 text-amber-200'
																	: 'bg-gray-800 text-gray-200'
																: 'bg-gray-200'
														}
                          `}
									onClick={() => props.setter(props.activeKey && toolbarKey === props.activeKey ? null : toolbarKey)}>
									{toolbarKey.WeekNum}
								</div>
							</>
						)
					})}
				</div>
			</div>
		</>
	)
}
export function SeasonToggleNavbar(props: SeasonTogglePropsType) {
	return (
		<div className={`z-40 ${props.position ? props.position[0] : 'fixed h-10 bg-gray-200 shadow-inv bottom-16 left-0 py-2 px-1'}`}>
			<Popover className="">
				{({ open }) => (
					<>
						<Popover.Button
							className={`inline-flex items-center rounded-lg bg-gray-300 pl-0.5 pr-1.5 py-1 text-2xs font-bold text-gray-900 shadow-emboss`}>
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
						? 'h-10 w-full pl-2 pr-16 py-1 bg-gray-200 shadow-inv fixed left-16 bottom-16 z-30'
						: 'h-10 w-min max-w-full px-2 py-1 bg-gray-200 shadow-inv fixed left-0 right-0 mx-auto bottom-16 z-30'
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
									{toolbarKey[0].toUpperCase()}
									{toolbarKey.slice(1)}
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
								{toolbarKey[0].toUpperCase()}
								{toolbarKey.slice(1)}
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
	console.log(props)
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
				key="container"
				className={
					props.seasonToggleActiveKey && props.seasonToggleSetter
						? 'h-10 w-full pl-2 pr-16 bg-gray-200 shadow-inv fixed left-16 bottom-16 z-30'
						: 'h-10 w-min max-w-full px-2 bg-gray-200 shadow-inv fixed left-0 right-0 mx-auto bottom-16 z-30'
				}>
				<div className="h-10 flex gap-0.5 items-center mx-auto overflow-x-scroll no-scrollbar">
					{props.toolbarKeys?.map((toolbarKey, i) => {
						return (
							<>
								{i !== 0 && <span key={'split-' + i} className="h-4/6 border-1 border-gray-400" />}
								<Link
									key={toolbarKey.id}
									className={`rounded-md
                            ${
															props.activeKey && props.activeKey === toolbarKey
																? toolbarKey.Conference === 'SV'
																	? 'bg-sunview-700'
																	: 'bg-hotel-700'
																: 'bg-gray-200'
														}
                          `}
									to={props.activeKey !== toolbarKey ? props.url + String(toolbarKey.id) : props.url}>
									<img className="p-1.5 rounded-lg max-w-max h-10" src={toolbarKey.LogoURL} alt={toolbarKey.TeamName} />
								</Link>
							</>
						)
					})}
				</div>
			</div>
		</>
	)
}
