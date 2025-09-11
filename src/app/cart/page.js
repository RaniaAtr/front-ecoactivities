"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext"; 

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
        <p>Ajoutez des activités pour les voir ici.</p>
      </div>
    );
  }

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const body = {
        activity_id: cart[0].id // Ici, on prend l'id de la première activité pour l'exemple. À adapter si plusieurs.
      };

      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error("Erreur lors de la création de la session Stripe");

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirection vers Stripe Checkout
      } else {
        alert("Impossible de récupérer l'URL de paiement.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur, réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center">Votre Panier</h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {cart.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{item.titre}</h3>
              <p>Prix: {item.price ? `${item.price} €` : "N/A"}</p>
              <p>Durée: {item.duree ? `${item.duree} min` : "N/A"}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        ))}

        <div className="bg-white p-4 rounded shadow flex justify-between items-center">
          <span className="font-bold text-lg">Total: {total.toFixed(2)} €</span>
          <div className="flex gap-2">
            <button
              onClick={clearCart}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Vider le panier
            </button>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {loading ? "Redirection..." : "Passer au paiement"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
