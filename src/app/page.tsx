import FeaturedProperty from '@/components/Home/FeaturedProperty'
import Hero from '@/components/Home/Hero'
import Properties from '@/components/Home/Properties'
import Services from '@/components/Home/Services'
// import Testimonial from '@/components/Home/Testimonial'
// import BlogSmall from '@/components/shared/Blog'
// import GetInTouch from '@/components/Home/GetInTouch'
import FAQ from '@/components/Home/FAQs'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Properties />
      <FeaturedProperty />
      {/* İletişime Geç kutusu - Denge Mekan Menajerlik */}
      <section className="bg-black text-white py-16 flex justify-center items-center">
        <div className="w-full max-w-2xl mx-auto p-12 rounded-3xl shadow-2xl bg-black/90 border border-white/10 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold mb-3 text-center tracking-tight">İletişime Geç</h2>
          <p className="mb-8 text-center text-gray-200 text-lg max-w-xl">Etkinliğiniz, prodüksiyonunuz veya çekiminiz için özel mekanlar mı arıyorsunuz?<br /><span className="font-semibold text-white">Denge Mekan Menajerlik</span> ile hemen iletişime geçin!</p>
          <div className="flex flex-col gap-5 mb-8 w-full max-w-md mx-auto items-center">
            <div className="flex items-center gap-3 w-full justify-start">
              <span className="text-2xl">📞</span>
              <a href="tel:+905555555555" className="hover:underline text-lg font-medium">+90 555 555 55 55</a>
            </div>
            <div className="flex items-center gap-3 w-full justify-start">
              <span className="text-2xl">✉️</span>
              <a href="mailto:info@dengemekan.com" className="hover:underline text-lg font-medium">info@dengemekan.com</a>
            </div>
            <div className="flex items-center gap-3 w-full justify-start">
              <span className="text-2xl">📍</span>
              <span className="text-lg font-medium">Maslak Mah. Büyükdere Cad. No:100<br />Sarıyer / İSTANBUL</span>
            </div>
          </div>
          <a href="tel:+905555555555" className="block w-full max-w-xs bg-red-700 hover:bg-red-800 text-white text-center py-4 rounded-xl font-semibold text-xl transition">Tıkla Ara</a>
        </div>
      </section>
      <FAQ />
    </main>
  )
}
