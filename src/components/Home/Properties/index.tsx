'use client' // ❗️Eğer burada fetch yapmayacaksan bunu kaldırabilirsin

import { Icon } from '@iconify/react'
import PropertyCard from './Card/Card'
// import { propertyHomes } from '@/app/api/propertyhomes' ❌ bunu kaldır
import { getEmlaklar } from '@/lib/api' // ✅ senin Strapi api fonksiyonun
import { useEffect, useState } from 'react'

const Properties: React.FC = () => {
  const [emlaklar, setEmlaklar] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const data = await getEmlaklar()
      setEmlaklar(data)
    }
    fetchData()
  }, [])

  return (
    <section>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='mb-16 flex flex-col gap-3 '>
          <div className='flex gap-2.5 items-center justify-center'>
            <span>
              <Icon
                icon={'ph:house-simple-fill'}
                width={20}
                height={20}
                className='text-primary'
              />
            </span>
            <p className='text-base font-semibold text-dark/75 dark:text-white/75'>
              Mekanlar
            </p>
          </div>
          <h2 className='text-40 lg:text-52 font-medium text-black dark:text-white text-center tracking-tight leading-11 mb-2'>
            Organizasyonunuza en uygun mekanları bulun
          </h2>
          <p className='text-xm font-normal text-black/50 dark:text-white/50 text-center'>
            Her türlü organizasyon için malikanelerden kafelere, otellerden köşklere ve dairelere kadar birçok farklı mekanı kolayca bulun.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
          {emlaklar.slice(0, 3).map((item, index) => (
            <div key={index}>
              <PropertyCard item={{
                name: item.baslik,
                location: item.lokasyon,
                rate: item.fiyat,
                beds: 3, // Strapi'de yoksa örnek ver
                baths: 2,
                area: 140,
                slug: item.slug,
                kategori: item.kategori,
                aciklama: item.aciklama,
                images: item.resimler.map((img: any) => ({ src: img.url }))
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Properties
