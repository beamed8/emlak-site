import Link from "next/link";
import { Icon } from "@iconify/react"
import { FooterLinks } from "@/app/api/footerlinks";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-dark">
      <div className="container mx-auto max-w-8xl pt-14 px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col items-center justify-center pb-14 border-b border-white/10 gap-6">
          <div className="flex items-center gap-6 justify-center">
            <Link href="#">
              <Icon icon="ph:x-logo-bold" width={24} height={24} className="text-white hover:text-primary duration-300" />
            </Link>
            <Link href="#">
              <Icon icon="ph:facebook-logo-bold" width={24} height={24} className="text-white hover:text-primary duration-300" />
            </Link>
            <Link href="#">
              <Icon icon="ph:instagram-logo-bold" width={24} height={24} className="text-white hover:text-primary duration-300" />
            </Link>
          </div>
        </div>
        <div className="py-16 border-b border-white/10">
          <div className="grid grid-cols-12 sm:gap-10 gap-y-6">
            <div className="md:col-span-7 col-span-12">
              <h2 className="text-white leading-[1.2] text-40 font-medium mb-6 lg:max-w-3/4">
                Etkinliğiniz için en uygun yeri kolayca bulun.
              </h2>
              <Link href="/contactus" className="bg-primary text-base font-semibold py-4 px-8 rounded-full text-white hover:bg-white hover:text-dark duration-300 hover:cursor-pointer">
                İletişime Geçin
              </Link>
            </div>
            {/* Kategoriler görseldeki gibi sabit liste */}
            <div className="md:col-span-5 col-span-12 grid grid-cols-4 gap-4">
              <div className="flex flex-col gap-2">
                {['Malikaneler','Yalılar','Villalar','Müstakiler','Rezidanslar','Konutlar','Yat'].map((cat) => (
                  <Link key={cat} href={`/properties?kategori=${encodeURIComponent(cat)}`} className="text-white hover:text-primary transition-colors">
                    {cat}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {['Apartmanlar','Köşkler','Ofisler','Restoranlar','Kafeler','Avm','İnşaat'].map((cat) => (
                  <Link key={cat} href={`/properties?kategori=${encodeURIComponent(cat)}`} className="text-white hover:text-primary transition-colors">
                    {cat}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {['Çiftlikler','Oteller','Taş Evleri','Mağazalar','Saraylar','Hanlar','Atölye'].map((cat) => (
                  <Link key={cat} href={`/properties?kategori=${encodeURIComponent(cat)}`} className="text-white hover:text-primary transition-colors">
                    {cat}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {['Dağ Evi','Okullar','Hangarlar','Plajlar','Stadyumlar','Kulüpler','Spa','Fabrika'].map((cat) => (
                  <Link key={cat} href={`/properties?kategori=${encodeURIComponent(cat)}`} className="text-white hover:text-primary transition-colors">
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center py-6">
          <p className="text-white/40 text-sm text-center w-full">
            ©{new Date().getFullYear()} Denge Mekan Menajerlik - Her Hakkı Saklıdır
          </p>
        </div>
      </div>
    </footer >
  );
};

export default Footer;