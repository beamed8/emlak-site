// app/page.tsx
import { getKategoriler } from "@/lib/api";
import HomeClient from "@/src/components/HomeClient";

export default async function Home() {
  const kategoriler = await getKategoriler();
  return <HomeClient kategoriler={kategoriler} />;
}
