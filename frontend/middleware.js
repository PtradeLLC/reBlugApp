import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        console.log(req.nextUrl.pathname);


        // if (
        //     req.nextUrl.pathname.startsWith("/dashboard") &&
        //     req.nextauth.token.role != "MANAGER"
        // ) {
        //     console.log("Not manager");
        //     //   return NextResponse.rewrite(new URL("/Denied", req.url));
        // }
    },
    // {
    //     callbacks: {
    //         authorized: ({ token }) => !!token,
    //     },
    // }
);

export const config = { matcher: ["/dashboard"] };