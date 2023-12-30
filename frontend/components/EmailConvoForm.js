import { useState, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useSession } from "next-auth/react";
import Saas from "./Saas";
import FundRaise from "./FundRaise";
import EmailNewsletter from "./EmailNewsletter";
import Awareness from "./Awareness";
import Ecommerce from "./Ecommerce";

export default function EmailForm({ user, campaignEmail }) {
    const { data: session } = useSession();
    const { email } = session.user;
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        role: "",
        goal: "",
        subjectLine: "",
        emailMessage: "",
        knowledgeBaseFile: null,
        contactListFile: null,
        email: "",
    });
    const [selectedComponent, setSelectedComponent] = useState(null);

    useEffect(() => {
        // Fetch user data on component mount
        userData();
    }, []);

    const userData = async () => {
        const baseUrl = "/api/v1/agent.js";

        try {
            const response = await fetch(baseUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setFormData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    role: data.role,
                    email: data.email,
                });
            } else {
                console.error("Error fetching user:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching user:", error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const baseUrl = "/api/v1/agent.js";

        try {
            const response = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle success, if needed
                console.log("Form data submitted successfully");
            } else {
                console.error("Error submitting form:", response.statusText);
            }
        } catch (error) {
            console.error("Error submitting form:", error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handleComponentChange = (selectedComponent) => {
        setSelectedComponent(selectedComponent);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                                        {formData.firstName} {formData.lastName}
                                    </label>
                                </div>

                                <div className="sm:col-span-2">
                                    <p className="block text-xs font-medium text-gray-900">
                                        {formData.role}
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
                                        <option>Create Awareness</option>
                                        <option>Saas Subscriptions</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="email-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Your Email: {email}
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
                                        <div className="relative flex gap-x-3 mt-5">
                                            <div className="flex h-6 items-center">
                                                <input
                                                    id="comments"
                                                    name="comments"
                                                    type="checkbox"
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
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email-address"
                                                placeholder="Subject Line: Write a fallback Subject line"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>


                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email message
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                defaultValue={''}
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
                                            <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <button
                                                type="button"
                                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                Click to find out
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                            Upload your knowledge base document below:
                                        </label>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                    </label>
                                                    <p className="pl-1">or drag and drop </p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">.PDF, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                            Upload your email Contact list below. <span className="text-sm font-light">Get AI-generated qualified list based on data</span>
                                        </label>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                    </label>
                                                    <span className="mx-1">or</span>
                                                    <button onClick={(() => { })} className="pl-1 cursor-pointer text-green-600">Click here to connect your data source </button>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">.PDF, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </>


                                {campaignEmail === "newsletter" && (
                                    <>
                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-full">
                                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                                About
                                            </label>
                                            <div className="mt-2">
                                                <textarea
                                                    id="about"
                                                    name="about"
                                                    rows={3}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                                    defaultValue={''}
                                                />
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                        </div>
                                    </>
                                )}
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
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                We'll always let you know about important changes, but you pick what else you want to hear about.
                            </p>
                        </div>

                        <div className="max-w-2xl space-y-10 md:col-span-2">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                <div className="mt-6 space-y-6">
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="comments"
                                                name="comments"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="comments" className="font-medium text-gray-900">
                                                Comments
                                            </label>
                                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="candidates"
                                                name="candidates"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="candidates" className="font-medium text-gray-900">
                                                Candidates
                                            </label>
                                            <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="offers"
                                                name="offers"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="offers" className="font-medium text-gray-900">
                                                Offers
                                            </label>
                                            <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                                <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-everything"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                                        />
                                        <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                            Everything
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-email"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                                        />
                                        <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Same as email
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-nothing"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                                        />
                                        <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                            No push notifications
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Send Email
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}










































// import { useState } from "react";
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
// import Report from "./Report_one";
// import { useSession } from "next-auth/react";
// import Saas from "./Saas";
// import FundRaise from "./FundRaise";
// import EmailNewsletter from "./EmailNewsletter";
// import Awareness from "./Awareness";
// import Ecommerce from "./Ecommerce";

// export default function EmailForm({ user, campaignEmail }) {
//     const [emailFormInput, setEmailFormInput] = useState(false);
//     const { data: session, status } = useSession();
//     const { email } = session.user;

//     console.log('Session', session.user);


//     const userData = async () => {
//         const baseUrl = "/api/v1/agent.js";

//         try {
//             const response = await fetch(baseUrl, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setUser(data);
//             } else {
//                 console.error("Error fetching user:", response.statusText);
//             }
//         } catch (error) {
//             console.error("Error fetching user:", error.message);
//         }
//     };

//     userData();

//     return (
//         <>
//             <form>
//                 <div className="space-y-12 mt-2">
//                     <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
//                         <div>
//                             <h2 className="text-base font-semibold leading-7 text-gray-900">Your Information</h2>
//                             <p className="mt-1 text-sm leading-6 text-gray-600">Some info about you and your goals.</p>
//                         </div>

//                         <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">

//                             <span className="sm:col-span-2">
//                                 <div >
//                                     <label htmlFor="first-name" className="block text-md font-medium leading-6 text-gray-900">
//                                         {user.firstName}{" "}{user.lastName}
//                                     </label>
//                                 </div>

//                                 <div className="sm:col-span-2">
//                                     <p className="block text-xs font-medium text-gray-900">
//                                         {user.role}
//                                     </p>
//                                 </div>

//                             </span>


//                             <div className="sm:col-span-3">
//                                 <label htmlFor="goal" className="block text-sm font-medium leading-6 text-gray-900">
//                                     Campaign Goal
//                                 </label>
//                                 <div className="mt-2">
//                                     <select
//                                         id="goal"
//                                         name="goal"
//                                         autoComplete="goal-name"
//                                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:max-w-xs sm:text-sm sm:leading-6"
//                                     >
//                                         <option>Product Launch</option>
//                                         <option>Generate Leads</option>
//                                         <option>Create Awareness</option>
//                                         <option>Product Subscriptions</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             <div className="col-span-full">
//                                 <label htmlFor="email-address" className="block text-sm font-medium leading-6 text-gray-900">
//                                     Your Email: {email}
//                                 </label>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="relative">
//                         <div className="">
//                             <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
//                                 <>
//                                     <div className="col-span-full">
//                                         <div>
//                                             <h2 className="text-base font-semibold leading-7 text-gray-900">Your Campaign</h2>
//                                             <p className="mt-1 text-sm leading-6 text-gray-600">
//                                                 Lets setup your campaign.
//                                             </p>
//                                         </div>
//                                         <div className="relative flex gap-x-3 mt-5">
//                                             <div className="flex h-6 items-center">
//                                                 <input
//                                                     id="comments"
//                                                     name="comments"
//                                                     type="checkbox"
//                                                     className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
//                                                 />
//                                             </div>
//                                             <div className="text-sm leading-6">
//                                                 <label htmlFor="comments" className="font-medium text-gray-900">
//                                                     Generate Subject Line with AI (Recommended 👍🏻)
//                                                 </label>
//                                                 <p className="text-gray-500">Why is this recommended?</p>
//                                             </div>
//                                         </div>
//                                         <div className="mt-2">
//                                             <input
//                                                 type="text"
//                                                 name="email-address"
//                                                 id="email-address"
//                                                 autoComplete="email-address"
//                                                 placeholder="Subject Line: Write a fallback Subject line"
//                                                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
//                                             />
//                                         </div>


//                                     </div>
//                                     <div className="col-span-full">
//                                         <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
//                                             Email message
//                                         </label>
//                                         <div className="mt-2">
//                                             <textarea
//                                                 id="about"
//                                                 name="about"
//                                                 rows={3}
//                                                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
//                                                 defaultValue={''}
//                                                 placeholder="Compose your message..."
//                                             />
//                                         </div>
//                                         <p className="mt-3 text-sm leading-6 text-gray-600">Or click to generate message with AI.</p>
//                                     </div>
//                                     <div className="col-span-full">
//                                         <p className="block text-sm font-medium leading-6 text-gray-600">
//                                             So what's happening behind the scene?
//                                         </p>
//                                         <div className="mt-2 flex items-center gap-x-3">
//                                             <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
//                                             <button
//                                                 type="button"
//                                                 className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//                                             >
//                                                 Click to find out
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <div className="col-span-full">
//                                         <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
//                                             Upload your knowledge base document below:
//                                         </label>
//                                         <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//                                             <div className="text-center">
//                                                 <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
//                                                 <div className="mt-4 flex text-sm leading-6 text-gray-600">
//                                                     <label
//                                                         htmlFor="file-upload"
//                                                         className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
//                                                     >
//                                                         <span>Upload a file</span>
//                                                         <input id="file-upload" name="file-upload" type="file" className="sr-only" />
//                                                     </label>
//                                                     <p className="pl-1">or drag and drop </p>
//                                                 </div>
//                                                 <p className="text-xs leading-5 text-gray-600">.PDF, JPG, GIF up to 10MB</p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-span-full">
//                                         <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
//                                             Upload your email Contact list below. <span className="text-sm font-light">Get AI-generated qualified list based on data</span>
//                                         </label>
//                                         <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//                                             <div className="text-center">
//                                                 <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
//                                                 <div className="mt-4 flex text-sm leading-6 text-gray-600">
//                                                     <label
//                                                         htmlFor="file-upload"
//                                                         className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
//                                                     >
//                                                         <span>Upload a file</span>
//                                                         <input id="file-upload" name="file-upload" type="file" className="sr-only" />
//                                                     </label>
//                                                     <span className="mx-1">or</span>
//                                                     <button onClick={(() => { })} className="pl-1 cursor-pointer text-green-600">Click here to connect your data source </button>
//                                                 </div>
//                                                 <p className="text-xs leading-5 text-gray-600">.PDF, JPG, GIF up to 10MB</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </>


//                                 {campaignEmail === "newsletter" && (
//                                     <>
//                                         <div className="sm:col-span-4">
//                                             <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
//                                                 Email address
//                                             </label>
//                                             <div className="mt-2">
//                                                 <input
//                                                     id="email"
//                                                     name="email"
//                                                     type="email"
//                                                     autoComplete="email"
//                                                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-span-full">
//                                             <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
//                                                 About
//                                             </label>
//                                             <div className="mt-2">
//                                                 <textarea
//                                                     id="about"
//                                                     name="about"
//                                                     rows={3}
//                                                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
//                                                     defaultValue={''}
//                                                 />
//                                             </div>
//                                             <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
//                                         </div>
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
//                         <Saas />
//                         <FundRaise />
//                         <EmailNewsletter />
//                         <Awareness />
//                         <Ecommerce />
//                     </div>

//                     <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
//                         <div>
//                             <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
//                             <p className="mt-1 text-sm leading-6 text-gray-600">
//                                 We'll always let you know about important changes, but you pick what else you want to hear about.
//                             </p>
//                         </div>

//                         <div className="max-w-2xl space-y-10 md:col-span-2">
//                             <fieldset>
//                                 <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
//                                 <div className="mt-6 space-y-6">
//                                     <div className="relative flex gap-x-3">
//                                         <div className="flex h-6 items-center">
//                                             <input
//                                                 id="comments"
//                                                 name="comments"
//                                                 type="checkbox"
//                                                 className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
//                                             />
//                                         </div>
//                                         <div className="text-sm leading-6">
//                                             <label htmlFor="comments" className="font-medium text-gray-900">
//                                                 Comments
//                                             </label>
//                                             <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
//                                         </div>
//                                     </div>
//                                     <div className="relative flex gap-x-3">
//                                         <div className="flex h-6 items-center">
//                                             <input
//                                                 id="candidates"
//                                                 name="candidates"
//                                                 type="checkbox"
//                                                 className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
//                                             />
//                                         </div>
//                                         <div className="text-sm leading-6">
//                                             <label htmlFor="candidates" className="font-medium text-gray-900">
//                                                 Candidates
//                                             </label>
//                                             <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
//                                         </div>
//                                     </div>
//                                     <div className="relative flex gap-x-3">
//                                         <div className="flex h-6 items-center">
//                                             <input
//                                                 id="offers"
//                                                 name="offers"
//                                                 type="checkbox"
//                                                 className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
//                                             />
//                                         </div>
//                                         <div className="text-sm leading-6">
//                                             <label htmlFor="offers" className="font-medium text-gray-900">
//                                                 Offers
//                                             </label>
//                                             <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </fieldset>
//                             <fieldset>
//                                 <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
//                                 <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
//                                 <div className="mt-6 space-y-6">
//                                     <div className="flex items-center gap-x-3">
//                                         <input
//                                             id="push-everything"
//                                             name="push-notifications"
//                                             type="radio"
//                                             className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
//                                         />
//                                         <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
//                                             Everything
//                                         </label>
//                                     </div>
//                                     <div className="flex items-center gap-x-3">
//                                         <input
//                                             id="push-email"
//                                             name="push-notifications"
//                                             type="radio"
//                                             className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
//                                         />
//                                         <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
//                                             Same as email
//                                         </label>
//                                     </div>
//                                     <div className="flex items-center gap-x-3">
//                                         <input
//                                             id="push-nothing"
//                                             name="push-notifications"
//                                             type="radio"
//                                             className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
//                                         />
//                                         <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
//                                             No push notifications
//                                         </label>
//                                     </div>
//                                 </div>
//                             </fieldset>
//                         </div>
//                     </div>
//                 </div>
//                 {/* HIDE REPORT BELOW */}
//                 {/* <div className="col-span-full">
//                     <div className="flex justify-center items-center">
//                         <div className="w-full max-w-screen-lg">
//                             <Report />
//                         </div>
//                     </div>
//                 </div> */}

//                 <div className="mt-6 flex items-center justify-end gap-x-6">
//                     <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
//                         Cancel
//                     </button>
//                     <button
//                         type="submit"
//                         className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
//                     >
//                         Save
//                     </button>
//                 </div>
//             </form>
//         </>
//     )
// }
