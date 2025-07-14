"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { User, ShoppingCart } from "lucide-react"; // ← Import des icônes modernes

export default function Navbar() {
  return (
    <nav className="bg-green-600 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo à gauche */}
        <Link href="/">
          <Image
            src="/logo/logo.jpg"
            alt="Logo du site"
            width={120}
            height={50}
            className="cursor-pointer"
          />
        </Link>

        {/* Profil + Panier avec icônes modernes */}
        <div className="flex gap-6 items-center text-green-700">
          <Link href="/profil" title="Mon profil">
            <User size={28} className="hover:text-green-900 cursor-pointer" />
          </Link>
          <Link href="/panier" title="Panier">
            <ShoppingCart size={28} className="hover:text-green-900 cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Slogan centré */}
      <div className="text-center mt-4 text-green-800 font-semibold text-lg">
        Nature, détente, évasion – Vivez l’Île-de-France autrement
      </div>

      {/* Barre de recherche au centre */}
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Rechercher..."
          className="border rounded px-4 py-2 w-1/2"
        />
      </div>
    </nav>
  );
}
