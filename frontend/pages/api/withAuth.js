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
                    <Loading />
                </div>
            )
        }

        if (!isAuthenticated) {
            router.push('/login')
            return null
        }

        return <Component {...props} />
    }
}
export default withAuth;