// Fonction pour modifier ses propres infos

import { cookies } from "next/headers";

export async function PUT(request, { params }) {
  const { id } = params;
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return new Response(JSON.stringify({ message: "Non autorisé" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}

