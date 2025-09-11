"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminProfilPage() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Récupérer les infos de l'admin
        const resUser = await fetch("/api/user/me", { credentials: "include" });
        if (!resUser.ok) {
          if (resUser.status === 401) router.push("/login");
          throw new Error("Impossible de charger l'utilisateur");
        }
        const dataUser = await resUser.json();
        setUser(dataUser);

        // 🔹 Récupérer les réservations
        const resResv = await fetch("/api/reservations");
        if (!resResv.ok) throw new Error("Erreur chargement réservations");
        const dataResv = await resResv.json();
        setReservations(dataResv);

        // 🔹 Récupérer tous les utilisateurs
        const resUsers = await fetch("/api/admin");
        if (!resUsers.ok) throw new Error("Erreur chargement utilisateurs");
        const dataUsers = await resUsers.json();
        setUsers(Array.isArray(dataUsers) ? dataUsers : []);
      } catch (err) {
        setError(err.message || "Erreur chargement données");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  // 🔹 Modifier le rôle d'un utilisateur
  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await fetch(`/api/admin/${id}/roles`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roles: [newRole] }),
      });
      if (!res.ok) throw new Error("Erreur mise à jour rôle");
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, roles: [newRole] } : u))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 Supprimer un utilisateur
  const handleDelete = async (id) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    try {
      const res = await fetch(`/api/user/${id}/delete`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erreur suppression utilisateur");
      }
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center bg-green-50 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-green-700">Espace Admin</h1>

      {/* 🔹 Réservations */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Mes Réservations</h2>
        {reservations.length === 0 ? (
          <p>Aucune réservation.</p>
        ) : (
          <ul className="space-y-3">
            {reservations.map((resv) => (
              <li key={resv.id} className="border p-4 rounded">
                <p><strong>Activité :</strong> {resv.activity}</p>
                <p><strong>Montant :</strong> {resv.amount} €</p>
                <p><strong>Payée :</strong> {resv.isPaid ? "Oui" : "Non"}</p>
                <p><strong>Réservée le :</strong> {resv.createdAt}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔹 Gestion activités */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl text-center">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Gestion des activités</h2>
        <button
          onClick={() => router.push("/admin/activities")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Accéder à la gestion des activités
        </button>
      </div>

      {/* 🔹 Gestion utilisateurs */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Gestion des utilisateurs</h2>
        {users.length === 0 ? (
          <p>Aucun utilisateur trouvé.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-green-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Nom</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Rôle</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="border p-2">{u.id}</td>
                  <td className="border p-2">{u.nom} {u.prenom}</td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2">
                    <select
                      value={u.roles?.[0] || "ROLE_USER"}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="ROLE_USER">Utilisateur</option>
                      <option value="ROLE_ADMIN">Admin</option>
                    </select>
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
