
import { Fragment, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import {
    FaceFrownIcon,
    FaceSmileIcon,
    FireIcon,
    HandThumbUpIcon,
    HeartIcon,
    PaperClipIcon,
    XMarkIcon,
} from '@heroicons/react/20/solid'
import { Listbox, Transition } from '@headlessui/react'
import { useSession, signIn, signOut } from "next-auth/react";

const activity = [
    { id: 1, type: 'Launched', person: { tool: 'Email Conversational Tool:' }, date: '7d ago', projColor: "text-green-600" },
    { id: 3, type: 'Launched', person: { tool: 'Article Assistant:' }, date: '6d ago', projColor: "text-green-600" },
    { id: 2, type: 'In Progress', person: { tool: 'Marketing Automation:' }, date: '6d ago', projColor: "text-orange-300" },
    {
        id: 4,
        type: 'commented',
        person: {
            tool: 'Email Conversational Tool',
            imageUrl:
                'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        comment: 'This tool has totally changed the way I run my campaigns. Email is fun again!',
        date: '12d ago',
        dateTime: '2023-01-23T15:56',
    },
    // { id: 5, type: 'Scheduled', person: { tool: 'AI Blogger:' }, date: '17d ago', projColor: "text-red-500" },
    // { id: 6, type: 'paid', person: { tool: 'Alex Curren' }, date: '1d ago', dateTime: '2023-01-24T09:20' },
]
const moods = [
    { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
    { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
    { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
    { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
    { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
    { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Roadmap() {
    const [selected, setSelected] = useState(moods[5]);
    const { data: session, status } = useSession();
    const { user } = session;

    return (
        <div className="px-6">
            <div className='hidden overflow-y-auto border-l border-gray-200 mb-3 bg-white lg:block'>
                <p className="text-base font-medium text-gray-900">Product Roadmap</p>
            </div>
            <div className='px-2'>
                <ul role="list" className="space-y-6">
                    {activity.map((activityItem, activityItemIdx) => (
                        <li key={activityItem.id} className="relative flex gap-x-4">
                            <div
                                className={classNames(
                                    activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6',
                                    'absolute left-0 top-0 flex w-6 justify-center'
                                )}
                            >
                                <div className="w-px bg-gray-200" />
                            </div>
                            {activityItem.type === 'commented' ? (
                                <>
                                    <img
                                        src={activityItem.person.imageUrl}
                                        alt=""
                                        className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                                    />
                                    <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                                        <div className="flex justify-between gap-x-4">
                                            <div className="py-0.5 text-xs leading-5 text-gray-500">
                                                <span className="font-medium text-gray-900">{activityItem.person.tool}</span>
                                            </div>
                                            <time dateTime={activityItem.dateTime} className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                                                {activityItem.date}
                                            </time>
                                        </div>
                                        <p className="text-sm leading-6 text-gray-500">{activityItem.comment}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                        {activityItem.type === 'completed' || activityItem.type === 'Launched' ? (
                                            <CheckCircleIcon className={`{h-6 w-6 ${activityItem.projColor}`} aria-hidden="true" />
                                        ) : activityItem.type === 'In Progress' ? (
                                            <CheckCircleIcon className={`{h-6 w-6 ${activityItem.projColor}`} aria-hidden="true" />
                                        ) : activityItem.type === 'Scheduled' ? (
                                            <CheckCircleIcon className={`{h-6 w-6 ${activityItem.projColor}`} aria-hidden="true" />
                                        ) : (
                                            <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                                        )}
                                    </div>
                                    <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                                        <span className="font-medium text-gray-900">{activityItem.person.tool}</span> {activityItem.type}.
                                    </p>
                                    {/* <time dateTime={activityItem.dateTime} className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                                        {activityItem.date}
                                    </time> */}
                                </>
                            )}
                        </li>
                    ))}
                </ul>

                {/* New comment form */}
                <div className="mt-6 flex gap-x-3">
                    <img
                        src={user?.image}
                        alt="profile-image"
                        className="h-6 w-6 flex-none rounded-full bg-gray-50"
                    />
                    <form action="#" className="relative flex-auto">
                        <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                            <label htmlFor="comment" className="sr-only">
                                Give us your feedback
                            </label>
                            <textarea
                                rows={2}
                                name="comment"
                                id="comment"
                                className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Give us your feedback ..."
                                defaultValue={''}
                            />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                            <div className="flex items-center space-x-5">
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                                    >
                                        <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                                        <span className="sr-only">Attach a file</span>
                                    </button>
                                </div>
                                <div className="flex items-center">
                                    <Listbox value={selected} onChange={setSelected}>
                                        {({ open }) => (
                                            <>
                                                <Listbox.Label className="sr-only">Your mood</Listbox.Label>
                                                <div className="relative">
                                                    <Listbox.Button className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                                                        <span className="flex items-center justify-center">
                                                            {selected.value === null ? (
                                                                <span>
                                                                    <FaceSmileIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                                                    <span className="sr-only">Add your mood</span>
                                                                </span>
                                                            ) : (
                                                                <span>
                                                                    <span
                                                                        className={classNames(
                                                                            selected.bgColor,
                                                                            'flex h-8 w-8 items-center justify-center rounded-full'
                                                                        )}
                                                                    >
                                                                        <selected.icon className="h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
                                                                    </span>
                                                                    <span className="sr-only">{selected.name}</span>
                                                                </span>
                                                            )}
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute bottom-10 z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                                                            {moods.map((mood) => (
                                                                <Listbox.Option
                                                                    key={mood.value}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            active ? 'bg-gray-100' : 'bg-white',
                                                                            'relative cursor-default select-none px-3 py-2'
                                                                        )
                                                                    }
                                                                    value={mood}
                                                                >
                                                                    <div className="flex items-center">
                                                                        <div
                                                                            className={classNames(
                                                                                mood.bgColor,
                                                                                'flex h-8 w-8 items-center justify-center rounded-full'
                                                                            )}
                                                                        >
                                                                            <mood.icon
                                                                                className={classNames(mood.iconColor, 'h-5 w-5 flex-shrink-0')}
                                                                                aria-hidden="true"
                                                                            />
                                                                        </div>
                                                                        <span className="ml-3 block truncate font-medium">{mood.name}</span>
                                                                    </div>
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Comment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
