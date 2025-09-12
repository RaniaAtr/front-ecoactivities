import React from "react";
import { Facebook, Instagram, Music } from "lucide-react"; // Music = TikTok
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-10 mt-12 shadow-inner">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* 📌 Colonne gauche - Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contactez-nous</h3>
          <p>📍 123 Rue de la Nature, Paris</p>
          <p>📞 01 23 45 67 89</p>
          <p>✉️ contact@natureidf.fr</p>
        </div>

        {/* 📌 Colonne milieu - À propos */}
        <div>
          <h3 className="text-xl font-semibold mb-4">À propos de nous</h3>
          <p className="text-sm leading-relaxed text-gray-600">
            Nature, détente, évasion : notre mission est de vous faire découvrir 
            l’Île-de-France autrement à travers des activités uniques et locales.
          </p>
        </div>

        {/* 📌 Colonne droite - Réseaux sociaux */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
              <Facebook className="w-6 h-6 hover:text-green-600 transition-colors" />
            </Link>
            <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
              <Instagram className="w-6 h-6 hover:text-green-600 transition-colors" />
            </Link>
            <Link href="https://tiktok.com" target="_blank" aria-label="TikTok">
              <Music className="w-6 h-6 hover:text-green-600 transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* 📌 Ligne du bas */}
      <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Nature IDF. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;
