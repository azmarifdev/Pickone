import {decodeJwt} from "jose";
import {NextRequest, NextResponse} from "next/server";

const LOGIN_ROUTE = "/login";
const DASHBOARD_ROUTE = "/dashboard";

function isAuthenticatedAdmin(token: string | undefined): boolean {
    if (!token) return false;

    try {
        const decoded = decodeJwt(token);
        const currentTime = Math.floor(Date.now() / 1000);
        const isExpired = Boolean(decoded.exp && decoded.exp < currentTime);

        return !isExpired && decoded.role === "admin";
    } catch {
        return false;
    }
}

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    const token = request.cookies.get("zyslet_access_token")?.value;
    const isAuthenticated = isAuthenticatedAdmin(token);

    if (pathname === "/") {
        const destination = isAuthenticated ? DASHBOARD_ROUTE : LOGIN_ROUTE;
        return NextResponse.redirect(new URL(destination, request.url));
    }

    if (pathname === LOGIN_ROUTE && isAuthenticated) {
        return NextResponse.redirect(new URL(DASHBOARD_ROUTE, request.url));
    }

    if (pathname !== LOGIN_ROUTE && !isAuthenticated) {
        return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

