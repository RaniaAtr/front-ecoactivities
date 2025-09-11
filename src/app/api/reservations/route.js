import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return new Response(JSON.stringify({ message: "Non autorisé" }), { status: 401 });
  }

  const res = await fetch("http://127.0.0.1:8000/api/reservations", {
    headers: { Authorization: `Bearer ${token.value}` },
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
}
