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
    duree: '', // en minutes
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch(`/api/activities/${id}`);
        if (!res.ok) throw new Error('Impossible de charger l’activité');
        const data = await res.json();

        setForm({
          titre: data.titre || '',
          adresse: data.adresse || '',
          date: data.date ? data.date.replace(' ', 'T').slice(0,16) : '',
          tag: data.tag || '',
          tarif: data.tarif || '',
          image: data.image || '',
          duree: data.duree || '',
        });
      } catch (err) {
        console.error(err);
        alert('Erreur lors du chargement de l’activité');
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dateValue = form.date ? new Date(form.date).toISOString() : null;
      const body = {
        ...form,
        date: dateValue,
        duree: form.duree ? parseInt(form.duree) : 0,
      };

      const res = await fetch(`/api/activities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Activité modifiée avec succès !');
        router.push('/admin/activities');
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

  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Modifier Activité</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="titre" placeholder="Titre" value={form.titre} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="datetime-local" name="date" value={form.date} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="tag" placeholder="Tag" value={form.tag} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="number" step="0.01" name="tarif" placeholder="Tarif (€)" value={form.tarif} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="image" placeholder="URL de l'image" value={form.image} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="number" name="duree" placeholder="Durée (minutes)" value={form.duree} onChange={handleChange} className="w-full border p-2 rounded" />
        <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {loading ? 'Modification...' : 'Modifier'}
        </button>
      </form>
    </div>
  );
}
