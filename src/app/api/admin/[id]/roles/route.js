import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(req, context) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return NextResponse.json({ message: "Non autorisé" }, { status: 401 });

  const { params } = context;
  const { id } = params;
  const { roles } = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/roles`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ roles }),
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    data = { message: "Erreur serveur" };
  }

  return NextResponse.json(data, { status: res.status });
}
