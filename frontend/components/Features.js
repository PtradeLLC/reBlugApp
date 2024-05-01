const features = [
    { name: 'What is a Email ChatBot?', description: 'Powered by artificial intelligence, Email ChatBot is computer program that simulates human conversation through text or voice interactions.' },
    { name: 'Email ChatBot In Email', description: ' Email is a cost-effective and targeted way to reach a large audience; and integrating Email ChatBot into personalized emails to your recipients helps brands build stronger relationships. ' },
    { name: 'As Marketing Tool', description: 'Our Email ChatBot can generate leads, provide product information, and answer questions about a company`s products or services.' },
    { name: 'As Sales Tool', description: 'Our Email ChatBot can be used to close sales by providing product demonstrations, and offering discounts or cross-promotions.' },
    { name: 'Reporting', description: ' It`s important to track the results of your email marketing campaigns so you can see what`s working and what`s not. Via our dashboard you can track open rates, click-through rates, and conversion rates and other metrics even in real time. ' },
    { name: 'Advantages of Email ChatBot', description: 'Our tool offer a number of advantages over traditional customer service channels, such as 24/7 availability, scalability, SMS marketing, cross promotion, and cost-effectiveness.' },
    { name: 'Cross Marketing', description: 'If this feature is enabled, our Email ChatBot will recommend your product/services (within same category) to email recipients on page exit. This helps boost sales and subscriptions.' },
    { name: 'Who is this for', description: 'Businesses, Startup companies, eCommerce brands, Social media Influencers and Bloggers.' },
]

export default function Features() {

    return (
        <div className="bg-white">
            <div className="apply-margin mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                <div id="prod-feat">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Product and Features</h2>
                    <h3 className="mt-4 text-gray-500">
                        Email Email ChatBot is an AI-powered marketing tool that helps businesses improve their email
                        communication by embedding a Email ChatBot into their emails and newsletters.
                        This allows email recipients to interact with a knowledge-based Email ChatBot that can answer their questions
                        and provide support, help with fundraising, sales, marketing, and more.
                    </h3>
                    <p className="mt-4 text-gray-500">Here is an example of how Email Email ChatBot can be used:</p>
                    <ul className="list-disc mt-4 text-gray-500">
                        <li>A non-profit organization could use Email Email ChatBot to embed a Email ChatBot into their donation email.
                            The Email ChatBot could answer questions about the organization's mission and programs, and help donors make a
                            donation.
                        </li>
                        <li>An e-commerce company could use Email Email ChatBot to embed a Email ChatBot into their product newsletter.
                            The Email ChatBot could answer questions about the company's products, help customers place an order, and track
                            their shipments.
                        </li>
                        <li>A software company could use Email Email ChatBot to embed a Email ChatBot into their customer support email.
                            The Email ChatBot could answer questions about the company's software, help customers troubleshoot problems, and
                            create support tickets.
                        </li>
                        <li>Businesses can use Email Email ChatBot in a variety of ways to improve their email marketing
                            campaigns and support their clients.
                        </li>
                    </ul>
                    <p className="mt-4 text-gray-500 font-semibold">This tool addresses these pain points for businesses and organizations in multiple industries</p>
                    <ul className="list-disc mt-4 text-gray-500">
                        <li><span className="text-gray-500 font-semibold">Generate leads:</span> Businesses can use Email Email ChatBot to generate leads for their clients by
                            embedding a Email ChatBot into their email marketing campaigns. The Email ChatBot can ask potential leads qualifying questions and collect their contact information.
                        </li>
                        <li><span className="text-gray-500 font-semibold">Nurture leads:</span> Businesses can use Email Email ChatBot to nurture leads for their clients by providing them with personalized content and support.
                            The Email ChatBot can answer their questions, send them relevant content, and guide them through the sales funnel.
                        </li>
                        <li><span className="text-gray-500 font-semibold">Provide customer support:</span> Businesses can use Email Email ChatBot to provide customer support for their clients. The Email ChatBot can answer customer
                            questions, resolve issues, and collect feedback.
                        </li>
                        <li><span className="text-gray-500 font-semibold">Collect feedback:</span> Businesses can use Email Email ChatBot to collect feedback from their clients. The Email ChatBot can ask customers about their
                            satisfaction with the services and products, and collect their suggestions for improvement.
                        </li>
                    </ul>

                    <p className="mt-4 text-gray-500">
                        Email Email ChatBot is a powerful tool that can help businesses of all sizes improve their email communication
                        and achieve their marketing goals.
                    </p>
                    <p className="mt-4 text-gray-500">Getting started is easy: Sign up or login, import your existing contact list from
                        a spreadsheet/connect to your CMS or grow your email list with us from scratch, upload your knowledge-base document.
                        It is as simple as that.
                    </p>

                    <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                        {features.map((feature) => (
                            <div key={feature.name} className="border-t border-gray-200 pt-4">
                                <dt className="font-medium text-gray-900">{feature.name}</dt>
                                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8 lg:mt-[-1356px]">
                    <img
                        src="/images/Bloggerplat.jpg"
                        alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                        className="rounded-lg bg-gray-100"
                    />
                    <img
                        src="/images/branding.jpg"
                        alt="Top down view of walnut card tray with embedded magnets and card groove."
                        className="rounded-lg bg-gray-100"
                    />
                    <img
                        src="/images/broadreach.jpg"
                        alt="Side of walnut card tray with card groove and recessed card area."
                        className="rounded-lg bg-gray-100"
                    />
                    <img
                        src="/images/mail.jpg"
                        alt="Walnut card tray filled with cards and card angled in dedicated groove."
                        className="rounded-lg bg-gray-100"
                    />
                </div>
            </div>
        </div>
    )
}
