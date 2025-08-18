import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  const decoded = jwt.decode(token);
  // Vérifie que l'utilisateur est admin
  if (!decoded || !decoded.roles?.includes('ROLE_ADMIN')) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  return NextResponse.next();
}
// Appliquer le middleware uniquement aux routes admin
export const config = {
  matcher: ['/admin/:path*'],
};
