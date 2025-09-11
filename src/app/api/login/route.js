import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.json();

    const res = await fetch('http://localhost:8000/api/login_check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify(json), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // On stocke le token dans un cookie sécurisé
    cookies().set('token', json.token, {
      httpOnly: true, // Sécurité : pas accessible via JS client
      path: '/',
      maxAge: 60 * 60, // 1h
      sameSite: 'lax', // ou 'strict' selon ton besoin
    });

    return new Response(JSON.stringify({ message: 'Connexion réussie' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ message: 'Erreur serveur' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}