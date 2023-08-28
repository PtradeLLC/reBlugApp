import { useState } from 'react'
import { CalendarIcon, PaperClipIcon, TagIcon, UserCircleIcon } from '@heroicons/react/20/solid'

const assignees = [
    { name: 'Unassigned', value: null },
    {
        name: 'Wade Cooper',
        value: 'wade-cooper',
        avatar:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More items...
]
const labels = [
    { name: 'Unlabelled', value: null },
    { name: 'Engineering', value: 'engineering' },
    // More items...
]
const dueDates = [
    { name: 'No due date', value: null },
    { name: 'Today', value: 'today' },
    // More items...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TeamForm() {
    return (
        <form action="#" className="relative">
            <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <label htmlFor="subject" className="sr-only">
                    Subject
                </label>
                <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
                    placeholder="Subject"
                />
                <label htmlFor="message" className="sr-only">
                    Message
                </label>
                <textarea
                    rows={2}
                    name="message"
                    id="message"
                    className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Write a message..."
                    defaultValue={''}
                />
                <div aria-hidden="true">
                    <div className="py-2">
                        <div className="h-9" />
                    </div>
                    <div className="h-px" />
                    <div className="py-2">
                        <div className="py-px">
                            <div className="h-9" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-x-px bottom-0">
                <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                    <div className="flex">
                        <button
                            type="button"
                            className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
                        >
                            <PaperClipIcon className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500" aria-hidden="true" />
                            <span className="text-xs italic text-gray-500 group-hover:text-gray-600">Or import list of emails (spreadsheet) </span>
                        </button>
                    </div>
                    <div className="flex-shrink-0">
                        <button
                            type="submit"
                            className="inline-flex items-center rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Upload list
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
