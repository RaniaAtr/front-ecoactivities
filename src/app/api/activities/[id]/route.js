import { NextResponse } from 'next/server';

// Récupérer les détails d'une activité (accessible à tous)

export async function GET(req, { params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activities/${params.id}`);
  const data = await res.json();
  return NextResponse.json(data);
}

// Modifier une activité (accessible uniquement aux admins)

export async function PUT(req, { params }) {
  const token = req.cookies.get('token')?.value;
  const body = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activities/${params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Token pour vérifier l'admin côté backend
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return new NextResponse(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Supprimer une activité (accessible uniquement aux admins)

export async function DELETE(req, { params }) {
  const token = req.cookies.get('token')?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activities/${params.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`, // Token pour vérifier l'admin côté backend
    },
  });

  const data = await res.json();
  return new NextResponse(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
