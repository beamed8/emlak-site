// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
const API_BASE = `${API_URL}/api`;

export async function getEmlaklar() {
  const res = await fetch(
    `${API_URL}/api/emlaks?populate[kategori]=true&populate[resimler]=true`
  );

  if (!res.ok) {
    console.error("Emlaklar API çağrısı başarısız", res.status);
    return [];
  }

  const data = await res.json();

  return data.data.map((item: any) => {
    return {
      id: item.id,
      documentId: item.documentId,
      baslik: item.baslik,
      aciklama: item.aciklama,
      fiyat: item.fiyat,
      lokasyon: item.lokasyon,
      kategori: item.kategori
        ? {
            id: item.kategori.id,
            ad: item.kategori.ad,
            slug: item.kategori.slug,
          }
        : null,
      resimler: (item.resimler || []).map((img: any) => ({
        id: img.id,
        url: `${API_URL}${img.url}`, // API_URL + resim url'si
        alternativeText: img.alternativeText,
      })),
      slug: item.slug,
    };
  });
}

export async function getKategoriler() {
  const res = await fetch(`${API_BASE}/kategoris`, {
    cache: "no-store", // 💥 Önemli
  });
  const data = await res.json();

  return data.data.map((item: any) => ({
    id: item.id,
    ad: item.ad,
    slug: item.slug,
  }));
}

export async function getEmlakBySlug(slug: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  const res = await fetch(`${API_URL}/api/emlaks?filters[slug][$eq]=${slug}&populate=*`);
  const json = await res.json();
  return json.data?.[0] || null;
}


export async function getEmlakDetayByDocumentId(documentId: string) {
  const res = await fetch(
    `${API_URL}/api/emlaks?filters[documentId][$eq]=${documentId}&populate[kategori]=true&populate[resimler]=true`
  );

  if (!res.ok) return null;

  const data = await res.json();

  if (!data.data || data.data.length === 0) return null;

  const emlak = data.data[0];

  return {
    id: emlak.id,
    baslik: emlak.baslik,
    aciklama: emlak.aciklama,
    fiyat: emlak.fiyat,
    lokasyon: emlak.lokasyon,
    kategori: emlak.kategori || null,
    resimler: (emlak.resimler ?? []).map((img: any) => ({
      id: img.id,
      url: img.url.startsWith("http") ? img.url : `${API_URL}${img.url}`,
      alternativeText: img.alternativeText,
    })),
  };
}
