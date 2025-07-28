"use client"
import React from 'react';
import { getEmlakBySlug } from '@/lib/api';
import { useParams } from "next/navigation";
import { Icon } from '@iconify/react';
import { testimonials } from '@/app/api/testimonial';
import Link from 'next/link';
import Image from 'next/image';

import { useEffect, useState } from 'react';

export default function Details() {
    const { slug } = useParams();
    const [item, setItem] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getEmlakBySlug(slug?.toString() || "");
            if (data) {
                // Strapi v4 response normalization
                const attr = data.attributes || {};
                const resimlerArr = attr.resimler?.data || data.resimler || [];
                setItem({
                    name: attr.baslik || data.baslik,
                    location: attr.lokasyon || data.lokasyon,
                    rate: attr.fiyat || data.fiyat,
                    beds: 3,
                    baths: 2,
                    area: 140,
                    slug: attr.slug || data.slug,
                    aciklama: attr.aciklama || data.aciklama,
                    images: resimlerArr.map((img: any) => {
                        const imgAttr = img.attributes || img;
                        const url = imgAttr.url || (imgAttr.formats && imgAttr.formats.medium?.url);
                        return {
                            src: url ? (url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"}${url}`) : ''
                        };
                    })
                });
            }
        }
        fetchData();
    }, [slug]);

    if (!item) return <div>Yükleniyor...</div>;

    return (
        <section className="!pt-44 pb-20 relative" >
            <div className="container mx-auto max-w-8xl px-5 2xl:px-0">
                <div className="grid grid-cols-12 items-end gap-6">
                    <div className="lg:col-span-8 col-span-12">
                        <h1 className='lg:text-52 text-40 font-semibold text-dark dark:text-white'>{item?.name}</h1>
                        <div className="flex gap-2.5">
                            <Icon icon="ph:map-pin" width={24} height={24} className="text-dark/50 dark:text-white/50" />
                            <p className='text-dark/50 dark:text-white/50 text-xm'>{item?.location}</p>
                        </div>
                    </div>
                    {/* Sağ üstteki oda/banyo/metrekare kaldırıldı */}
                </div>
                <div className="grid grid-cols-12 mt-8 gap-8">
                    <div className="lg:col-span-8 col-span-12 row-span-2">
                        {item?.images && item?.images[0] && (
                            <div className="">
                                <Image
                                    src={item.images[0]?.src}
                                    alt="Main Property Image"
                                    width={400}
                                    height={500}
                                    className="rounded-2xl w-full h-540"
                                    unoptimized={true}
                                />
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-4 lg:block hidden">
                        {item?.images && item?.images[1] && (
                            <Image src={item.images[1]?.src} alt="Property Image 2" width={400} height={500} className="rounded-2xl w-full h-full" unoptimized={true} />
                        )}
                    </div>
                    <div className="lg:col-span-2 col-span-6">
                        {item?.images && item?.images[2] && (
                            <Image src={item.images[2]?.src} alt="Property Image 3" width={400} height={500} className="rounded-2xl w-full h-full" unoptimized={true} />
                        )}
                    </div>
                    <div className="lg:col-span-2 col-span-6">
                        {item?.images && item?.images[3] && (
                            <Image src={item.images[3]?.src} alt="Property Image 4" width={400} height={500} className="rounded-2xl w-full h-full" unoptimized={true} />
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-8 mt-10">
                    <div className="lg:col-span-8 col-span-12">
                        {/* Property details altındaki özellikler kaldırıldı */}
                        <div className="flex flex-col gap-5">
                            <p className='text-dark dark:text-white text-xm '>
                                {item?.aciklama || item?.description || item?.attributes?.aciklama}
                            </p>
                        </div>
                        {/* What this property offers kaldırıldı */}
                        {/* Harita kaldırıldı */}
                    </div>
                    <div className="lg:col-span-4 col-span-12 flex items-center h-full">
                        <div className="bg-primary/10 p-8 rounded-2xl relative z-10 overflow-hidden flex items-center justify-center w-full h-full">
                            <Link href="#" className='py-4 px-8 bg-primary text-white rounded-full w-full max-w-xs block text-center hover:bg-dark duration-300 text-base hover:cursor-pointer'>
                                İletişime Geçin
                            </Link>
                            <div className="absolute right-0 top-4 -z-[1]">
                                <Image src="/images/properties/vector.svg" width={400} height={500} alt="vector" unoptimized={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
