// src/app/emlak/[documentId]/page.tsx

import { notFound } from "next/navigation";
import { getEmlakDetayByDocumentId } from "@/lib/api";
import EmlakDetayClient from "./EmlakDetayClient";

interface PageProps {
  params: {
    documentId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const emlak = await getEmlakDetayByDocumentId(params.documentId);

  if (!emlak) {
    return notFound();
  }

  return <EmlakDetayClient emlak={emlak} />;
}
