"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HomeClient({ kategoriler }: { kategoriler: any[] }) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Başlık */}
      <motion.h2
        className="text-4xl font-bold mb-10 text-center text-blue-800"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Emlak Kategorileri
      </motion.h2>

      {/* Kategori kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {kategoriler.map((kategori, index) => (
          <motion.div
            key={kategori.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              href={`/kategori/${kategori.slug}`}
              className="block rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
            >
              <Image
                src={`/kategori-img/${kategori.slug}.jpg`}
                alt={kategori.ad}
                width={400}
                height={200}
                className="w-full h-40 object-cover"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = "/placeholder.jpg")
                }
              />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold capitalize text-gray-800">
                    {kategori.ad}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-gray-500 mt-1 text-sm">
                  Tüm {kategori.ad} ilanlarını keşfet
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Emlak Sitesi. Tüm hakları saklıdır.
      </footer>
    </main>
  );
}
