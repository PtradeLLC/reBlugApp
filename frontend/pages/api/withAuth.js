'use client'
import { useState } from 'react'
import { useRouter } from 'next/router';
import Loading from '../../components/Loading';

const withAuth = function (Component) {
    const [loading, setLoading] = useState(false);
    return function AuthProtected(props) {
        const router = useRouter();

        if (loading) {
            return (
                <div className="">
                    <span className="bg-green-200 flex justify-center items-center rounded text-center m-auto px-2"><Loading size="lg" />Loading...</span>
                </div>
            )
        }

        //change loading to check if authenticated
        if (loading) {
            router.push('/login');
        }

        return <Component {...props} />
    }
}
export default withAuth;