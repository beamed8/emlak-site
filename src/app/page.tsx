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
      {/* <FeaturedProperty /> */}
      <FAQ />
      {/* İletişime Geç kutusu - Denge Mekan Menajerlik */}
      <section className="bg-gradient-to-br from-slate-900 via-black to-slate-800 text-white py-20 relative overflow-hidden">
        {/* Arka plan deseni */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="container max-w-4xl mx-auto px-5 relative z-10">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            {/* Başlık */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                İletişime Geç
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                Etkinliğiniz, prodüksiyonunuz veya çekiminiz için özel mekanlar mı arıyorsunuz?
                <br />
                <span className="font-semibold text-primary">Denge Mekan Menajerlik</span> ile hemen iletişime geçin!
              </p>
            </div>

            {/* İletişim Bilgileri */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Telefon</h3>
                <a href="tel:+905555555555" className="text-gray-300 hover:text-primary transition-colors text-center">
                  +90 555 555 55 55
                </a>
              </div>

              <div className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <span className="text-2xl">✉️</span>
                </div>
                <h3 className="font-semibold text-white mb-2">E-posta</h3>
                <a href="mailto:info@dengemekan.com" className="text-gray-300 hover:text-primary transition-colors text-center">
                  info@dengemekan.com
                </a>
              </div>

              <div className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Adres</h3>
                <span className="text-gray-300 text-center text-sm leading-relaxed">
                  Maslak Mah. Büyükdere Cad. No:100<br />
                  Sarıyer / İSTANBUL
                </span>
              </div>
            </div>

            {/* CTA Buton */}
            <div className="text-center">
              <a 
                href="https://wa.me/905555555555?text=Merhaba, mekan kiralama hakkında bilgi almak istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="text-xl">💬</span>
                WhatsApp ile İletişime Geç
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
