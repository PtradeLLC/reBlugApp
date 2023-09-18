import { useRouter } from 'next/router';
import { useAuthenticationStatus } from '@nhost/nextjs';
import Loading from '../../components/Loading';

const withAuth = function (Component) {
    return function AuthProtected(props) {
        const router = useRouter()
        const { isLoading, isAuthenticated } = useAuthenticationStatus()

        if (isLoading) {
            return (
                <div className="">
                    <span className="bg-green-200 flex justify-center items-center rounded text-center m-auto px-2"><Loading size="lg" />Loading...</span>
                </div>
            )
        }

        if (!isAuthenticated) {
            router.push('/login');
        }

        return <Component {...props} />
    }
}
export default withAuth;