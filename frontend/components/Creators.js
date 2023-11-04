const features = [
    { name: 'As a Platform', description: 'Designed to be intuitive and user-friendly, manage your messaging platform efficiently with more time to focus on creating exceptional content.' },
    { name: 'Get a personal SMS number', description: 'Sign up for a ForgedMart account and get your free SMS number. You can use this number instead of your real mobile phone number.' },
    { name: 'Invite everyone', description: 'Your free SMS number is one you can publicly share on social media with your audience, and it`s equipped with all the features any mobile number has.' },
    { name: 'Audience as a Group', description: 'Your audience joins as a group, and you can use all the features your phone allows: Go live with FaceTime, share images and videos e.t.c.' },
    { name: 'SMS Features', description: 'Using this number followers can connect by sending you and each other messages via text, share media assets, Go live with FaceTime,  and if you don`t want to receive messages at any point in time - put it on silent, your personalized chatbot would take over on your behalf.' },
    { name: 'Monetizing your Platform', description: 'Monetize your platform with brand representations, Accept donations for contents well done, Affiliate partnerships, With Mobile Commerce enabled you can sell your products & services.' },
]

export default function Creators() {

    return (
        <div className="bg-white">
            <div className="apply-margin mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Messaging as a Platform</h2>
                    <h3 className="mt-4 text-gray-500">
                        Messaging has evolved far beyond simple text conversations; it has become a powerful tool for content creators to connect with their followers in a more personalized and interactive way.
                    </h3>
                    <p className="mt-4 text-gray-500">
                        With Messaging as a Platform (MaaP), you can transform your social media presence into a personalized, immersive experience that keeps your audience engaged on a deeper level.
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
                <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8 lg:mt-[-322px]">
                    <img
                        src="/images/pile2.png"
                        alt="Walnut card tray filled with cards and card angled in dedicated groove."
                        className="rounded-lg bg-gray-100"
                    />
                    <img
                        src="/images/mcommerce.jpg"
                        alt="Mobile Commerce."
                        className="rounded-lg bg-gray-100"
                    />
                    <img
                        src="/images/messaging.jpg"
                        alt="Platform Messaging."
                        className="rounded-lg bg-gray-100"
                    />
                    <img
                        src="/images/pileo2.png"
                        alt="Mobile commerce."
                        className="rounded-lg bg-gray-100"
                    />
                </div>
            </div>
        </div>
    )
}
