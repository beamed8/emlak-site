import { getEmlaklar } from "@/lib/api";
import Breadcrumbs from "@/src/components/Breadcrumbs";
import KategoriPageClient from "./KategoriPageClient";

export default async function KategoriPage({ params }: any) {
  const slug = params.slug.toLowerCase();
  const emlaklar = await getEmlaklar();

  const filtrelenmis = emlaklar.filter((emlak: any) => {
    return emlak.kategori?.slug?.toLowerCase() === slug;
  });

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: slug, href: undefined },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6 capitalize">{slug}</h1>

      {filtrelenmis.length === 0 ? (
        <p className="text-gray-600">Bu kategoriye ait emlak bulunamadı.</p>
      ) : (
        <KategoriPageClient emlaklar={filtrelenmis} />
      )}
    </main>
  );
}
