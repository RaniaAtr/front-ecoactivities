export async function DELETE(req, { params }) {
  const token = req.headers.get("authorization")?.split(" ")[1]; // extrait le token
  const id = params.id;

  try {
    const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify(data), { status: res.status });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
    });
  }
}