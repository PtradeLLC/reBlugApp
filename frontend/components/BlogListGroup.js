import React from "react";
const clients = [
    {
        id: 1,
        name: 'Meaningful Reference',
        imageUrl: '/images/meaning.png',
        description: 'While interacting with your article, readers are able to derive meaningful points as they engage your researched articles.',
    },
    {
        id: 2,
        name: 'Research Tool',
        imageUrl: '/images/blogger.png',
        description: 'Put power in your readers hands by giving them the tool to interact with Article Assistant for research, support, and insights - all done right on the page.',
    },
    {
        id: 3,
        name: 'Facilitate Growth in Readership',
        imageUrl: '/images/Growth.png',
        description: 'AI tool is trained to nudge and encourage readers to sign up and subscribe to your publication for variety of reason, one of which is to provide feedback and support, all the while increasing readership.',
    },
    {
        id: 4,
        name: 'Publish on Auto Pilot',
        imageUrl: '/images/autopilot.png',
        description: 'Write your content, simply upload your writing style and adjust preset features. Subject to your approval, The tool is trained to replicate your writing style, can generate content ideas in your niche, conduct thorough researches, and publish articles automatically on your behalf.',
    },
    {
        id: 5,
        name: 'Blog as A Brand',
        imageUrl: '/images/Growth.png',
        description: 'Tool is packed with an array of features that can be used to set up monetization for your blog - e.g: "Accept Sponsorship from brands, use our bCommerce feature to Sell products to your readers without owning an inventory, and AI tools to trained to provide sales and support to your readers".',
    },
    {
        id: 6,
        name: 'Social Blogging',
        imageUrl: '/images/platformblog.png',
        description: 'Your articles are formatted for various media (e.g: Podcast [SingleCasting or MultiCasting], Newsletters, and Social Media) by AI tool as you click to publish.',
    },
]

// eslint-disable-next-line no-unused-vars
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function BlogListGroup() {
    return (
        <div>
            <div className='flex my-4 text-xl font-semibold text-gray-600'>So, why Article Assistant?</div>
            <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                {clients.map((client) => (
                    <li key={client.id} className="overflow-hidden rounded-xl border border-gray-200">
                        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-4">
                            <img
                                src={client.imageUrl}
                                alt={client.name}
                                className="h-8 w-8 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                            />
                            <div className="font-medium leading-6 text-gray-900">{client.name}</div>
                        </div>
                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 leading-6">
                            <div className="flex justify-between gap-x-4 py-3">
                                <div>{client.description}</div>
                            </div>
                        </dl>
                    </li>
                ))}
            </ul>
        </div>
    )
}
