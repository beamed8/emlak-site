"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface KategoriPageClientProps {
  emlaklar: any[];
}

export default function KategoriPageClient({
  emlaklar,
}: KategoriPageClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // animasyonlar için client yüklendiğinde başlat
  }, []);

  if (!mounted) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {emlaklar.map((emlak: any, i: number) => {
        const gorsel =
          emlak.resimler?.length > 0
            ? emlak.resimler[0].url
            : "/placeholder.jpg";

        return (
          <Link
            key={emlak.id}
            href={`/emlak/${emlak.documentId}`}
            className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white animate-fadeIn"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
          >
            <div className="overflow-hidden h-60">
              <img
                src={gorsel}
                alt={emlak.baslik}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1 text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                {emlak.baslik}
              </h2>
              <p className="text-sm text-gray-500">{emlak.lokasyon}</p>
            </div>

            <div className="absolute top-4 right-4 bg-white px-3 py-1 text-sm rounded-full shadow text-indigo-600 font-medium">
              {emlak.kategori?.ad || "Emlak"}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
