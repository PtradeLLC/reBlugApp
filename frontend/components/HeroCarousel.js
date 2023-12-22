import { useState, useEffect } from 'react'
import Link from 'next/link';

const HeroCarousel = () => {
    const [currentItem, setCurrentItem] = useState(0);

    const carouselItems = [
        {
            title: "Email Conversational Tool",
            text: 'An AI powered marketing tool that enhances communication between brand Marketers, Sales professionals and their clients/customers by injecting conversational AI chatbot into the body of an email and/or newsletter.',
            href: '/register',
            tag: '🎉 Just Launched!'
        },
        {
            title: "Creator as a Platform",
            text: "Embrace the Creator economy's unstoppable wave. Elevate your brand, whether starting out or established. Use this AI-powered tool to redefine your impact and amplify your influence. Combine and Engage your on one platform",
            href: '/#creator-as-platform',
            tag: 'Join the Waiting list'
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentItem((prevItem) => (prevItem + 1) % carouselItems.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id="default-carousel" className="relative w-full" data-carousel="slide">
            {carouselItems.map((item, index) => (
                <div
                    key={index}
                    className={`${index === currentItem ? 'duration-700 ease-in-out' : 'hidden'
                        }`}
                    data-carousel-item
                >
                    <div className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                        <span className="font-extrabold text-red-500">{item.tag}: </span>
                        <Link href={item.href}>
                            <span className='font-semibold'>{item.title}</span>  : {item.text}
                        </Link>
                        <div className="mt-10 flex items-center gap-x-6 width-[250px]">
                            <Link className="flex justify-center items-center text-sm font-semibold leading-6 text-gray-900" href={item.href}>
                                How it works <span aria-hidden="true">→</span>
                                <span className="ml-3 rounded-md bg-red-600 px-3.5 text-center w-[200px] h-[52px] py-2.5 sm:text-sm items-center font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                    {item.title}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default HeroCarousel