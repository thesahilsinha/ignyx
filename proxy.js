import { NextResponse } from "next/server";
import { verifySessionToken } from "./lib/session";

async function isMaintenanceMode() {
  try {
    const url = `${process.env.CENTRAL_SUPABASE_URL}/rest/v1/platform_settings?id=eq.1&select=maintenance_mode`;
    const res = await fetch(url, {
      headers: {
        apikey: process.env.CENTRAL_SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${process.env.CENTRAL_SUPABASE_SERVICE_KEY}`,
      },
    });
    const data = await res.json();
    return data?.[0]?.maintenance_mode === true;
  } catch {
    return false;
  }
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin";
  const isClientRoute = pathname.startsWith("/client");

  if (isClientRoute) {
    const underMaintenance = await isMaintenanceMode();
    if (underMaintenance) {
      return NextResponse.redirect(new URL("/maintenance", request.url));
    }
  }

  const isClientProtectedRoute = pathname.startsWith("/client") && pathname !== "/client";

  if (!isAdminRoute && !isClientProtectedRoute) {
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