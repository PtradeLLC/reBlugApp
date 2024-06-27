// app/_middleware.js
import { NextResponse } from 'next/server';

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

    // Role-based access control
    // const token = await getToken({ req: request });
    // if (!token) {
    //     return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    // }

    // const user = await prisma.user.findUnique({
    //     where: { email: token.email },
    // });

    // if (!user) {
    //     return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404 });
    // }

    // Define role-based access control logic
    // const url = request.nextUrl.pathname;

    // const roleBasedRoutes = {
    //     '/blogger-path': 'BLOGGER',
    //     '/chef-path': 'CHEF',
    //     '/social-media-path': 'SOCIAL_MEDIA_PARTNER',
    //     '/brand-marketer-path': 'BRAND_MARKETER',
    // };

    // for (const [path, role] of Object.entries(roleBasedRoutes)) {
    //     if (url.startsWith(path) && user.role !== role) {
    //         return new NextResponse(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
    //     }
    // }

    return response;
}





// // app/_middleware.js

// import { NextResponse } from 'next/server';

// export function middleware(request) {
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
