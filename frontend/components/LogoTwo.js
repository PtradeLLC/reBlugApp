export default function LogoTwo() {

    const partners = [
        {
            name: "",
            image: "",
            url: ""
        }
    ];

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
                    <div className="mx-auto w-full max-w-xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Few of the notable brands and companies we're lucky to call partners</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Being partners with us can be mutually beneficial in many ways. Increased brand awareness,
                            Joint marketing opportunities, and Increased sales opportunities to name a few.  Our
                            partnership can be a mutually beneficial relationship that can help us achieve our
                            business goals sooner.
                        </p>
                        <div className="mt-8 flex items-center gap-x-6">
                            <a
                                href="#"
                                className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                Let's be partners
                            </a>
                            <a href="#" className="text-sm font-semibold text-gray-900">
                                Get Started <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <div className="mx-auto grid w-full max-w-xl grid-cols-2 items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
                        <img
                            className="max-h-12 w-[130px] object-contain object-left"
                            src="/images/onramp.png"
                            alt="onramp-funds"
                        />
                        <img
                            className="max-h-12 w-full object-contain object-left"
                            src="/images/y_combinator.png"
                            alt="YCombinator"
                            width={104}
                            height={48}
                        />
                        <img
                            className="max-h-12 w-full object-contain object-left"
                            src="/images/shopifylogo.png"
                            alt="Shopify"
                            width={140}
                            height={48}
                        />
                        <img
                            className="max-h-12 w-full object-contain object-left"
                            src="/images/stripe.jpeg"
                            alt="Stripe"
                            width={136}
                            height={48}
                        />
                        <img
                            className="max-h-12 w-full object-contain object-left"
                            src="/images/Deep.jpeg"
                            alt="Deepgram"
                            width={158}
                            height={48}
                        />
                        <img
                            className="max-h-12 w-full object-contain object-left"
                            src="/images/twilio.png"
                            alt="Twillio"
                            width={120}
                            height={38}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
