"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { User, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-green-600 px-6 py-4">
      <div className="flex items-center justify-between h-10">
        {/* Logo à gauche */}
        <div className="bg-white h-full">
          <Link href="/" className="relative block h-full w-28">
            <Image
              src="/logo/logo.jpg"
              alt="Logo du site"
              fill
              className="object-contain cursor-pointer p-1"
            />
          </Link>
        </div>

        {/* Section centrale avec slogan */}
        <div className="flex-1 mx-4 text-center">
          <h1 className="text-black font-bold text-lg">
            Nature, Détente, Évasion : Vivez l'île-de-France autrement !
          </h1>
        </div>

        {/* Icônes profil/panier à droite */}
        <div className="flex gap-4 items-center">
          <Link href="/profil" title="Mon profil">
            <User size={32} className="text-black hover:text-gray-700 cursor-pointer transition-colors" />
          </Link>
          <Link href="/panier" title="Panier">
            <ShoppingCart size={32} className="text-black hover:text-gray-700 cursor-pointer transition-colors" />
          </Link>
        </div>
      </div>

      {/* Barre de recherche en dessous, avec marges */}
      <div className="mt-4 mx-6 flex justify-center">
        <div className="w-3/4">
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