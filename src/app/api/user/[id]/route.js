// Fonction pour modifier ses propres infos

export async function PUT(request, { params }) {
  const { id } = params;
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return new Response(JSON.stringify({ message: "Non autorisé" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json();

  const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
