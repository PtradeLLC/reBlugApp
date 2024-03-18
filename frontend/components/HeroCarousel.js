import { useState, useEffect } from 'react'
import Link from 'next/link';

const HeroCarousel = () => {
    const [currentItem, setCurrentItem] = useState(0);

    const carouselItems = [
        {
            title: "Conversational Tool",
            text: 'An AI powered email marketing tool that enhances communication between brands, Marketers and their clients by injecting conversational AI chatbot into the body of an email and/or newsletter.',
            href: '#email-tool',
            tag: '🎉 Just Launched!'
        },
        {
            title: "Social Blogging",
            text: "Embrace Blogger economy's unstoppable wave. Organically harness growth and elevate your brand, whether starting out or established. Use this AI-powered tool to redefine your impact and amplify your influence.",
            href: '#blog-tool',
            tag: '🎉 Just Launched!'
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
                            <span className='font-semibold'>{item.title}</span> - {item.text}
                        </Link>
                        <div className="mt-10 flex items-center gap-x-6 width-[250px]">
                            <Link className="flex justify-center items-center text-sm font-semibold leading-6 text-gray-900" href={item.href}>
                                How it works <span aria-hidden="true">→</span>
                                <span className="ml-3 rounded-md bg-red-600 justify-center px-3.5 text-center w-[180px] h-[40px] py-2.5 sm:text-sm items-center font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
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