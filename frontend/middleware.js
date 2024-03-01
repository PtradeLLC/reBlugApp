import { withAuth } from 'next-auth/middleware'

export default withAuth;

// matcher: ['/dashboard/:path*', ...],

export const config = {
    matcher: '/dashboard/:path*',
}
