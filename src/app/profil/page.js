"use client"; 
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilPage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ prenom: "", nom: "", email: "" }); // plus de password
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [resLoading, setResLoading] = useState(true);
  const [resError, setResError] = useState(null);

  const router = useRouter();

  // 🔄 Charger les infos utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me", { credentials: "include" });
        if (!res.ok) {
          if (res.status === 401) router.push("/login");
          const errData = await res.json();
          throw errData;
        }
        const data = await res.json();
        setUser(data);
        setForm({ prenom: data.prenom || "", nom: data.nom || "", email: data.email || "" });
      } catch (err) {
        const msg = err?.message || err?.msg || JSON.stringify(err) || "Erreur lors du chargement du profil.";
        setError(msg);
      }
    };
    fetchUser();
  }, [router]);

  // 🔄 Charger les réservations
  useEffect(() => {
    const fetchReservations = async () => {
      setResLoading(true);
      setResError(null);
      try {
        const res = await fetch("/api/reservations");
        if (!res.ok) throw await res.json();
        const data = await res.json();
        setReservations(data);
      } catch (err) {
        const msg = err?.message || JSON.stringify(err) || "Erreur lors du chargement des réservations.";
        setResError(msg);
      } finally {
        setResLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); setSuccess(null); setLoading(true);
    try {
      const res = await fetch(`/api/user/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form), // plus de password
      });
      const json = await res.json();
      if (!res.ok) throw json;
      setSuccess({ message: "Profil mis à jour avec succès" });
    } catch (err) {
      const msg = err?.message || err?.msg || JSON.stringify(err) || "Erreur lors de la mise à jour.";
      setError(msg);
    } finally { setLoading(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Es-tu sûr de vouloir supprimer ton compte ?")) return;
    try {
      const res = await fetch(`/api/user/${user.id}/delete`, { method: "DELETE", credentials: "include" });
      const json = await res.json();
      if (!res.ok) throw json;
      router.push("/register");
    } catch (err) {
      const msg = err?.message || err?.msg || JSON.stringify(err) || "Erreur lors de la suppression.";
      setError(msg);
    }
  };

  if (!user) return <p className="text-center mt-10">Chargement du profil...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-green-50 p-4 space-y-6">
      {/* FORMULAIRE PROFIL */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-green-700">Mon Profil</h2>
        {success && <div className="mb-4 p-4 rounded bg-green-100 text-green-800 border border-green-300">{success.message}</div>}
        {error && <div className="mb-4 p-4 rounded bg-red-100 text-red-500 border border-red-300">{error}</div>}

        <input type="text" name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} className="w-full border px-4 py-2 rounded" disabled={loading} />
        <input type="text" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} className="w-full border px-4 py-2 rounded" disabled={loading} />
        <input type="email" name="email" placeholder="Adresse e-mail" value={form.email} onChange={handleChange} className="w-full border px-4 py-2 rounded" disabled={loading} />

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50" disabled={loading}>{loading ? "Mise à jour..." : "Mettre à jour"}</button>
        <button type="button" onClick={handleDelete} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mt-2">Supprimer mon compte</button>
      </form>

      {/* SECTION RÉSERVATIONS */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl space-y-4">
        <h2 className="text-2xl font-bold text-center text-green-700">Mes Réservations</h2>
        {resLoading && <p>Chargement des réservations...</p>}
        {resError && <p className="text-red-500">{resError}</p>}
        {!resLoading && !resError && reservations.length === 0 && <p>Aucune réservation trouvée.</p>}
        {!resLoading && reservations.length > 0 && (
          <ul className="space-y-3">
            {reservations.map((resv) => (
              <li key={resv.id} className="border p-4 rounded hover:bg-green-50">
                <p><strong>Activité :</strong> {resv.activity}</p>
                <p><strong>Montant :</strong> {resv.amount} €</p>
                <p><strong>Payée :</strong> {resv.isPaid ? "Oui" : "Non"}</p>
                <p><strong>Réservée le :</strong> {resv.createdAt}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
