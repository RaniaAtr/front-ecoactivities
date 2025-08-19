// app/middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
  // Récupère le token dans les cookies
  const token = request.cookies.get('token')?.value;

  // Si pas de token -> redirige vers la page de login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Décode le token (JWT)
  const decoded = jwt.decode(token);
  console.log(decoded)

  // Vérifie que l'utilisateur est admin
  if (!decoded || !decoded.roles?.includes('ROLE_ADMIN')) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // Si tout est ok, on continue
  return NextResponse.next();
}

// Appliquer le middleware uniquement aux routes admin
export const config = {
  matcher: ['/admin/:path*'], // protège toutes les routes sous /admin
};

