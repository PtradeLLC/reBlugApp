import { useState } from 'react';
import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react'
import { useWindowSize } from '@react-hook/window-size';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Blog from '../../pages/posts';


const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, count: '5', current: true },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#', icon: FolderIcon, count: '12', current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, count: '20+', current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]

const blogCategories = [
    { name: "Books and Literature", href: "#", icon: "booksIcon" },
    { name: "DIY and Crafts", href: "#", icon: "diyIcon" },
    { name: "Learning", href: "#", icon: "educationIcon" },
    { name: "Entertainment", href: "#", icon: "entertainmentIcon" },
    { name: "Marketing", href: "#", icon: "entertainmentIcon" },
    { name: "Pop Culture", href: "#", icon: "environmentIcon" },
    { name: "Environmentalism", href: "#", icon: "environmentIcon" },
    { name: "Fashion and Beauty", href: "#", icon: "fashionIcon" },
    { name: "Finance", href: "#", icon: "financeIcon" },
    { name: "Food and Cooking", href: "#", icon: "foodIcon" },
    { name: "Health and Wellness", href: "#", icon: "healthIcon" },
    { name: "Lifestyle", href: "#", icon: "lifestyleIcon" },
    { name: "Parenting", href: "#", icon: "parentingIcon" },
    { name: "Photography", href: "#", icon: "photographyIcon" },
    { name: "Current Events", href: "#", icon: "politicsIcon" },
    { name: "Relationships", href: "#", icon: "relationshipsIcon" },
    { name: "Science and Technology", href: "#", icon: "scienceIcon" },
    { name: "Sports and Fitness", href: "#", icon: "sportsIcon" },
    { name: "Travel", href: "#", icon: "travelIcon" }
];


const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function BlogCategories() {
    const [width, height] = useWindowSize();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className='flex'>
            <div className='w-72'>
                <header className="bg-white mt-20">
                    <nav className="flex items-center bg-slate-100 justify-between p-6 lg:px-8" aria-label="Global">
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="hidden my-2 w-full lg:flex lg:flex-col lg:gap-x-12">
                            {blogCategories.map((item) => (
                                <div key={item.name}>
                                    <a href={item.href} className="text-sm hover:text-gray-700 font-semibold leading-6 text-gray-900">
                                        {item.name}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </nav>
                    <Dialog as="div" className="lg:hidden flex-col" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                        <div className="fixed inset-0 z-10" />
                        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {blogCategories.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Dialog>
                </header>
            </div>
            <div className=''>
                <Blog />
            </div>
        </div>
    )
}
