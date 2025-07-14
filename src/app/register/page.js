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

  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   try {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const json = await response.json();

    if (!response.ok) {
      throw json 
    }
    
    setSuccess(json.message);
    console.log (json.message);
    setError("");
  }
  catch (erreur) {
    console.error(erreur);
    setError(erreur);
    setSuccess("");

}
   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
     
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-green-700">Créer un compte</h2>

        {/*error && <p className="text-red-500 text-center">{error}</p>*/}
        {Object.values(error).map((msg, i) => (
                    <li key={i}>* {msg}</li>
                ))}
        {success && <p className="text-green-500 text-center">{success}</p>}

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
          //required
          
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          disabled={loading}
          //required
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
