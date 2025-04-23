import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
    const {pathname} = request.nextUrl;        


    if(request.cookies.get("isLoggedIn")?.value === "false") {
        return NextResponse.redirect(new URL('/', request.url))
    } 
}

export const config = {
    matcher: [
        "/profile/:username*",       
        "/comparison",
        "/home",
        "/reviews",
        "/career"        
    ]
};

export default middleware;
