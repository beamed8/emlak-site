"use client"
import Link from 'next/link';
import PropertyCard from '@/components/Home/Properties/Card/Card'
import { getEmlaklar, getKategoriler } from '@/lib/api'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search } from 'lucide-react'


const PropertiesListing: React.FC = () => {

  const [emlaklar, setEmlaklar] = useState<any[]>([])
  const [kategoriler, setKategoriler] = useState<any[]>([])
  const [input, setInput] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const kategoriParam = searchParams?.get('kategori') || '';
  // Arama çubuğu için fonksiyonlar (Hero ile aynı)
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

  useEffect(() => {
    async function fetchData() {
      const [emlakData, kategoriData] = await Promise.all([
        getEmlaklar(),
        getKategoriler()
      ])
      setEmlaklar(emlakData)
      setKategoriler(kategoriData)
    }
    fetchData()
  }, [])

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
      .replace(/ler$|lar$|ler$|lar$/g, '') // çoğul eklerini kaldır
  }

  // En yakın kategoriyi bul
  let matchedKategori = '';
  if (kategoriParam && kategoriler.length > 0) {
    const normParam = normalize(kategoriParam);
    let found = kategoriler.find(kat => normalize(kat.ad) === normParam);
    if (!found) {
      // Yakın eşleşme: başı/sonu aynı olanı bul
      found = kategoriler.find(kat => normalize(kat.ad).startsWith(normParam) || normParam.startsWith(normalize(kat.ad)));
    }
    if (found) matchedKategori = found.ad;
  }

  // Kategoriye göre filtrele
  const filtered = matchedKategori
    ? emlaklar.filter(e => e.kategori && normalize(e.kategori.ad) === normalize(matchedKategori))
    : kategoriParam
      ? emlaklar.filter(e => e.kategori && normalize(e.kategori.ad) === normalize(kategoriParam))
      : emlaklar;

return (
    <section className='pt-0!'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        {/* <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-2">Mekanlar</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            İlham veren tasarımlara sahip mekanları keşfedin.<br />
            Zarafet ve konforu bir arada sunan, seçkin yaşam alanlarımızı inceleyin.
          </p>
        </div> */}
        {filtered.length === 0 ? (
          <div className="relative rounded-2xl overflow-hidden flex items-center justify-center min-h-[340px] md:min-h-[420px] lg:min-h-[520px] my-10">
            {/* Video arka plan */}
            <video
              className="w-full h-full absolute top-0 left-0 object-cover -z-10"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Video background showing luxurious real estate"
            >
              <source src="https://videos.pexels.com/video-files/7233782/7233782-hd_1920_1080_25fps.mp4" type="video/mp4" />
            </video>
            {/* Siyah overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-10" />
            <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full">
              <div className="text-white text-2xl md:text-3xl font-semibold text-center drop-shadow-lg">
                Aradığınız kategoriye uygun mekan bulunamadı.<br />
              </div>
              <form
                className="w-full max-w-xl mx-auto flex items-center bg-white/90 dark:bg-dark/80 rounded-full shadow-lg px-4 py-2 gap-2"
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
              <Link href="/contactus" className="bg-white py-4 px-8 rounded-full text-dark hover:bg-dark hover:text-white duration-300 font-semibold text-lg shadow-lg">
                Bizimle iletişime geçin
              </Link>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
            {filtered.map((item, index) => (
              <div key={index} className=''>
                <PropertyCard item={{
                  name: item.baslik,
                  location: item.lokasyon,
                  rate: item.fiyat,
                  beds: 3,
                  baths: 2,
                  area: 140,
                  slug: item.slug,
                  kategori: item.kategori,
                  aciklama: item.aciklama,
                  images: item.resimler?.map((img: any) => ({ src: img.url })) || []
                }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PropertiesListing
