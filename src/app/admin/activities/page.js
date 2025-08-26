'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/activities')
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement activités :', err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm('Voulez-vous vraiment supprimer cette activité ?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/activities/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (res.ok) {
        setActivities(activities.filter(act => act.id !== id));
        alert('Activité supprimée avec succès');
      } else {
        alert(result.message || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur suppression :', error);
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Activités</h1>

      <button
        onClick={() => router.push('/admin/activities/create')}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Créer une activité
      </button>

      {activities.length === 0 ? (
        <p>Aucune activité disponible.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Titre</th>
              <th className="p-2 border">Tag</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => {
              const dateObj = activity.date ? new Date(activity.date) : null;
              const formattedDate = dateObj
                ? dateObj.toLocaleString('fr-FR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Non définie';

              return (
                <tr key={activity.id} className="text-center">
                  <td className="p-2 border">{activity.titre}</td>
                  <td className="p-2 border">{activity.tag}</td>
                  <td className="p-2 border">{formattedDate}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => router.push(`/admin/activities/${activity.id}`)}
                      className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(activity.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
