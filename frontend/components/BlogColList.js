const posts = [
    {
        id: 1,
        title: 'AI-powered Article Assistant',
        href: '/blogSignupInfo',
        description:
            'In the ever-evolving landscape of the digital age, technology continues to reshape the way we interact with information. One such revolutionary advancement is the integration of artificial intelligence (AI) into the realm of content creation. The AI-powered Article Assistant is a cutting-edge tool that not only empowers bloggers but also enhances the overall experience for readers. In this article, we will explore the multifaceted features of this innovative tool and how it can be a game-changer for the blogging community.',
        imageUrl:
            '/images/deepaiblogger.jpg',
        date: 'Just Posted',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '/blogSignupInfo' },
        author: {
            name: 'Johnny Doh',
            role: 'Blogger at Large',
            href: '#',
            imageUrl:
                '/images/bloggerin.jpg',
        },
    },
    // More posts...
]

export default function AllBlogs() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    <div>
                        <div className="overflow-hidden">
                            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20">
                                <div className="relative mx-auto max-w-4xl grid space-y-5 sm:space-y-10">
                                    <div className="text-center">
                                        <p className="text-xs font-semibold text-gray-500 tracking-wide uppercase mb-3 dark:text-gray-200">
                                            How it works
                                        </p>
                                        <h1 className="text-3xl text-gray-800 font-bold sm:text-5xl lg:text-6xl lg:leading-tight dark:text-gray-200">
                                            Transform your blog into a<span className="text-green-500"> thriving brand!</span>
                                        </h1>
                                    </div>
                                    <div className="sm:flex sm:justify-center sm:items-center text-center sm:text-start">
                                        <div className="flex-shrink-0 pb-5 sm:flex sm:pb-0 sm:pe-5">
                                            <div class="flex justify-center -space-x-3">
                                                <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description" />
                                                <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description" />
                                                <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80" alt="Image Description" />
                                                <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description" />
                                                <span class="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-gray-800 dark:bg-gray-900 dark:ring-gray-800">
                                                    <span class="text-xs font-medium leading-none text-white uppercase">7k+</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="border-t sm:border-t-0 sm:border-s border-gray-200 w-32 h-px sm:w-auto sm:h-full mx-auto sm:mx-0"></div>
                                        <div className="pt-5 sm:pt-0 sm:ps-5">
                                            <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">Bloggers Tool</div>
                                            <div className="text-sm text-gray-500">AI-Powered</div>
                                        </div>
                                    </div>
                                    <div className="mx-auto max-w-2xl sm:flex sm:space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
                                        Click the article below to see how it works
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
                        {posts.map((post) => (
                            <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                                    <a
                                        href={post.category.href}>
                                        <img
                                            src={post.imageUrl}
                                            alt=""
                                            className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                                        />
                                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                                    </a>
                                </div>
                                <div>
                                    <div className="flex items-center gap-x-4 text-xs">
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
                                    <div className="group relative max-w-xl">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                            <a href={post.href}>
                                                <span className="absolute inset-0" />
                                                {post.title}
                                            </a>
                                        </h3>
                                        <p className="mt-5 text-sm leading-6 text-gray-600">{post.description}</p>
                                    </div>
                                    <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                                        <div className="relative flex items-center gap-x-4">
                                            <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
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
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
