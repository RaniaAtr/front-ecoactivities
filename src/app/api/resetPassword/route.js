export async function POST(req) {
  try {
    const body = await req.json();
    const { email, token, password } = body;

    // Demande de réinitialisation par email
    if (email && !token && !password) {
      const resBackend = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // Toujours parser en JSON
      const data = await resBackend.json();
      return new Response(JSON.stringify(data), {
        status: resBackend.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Réinitialisation du mot de passe avec token
    if (token && password) {
      const resBackend = await fetch(`http://localhost:8000/reset-password/reset/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plainPassword: password }),
      });

      const data = await resBackend.json();
      return new Response(JSON.stringify(data), {
        status: resBackend.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Données invalides
    return new Response(JSON.stringify({ message: "Données manquantes ou invalides" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Erreur API resetPassword:", err);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
