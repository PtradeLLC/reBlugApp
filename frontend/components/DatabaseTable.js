
import { useLayoutEffect, useEffect, useRef, useState } from 'react'

const data = [
    {
        id: 'Id',
        title: 'Title',
        email: 'Email',
        subjectLine: 'Subject Line',
        category: 'Category',
        message: 'Message',
        product: 'Product',
        productName: 'Product Name',
        productUrl: 'Product Url',
        role: 'Manager',
        goal: 'Goal',
        knowledgeBase: 'Knowledge Bame',
        contact: ''
    },
    // More data...
]

const campaignData = [
    {
        id: '1',
        title: 'Sample data',
        email: 'email@sample.com',
        subjectLine: 'This is a default message',
        category: 'SaaS',
        message: "This only display if there's no data uploaded",
        product: 'SaaS product',
        productName: 'Saas prod name',
        productUrl: 'www.saas.com',
        role: 'Manager',
        goal: 'To sell alot',
        knowledgeBase: '/doc/test.txt',
    },
]

function classNameNames(...classNamees) {
    return classNamees.filter(Boolean).join(' ')
}

export default function Example() {
    const checkbox = useRef();
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [selecteddata, setSelecteddata] = useState([]);

    function toggleAll() {
        setSelecteddata(checked || indeterminate ? [] : data);
        setChecked(!checked && !indeterminate);
        setIndeterminate(false);
    }

    return (
        <>
            <main className=" md:ml-10 h-auto pt-10 max-w-5xl">
                <div>
                    <h1 className='text-3xl text-gray-700'>Database</h1>
                </div>
                <div className='m-10'>
                    <figure className="max-w-screen-md mx-auto text-center">
                        <svg className="w-7 h-7 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                        </svg>
                        <blockquote>
                            <p className="text-l italic font-light text-gray-700 dark:text-white"> ForgedMart prioritizes the security and privacy of your sensitive information. From your campaign emails to supporting documents. Rather than saving data in our database, you can seamlessly connect your data through trusted sources like Google Sheets. Your data flows through our app to provide you with a secure and efficient way to enhance your user experience while maintaining the utmost confidentiality of your valuable data.</p>
                        </blockquote>
                        <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
                            <img className="w-6 h-6 rounded-full" src="/images/pete.jpg" alt="profile picture" />
                            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
                                <cite className="pe-3 text-sm font-medium text-gray-500 dark:text-white">Posted 2024</cite>
                                <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">ForgedMart Team</cite>
                            </div>
                        </figcaption>
                    </figure>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div
                        className="border-2 text-2xl flex justify-center items-center border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64"
                    >
                        Campaign Data
                    </div>
                    <div
                        className="border-2 text-2xl flex justify-center items-center border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
                    >
                        Knowledge Base Data
                    </div>
                    <div
                        className="border-2 text-2xl flex justify-center items-center border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
                    >
                        Contact List Data
                    </div>
                    <div
                        className="border-2 text-2xl flex justify-center items-center border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
                    >
                        Blog Data
                    </div>
                </div>
                <div className="border-2 border-dashed rounded-lg border-gray-300 h-full w-full dark:border-gray-600 h-96 mb-4">
                    <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5 ">
                        <div className="px-4 mx-auto max-w-screen-2xl ">
                            <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                                <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                                    <div className="flex items-center flex-1 space-x-4">
                                        <h5>
                                            <span className="text-gray-500">Campaign Data:</span>
                                            <span className="dark:text-white">{' '}1</span>
                                        </h5>
                                    </div>
                                    <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                                        <button type="button" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                            <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                            </svg>
                                            Connect Data source
                                        </button>
                                        <button type="button" className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                            </svg>
                                            Export
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="p-4">
                                                    <div className="flex items-center">
                                                        <input id="checkbox-all" type="checkbox" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-red-600 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="checkbox-all" className="sr-only">Select All</label>
                                                    </div>
                                                </th>
                                                {Object.keys(campaignData[0]).map((key) => (
                                                    <th key={key} scope="col" className="px-4 py-3">
                                                        {key}
                                                    </th>
                                                ))}
                                                <th scope="col" className="px-4 py-3">Timestamp</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {campaignData.map((data) => (
                                                <tr key={data.id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <td className="w-4 px-4 py-3">
                                                        <div className="flex items-center">
                                                            <input id={`checkbox-${data.id}`} type="checkbox" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-red-600 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label htmlFor={`checkbox-${data.id}`} className="sr-only">Select Row</label>
                                                        </div>
                                                    </td>
                                                    {Object.values(data).map((value, index) => (
                                                        <td key={index} className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {value}
                                                        </td>
                                                    ))}
                                                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">Just now</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        Showing
                                        <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                                        of
                                        <span className="font-semibold text-gray-900 dark:text-white">10</span>
                                    </span>
                                    <ul className="inline-flex items-stretch -space-x-px">
                                        <li>
                                            <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <span className="sr-only">Previous</span>
                                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <span className="sr-only">Next</span>
                                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div
                        className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
                    ></div>
                    <div
                        className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
                    ></div>

                </div>
            </main>

        </>
    )
}
