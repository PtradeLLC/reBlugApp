import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth;

export function corsMiddleware(req) {
    // Create a new response object using NextResponse
    const res = new NextResponse();

    // Extract the origin from the request headers
    const origin = req.headers.get('Origin');

    // Set the Access-Control-Allow-Origin header based on the origin
    // You can add your logic here to determine the allowed origin dynamically
    const allowedOrigin = origin && origin.includes('www') ? 'https://www.reblug.com' : 'https://reblug.com';
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);

    // Set other CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, PATCH, POST, PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight OPTIONS requests
    if (req.method === 'OPTIONS') {
        // Return a preflight response with a 204 status code and no body
        return new NextResponse(null, { status: 204 });
    }

    return res;
}

export const config = {
    matcher: ['/dashboard/:path*', '/api/:path*'],
};
