import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

const jwt_secret = process.env.JWT_SECRET;
const refresh_secret = process.env.REFRESH_SECRET;

export async function middleware(request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const pathName = request.nextUrl.pathname;

  if (pathName.startsWith("/_next")) {
    return NextResponse.next();
  }

  const publicPaths = [
    "/",
    "/login",
    "/cadastro",
    "/api/auth/login",
    "/api/auth/refresh",
  ];

  if (publicPaths.some((path) => pathName.startsWith(path))) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    verify(token, jwt_secret);
    return NextResponse.next();
  } catch (error) {
    console.error("Token inválido ou expirado:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
