import { cookies } from "next/headers";

export async function GET() {
  // ✅ Attendre le cookieStore
  const cookieStore = await cookies();
  const token = cookieStore.get("token"); // token est un objet { name, value }

  if (!token) {
    return new Response(JSON.stringify({ message: "Non autorisé" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`, // injecte le JWT
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
