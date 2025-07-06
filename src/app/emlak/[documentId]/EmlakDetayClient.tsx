"use client";

import { MapPin, Tag } from "lucide-react";
import Breadcrumbs from "@/src/components/Breadcrumbs";
import BackButton from "@/src/components/BackButton";
import EmlakCarousel from "@/src/components/EmlakCarousel";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const Leaflet = dynamic(() => import("leaflet"), { ssr: false });

import { MapPin as MapPinIcon } from "lucide-react";

export default function EmlakDetayClient({ emlak }: { emlak: any }) {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [loadingMap, setLoadingMap] = useState(true);
  const [L, setL] = useState<any>(null);

  const isInTurkey = (lat: number, lon: number) =>
    lat >= 35.8 && lat <= 42.1 && lon >= 25.7 && lon <= 44.8;

  useEffect(() => {
    // Leaflet dinamik importu
    import("leaflet").then((mod) => setL(mod));
  }, []);

  useEffect(() => {
    if (!emlak.lokasyon) {
      setLoadingMap(false);
      return;
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      emlak.lokasyon + ", Türkiye"
    )}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          if (isInTurkey(lat, lon)) {
            setCoords({ lat, lon });
          } else {
            setCoords(null);
          }
        } else {
          setCoords(null);
        }
      })
      .catch(() => setCoords(null))
      .finally(() => setLoadingMap(false));
  }, [emlak.lokasyon]);

  if (!L) return null; // Leaflet yüklenene kadar boş döndür

  // Leaflet için custom icon tanımı
  const customIcon = new L.DivIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          {
            label: emlak.kategori?.ad || "Kategori",
            href: `/kategori/${emlak.kategori?.slug}`,
          },
          { label: emlak.baslik, href: undefined },
        ]}
      />

      <BackButton />

      <div className="animate-fadeIn space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">{emlak.baslik}</h1>

        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-indigo-500" />
            <span className="font-medium">{emlak.kategori?.ad}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" />
            <span>{emlak.lokasyon}</span>
          </div>
        </div>

        {emlak.resimler.length > 0 && (
          <div className="rounded-lg overflow-hidden shadow">
            <EmlakCarousel images={emlak.resimler} />
          </div>
        )}

        <div className="bg-gray-50 p-6 rounded-xl shadow text-gray-800 leading-relaxed text-lg">
          {emlak.aciklama}
        </div>

        {loadingMap && (
          <p className="text-gray-500 text-center">Harita yükleniyor...</p>
        )}

        {!loadingMap && coords && (
          <div className="h-96 w-full rounded-lg overflow-hidden shadow">
            <MapContainer
              center={[coords.lat, coords.lon]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[coords.lat, coords.lon]} icon={customIcon}>
                <Popup>{emlak.lokasyon}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}

        {!loadingMap && !coords && (
          <p className="text-center text-red-500">
            Konum Türkiye sınırları içinde bulunamadı.
          </p>
        )}
      </div>
    </main>
  );
}
