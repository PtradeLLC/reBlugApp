import { useState, useEffect, useCallback } from "react";
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useSession } from "next-auth/react";
import Saas from "./Saas";
import FundRaise from "./FundRaise";
import EmailNewsletter from "./EmailNewsletter";
import Awareness from "./Awareness";
import Ecommerce from "./Ecommerce";
import Integration from "./integrations";
import Loading from "./Loading";
import { useDropzone } from 'react-dropzone'
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function EmailForm({ user, campaignEmail, className }) {
    const { data: session } = useSession();
    const { email } = session.user;
    const [submitted, setSubmitted] = useState(null);
    const [fileTag, setFileTag] = useState({ knowledgeBaseFile: null, contactListFile: null });
    const [loading, setLoading] = useState(false);
    const [contactListFile, setContactListFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        title: '',
        email: user?.email || email || '',
        goal: "",
        subject: "",
        message: "",
        clientType: "",
        productImage: "",
        files: null
    });
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [typeOfClient, setTypeOfClient] = useState(null);

    const { firstName, lastName } = user


    //SECTION FOR KNOWLEDGEBASE
    const [files, setFiles] = useState([]);
    const [rejected, setRejected] = useState([]);

    const file = new FileReader();

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ]);

            console.log("Accespted File:", acceptedFiles[0]);
            console.log("Selected FileSSSS:", files);
        }

        if (rejectedFiles?.length) {
            setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
        }
    }, [])

    //Type of files to accept
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: ['application/pdf', 'text/plain', 'application/msword,', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv'],
        maxSize: 1024 * 1000 * 2,
        onDrop,
    })

    useEffect(() => {
        // Revoke the data URIs to avoid memory leaks
        return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])

    const removeFile = name => {
        setFiles(files => files.filter(file => file.name !== name))
    };



    useEffect(() => {
        if (user) {
            // Update the formData state when the user object is available
            setFormData((prevData) => ({
                ...prevData,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
            }));
        }
    }, [user]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataObject = new FormData();

            if (typeof files[0] === 'undefined') {
                console.error('No files to upload.');
                return;
            }

            if (campaignEmail) {
                setFormData(prev => ({ ...prev, clientType: campaignEmail }));
            }

            // Append text inputs to formDataObject
            formDataObject.append('firstName', formData.firstName);
            formDataObject.append('lastName', formData.lastName);
            formDataObject.append('title', formData.title);
            formDataObject.append('subject', formData.subject);
            formDataObject.append('email', formData.email);
            formDataObject.append('goal', formData.goal);
            formDataObject.append('clientType', formData.clientType);
            formDataObject.append('message', formData.message);
            // Append knowledge and contactList files to formDataObject
            files.forEach((file) => formDataObject.append('files', file));
            const response = await fetch('/api/v1/Emailagent', {
                method: 'POST',
                body: formDataObject,
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Error submitting form.');
            }
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error.message);
            setSubmitted(false);
        }
    };
    useEffect(() => {
        // Cleanup for data URIs to avoid memory leaks
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);


    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)} >
                <div className="space-y-12 mt-2">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Your Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Some info about you and your goals.</p>
                        </div>

                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                            <span className="sm:col-span-2">
                                <div>
                                    <label htmlFor="first-name" className="block text-md font-medium leading-6 text-gray-900">
                                        {user.firstName} {user.lastName}
                                    </label>
                                </div>

                                <div className="sm:col-span-2">
                                    <p className="block text-xs font-medium text-gray-900">
                                        {user.role}
                                    </p>
                                </div>
                            </span>

                            <div className="sm:col-span-3">
                                <label htmlFor="goal" className="block text-sm font-medium leading-6 text-gray-900">
                                    Campaign Goal
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="goal"
                                        name="goal"
                                        autoComplete="goal-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                        value={formData.goal}
                                    >
                                        <option>Product Launch</option>
                                        <option>Generate Leads</option>
                                        <option>Raise Awareness</option>
                                        <option>SaaS Subscriptions</option>
                                        <option>Sell Tickets</option>
                                        <option>Product Sales</option>
                                        <option>Raise Funds</option>
                                        <option>Newsletter(communication)</option>
                                        <option>Newsletter(marketing)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="email-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email: {email}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="">
                            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                <>
                                    <div className="col-span-full">
                                        <div>
                                            <h2 className="text-base font-semibold leading-7 text-gray-900">Your Campaign</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                                Lets setup your campaign.
                                            </p>
                                        </div>
                                        <div className="col-span-full mt-5">
                                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                                Title
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="title"
                                                    name="title"
                                                    onChange={handleChange}
                                                    value={formData.title}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                    placeholder="Enter a title for this campaign"
                                                />
                                            </div>
                                        </div>
                                        <div className="relative flex gap-x-3 mt-5">
                                            <div className="flex h-6 items-center">
                                                <input
                                                    id="comments"
                                                    name="comments"
                                                    type="checkbox"
                                                    value={formData.comments}
                                                    checked
                                                    readOnly
                                                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                                                />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label htmlFor="comments" className="font-medium text-gray-900">
                                                    Generate Subject Line with AI (Recommended 👍🏻)
                                                </label>
                                                <p className="text-gray-500">Why is this recommended?</p>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="subject"
                                                id="subject"
                                                autoComplete="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="Subject Line: Write a fallback Subject line"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email message
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="message"
                                                name="message"
                                                onChange={handleChange}
                                                rows={3}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                value={formData.message}
                                                placeholder="Compose your message..."
                                            />
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-gray-600">Or click to generate message with AI.</p>
                                    </div>
                                    <div className="col-span-full">
                                        <p className="block text-sm font-medium leading-6 text-gray-600">
                                            So what's happening behind the scene?
                                        </p>
                                        <div className="mt-2 flex items-center gap-x-3">
                                            {/* <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" /> */}
                                            <img src="/images/info.png" alt="info" className="h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <button
                                                type="button"
                                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                Click to find out
                                            </button>
                                        </div>
                                    </div>
                                    {/*START KNOWLEDGE BASE  */}
                                    <div className="col-span-full">
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 py-10">
                                            <div className="text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        vectorEffect="non-scaling-stroke"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                                    />
                                                </svg>
                                                <div {...getRootProps({ className: className })} >
                                                    <label htmlFor="files" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Upload one or more knowledge base document below
                                                    </label>
                                                    <input {...getInputProps()} />
                                                    <div className='flex flex-col cursor-pointer items-center justify-center gap-4 border border-dotted  h-24 rounded-lg'>
                                                        {isDragActive ? (
                                                            <p>Drop the files here ...</p>
                                                        ) : (
                                                            <p>Drag or click to select file</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Preview */}
                                                <section className='mt-6'>
                                                    {/* Accepted files */}
                                                    <h3 className='title text-sm font-medium leading-6 text-gray-900 mt-4 border-b'>
                                                        Accepted Files: <span className='text-sm'>(.pdf | .txt | .doc)</span>
                                                    </h3>
                                                    <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
                                                        {files.map(file => (
                                                            <li key={file.name} className='relative w-14 h-16 rounded-md mx-2 shadow-lg'>
                                                                {file.type === 'application/pdf' ? (
                                                                    <img
                                                                        src="/images/pdf.png"
                                                                        alt={file.name}
                                                                        className='h-full w-full object-contain rounded-md'
                                                                    />
                                                                ) : file.type === 'text/plain' ? (
                                                                    <img
                                                                        src="/images/txt.png"
                                                                        alt={file.name}
                                                                        className='h-full w-full object-contain rounded-md'
                                                                    />
                                                                ) : file.type === 'application/msword' ? (
                                                                    <img
                                                                        src="/images/doc.png"
                                                                        alt={file.name}
                                                                        className='h-full w-full object-contain rounded-md'
                                                                    />
                                                                ) : "File type is not accepted"}
                                                                <button
                                                                    type='button'
                                                                    className='w-4 h-4 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                                                                    onClick={() => removeFile(file.name)}
                                                                >
                                                                    <XMarkIcon className='w-5 h-5 fill-slate-700 hover:fill-secondary-400 transition-colors' />
                                                                </button>
                                                                <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
                                                                    {file.name}
                                                                </p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                    {/* END OF KNOWLEDGE BASE  */}
                                    <div className="col-span-full">
                                        <Integration />
                                    </div>
                                </>

                            </div>
                        </div>
                    </div>

                    {/* Dynamic rendering based on user selection */}
                    {campaignEmail === "Saas" && <Saas />}
                    {campaignEmail === "FundRaise" && <FundRaise />}
                    {campaignEmail === "Awareness" && <Awareness />}
                    {campaignEmail === "emailNewsletter" && <EmailNewsletter />}
                    {campaignEmail === "Commerce" && <Ecommerce />}

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        {/* HIDE REPORT BELOW */}
                        {/* <div className="col-span-full">
                        <div className="flex justify-center items-center">
                        <div className="w-full max-w-screen-lg">
                            <Report />
                        </div>
                    </div>
                </div> */}
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        {!submitted ? (
                            <>
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${loading ? 'cursor-wait opacity-75' : '' // Disable button and show loading cursor when loading
                                        }`}
                                    disabled={loading}
                                >
                                    {loading ? 'Researching...' : 'Begin Research'}
                                </button>
                            </>
                        ) : (
                            submitted
                        )}

                    </div>
                </div>
            </form>
        </>
    );
}

