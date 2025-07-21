// Fonction pour récupérer les infos de l'utilisateur connecté

export async function GET(request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return new Response(JSON.stringify({ message: "Non autorisé" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const res = await fetch("http://127.0.0.1:8000/api/users/me", {
    method: "GET",
    headers: {
      Authorization: authHeader,
    },
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

