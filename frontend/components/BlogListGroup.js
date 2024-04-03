
const clients = [
    {
        id: 1,
        name: 'Meaningful Reference',
        imageUrl: '/images/meaning.png',
        description: 'While interacting with your article, your readers are able to derive meaningful points from your researched article as they continue to read.',
    },
    {
        id: 2,
        name: 'Research Tool',
        imageUrl: '/images/blogger.png',
        description: 'Put power in your readers hands by giving them the tool to interact with the chatbot, research your articles, and gain some insights - all done right on the page.',
    },
    {
        id: 3,
        name: 'Facilitate Growth in Readership',
        imageUrl: '/images/Growth.png',
        description: 'AI tool is trained to nudge and encourage readers to sign up and subscribe to  your publication for variety of reason, one of which is to follow up with accurate information on specific questions asked.',
    },
    {
        id: 4,
        name: 'Auto Pilot',
        imageUrl: '/images/autopilot.png',
        description: 'With our AI tool, simply upload your writing style and adjust preset features. The tool is trained to replicate your writing style and can publish articles on your behalf upon your approval.',
    },
    {
        id: 5,
        name: 'Blog as A Brand',
        imageUrl: '/images/Growth.png',
        description: 'Tool is packed with an array of features that can be used to set monetization for your blog - e.g: "sponsored Reference" feature allows authors to reference related products or services as part of their articles.',
    },
    {
        id: 6,
        name: 'Social Blogging',
        imageUrl: '/images/platformblog.png',
        description: 'Your blog articles are formatted for various media (e.g: Blogs, Newsletters, and Social Media) by AI tool as you click to publish.',
    },
]

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
                            <div className="text-sm font-medium leading-6 text-gray-900">{client.name}</div>
                        </div>
                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
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
