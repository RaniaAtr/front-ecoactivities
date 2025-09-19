"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
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
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok) {
        throw json;
      }

      if (json.token) {
        localStorage.setItem("token", json.token);
      }

      router.push("/");
    } catch (err) {
      setError(err.message || "Erreur de connexion.");
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
        <h2 className="text-2xl font-bold text-center text-green-700">
          Se connecter
        </h2>

        {error && (
          <div className="mb-4 p-4 rounded bg-red-100 text-red-500 border border-red-300">
            {typeof error === "string"
              ? error
              : Object.values(error).map((msg, i) => <li key={i}>* {msg}</li>)}
          </div>
        )}

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
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <p className="text-sm text-center">
          <a
            href="/forgotPassword"
            className="text-green-700 hover:underline"
          >
            Mot de passe oublié ?
          </a>
        </p>

        <p className="text-sm text-center">
          Pas encore de compte ?{" "}
          <a href="/register" className="text-green-700 hover:underline">
            S&apos;inscrire
          </a>
        </p>
      </form>
    </div>
  );
}
