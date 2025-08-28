"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // récupère le token dans l'URL

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: form.password }),
      });

      const json = await res.json();

      if (!res.ok) throw json;

      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000); // redirige après succès
    } catch (err) {
      setError(err.message || "Erreur lors de la réinitialisation.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Mot de passe réinitialisé avec succès ! Redirection vers la connexion...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-green-700">Réinitialiser le mot de passe</h2>

        {error && (
          <div className="mb-4 p-4 rounded bg-red-100 text-red-500 border border-red-300">{error}</div>
        )}

        <input
          type="password"
          name="password"
          placeholder="Nouveau mot de passe"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          disabled={loading}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          disabled={loading}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "En cours..." : "Réinitialiser le mot de passe"}
        </button>
      </form>
    </div>
  );
}
