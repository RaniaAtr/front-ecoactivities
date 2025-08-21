'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditActivityPage() {
  const [form, setForm] = useState({
    titre: '',
    adresse: '',
    date: '',
    tag: '',
    tarif: '',
    image: '',
    duree: '',
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams(); // récupère l'id depuis l'URL

  // Récupération des données de l'activité
  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch(`/api/activities/${params.id}`);
        if (!res.ok) throw new Error('Impossible de charger l’activité');
        const data = await res.json();

        setForm({
          titre: data.titre || '',
          adresse: data.adresse || '',
          date: data.date ? data.date.slice(0, 16) : '',
          tag: data.tag || '',
          tarif: data.tarif ? parseFloat(data.tarif) : '',
          image: data.image || '',
          duree: data.duree ? data.duree.replace(' min', '') : '',
        });
      } catch (err) {
        console.error(err);
        alert('Erreur lors du chargement de l’activité');
      } finally {
        setLoading(false);
      }
    }

    fetchActivity();
  }, [params.id]);

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/activities/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          duree: form.duree.endsWith('min') ? form.duree : form.duree + ' min',
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Activité mise à jour avec succès !');
        router.push('/admin/activities');
      } else if (res.status === 403) {
        alert('Accès refusé. Vous n\'êtes pas admin.');
        router.push('/');
      } else {
        alert(data.message || 'Erreur lors de la modification.');
      }
    } catch (error) {
      console.error('Erreur modification :', error);
      alert('Erreur inattendue');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Modifier Activité</h1>

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
          placeholder="Durée (min)"
          value={form.duree}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Modification...' : 'Modifier'}
        </button>
      </form>
    </div>
  );
}
