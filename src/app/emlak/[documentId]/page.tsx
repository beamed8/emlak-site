import { notFound } from "next/navigation";
import { getEmlakDetayByDocumentId } from "@/lib/api";
import EmlakDetayClient from "./EmlakDetayClient";

// Next.js 13+ App Router için önerilen tip tanımı
interface EmlakDetayPageProps {
  params: { documentId: string };
}

export default async function EmlakDetay({ params }: EmlakDetayPageProps) {
  const emlak = await getEmlakDetayByDocumentId(params.documentId);
  if (!emlak) return notFound();

  return <EmlakDetayClient emlak={emlak} />;
}
