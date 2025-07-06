"use client";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EmlakCarouselProps {
  images: { url: string }[];
}

export default function EmlakCarousel({ images }: EmlakCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Eğer resim yoksa placeholder ekle
  const finalImages =
    images.length === 0
      ? [{ url: "/placeholder.jpg" }] // public klasöründe bir placeholder.jpg olmalı
      : images;

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: finalImages.length > 1,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    mode: "snap",
    slides: { perView: 1, spacing: 0 },
  });

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div ref={sliderRef} className="keen-slider" style={{ height: "500px" }}>
        {finalImages.map((img, idx) => (
          <div
            key={idx}
            className="keen-slider__slide flex items-center justify-center"
          >
            <img
              src={img.url}
              alt={`Resim ${idx + 1}`}
              className="max-h-full max-w-full object-contain"
              style={{ margin: "0 auto" }}
            />
          </div>
        ))}
      </div>

      {finalImages.length > 1 && (
        <>
          <button
            aria-label="Önceki"
            onClick={() => slider?.current?.prev()}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            aria-label="Sonraki"
            onClick={() => slider?.current?.next()}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </>
      )}
    </div>
  );
}
