'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateActivityPage() {
  const [form, setForm] = useState({
    titre: '',
    adresse: '',
    date: '',
    tag: '',
    tarif: '',
    image: '',
    duree: '',
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Activité créée avec succès !');
        router.push('/admin/activities');
      } else {
        alert(data.message || 'Erreur lors de la création.');
      }
    } catch (error) {
      console.error('Erreur création :', error);
      alert('Erreur inattendue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Créer une Activité</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="titre"
          placeholder="Titre"
          value={form.titre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="adresse"
          placeholder="Adresse"
          value={form.adresse}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="tag"
          placeholder="Tag"
          value={form.tag}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          step="0.01"
          name="tarif"
          placeholder="Tarif (€)"
          value={form.tarif}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="image"
          placeholder="URL de l'image"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="duree"
          placeholder="Durée (ex: 60 min)"
          value={form.duree}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Création...' : 'Créer'}
        </button>
      </form>
    </div>
  );
}