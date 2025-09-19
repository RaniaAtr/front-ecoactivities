"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) throw data;
      setMessage("Mot de passe réinitialisé avec succès !");
    } catch (err) {
      setError(err.message || "Erreur lors de la réinitialisation.");
    }
  };

  if (!token) {
    return <div className="p-4 text-red-600">Lien invalide ou token manquant.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-green-700">
        Réinitialisation du mot de passe
      </h2>

      {message && <div className="p-4 bg-green-100 text-green-700 rounded">{message}</div>}
      {error && <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>}

      <input
        type="password"
        placeholder="Nouveau mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        required
      />

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Réinitialiser
      </button>
    </form>
  );
}
