import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// ✅ GET : liste des utilisateurs
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return NextResponse.json({ message: "Non autorisé" }, { status: 401 });

  const res = await fetch("http://localhost:8000/api/users", {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
