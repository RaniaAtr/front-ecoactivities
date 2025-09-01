"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilPage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 🔄 Charger les infos utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Début fetch profil");

        const res = await fetch("/api/user/me", {
          credentials: "include", // important pour envoyer les cookies
        });

        console.log("Réponse fetch:", res);

        if (!res.ok) {
          if (res.status === 401) {
            router.push("/login");
          }
          const errData = await res.json();
          throw errData;
        }

        const data = await res.json();
        console.log("Données utilisateur:", data);

        setUser(data);
        setForm({
          prenom: data.prenom || "",
          nom: data.nom || "",
          email: data.email || "",
          password: "",
        });
      } catch (err) {
        console.error("Erreur fetchUser:", err);
        const msg = err?.message || err?.msg || JSON.stringify(err) || "Erreur lors du chargement du profil.";
        setError(msg);
      }
    };

    fetchUser();
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Mise à jour du profil
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // cookie envoyé au backend
        body: JSON.stringify(
          form.password ? form : { ...form, password: undefined } // supprime password si vide
        ),
      });

      const json = await res.json();
      if (!res.ok) throw json;

      setSuccess({ message: "Profil mis à jour avec succès" });
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      console.error("Erreur handleSubmit:", err);
      const msg = err?.message || err?.msg || JSON.stringify(err) || "Erreur lors de la mise à jour.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Suppression de compte
  const handleDelete = async () => {
    if (!confirm("Es-tu sûr de vouloir supprimer ton compte ?")) return;

    try {
      const res = await fetch(`/api/user/${user.id}/delete`, {
        method: "DELETE",
        credentials: "include", // cookie envoyé au backend
      });

      const json = await res.json();
      if (!res.ok) throw json;

      router.push("/register");
    } catch (err) {
      console.error("Erreur handleDelete:", err);
      const msg = err?.message || err?.msg || JSON.stringify(err) || "Erreur lors de la suppression.";
      setError(msg);
    }
  };

  if (!user) return <p className="text-center mt-10">Chargement du profil...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-green-700">
          Mon Profil
        </h2>

        {success && (
          <div className="mb-4 p-4 rounded bg-green-100 text-green-800 border border-green-300">
            {success.message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 rounded bg-red-100 text-red-500 border border-red-300">
            <p>{error}</p>
          </div>
        )}

        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={form.prenom}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          disabled={loading}
        />

        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          disabled={loading}
        />

        <input
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          disabled={loading}
        />

        <input
          type="password"
          name="password"
          placeholder="Nouveau mot de passe"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          disabled={loading}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Mise à jour..." : "Mettre à jour"}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mt-2"
        >
          Supprimer mon compte
        </button>
      </form>
    </div>
  );
}
