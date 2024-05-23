import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import HeroCarousel from './HeroCarousel'

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-white w-full">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
      </svg>
      <div className="mx-auto px-6 pb-24 pt-10 sm:pb-28 lg:flex lg:px-8 lg:py-20">
        {/* lg:py-36 */}
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
          <div className="mt-20 sm:mt-32 lg:mt-8">

            <span className="rounded-full mr-2 bg-slate-600/10 px-3 py-1 text-sm font-semibold leading-6 text-black ring-1 ring-inset ring-red-600/10">
              What&apos;s new
            </span>
            <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
              <a href="#blog-tool" className="sm:inline-flex md:space-x-6 lg:space-x-6">
                <span className='text-green-700 whatsnew'>ReBlug App: Live on App stores</span>
              </a>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>

          </div>
          <h1 className="mt-10 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-2xl hero-text">
            Every Brand and Marketer has an ongoing <span className='text-red-700 underline'>Thing</span> or two to tackle when it comes to <span className='text-green-900 text-2xl'>growth</span> marketing
          </h1>
          <h2 className="mt-10 text-2xl tracking-tight text-gray-700 sm:text-2xl hero-text">
            We solve <span className='text-red-700 hero-text'>things</span> by providing a “blogger-first”
            platform where brands and marketers connect with talented bloggers, and utilizing tools and
            technologies developed to bolster growth.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 hero-text">
            Specifically by making blogging interactive, social and useful for marketing through the use of
            software, AI-powered technologies, and automation tools.
          </p>
          <div className="mt-2 flex items-center gap-x-6 smaller-gap">
            <HeroCarousel />
          </div>
        </div>
        <div className="mx-auto flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none  xl:ml-32 hidedivmf ">
          <div className="max-w-3xl flex-none sm:max-w-5xl  lg:max-w-none ">
            <div className="mt-2 rounded-xl bg-gray-900/5 p-2 ring-1  ring-inset hidedivmf ring-gray-900/10 lg:m-4 lg:rounded-2xl lg:p-4 hidedivmf">
              <img
                src="/images/heroimgetwo.png"
                alt="App screenshot"
                width={950}
                height={640}
                className="rounded-md shadow-2xl ring-1 md:block ring-gray-900/10 "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
