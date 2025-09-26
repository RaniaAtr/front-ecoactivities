"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("https://ecoactivities.fr/api/register", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const json = await res.json();

      if (!res.ok) {
        throw json;
      }

      setSuccess(json);
      setError(null);

      // ✅ Redirection après inscription réussie
      setTimeout(() => {
        router.push("/login");
      }, 2000); // délai facultatif de 2 secondes pour afficher le message

    } catch (err) {
      setError(err);
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-green-700">Créer un compte</h2>

        {success && (
            <div className="mb-4 p-4 rounded bg-green-100 text-green-800 border border-green-300">
                <ul>
                {Object.values(success).map((msg, i) => (
                    <li key={i}>{msg}</li>
                ))}
                </ul>
            </div>
        )}

        {error && (
          <div className="mb-4 p-4 rounded bg-red-100 text-red-500 border border-red-300">
                  <ul>
                    {Object.values(error).map((msg, i) => (
                      <li key={i}>* {msg}</li>
                    ))}
                  </ul>
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
          required
        />

        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          disabled={loading}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          disabled={loading}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          disabled={loading}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>

        <p className="text-sm text-center">
          Déjà un compte ?{" "}
          <a href="/login" className="text-green-700 hover:underline">
            Se connecter
          </a>
        </p>
      </form>
    </div>
  );
}