"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Filters from "@/components/Filters";
// ⚠️ Footer à créer après, pour l’instant placeholder
// import Footer from "@/components/Footer";

export default function ActivityDetail() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch(`/api/activities/${id}`);
        if (!res.ok) throw new Error("Erreur de récupération");

        const data = await res.json();
        setActivity(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchActivity();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!activity)
    return <p className="text-gray-500 text-center mt-10">Activité introuvable</p>;

  return (
    <>
      <Navbar />
      <div className="w-full px-8 py-12 bg-gray-50 min-h-screen">
        {/* On garde aussi les filtres en haut */}
        <div className="max-w-6xl mx-auto mb-10">
          <Filters />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Colonne gauche : image */}
          <div className="flex justify-center">
            {activity.image && (
              <div className="w-full h-96 relative">
                <Image
                  src={activity.image}
                  alt={activity.titre}
                  fill
                  className="object-cover rounded-lg shadow-md"
                  unoptimized
                />
              </div>
            )}
          </div>

          {/* Colonne droite : détails + bouton */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-6">{activity.titre}</h1>

              <p className="text-lg text-gray-700 mb-3">
                <strong>Lieu :</strong> {activity.adresse}
              </p>

              <p className="text-lg text-gray-700 mb-3">
                <strong>Date :</strong>{" "}
                {new Date(activity.date).toLocaleString("fr-FR", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>

              <p className="text-lg text-gray-700 mb-3">
                <strong>Prix :</strong> {activity.tarif} €
              </p>

              <p className="text-lg text-gray-700 mb-3">
                <strong>Durée :</strong>{" "}
                {activity.duree >= 60
                  ? `${Math.floor(activity.duree / 60)}h ${
                      activity.duree % 60 > 0 ? activity.duree % 60 + "min" : ""
                    }`
                  : `${activity.duree} min`}
              </p>

              <p className="text-lg text-gray-700 mb-3">
                <strong>Tag :</strong> {activity.tag}
              </p>
            </div>

            <button className="mt-6 bg-green-600 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow hover:bg-green-700 transition">
              Réserver
            </button>
          </div>
        </div>
      </div>

      {/* Footer placeholder */}
      <div className="w-full bg-gray-800 text-white text-center py-6 mt-10">
        Footer (à développer)
      </div>
    </>
  );
}
