import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Récupérer toutes les activités (accessible à tous)
export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activities`);
  const data = await res.json();
  return NextResponse.json(data);
}

// Créer une activité (réservé aux admins)
export async function POST(req) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;  // <-- récupère le token ici

  const body = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,  // envoie le token
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return new NextResponse(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}