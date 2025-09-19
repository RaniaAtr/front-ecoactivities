import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.json();
    const tokenStore = await cookies();
    const token = tokenStore.get('token')?.value;

    const formData = new URLSearchParams();
    formData.append('activity_id', body.activity_id);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    // On récupère le JSON contenant l'URL Stripe
    if (res.ok) {
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('Erreur lors de la création de la session Stripe', { status: 400 });

  } catch (err) {
    return new Response('Erreur serveur', { status: 500 });
  }
}
