import { NextResponse } from "next/server";
import { verifySessionToken } from "./lib/session";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin";
  const isClientRoute = pathname.startsWith("/client") && pathname !== "/client";

  if (!isAdminRoute && !isClientRoute) {
    return NextResponse.next();
  }

  const cookieName = isAdminRoute ? "ignyx_admin_session" : "ignyx_client_session";
  const token = request.cookies.get(cookieName)?.value;

  if (!token) {
    const loginPath = isAdminRoute ? "/admin" : "/client";
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  const session = await verifySessionToken(token);
  const expectedRole = isAdminRoute ? "admin" : "client";

  if (!session || session.role !== expectedRole) {
    const loginPath = isAdminRoute ? "/admin" : "/client";
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*"],
};