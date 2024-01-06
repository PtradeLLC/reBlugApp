import { useState } from 'react';

export default function EmailAgentForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        file1: null,
        file2: null,
    });

    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileChange = (event, fileType) => {
        const file = event.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fileType]: file,
        }));
    };


    return (
        <div className="col-span-full">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
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
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500">


                    </label>
                    <p className="text-xs leading-5 text-gray-600">.PDF, .TXT, .DOC up to 10MB</p>

                </div>
            </div>
        </div>
    )
}
