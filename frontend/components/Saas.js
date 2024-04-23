import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";



function Dropdown({ options, placeholder }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleOption = (optionId) => {
        if (selectedOptions.includes(optionId)) {
            setSelectedOptions(selectedOptions.filter(id => id !== optionId));
        } else {
            setSelectedOptions([...selectedOptions, optionId]);
        }
    };

    return (
        <div className="relative w-full">
            <p className="block text-sm font-medium leading-6 text-gray-900">Select Product Category<br /> (select multiple if applicable)</p>
            <button
                type="button"
                className="block w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                onClick={toggleDropdown}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby="listbox-label"
            >
                <span className="block truncate">{selectedOptions?.length > 0 ? selectedOptions.map(id => options.find(option => option.id === id).name).join(', ') : placeholder}</span>
            </button>
            {isOpen && (
                <div className="absolute mt-1 w-full rounded-md bg-white z-10 shadow-lg">
                    <ul
                        tabIndex={-1}
                        role="listbox"
                        aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-item-3"
                        className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                    >
                        {options.map(option => (
                            <li
                                key={option.id}
                                className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-red-500 hover:text-white"
                                onClick={() => toggleOption(option.id)}
                            >
                                <div className="flex items-center">
                                    {selectedOptions && selectedOptions.includes && selectedOptions.includes(option.id) && (
                                        <span
                                            className="absolute text-black inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
                                        >
                                            {option.name}
                                        </span>
                                    )}

                                    {selectedOptions.includes(option.id) && (
                                        <span
                                            className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
                                        >
                                            x
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default function Saas() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loadingStateIndex, setLoadingStateIndex] = useState(0);
    const [loadingStatusIndex, setLoadingStatusIndex] = useState(0);
    const [textData, setTextData] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);
    const [showLoadingStatus, setShowLoadingStatus] = useState(false);
    const [loadingStateStatus, setLoadingStateStatus] = useState([
        {
            id: 1,
            goal: 'Product Launch',
            loadingStatus: [
                { id: 1, status: "Preparing data for Channel Distribution" },
                { id: 1, status: "Conducting Product Analysis" },
                { id: 2, status: "Conducting Competitive Analysis" },
                { id: 3, status: "Researching Ideal Customer Profile" },
                { id: 4, status: "Defining Ideal Customer Profile" },
                { id: 5, status: "Developing Customer Personas" },
            ],
        },
        {
            id: 2,
            goal: 'Generate Leads',
            loadingStatus: [
                { id: 1, status: "Preparing data for Channel Distribution" },
                { id: 2, status: "Identifying Complementary Brands" },
                { id: 3, status: "Configuring Lead Magnets" },
                { id: 4, status: "Conducting Competitive Analysis" },
                { id: 5, status: "Developing Customer Personas" },
            ],
        },
        {
            id: 3,
            goal: 'Raise Awareness',
            loadingStatus: [
                { id: 1, status: "Preparing data for Channel Distribution" },
                { id: 2, status: "Identifying Complementary Brands" },
                { id: 3, status: "Configuring Lead Magnets" },
                { id: 4, status: "Conducting Competitive Analysis" },
                { id: 5, status: "Developing Customer Personas" },
            ],
        },
        {
            id: 4,
            goal: 'SaaS Subscription',
            loadingStatus: [
                { id: 1, status: "Preparing data for Channel Distribution" },
                { id: 2, status: "Identifying Complementary Brands" },
                { id: 3, status: "Configuring Lead Magnets" },
                { id: 4, status: "Conducting Competitive Analysis" },
                { id: 5, status: "Developing Customer Personas" },
            ],
        },
        {
            id: 5,
            goal: 'Sell Tickets',
            loadingStatus: [
                { id: 1, status: "Preparing data for Channel Distribution" },
                { id: 2, status: "Identifying Complementary Brands" },
                { id: 3, status: "Configuring Lead Magnets" },
                { id: 4, status: "Conducting Competitive Analysis" },
                { id: 5, status: "Developing Customer Personas" },
            ],
        },
        {
            id: 6,
            goal: 'Product Sales',
            loadingStatus: [
                { id: 1, status: "Preparing data for Channel Distribution" },
                { id: 2, status: "Identifying Complementary Brands" },
                { id: 3, status: "Configuring Lead Magnets" },
                { id: 4, status: "Conducting Competitive Analysis" },
                { id: 5, status: "Developing Customer Personas" },
            ],
        },
        {
            id: 7,
            goal: 'Raise Funds',
            loadingStatus: [
                { id: 1, status: "Preparing data for Channel Distribution" },
                { id: 2, status: "Identifying Complementary Brands" },
                { id: 3, status: "Configuring Lead Magnets" },
                { id: 4, status: "Conducting Competitive Analysis" },
                { id: 5, status: "Developing Customer Personas" },
            ],
        },
        {
            id: 8,
            goal: 'Newsletter - Communication',
            loadingStatus: [
                { id: 1, status: "Preparing data for Channel Distribution" },
                { id: 2, status: "Identifying Complementary Brands" },
                { id: 3, status: "Configuring Lead Magnets" },
                { id: 4, status: "Conducting Competitive Analysis" },
                { id: 5, status: "Developing Customer Personas" },
            ],
        },
        {
            id: 9,
            goal: 'Newsletter - Marketing',
            loadingStatus: [
                { id: 1, status: "Preparing data for Channel Distribution" },
                { id: 2, status: "Identifying Complementary Brands" },
                { id: 3, status: "Configuring Lead Magnets" },
                { id: 4, status: "Conducting Competitive Analysis" },
                { id: 5, status: "Developing Customer Personas" },
            ],
        },
    ]);


    const [formData, setFormData] = useState({
        title: "",
        feature01: "",
        feature02: "",
        feature03: "",
        demographic: "",
        company: "",
        geographic: "",
        job_title: "",
        about: "",
        objectives: "",
        client_type: "",
        pain_point01: "",
        pain_point02: "",
        pain_point03: "",
        pain_point04: "",
        unique01: "",
        unique02: "",
        unique03: "",
        unique04: "",
        tool01: "",
        tool02: "",
        tool03: "",
        tool04: ""
    }
    );

    const categories = [
        { id: 1, name: 'Customer Relationship Management (CRM)', online: true },
        { id: 2, name: 'Human Resources Management (HRM)', online: true },
        { id: 3, name: 'Project Management', online: true },
        { id: 4, name: 'Project Management', online: true },
        { id: 5, name: 'Accounting and Finance', online: true },
        { id: 6, name: 'Collaboration and Communication', online: true },
        { id: 7, name: 'Marketing Automation', online: true },
        { id: 8, name: 'E-commerce Solutions', online: true },
        { id: 9, name: 'Enterprise Resource Planning (ERP)', online: true },
        { id: 10, name: 'Content Management Systems (CMS)', online: true },
        { id: 11, name: 'Business Intelligence and Analytics', online: true },
        { id: 12, name: 'Supply Chain Management', online: true },
        { id: 13, name: 'Learning Management Systems (LMS)', online: true },
        { id: 14, name: 'IT Service Management (ITSM)', online: true },
        { id: 15, name: 'Healthcare Management Systems', online: true },
    ];

    const clientelle = [
        { id: 1, title: "B2B" },
        { id: 2, title: "B2C" },
        { id: 3, title: "Both" }
    ];


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRadioChange = (event) => {
        const { value } = event.target;
        setFormData({
            ...formData,
            client_type: value,
        });
    };

    //POST Request to submit Form
    const handleLaunch = async () => {
        setShowLoadingStatus(true);
        loadNextStatus();

        try {
            // Make the POST request to the API endpoint
            const response = await fetch('/api/productLaunchStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();


                console.log('Data structure:', data); // Log data structure
                setTextData(data);
                console.log('handleLaunch: type of Data:', typeof data);
                console.log('handleLaunch: type of Data:', typeof textData);
            } else {
                console.log('Response not okay:', response.statusText);
            }
        } catch (error) {
            // Handle any unexpected errors
            console.error('Error making POST request:', error.message);
        } finally {
            // Hide loading status after API call completes
            setShowLoadingStatus(false);
        }
    };

    // Call handleLaunch when component mounts
    useEffect(() => {
        console.log('type of text data INSIDE useEffect:', typeof textData);
    }, [textData]);




    const loadNextStatus = () => {
        if (loadingStateIndex >= loadingStateStatus.length) {
            setShowLoadingStatus(false);
            return;
        }

        const currentStatuses = loadingStateStatus[loadingStateIndex].loadingStatus;
        if (loadingStatusIndex >= currentStatuses.length) {
            setLoadingStateIndex(prevIndex => prevIndex + 1);
            setLoadingStatusIndex(0);
            const id = setTimeout(loadNextStatus, 3000); // Load next loading state after 3 seconds
            setTimeoutId(id); // Set the timeoutId
            return;
        }

        // Access the status if it exists
        const status = currentStatuses[loadingStatusIndex]?.status || "Unknown";

        setLoadingStatusIndex(prevIndex => prevIndex + 1);

        // Check if loadingStateIndex is still within bounds before scheduling the next iteration
        if (loadingStateIndex < loadingStateStatus.length) {
            const id = setTimeout(loadNextStatus, 3000);
            setTimeoutId(id); // Set the timeoutId
        }
    };

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const baseUrl = '/api/someendpoint';

            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify()
            });

            if (response.ok) {
                const data = await response.json();
                const responseData = data.text;

                setTextData(responseData);
            } else {
                console.log('Response not okay:', response.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">The Product</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            The purpose of this section is to gather some information about your product
                            so we can create an Ideal Customer Profile.
                        </p>
                    </div>

                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="col-span-full">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="block flex-1 w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter product name"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Url
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">http://</span>
                                    <input
                                        type="text"
                                        name="website"
                                        id="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="www.example.com"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <div className="w-full">
                                {/* Dropdown menu */}
                                <div className="grid max-w-4xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 md:col-span-3">
                                    <div className="col-span-full">
                                        <Dropdown options={categories} placeholder="Select Categories ⇣" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Client Type</label>
                            <fieldset className="">
                                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                    {clientelle.map((client) => (
                                        <div key={client.id} className="flex items-center">
                                            <input
                                                id={client.id}
                                                name="client_type"
                                                value={client.title}
                                                type="radio"
                                                checked={formData.client_type === client.title}
                                                onChange={handleRadioChange}
                                                className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                                            />
                                            <label htmlFor={client.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                                {client.title}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="features" className="block text-sm font-medium leading-6 text-gray-900">
                                Features & Benefits (List some features or benefits)
                            </label>
                            <div className="mt-2">
                                <div className="isolate -space-y-px rounded-md shadow-sm">
                                    <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                        <label htmlFor="feature01" className="block text-xs font-medium text-gray-900">
                                            Feature #1
                                        </label>
                                        <input
                                            type="text"
                                            name="feature01"
                                            id="feature01"
                                            value={formData.feature01}
                                            onChange={handleChange}
                                            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="What specific features does your app offer"
                                        />
                                    </div>
                                    <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                        <label htmlFor="feature02" className="block text-xs font-medium text-gray-900">
                                            Feature #2
                                        </label>
                                        <input
                                            type="text"
                                            name="feature02"
                                            id="feature02"
                                            value={formData.feature02}
                                            onChange={handleChange}
                                            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Enter feature #2"
                                        />
                                    </div>
                                    <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                        <label htmlFor="feature03" className="block text-xs font-medium text-gray-900">
                                            Feature #3
                                        </label>
                                        <input
                                            type="text"
                                            name="feature03"
                                            id="feature03"
                                            value={formData.feature03}
                                            onChange={handleChange}
                                            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Enter feature #3"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="demographic" className="block text-sm font-medium leading-6 text-gray-900">
                                Demographic (Target Audience)
                            </label>
                            <div className="isolate -space-y-px rounded-md shadow-sm">
                                <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                    <label htmlFor="demographic" className="block text-xs font-medium text-gray-900">
                                        Industry
                                    </label>
                                    <input
                                        type="text"
                                        name="demographic"
                                        value={formData.demographic}
                                        onChange={handleChange}
                                        id="demographic"
                                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Industry, company size, geographic location, job titles."
                                    />
                                </div>
                                <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                    <label htmlFor="company" className="block text-xs font-medium text-gray-900">
                                        Company Type
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        id="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="e.g: Start Up"
                                    />
                                </div>
                                <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                    <label htmlFor="geographic" className="block text-xs font-medium text-gray-900">
                                        Geographic location
                                    </label>
                                    <input
                                        type="text"
                                        name="geographic"
                                        id="geographic"
                                        value={formData.geographic}
                                        onChange={handleChange}
                                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="US"
                                    />
                                </div>
                                <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                    <label htmlFor="job_title" className="block text-xs font-medium text-gray-900">
                                        User job title (if applicable)
                                    </label>
                                    <input
                                        type="text"
                                        name="job_title"
                                        id="job_title"
                                        value={formData.job_title}
                                        onChange={handleChange}
                                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Sales Manager"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                Tell us about the product
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="about"
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                    placeholder='Write a few sentences to describe your product.'
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="objectives" className="block text-sm font-medium leading-6 text-gray-900">
                                Your Objectives
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="objectives"
                                    name="objectives"
                                    value={formData.objectives}
                                    onChange={handleChange}
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                    placeholder='Clearly outline what you aim to achieve through this market research. Identify specific questions you want to answer about your target market, including their demographics, pain points, preferences, and behaviors.'
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="pain-point" className="block text-sm font-medium leading-6 text-gray-900">
                                Pain points and challenges
                            </label>
                            <div className="isolate -space-y-px rounded-md shadow-sm">
                                <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                    <label htmlFor="pain_point01" className="block text-xs font-medium text-gray-900">
                                        Pain point #1
                                    </label>
                                    <input
                                        type="text"
                                        name="pain_point01"
                                        id="pain_point01"
                                        value={formData.pain_point01}
                                        onChange={handleChange}
                                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="What are specific problems that your product solves."
                                    />
                                </div>
                                <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                    <label htmlFor="pain_point02" className="block text-xs font-medium text-gray-900">
                                        Pain point #2
                                    </label>
                                    <input
                                        type="text"
                                        name="pain_point02"
                                        id="pain_point02"
                                        value={formData.pain_point02}
                                        onChange={handleChange}
                                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter pain point #2"
                                    />
                                </div>
                                <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                    <label htmlFor="pain_point03" className="block text-xs font-medium text-gray-900">
                                        Pain point #3
                                    </label>
                                    <input
                                        type="text"
                                        name="pain_point03"
                                        id="pain_point03"
                                        value={formData.pain_point03}
                                        onChange={handleChange}
                                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter pain point #3"
                                    />
                                </div>
                                <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                    <label htmlFor="pain_point04" className="block text-xs font-medium text-gray-900">
                                        Pain point #4
                                    </label>
                                    <input
                                        type="text"
                                        name="pain_point04"
                                        value={formData.pain_point04}
                                        onChange={handleChange}
                                        id="pain_point04"
                                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter pain point #4"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="pain-point" className="block text-sm font-medium leading-6 text-gray-900">
                                Unique selling proposition
                            </label>
                            <div className="isolate -space-y-px rounded-md shadow-sm">
                                <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                    <label htmlFor="unique01" className="block text-xs font-medium text-gray-900">
                                        Unique Selling proposition
                                    </label>
                                    <input
                                        type="text"
                                        name="unique01"
                                        value={formData.unique01}
                                        onChange={handleChange}
                                        id="unique01"
                                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="What makes your product unique."
                                    />
                                </div>
                                <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                    <label htmlFor="unique02" className="block text-xs font-medium text-gray-900">
                                        Unique Selling proposition
                                    </label>
                                    <input
                                        type="text"
                                        name="unique02"
                                        id="unique02"
                                        value={formData.unique02}
                                        onChange={handleChange}
                                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="How is your product different from similar products"
                                    />
                                </div>
                                <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                    <label htmlFor="unique03" className="block text-xs font-medium text-gray-900">
                                        Unique Selling proposition
                                    </label>
                                    <input
                                        type="text"
                                        name="unique03"
                                        value={formData.unique03}
                                        onChange={handleChange}
                                        id="unique03"
                                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter Unique Selling Point #3"
                                    />
                                </div>
                                <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                    <label htmlFor="unique04" className="block text-xs font-medium text-gray-900">
                                        Unique Selling proposition
                                    </label>
                                    <input
                                        type="text"
                                        name="unique04"
                                        value={formData.unique04}
                                        onChange={handleChange}
                                        id="unique04"
                                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter Unique Selling Point #4"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="pain-point" className="block text-sm font-medium leading-6 text-gray-900">
                                Your Tech Stack
                            </label>
                            <div className="isolate -space-y-px rounded-md shadow-sm">
                                <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                    <label htmlFor="tool01" className="block text-xs font-medium text-gray-900">
                                        List some of the tools that your product is built on
                                    </label>
                                    <input
                                        type="text"
                                        name="tool01"
                                        value={formData.tool01}
                                        onChange={handleChange}
                                        id="tool01"
                                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="This can help identify potential partnerships - e.g: Python"
                                    />
                                </div>
                                <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                    <label htmlFor="tool02" className="block text-xs font-medium text-gray-900">
                                        Tool
                                    </label>
                                    <input
                                        type="text"
                                        name="tool02"
                                        value={formData.tool02}
                                        onChange={handleChange}
                                        id="tool02"
                                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="e.g: Javascript"
                                    />
                                </div>
                                <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                    <label htmlFor="tool03" className="block text-xs font-medium text-gray-900">
                                        Tool
                                    </label>
                                    <input
                                        type="text"
                                        name="tool03"
                                        value={formData.tool03}
                                        onChange={handleChange}
                                        id="tool03"
                                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter Tool #3"
                                    />
                                </div>
                                <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                                    <label htmlFor="tool04" className="block text-xs font-medium text-gray-900">
                                        Tool
                                    </label>
                                    <input
                                        type="text"
                                        name="tool04"
                                        value={formData.tool04}
                                        onChange={handleChange}
                                        id="tool04"
                                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter Tool #4"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Strategies and Tactics</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Click the button so we can launch a strategy for your product, define Ideal Customer Profile, and ultimately find their contact information.
                        </p>
                    </div>

                    <div className="grid max-w-2xl justify-center items-center grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="col-span-full">
                            <>
                                <button
                                    className="bg-green-700 mt-2 rounded-md text-white p-2"
                                    onClick={handleLaunch}
                                    disabled={showLoadingStatus || (textData && textData.length > 0)}>
                                    {showLoadingStatus ? 'Generating Leads...' : 'hello'}
                                </button>

                                {showLoadingStatus && (
                                    <div>
                                        <h2>{loadingStateStatus[loadingStateIndex].goal}</h2>
                                        <p>Status: {loadingStateIndex < loadingStateStatus.length && loadingStatusIndex < loadingStateStatus[loadingStateIndex].loadingStatus.length
                                            ? loadingStateStatus[loadingStateIndex]?.loadingStatus[loadingStatusIndex]?.status
                                            : "Ideal Customer Profile has been defined below. Now deploying AI model/agents for the next set of tasks..."}
                                        </p>
                                    </div>
                                )}
                            </>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Proposed Plan</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Based on the provided information, here are data driven summaries that addresses the following key points:
                            <span className="font-semibold"> Customer behavior</span> and <span className="font-semibold">Motivation</span>,
                            <span className="font-semibold"> Ideal Customer Profile</span>,
                            <span className="font-semibold"> Demands</span>, and
                            <span className="font-semibold"> Lead generation</span>.
                        </p>
                    </div>

                    <div className="max-w-2xl space-y-10 md:col-span-2">
                        {/* {textData && (
                            <div>
                                {textData.map((item, index) => (
                                    <div key={index}>
                                        <h3>{Object.keys(item)[0]}</h3>
                                        <p>{Object.values(item)[0]}</p>
                                    </div>
                                ))}
                            </div>
                        )} */}
                        {showLoadingStatus && <p>Loading your Ideal Customers...</p>}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                    Save and Continue
                </button>
            </div>
        </form>
    )
}
