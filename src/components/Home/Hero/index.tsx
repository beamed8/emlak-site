
"use client"

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getKategoriler } from '@/lib/api'

const Hero: React.FC = () => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [kategoriler, setKategoriler] = useState<any[]>([]);

  useEffect(() => {
    getKategoriler().then(setKategoriler);
  }, []);

  // Türkçe karakterleri normalize eden yardımcı fonksiyon
  function normalize(str: string) {
    return str
      .toLocaleLowerCase('tr')
      .replace(/ı/g, 'i')
      .replace(/ü/g, 'u')
      .replace(/ö/g, 'o')
      .replace(/ş/g, 's')
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/â/g, 'a')
      .replace(/[^a-z0-9]/g, '')
      .replace(/ler$|lar$/g, '');
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const normInput = normalize(input);
    let found = kategoriler.find(kat => normalize(kat.ad) === normInput);
    if (!found) {
      found = kategoriler.find(kat => normalize(kat.ad).startsWith(normInput) || normInput.startsWith(normalize(kat.ad)));
    }
    const kategori = found ? found.ad : input;
    router.push(`/properties?kategori=${encodeURIComponent(kategori)}`);
  }

  return (
    <section className='!py-0 relative overflow-hidden min-h-screen flex items-center'>
      {/* Video arka plan */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Video background showing luxurious real estate"
      >
        <source src="https://videos.pexels.com/video-files/7233782/7233782-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>
      {/* Siyah transparan katman */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-10" />
      <div className='w-full flex flex-col items-center justify-center h-full'>
        <div className='container max-w-4xl mx-auto px-5 flex flex-col items-center justify-center h-full relative z-10'>
          <h1 className='text-white dark:text-dark text-4xl sm:text-6xl font-semibold text-center drop-shadow-lg mb-8 max-w-5xl'>
            Aradığın mekanı bul, etkinliğini planla.
          </h1>
          <form
            className="w-full max-w-2xl mx-auto flex items-center bg-white/90 dark:bg-dark/80 rounded-full shadow-lg px-4 py-2 gap-2"
            onSubmit={handleSearch}
          >
            <Search className="text-primary w-6 h-6" />
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Etkinlik türü, şehir veya mekan adı ile arayın..."
              className="flex-grow bg-transparent outline-none text-gray-900 dark:text-white text-lg placeholder-gray-500 dark:placeholder-white px-2"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/80 rounded-full px-8 py-3 font-semibold text-white text-lg transition-colors shadow-md"
            >
              Ara
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Hero

