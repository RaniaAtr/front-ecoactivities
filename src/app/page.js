"use client";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import ActivityCard from "../components/ActivityCard";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [activities, setActivities] = useState([]);

  // Charger toutes les activités au début
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("/api/activities");
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        console.error("Erreur fetch activités:", err);
      }
    };
    fetchActivities();
  }, []);
  // Callback pour mettre à jour après recherche
  const handleResults = (data) => {
    setActivities(data);
  };

  return (
  <div>
      <Navbar />

      {/* Filtres en haut */}
      <div className="w-full ">
        <Filters onResults={handleResults} />
      </div>

      {/* Liste filtrée */}
      <div className="max-w-7xl mx-auto p-6">
        {activities.length === 0 ? (
          <p className="text-center text-gray-500">Aucune activité trouvée</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
      {/* ✅ Footer ajouté */}
      <Footer />
  </div>
  );
}

