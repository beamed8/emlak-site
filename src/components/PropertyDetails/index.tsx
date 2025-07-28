// components/PropertyDetails/index.tsx
"use client"

import { useState } from 'react';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyDetails = ({ data }: { data: any }) => {
  const { title, description, images, price } = data.attributes;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageUrls = images?.data?.map((img: any) => img.attributes.url) || [];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="mb-6">{description}</p>
        <p className="font-semibold text-xl mb-6">₺{price}</p>

        {/* Görsel Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {imageUrls.map((url: string, index: number) => (
            <div 
              key={index} 
              className="cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={url} 
                alt={`${title} - Görsel ${index + 1}`} 
                className="rounded-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-300" 
              />
            </div>
          ))}
        </div>

        {/* İletişime Geç Butonu */}
        <div className="mt-8 text-center">
          <Link 
            href="/contactus" 
            className="inline-block bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            İletişime Geçin
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          {/* Kapatma Butonu */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X size={32} />
          </button>

          {/* Önceki Görsel Butonu */}
          {imageUrls.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft size={48} />
            </button>
          )}

          {/* Sonraki Görsel Butonu */}
          {imageUrls.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight size={48} />
            </button>
          )}

          {/* Ana Görsel */}
          <div className="max-w-4xl max-h-full">
            <img
              src={imageUrls[currentImageIndex]}
              alt={`${title} - Görsel ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Görsel Sayacı */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
            {currentImageIndex + 1} / {imageUrls.length}
          </div>

          {/* Thumbnail Navigation */}
          {imageUrls.length > 1 && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-md overflow-x-auto">
              {imageUrls.map((url: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                    index === currentImageIndex ? 'border-white' : 'border-transparent opacity-70'
                  }`}
                >
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PropertyDetails;
