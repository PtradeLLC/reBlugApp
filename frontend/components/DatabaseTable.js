
import { useLayoutEffect, useEffect, useRef, useState } from 'react'

const data = [
    {
        id: '',
        title: '',
        email: '',
        subjectLine: '',
        message: '',
        product: '',
        productName: '',
        productUrl: '',
        role: '',
        goal: '',
        knowledgeBase: '',
        contact: ''
    },
    // More data...
]

function classNameNames(...classNamees) {
    return classNamees.filter(Boolean).join(' ')
}

export default function Example() {
    const checkbox = useRef();
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [selecteddata, setSelecteddata] = useState([]);

    // const useIsomorphicLayoutEffect =
    //     typeof window !== 'undefined' ? useLayoutEffect : useEffect;

    // useIsomorphicLayoutEffect(() => {
    //     const isIndeterminate =
    //         selecteddata.length > 0 && selecteddata.length < data.length;
    //     setChecked(selecteddata.length === data.length);
    //     setIndeterminate(isIndeterminate);
    //     checkbox.current.indeterminate = isIndeterminate;
    // }, [selecteddata]);

    function toggleAll() {
        setSelecteddata(checked || indeterminate ? [] : data);
        setChecked(!checked && !indeterminate);
        setIndeterminate(false);
    }

    return (
        <>
            <main className="p-4 md:ml-20 h-auto pt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64"
                    >
                        Campaign
                    </div>
                    <div
                        className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
                    >
                        Storage
                    </div>
                    <div
                        className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
                    ></div>
                    {/* <div
                        className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
                    ></div> */}
                </div>
                <div className="border-2 border-dashed rounded-lg border-gray-300 h-full w-full dark:border-gray-600 h-96 mb-4">
                    <section class="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5 ">
                        <div class="px-4 mx-auto max-w-screen-2xl ">
                            <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                                <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                                    <div class="flex items-center flex-1 space-x-4">
                                        <h5>
                                            <span class="text-gray-500">Campaign Data:</span>
                                            <span class="dark:text-white">0</span>
                                        </h5>
                                        {/* <h5>
                                            <span class="text-gray-500">Total sales:</span>
                                            <span class="dark:text-white">$88.4k</span>
                                        </h5> */}
                                    </div>
                                    <div class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                                        <button type="button" class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                            <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                            </svg>
                                            Connect Data source
                                        </button>
                                        {/* <button type="button" class="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                            <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewbox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                            </svg>
                                            Update stocks 1/250
                                        </button> */}
                                        <button type="button" class="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                            <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                            </svg>
                                            Export
                                        </button>
                                    </div>
                                </div>
                                <div class="overflow-x-auto">
                                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="p-4">
                                                    <div class="flex items-center">
                                                        <input id="checkbox-all" type="checkbox" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-red-600 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="checkbox-all" class="sr-only">checkbox</label>
                                                    </div>
                                                </th>
                                                <th scope="col" class="px-4 py-3">Product</th>
                                                <th scope="col" class="px-4 py-3">Category</th>
                                                <th scope="col" class="px-4 py-3">Stock</th>
                                                <th scope="col" class="px-4 py-3">Sales/Day</th>
                                                <th scope="col" class="px-4 py-3">Sales/Month</th>
                                                <th scope="col" class="px-4 py-3">Rating</th>
                                                <th scope="col" class="px-4 py-3">Sales</th>
                                                <th scope="col" class="px-4 py-3">Revenue</th>
                                                <th scope="col" class="px-4 py-3">Last Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <td class="w-4 px-4 py-3">
                                                    <div class="flex items-center">
                                                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                                    </div>
                                                </td>
                                                <th scope="row" class="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <img src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png" alt="iMac Front Image" class="w-auto h-8 mr-3" />
                                                    Apple iMac 27&#34;
                                                </th>
                                                <td class="px-4 py-2">
                                                    <span class="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Desktop PC</span>
                                                </td>
                                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div class="flex items-center">
                                                        <div class="inline-block w-4 h-4 mr-2 bg-red-700 rounded-full"></div>
                                                        95
                                                    </div>
                                                </td>
                                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">1.47</td>
                                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">0.47</td>
                                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div class="flex items-center">
                                                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        <span class="ml-1 text-gray-500 dark:text-gray-400">5.0</span>
                                                    </div>
                                                </td>
                                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div class="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" fill="currentColor" class="w-5 h-5 mr-2 text-gray-400" aria-hidden="true">
                                                            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                                        </svg>
                                                        1.6M
                                                    </div>
                                                </td>
                                                <td class="px-4 py-2">$3.2M</td>
                                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">Just now</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <nav class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
                                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        Showing
                                        <span class="font-semibold text-gray-900 dark:text-white">1-10</span>
                                        of
                                        <span class="font-semibold text-gray-900 dark:text-white">1000</span>
                                    </span>
                                    <ul class="inline-flex items-stretch -space-x-px">
                                        <li>
                                            <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <span class="sr-only">Previous</span>
                                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                        </li>
                                        <li>
                                            <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <span class="sr-only">Next</span>
                                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
        // <div classNameName=" px-4 sm:px-6 lg:px-8">
        //     <div classNameName="sm:flex sm:items-center">
        //         <div classNameName="sm:flex-auto">
        //             <h1 classNameName="text-lg font-semibold leading-6 text-gray-900">Database</h1>
        //             <p classNameName="mt-2 text-sm text-gray-700">
        //                 At ForgedMart, we prioritize data integrity by encouraging users to connect their data sources rather than writing to our databases, allowing information to
        //                 flow through our app without retention, and ensuring the utmost security and privacy protection.
        //             </p>
        //         </div>
        //         {/* <div classNameName="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        //             <button
        //                 type="button"
        //                 classNameName="block rounded-md bg-red-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        //             >
        //                 Add user
        //             </button>
        //         </div> */}
        //     </div>
        //     <div classNameName="mt-8 flow-root">
        //         <div classNameName="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        //             <div classNameName="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        //                 <div classNameName="relative">
        //                     <div classNameName='mb-5'>
        //                         <h2>Campaign Data</h2>
        //                     </div>
        //                     {selecteddata.length > 0 && (
        //                         <div classNameName="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
        //                             <button
        //                                 type="button"
        //                                 classNameName="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
        //                             >
        //                                 Bulk edit
        //                             </button>
        //                             <button
        //                                 type="button"
        //                                 classNameName="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
        //                             >
        //                                 Delete all
        //                             </button>
        //                         </div>
        //                     )}
        //                     <table classNameName="min-w-full table-fixed divide-y divide-gray-300">
        //                         <thead>
        //                             <tr>
        //                                 <th scope="col" classNameName="relative px-7 sm:w-12 sm:px-6">
        //                                     <input
        //                                         type="checkbox"
        //                                         classNameName="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
        //                                         ref={checkbox}
        //                                         checked={checked}
        //                                         onChange={toggleAll}
        //                                     />
        //                                 </th>
        //                                 <th scope="col" classNameName="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
        //                                     Name
        //                                 </th>
        //                                 <th scope="col" classNameName="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        //                                     Title
        //                                 </th>
        //                                 <th scope="col" classNameName="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        //                                     Subject Line
        //                                 </th>
        //                                 <th scope="col" classNameName="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        //                                     Message
        //                                 </th>
        //                                 <th scope="col" classNameName="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        //                                     Product
        //                                 </th>
        //                                 <th scope="col" classNameName="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        //                                     Product Name
        //                                 </th>
        //                                 <th scope="col" classNameName="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        //                                     ProductUrl
        //                                 </th>
        //                                 <th scope="col" classNameName="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        //                                     Goal
        //                                 </th>
        //                                 <th scope="col" classNameName="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        //                                     Knowledge Base
        //                                 </th>
        //                                 <th scope="col" classNameName="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        //                                     Contact List
        //                                 </th>
        //                                 <th scope="col" classNameName="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        //                                     Email
        //                                 </th>
        //                                 <th scope="col" classNameName="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        //                                     Role
        //                                 </th>
        //                                 <th scope="col" classNameName="relative py-3.5 pl-3 pr-4 sm:pr-3">
        //                                     <span classNameName="sr-only">Edit</span>
        //                                 </th>
        //                             </tr>
        //                         </thead>
        //                         <tbody classNameName="divide-y divide-gray-200 bg-white">
        //                             {data.map((item) => (
        //                                 <tr key={item.email} classNameName={selecteddata.includes(item) ? 'bg-gray-50' : undefined}>
        //                                     <td classNameName="relative px-7 sm:w-12 sm:px-6">
        //                                         {selecteddata.includes(item) && (
        //                                             <div classNameName="absolute inset-y-0 left-0 w-0.5 bg-red-600" />
        //                                         )}
        //                                         <input
        //                                             type="checkbox"
        //                                             classNameName="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
        //                                             value={item.email}
        //                                             checked={selecteddata.includes(item)}
        //                                             onChange={(e) =>
        //                                                 setSelecteddata(
        //                                                     e.target.checked
        //                                                         ? [...selecteddata, item]
        //                                                         : selecteddata.filter((p) => p !== item)
        //                                                 )
        //                                             }
        //                                         />
        //                                     </td>
        //                                     <td
        //                                         classNameName={classNameNames(
        //                                             'whitespace-nowrap py-4 pr-3 text-sm font-medium',
        //                                             selecteddata.includes(item) ? 'text-red-600' : 'text-gray-900'
        //                                         )}
        //                                     >
        //                                         {item.name}
        //                                     </td>
        //                                     <td classNameName="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.title}</td>
        //                                     <td classNameName="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.email}</td>
        //                                     <td classNameName="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.subjectLine}</td>
        //                                     <td classNameName="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.role}</td>
        //                                     {/* <td classNameName="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
        //                                         <a href="#" classNameName="text-red-600 hover:text-red-900">
        //                                             Edit<span classNameName="sr-only">, {item.name}</span>
        //                                         </a>
        //                                     </td> */}
        //                                 </tr>
        //                             ))}
        //                         </tbody>
        //                     </table>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}
