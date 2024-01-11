const posts = [
    {
        id: 1,
        title: 'Inbox Gold: Unleashing the Power of Email Marketing for 21st Century Marketers',
        href: '#',
        description:
            'Discover why email marketing is the secret weapon for modern marketers, driving engagement, conversions, and customer loyalty.  Don`t miss out on the inbox goldmine.',
        imageUrl:
            '/images/blog.jpg',
        date: 'Jan 6, 2024',
        datetime: '2020-03-16',
        category: { title: 'Marketing(AI tools)', href: '#' },
        author: {
            name: 'Michael Adedoke',
            role: 'Brand Marketer',
            href: '#',
            imageUrl:
                '/images/blkcreators.jpg',
        },
    },
    {
        id: 1,
        title: 'Crafting Your Personal Brand: A Guide for Bloggers and Influencers',
        href: '#',
        description:
            ' Let`s explore the essential steps for Bloggers and influencers to transform themselves into powerful brands. Discover strategies, tips, and insights to establish a unique and memorable identity in the digital landscape.',
        imageUrl:
            '/images/creatememe.jpg',
        date: 'Dec 24, 2023',
        datetime: '2020-03-16',
        category: { title: 'Bloggers', href: '#' },
        author: {
            name: 'Jody Petite',
            role: 'Blogger',
            href: '#',
            imageUrl:
                '/images/creatorprofile.jpg',
        },
    },
    {
        id: 1,
        title: 'Navigating the E-commerce Landscape: Proven Marketing Strategies for 2024',
        href: '#',
        description:
            ' Dive into the latest trends and strategies shaping the e-commerce landscape in 2024. Factual use cases and sourced insights, to help businesses thrive in the ever-evolving world of online retail. ',
        imageUrl:
            '/images/ecommer.jpg',
        date: 'Dec 16, 2023',
        datetime: '2020-03-16',
        category: { title: 'Marketing(AI tools)', href: '#' },
        author: {
            name: 'Zayn Mollapur',
            role: 'Brand Manager',
            href: '#',
            imageUrl:
                '/images/ecommercez.jpg',
        },
    },
    // More posts...
]

export default function Blog() {
    return (
        <div className="bg-white pt-9 pb-24 sm:pb-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the Blog</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        AI powered blog allow you to research the subject further by having a conversation and asking questions related to the articles.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post.id} className="flex flex-col items-start justify-between">
                            <div className="relative w-full">
                                <img
                                    src={post.imageUrl}
                                    alt=""
                                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                            </div>
                            <div className="max-w-xl">
                                <div className="mt-8 flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.datetime} className="text-gray-500">
                                        {post.date}
                                    </time>
                                    <a
                                        href={post.category.href}
                                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                    >
                                        {post.category.title}
                                    </a>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <a href={post.href}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </a>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-gray-900">
                                            <a href={post.author.href}>
                                                <span className="absolute inset-0" />
                                                {post.author.name}
                                            </a>
                                        </p>
                                        <p className="text-gray-600">{post.author.role}</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
