"use client"
import React from 'react';
import { getEmlakBySlug } from '@/lib/api';
import { useParams } from "next/navigation";
import { Icon } from '@iconify/react';
import { testimonials } from '@/app/api/testimonial';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Head from 'next/head';

import { useEffect, useState } from 'react';

export default function Details() {
    const { slug } = useParams();
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageScale, setImageScale] = useState(1);
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        setImageScale(1);
        setImagePosition({ x: 0, y: 0 });
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setImageScale(1);
        setImagePosition({ x: 0, y: 0 });
    };

    const nextImage = () => {
        if (item?.images) {
            setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
            setImageScale(1);
            setImagePosition({ x: 0, y: 0 });
        }
    };

    const prevImage = () => {
        if (item?.images) {
            setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
            setImageScale(1);
            setImagePosition({ x: 0, y: 0 });
        }
    };

    const handleZoomIn = () => {
        setImageScale(prev => Math.min(prev + 0.5, 3));
    };

    const handleZoomOut = () => {
        setImageScale(prev => Math.max(prev - 0.5, 0.5));
    };

    const handleResetZoom = () => {
        setImageScale(1);
        setImagePosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (imageScale > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && imageScale > 1) {
            setImagePosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            handleZoomIn();
        } else {
            handleZoomOut();
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!lightboxOpen) return;
        
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                prevImage();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextImage();
                break;
            case '+':
            case '=':
                e.preventDefault();
                handleZoomIn();
                break;
            case '-':
                e.preventDefault();
                handleZoomOut();
                break;
            case '0':
                e.preventDefault();
                handleResetZoom();
                break;
        }
    };

    useEffect(() => {
        if (lightboxOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [lightboxOpen, item]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const data = await getEmlakBySlug(slug?.toString() || "");
                if (data) {
                    // Strapi v4 response normalization
                    const attr = data.attributes || {};
                    const resimlerArr = attr.resimler?.data || data.resimler || [];
                    const itemData = {
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
                    };
                    setItem(itemData);
                    
                    // Sayfa title'ını dinamik olarak değiştir
                    document.title = `${itemData.name} | Denge Mekan Menajerlik`;
                    
                    // Favicon'u güncelle
                    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
                    if (favicon) {
                        favicon.href = '/favicon.ico';
                    }
                    
                    // Apple touch icon'u da güncelle
                    const appleIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
                    if (appleIcon) {
                        appleIcon.href = '/favicon.ico';
                    }
                }
            } catch (error) {
                console.error('Mekan detay yükleme hatası:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <section className="!pt-44 pb-20 relative">
                <div className="container mx-auto max-w-8xl px-5 2xl:px-0">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="flex flex-col items-center gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            <p className="text-dark dark:text-white text-lg">Mekan detayları yükleniyor...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (!item) {
        return (
            <section className="!pt-44 pb-20 relative">
                <div className="container mx-auto max-w-8xl px-5 2xl:px-0">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-dark dark:text-white text-2xl font-semibold">Mekan bulunamadı</div>
                            <p className="text-dark/50 dark:text-white/50 text-lg">Aradığınız mekan mevcut değil veya kaldırılmış olabilir.</p>
                            <Link href="/properties" className="bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-full font-semibold transition-colors">
                                Tüm Mekanları Görüntüle
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

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
                            <div 
                                className="cursor-pointer"
                                onClick={() => openLightbox(0)}
                            >
                                <Image
                                    src={item.images[0]?.src}
                                    alt="Main Property Image"
                                    width={400}
                                    height={500}
                                    className="rounded-2xl w-full h-540 hover:opacity-90 transition-opacity"
                                    unoptimized={true}
                                />
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-4 lg:block hidden">
                        {item?.images && item?.images[1] && (
                            <div 
                                className="cursor-pointer"
                                onClick={() => openLightbox(1)}
                            >
                                <Image 
                                    src={item.images[1]?.src} 
                                    alt="Property Image 2" 
                                    width={400} 
                                    height={500} 
                                    className="rounded-2xl w-full h-full hover:opacity-90 transition-opacity" 
                                    unoptimized={true} 
                                />
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-2 col-span-6">
                        {item?.images && item?.images[2] && (
                            <div 
                                className="cursor-pointer"
                                onClick={() => openLightbox(2)}
                            >
                                <Image 
                                    src={item.images[2]?.src} 
                                    alt="Property Image 3" 
                                    width={400} 
                                    height={500} 
                                    className="rounded-2xl w-full h-full hover:opacity-90 transition-opacity" 
                                    unoptimized={true} 
                                />
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-2 col-span-6">
                        {item?.images && item?.images[3] && (
                            <div 
                                className="cursor-pointer relative"
                                onClick={() => openLightbox(3)}
                            >
                                <Image 
                                    src={item.images[3]?.src} 
                                    alt="Property Image 4" 
                                    width={400} 
                                    height={500} 
                                    className="rounded-2xl w-full h-full hover:opacity-90 transition-opacity" 
                                    unoptimized={true} 
                                />
                                {/* Daha fazla görsel varsa "+X" göster */}
                                {item.images.length > 4 && (
                                    <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                                        <span className="text-white text-2xl font-bold">+{item.images.length - 4}</span>
                                    </div>
                                )}
                            </div>
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
                    <div className="lg:col-span-4 col-span-12">
                        <div className="bg-primary/10 p-8 rounded-2xl relative z-10 overflow-hidden h-80 flex flex-col items-center justify-center">
                            <div className="text-center mb-6">
                                <h3 className="text-dark dark:text-white text-xl font-semibold mb-2">Bu Mekanla İlgileniyorum</h3>
                                <p className="text-dark/60 dark:text-white/60 text-sm">Daha fazla bilgi almak için bizimle iletişime geçin</p>
                            </div>
                            <Link href="/contactus" className='py-4 px-8 bg-primary text-white rounded-full w-full max-w-xs block text-center hover:bg-dark duration-300 text-base font-semibold'>
                                İletişime Geçin
                            </Link>
                            <div className="absolute right-0 top-4 -z-[1] opacity-20">
                                <Image src="/images/properties/vector.svg" width={400} height={500} alt="vector" unoptimized={true} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lightbox Modal */}
                {lightboxOpen && item?.images && (
                    <div 
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={closeLightbox}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        tabIndex={0}
                    >
                        {/* Kapatma Butonu */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 z-20 bg-black/50 rounded-full p-2 backdrop-blur-sm"
                        >
                            <X size={24} />
                        </button>

                        {/* Zoom Kontrolleri */}
                        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleZoomIn();
                                }}
                                className="text-white hover:text-gray-300 bg-black/50 rounded-full p-2 backdrop-blur-sm"
                                title="Yakınlaştır"
                            >
                                <Icon icon="ph:plus" width={20} height={20} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleZoomOut();
                                }}
                                className="text-white hover:text-gray-300 bg-black/50 rounded-full p-2 backdrop-blur-sm"
                                title="Uzaklaştır"
                            >
                                <Icon icon="ph:minus" width={20} height={20} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleResetZoom();
                                }}
                                className="text-white hover:text-gray-300 bg-black/50 rounded-full p-2 backdrop-blur-sm"
                                title="Sıfırla"
                            >
                                <Icon icon="ph:arrows-out" width={20} height={20} />
                            </button>
                        </div>

                        {/* Önceki Görsel Butonu */}
                        {item.images.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevImage();
                                }}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-20 bg-black/50 rounded-full p-3 backdrop-blur-sm"
                            >
                                <ChevronLeft size={32} />
                            </button>
                        )}

                        {/* Sonraki Görsel Butonu */}
                        {item.images.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextImage();
                                }}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-20 bg-black/50 rounded-full p-3 backdrop-blur-sm"
                            >
                                <ChevronRight size={32} />
                            </button>
                        )}

                        {/* Ana Görsel */}
                        <div 
                            className="flex items-center justify-center w-full h-full overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                            onWheel={handleWheel}
                        >
                            <div
                                className="relative transition-transform duration-200 ease-out"
                                style={{
                                    transform: `scale(${imageScale}) translate(${imagePosition.x / imageScale}px, ${imagePosition.y / imageScale}px)`,
                                    cursor: imageScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
                                }}
                                onMouseDown={handleMouseDown}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (imageScale === 1) {
                                        handleZoomIn();
                                    }
                                }}
                            >
                                <Image
                                    src={item.images[currentImageIndex]?.src}
                                    alt={`${item?.name} - Görsel ${currentImageIndex + 1}`}
                                    width={1200}
                                    height={800}
                                    className="max-w-[95vw] max-h-[85vh] object-contain select-none"
                                    unoptimized={true}
                                    draggable={false}
                                />
                            </div>
                        </div>

                        {/* Görsel Bilgisi */}
                        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-center">
                            <div className="bg-black/50 rounded-lg px-4 py-2 backdrop-blur-sm">
                                <div className="text-sm font-medium">{item?.name}</div>
                                <div className="text-xs opacity-75">{currentImageIndex + 1} / {item.images.length}</div>
                                {imageScale !== 1 && (
                                    <div className="text-xs opacity-75">Zoom: {Math.round(imageScale * 100)}%</div>
                                )}
                                <div className="text-xs opacity-60 mt-2 space-x-3">
                                    <span>ESC: Kapat</span>
                                    <span>←→: Gezin</span>
                                    <span>Tekerlek: Zoom</span>
                                    <span>+/-: Zoom</span>
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Navigation */}
                        {item.images.length > 1 && (
                            <div 
                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/50 rounded-lg p-2 backdrop-blur-sm"
                                onClick={(e) => e.stopPropagation()}
                                style={{ maxWidth: 'calc(100vw - 2rem)' }}
                            >
                                {item.images.slice(0, 8).map((image: any, index: number) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(index);
                                            setImageScale(1);
                                            setImagePosition({ x: 0, y: 0 });
                                        }}
                                        className={`flex-shrink-0 w-12 h-12 rounded border-2 overflow-hidden transition-all ${
                                            index === currentImageIndex ? 'border-white scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                                        }`}
                                    >
                                        <Image
                                            src={image.src}
                                            alt=""
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                            unoptimized={true}
                                        />
                                    </button>
                                ))}
                                {item.images.length > 8 && (
                                    <div className="flex items-center justify-center w-12 h-12 bg-black/70 rounded border-2 border-transparent">
                                        <span className="text-white text-xs font-bold">+{item.images.length - 8}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
