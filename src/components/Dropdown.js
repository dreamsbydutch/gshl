import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'


export default function Example(props) {
    const weeks = props.data.weeks
    return (
        <div className="flex justify-end">
            <Popover className="">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={`${open ? '' : 'text-opacity-90'} inline-flex items-center rounded-lg bg-gray-700 px-2 py-1 text-2xs font-medium text-white shadow-emboss hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <span>{'Week '+props.activeKey}</span>
                            <ChevronDownIcon
                                className={`${open ? '' : 'text-opacity-70'} h-4 w-4 text-white transition duration-150 ease-in-out group-hover:text-opacity-80`}
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
                                    <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                                        {weeks.map((item) => (
                                            <Popover.Button
                                                key={item.WeekNum}
                                                onClick={() => props.setter(item.WeekNum)}
                                                className="-m-4 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                            >
                                                <div className="ml-1">
                                                    <p className="text-xs font-medium text-gray-800">
                                                        {'Week '+item.WeekNum}
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