"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext"; 
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { cart } = useCart();
  const router = useRouter();
  const [profileUrl, setProfileUrl] = useState("/profil"); // par défaut utilisateur normal

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me", { credentials: "include" });
        if (!res.ok) return; // pas connecté, on reste sur /profil
        const data = await res.json();
        if (data.roles?.includes("ROLE_ADMIN")) {
          setProfileUrl("/profil/admin");
        } else {
          setProfileUrl("/profil");
        }
      } catch (err) {
        console.error("Erreur récupération utilisateur :", err);
      }
    };
    fetchUser();
  }, []);

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <nav className="bg-green-600 px-2 py-2">
      <div className="flex items-center justify-between h-20">
        <div className="bg-white h-full">
          <Link href="/" className="relative block h-full w-40">
            <Image
              src="/logo/logo.jpg"
              alt="Logo du site"
              fill
              className="object-contain cursor-pointer "
            />
          </Link>
        </div>

        <div className="flex-1 mx-4 text-center">
          <h1 className="text-black font-bold text-lg">
            Nature, Détente, Évasion : Vivez l'île-de-France autrement !
          </h1>
        </div>

        <div className="flex gap-4 items-center relative">
          <Link href={profileUrl} title="Mon profil">
            <User
              size={32}
              className="text-black hover:text-gray-700 cursor-pointer transition-colors"
            />
          </Link>

          <div className="relative cursor-pointer" onClick={handleCartClick} title="Panier">
            <ShoppingCart
              size={32}
              className="text-black hover:text-gray-700 transition-colors"
            />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-0 mx-6 flex justify-center">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full bg-white border-0 rounded-full px-6 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
    </nav>
  );
}
