import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req, context) {
  // 🔹 params doit être attendu
  const { id } = await context.params;

  // 🔹 cookies() doit aussi être attendu
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");

  if (!tokenCookie) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
        "Content-Type": "application/json",
      },
    });

    let data;
    try {
      data = await res.json();
    } catch {
      const text = await res.text();
      return NextResponse.json(
        { message: "Réponse non JSON du serveur", raw: text },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json(
      { message: "Erreur côté frontend", error: err.message },
      { status: 500 }
    );
  }
}
