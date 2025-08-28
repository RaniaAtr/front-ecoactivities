'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ActivityCard({ activity }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/activity/${activity.id}`);
  };

  // Convertir la date UTC en locale pour l'affichage
  const dateObj = new Date(activity.date);
  const formattedDate = dateObj.toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
    >
      {activity.image && (
        <div className="w-full h-48 relative">
          <Image
            src={activity.image}
            alt={activity.titre}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{activity.titre}</h2>
        <p className="text-gray-600 mb-1"><strong>Date:</strong> {formattedDate}</p>
        <p className="text-gray-600 mb-1"><strong>Adresse:</strong> {activity.adresse}</p>
        <p className="text-gray-600 mb-1"><strong>Tarif:</strong> {activity.tarif} €</p>
        <p className="text-gray-600 mb-1"><strong>Durée:</strong> {activity.duree} min</p>
        <p className="text-gray-600"><strong>Tag:</strong> {activity.tag}</p>
      </div>
    </div>
  );
}
