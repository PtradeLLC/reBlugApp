import React from 'react';
import SignUp from '../components/SignUp';
import AuthPro from '../components/OAuthProv';
import { useSignInEmailPassword } from '@nhost/nextjs';


export default function Register() {
    const { isLoading } = useSignInEmailPassword();

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-12 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up for an account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className='flex justify-center items-center'>
                    {isLoading ? <span className="bg-green-200 rounded text-center m-auto px-2"><LoadingComponent size="lg" />Loading...</span> : null}
                </div>
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <SignUp />
                    <form className="space-y-6">
                        {/* Continue with social buttons */}
                        <div>
                            <div className="relative mt-10">
                                <div className="absolute inset-0 flex providers-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                </div>
                            </div>
                            <div>
                                <AuthPro />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}