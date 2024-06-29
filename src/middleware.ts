import NextAuth from "next-auth"
import authConfig from "../auth.config";
import { NextResponse, NextRequest } from 'next/server';


const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    console.log("ROUTE: ", req.nextUrl.pathname);
    console.log("IS LOGGEDIN: ", isLoggedIn);

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
})

export const config = {
    matcher: ['/dashboard/:path*'],

}