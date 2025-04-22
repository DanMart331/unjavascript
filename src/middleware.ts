
import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
    const {pathname} = request.nextUrl;

    console.log('Restricted route hit: ${pathname}');
    console.log("Cant go here!");
    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: [
        "/profile/:username*",
        "/Comparison"
    ]
};

export default middleware;
