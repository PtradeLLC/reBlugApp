// app/_middleware.js
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export async function middleware(request) {
    const response = NextResponse.next();

    // Set CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Max-Age', '86400'); // Cache preflight response for 24 hours

    // Handle preflight OPTIONS request
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400', // Cache preflight response for 24 hours
            },
        });
    }

    // Handle user session or cookie management
    const cookies = request.cookies;
    let userId = cookies.get('userId');

    if (!userId) {
        userId = nanoid();
        response.cookies.set('userId', userId, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 });
        console.log('New user ID set:', userId);
    } else {
        console.log('User ID from cookie:', userId);
    }

    return response;
}





// export async function middleware(request) {
//     const response = NextResponse.next();

//     // Set CORS headers
//     response.headers.set('Access-Control-Allow-Origin', '*');
//     response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     response.headers.set('Access-Control-Max-Age', '86400'); // Cache preflight response for 24 hours

//     // Handle preflight OPTIONS request
//     if (request.method === 'OPTIONS') {
//         return new Response(null, {
//             status: 204,
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
//                 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//                 'Access-Control-Max-Age': '86400', // Cache preflight response for 24 hours
//             },
//         });
//     }

//     return response;
// }