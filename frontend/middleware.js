import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth;

export function corsMiddleware(req, res) {
    // Extract the origin from the request headers
    const origin = req.headers['origin'];

    // Set the Access-Control-Allow-Origin header based on the origin
    // You can add your logic here to determine the allowed origin dynamically
    const allowedOrigin = origin && origin.includes('www') ? 'https://www.reblug.com' : 'https://reblug.com';

    // Set other CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, PATCH, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Set the Access-Control-Allow-Origin header
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);

    // Handle preflight OPTIONS requests
    if (req.method === 'OPTIONS') {
        // Return a preflight response with a 204 status code and headers
        res.status(204).end();
        return;
    }
}


export const config = {
    // '/api/:path*'
    matcher: ['/dashboard/:path*'],
};

