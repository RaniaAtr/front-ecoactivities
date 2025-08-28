'use client';
import { useState } from "react";

export default function Filters({ onResults }) {
  const [filters, setFilters] = useState({
    prixMax: "",
    date: "",
    tag: "",
    lieu: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const params = new URLSearchParams(filters);
      const res = await fetch(`/api/activities/Search?${params.toString()}`);
      const data = await res.json();
      onResults(data); // 🔥 on envoie les résultats à HomePage
    } catch (err) {
      console.error("Erreur lors de la recherche:", err);
      onResults([]); // en cas d'erreur → tableau vide
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-lg bg-green-50 shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Rechercher une activité</h2>
      <form
        onSubmit={handleSearch}
        className="flex flex-wrap gap-3 items-center w-full"
      >
        <input
          type="number"
          name="prixMax"
          placeholder="Prix max"
          value={filters.prixMax}
          onChange={handleChange}
          className="flex-1 p-2 rounded-md border border-green-200 bg-green-100 w-full"
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          className="flex-1 p-2 rounded-md border border-green-200 bg-green-100 w-full"
        />
        <input
          type="text"
          name="tag"
          placeholder="Tag"
          value={filters.tag}
          onChange={handleChange}
          className="flex-1 p-2 rounded-md border border-green-200 bg-green-100 w-full"
        />
        <input
          type="text"
          name="lieu"
          placeholder="Lieu"
          value={filters.lieu}
          onChange={handleChange}
          className="flex-1 p-2 rounded-md border border-green-200 bg-green-100 w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full md:w-auto"
        >
          {loading ? "Recherche..." : "Rechercher"}
        </button>
      </form>
    </div>
  );
}
