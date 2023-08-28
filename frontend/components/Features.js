const features = [
    { name: 'What is a Chatbot?', description: 'Powered by artificial intelligence, Chatbot is computer program that simulates human conversation through text or voice interactions.' },
    { name: 'Chatbot In Email', description: ' Email is a cost-effective and targeted way to reach a large audience; and integrating chatbot into personalized emails to your recipients helps brands build stronger relationships. ' },
    { name: 'As Marketing Tool', description: 'Our Chatbot can generate leads, provide product information, and answer questions about a company`s products or services.' },
    { name: 'As Sales Tool', description: 'Our Chatbot can be used to close sales by providing product demonstrations, and offering discounts or cross-promotions.' },
    { name: 'Reporting', description: ' It`s important to track the results of your email marketing campaigns so you can see what`s working and what`s not. Via our dashboard you can track open rates, click-through rates, and conversion rates and other metrics even in real time. ' },
    { name: 'Advantages of Chatbot', description: 'Our tool offer a number of advantages over traditional customer service channels, such as 24/7 availability, scalability, SMS marketing, and cost-effectiveness.' },
]

export default function Features() {

    return (
        <div className="bg-white">
            <div className="apply-margin mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Product and Features</h2>
                    <h3 className="mt-4 text-gray-500">
                        Embed conversational AI chatbot into your emails and newsletters.
                        Help customers, sell products and service in real‑time within email messages.
                    </h3>
                    <p className="mt-4 text-gray-500">
                        With our Conversational Email Tool your email recipients can chat with an AI chatbot within the body of your email messages to get answers about your brand, products, and services.
                        The chatbot is powered by your knowledge-based documents to provide information about your company, uploaded products and services. Recipients can get the information and the help they need without having to contact your customer support team if they choose not to or reach out to human counterparts if needed.
                        Upload your product information, and let AI chatbot close sales and subscriptions on your behalf with our conversational AI commerce technology.
                        Integrate and connect with your existing apps and tools you know and love.
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
                <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                    <img
                        src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
                        alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                        className="rounded-lg bg-gray-100"
                    />
                    <img
                        src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
                        alt="Top down view of walnut card tray with embedded magnets and card groove."
                        className="rounded-lg bg-gray-100"
                    />
                    <img
                        src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
                        alt="Side of walnut card tray with card groove and recessed card area."
                        className="rounded-lg bg-gray-100"
                    />
                    <img
                        src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
                        alt="Walnut card tray filled with cards and card angled in dedicated groove."
                        className="rounded-lg bg-gray-100"
                    />
                </div>
            </div>
        </div>
    )
}
