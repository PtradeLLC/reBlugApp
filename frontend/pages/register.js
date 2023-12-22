import React, { useState } from 'react';
import SignUp from '../components/SignUp';
import Loading from '../components/Loading';
import AuthPro from '../components/OAuthProv';


export default function Register() {
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("");
    const [selected, setSelected] = useState(false);

    // Function to handle radio button change
    const handleRadioChange = (event) => {
        setSelected(event.target.id === "bordered-radio-2");
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-12 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up for an account
                </h2>
            </div>

            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className='flex justify-center items-center'>
                    {loading ? <span className="bg-green-200 rounded text-center m-auto px-2"><Loading size="lg" />Loading...</span> : null}
                </div>
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    {!selected ?
                        <>
                            <div>
                                <SignUp handleRadioChange={handleRadioChange} type={type} setType={setType} />
                            </div>
                            <div>
                                <div className="relative mt-10">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center text-sm font-medium leading-6">
                                        <span className="bg-white px-6 text-gray-900">or continue with these providers</span>
                                    </div>
                                </div>
                                <div>
                                    <AuthPro />
                                </div>
                            </div>
                        </>
                        :
                        <div>
                            <div className="relative mt-1">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">Continue with these providers</span>
                                </div>
                            </div>
                            <div>
                                <AuthPro />
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    );
}