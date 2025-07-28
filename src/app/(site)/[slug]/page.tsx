import { notFound } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

async function getProperty(slug: string) {
  const res = await fetch(`${API_URL}/api/properties?filters[slug][$eq]=${slug}&populate=*`);
  const data = await res.json();
  if (!data.data || data.data.length === 0) return null;
  return data.data[0];
}

export async function generateStaticParams() {
  const res = await fetch(`${API_URL}/api/properties`);
  const data = await res.json();
  return data.data.map((item: any) => ({ slug: item.attributes.slug }));
}

export default async function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = await getProperty(params.slug);
  if (!property) return notFound();

  const { title, description, image } = property.attributes;

  return (
    <div className="container mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <img src={image?.data?.attributes?.url} alt={title} className="mb-4 rounded-lg" />
      <p>{description}</p>
    </div>
  );
}
