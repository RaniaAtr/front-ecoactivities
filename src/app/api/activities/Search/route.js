import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const url = new URL(req.url);

    // Récupération des filtres depuis les query params
    const prixMax = url.searchParams.get('prixMax') || null;
    const date = url.searchParams.get('date') || null;
    const tag = url.searchParams.get('tag') || null;
    const lieu = url.searchParams.get('lieu') || null;

    // Construction de l'URL pour le backend Symfony
    const queryParams = new URLSearchParams();
    if (prixMax) queryParams.append('prixMax', prixMax);
    if (date) queryParams.append('date', date);
    if (tag) queryParams.append('tag', tag);
    if (lieu) queryParams.append('lieu', lieu);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activities/search?${queryParams.toString()}`);
    
    // Toujours récupérer un JSON valide
    const data = await res.json();
    const json = Array.isArray(data) ? data : [];

    return NextResponse.json(json, { status: 200 });

  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}
