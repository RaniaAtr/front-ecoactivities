import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.json();
    const tokenStore = await cookies();
    const token = tokenStore.get('token')?.value;

    const formData = new URLSearchParams();
    formData.append('activity_id', body.activity_id);

    const res = await fetch('http://localhost:8000/api/checkout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
      redirect: 'manual',
    });

    // Redirection directe
    if (res.status === 302 || res.redirected) {
      return Response.redirect(res.url);
    }

    return new Response('Erreur lors de la création de la session Stripe', { status: 400 });

  } catch (err) {
    return new Response('Erreur serveur', { status: 500 });
  }
}
